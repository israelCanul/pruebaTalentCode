const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3200;

function getData() {
  fetch(
    "https://docs.google.com/spreadsheets/d/1cjuPp1lHpvLnfUQ7cFUQyGSmxgaH_io6JLY74iQ8WiE/gviz/tq?tqx=out:json&gid=0"
  )
    .then(function (res) {
      console.log(res);
      res.json();
    })
    .then(function (json) {
      console.log(json);
    });
}

app.get("/", (req, res) => {
  const data = getData();
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
