const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchDefinition = async (searchtext) => {
  const url = `https://api.wordnik.com/v4/word.json/${searchtext}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${process.env.WORDNIK_API_KEY}`;
  // const url = `https://api.wordnik.com/v4/word.json/Word/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=yh6m0pne71140ovktya1nw7ufczqyp1q3lwtzp95yqh4j6fvd`;

  try {
    const definitionStream = await fetch(url);
    const definitionJson = await definitionStream.json();
    return definitionJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  res.json({ success: "Hello Definition WORDNIK!" });
});

router.get("/:searchtext", async (req, res) => {
  const searchtext = req.params.searchtext;
  const data = await fetchDefinition(searchtext);
  res.json(data);
});

// router.post("/", async (req, res) => {
//   const searchtext = req.body.searchtext;
//   const data = await fetchDefinition(searchtext);
//   res.json(data);
// });

module.exports = router;
