let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let loadedHtml;

let name = "";
let maxW = 0;



function f(err, res, body) {
  if (!err) {
    loadedHtml = cheerio.load(body);
    let allTables = loadedHtml(".table.bowler");
    for (let i = 0; i < 2; i++) {
      let allRows = loadedHtml(allTables[i]).find("tr");
      for (let j = 0; j < allRows.length; j++) {
        let allTds = loadedHtml(allRows[j]).find("td");

        let currW = loadedHtml(allTds[4]).text();
        if (maxW <= currW) {
          maxW = currW;
          name = loadedHtml(allTds[0]).text();
        }
      }
    }
    console.log(name);
  }
}

req(
  "https://www.espncricinfo.com/series/kathmandu-mayor-s-cup-2020-21-1253570/nepal-police-club-vs-armed-police-force-club-final-1253581/full-scorecard",
  f
);
