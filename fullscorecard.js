let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let $;
let data = {}

function f(err, res, body) {
  if (!err) {
    $ = cheerio.load(body);
    let allPlayers= $(".Collapsible tbody tr td a");
    for(let i = 0; i < allPlayers.length; i++){
        getDOB($(allPlayers[i]).attr("href"), $(allPlayers[i]).text().trim());
    }
  }
}

function getDOB(url, name){
    req(url, function(err, res, body){
        if(!err){
            $ = cheerio.load(body);
            let allInfo = $(".ciPlayerinformationtxt span");
            data[name] = $(allInfo[1]).text().trim()
            fs.writeFileSync("data.json",JSON.stringify(data))
        }
    })
}

req(
  "https://www.espncricinfo.com/series/kathmandu-mayor-s-cup-2020-21-1253570/nepal-police-club-vs-armed-police-force-club-final-1253581/full-scorecard",
  f
);