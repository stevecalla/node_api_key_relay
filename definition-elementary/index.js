const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchDefinition = async (searchtext) => {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=imperial&appid=${process.env.ELEMENTARY_API_KEY}`;
  const url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${searchtext}?key=${process.env.ELEMENTARY_API_KEY}`;
  // https://www.dictionaryapi.com/api/v3/references/sd2/json/${solution}?key=8a8c06ea-289c-450d-90f1-cf98924da140
  try {
    const definitionStream = await fetch(url);
    const definitionJson = await definitionStream.json();
    return definitionJson;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", (req, res) => {
  res.json({ success: "Hello Definition Elementary!" });
});

router.get("/:searchtext", async (req, res) => {
  const searchtext = req.params.searchtext;
  const data = await fetchDefinition(searchtext);
  res.json(data);
});

router.post("/", async (req, res) => {
  const searchtext = req.body.searchtext;
  const data = await fetchDefinition(searchtext);
  res.json(data);
});

module.exports = router;
