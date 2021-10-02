// Question-3
// Sort the teams by Red Cards, then to Yellow Cards

const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

CSVToJSON().fromFile("./input/question-3/main.csv").then(source => {

    const team_arr = [];

    source.forEach(src => {
        
        let yello_card = parseInt(src["Yellow Cards"]);
        let red_card = parseInt(src["Red Cards"]);

        team_arr.push({
            "Team": src["Team"],
            "Yellow Cards": yello_card,
            "Red Cards": red_card
        })
    });

    const sortedArr = function(arr, prop1, prop2) {
        let sort_arr = arr.sort((a, b) => {
            if(a[prop1] == b[prop1]){
                if(a[prop2] === b[prop2]) return 0;
                return (a[prop2] > b[prop2]) ? -1 : 1;
            } else {
                return (a[prop1] > b[prop1]) ? -1 : 1;
            }
        });
        return sort_arr;
    }

    const result = sortedArr(team_arr, "Red Cards", "Yellow Cards");

    console.log(result);
    console.log(result.length);
    
    var csv = JSONToCSV(result, { fields: ["Team", "Yellow Cards", "Red Cards"]});
    FileSystem.writeFileSync("./output/answer-3/main.csv", csv);
});