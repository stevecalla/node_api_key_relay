const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchDefinition = async (searchtext) => {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchtext}?key=${process.env.COLLEGE_API_KEY}`;
  // https://www.dictionaryapi.com/api/v3/references/collegiate/json/${solution}?key=d6ad76fd-5324-4925-834b-17a06efafce6
  try {
    const definitionStream = await fetch(url);
    const definitionJson = await definitionStream.json();
    return definitionJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  res.json({ success: "Hello Definition College!" });
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
