// Question-2
// For each occupation, calculate the minimum and maximum ages

const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

CSVToJSON().fromFile("./input/question-2/main.csv").then(source => {

    const occupation = [];
    const result = [];

    source.forEach(src => {
        if(!occupation.includes(src.occupation)){
            occupation.push(src.occupation);
        }
    });

    for(let i = 0; i < occupation.length; i++) {

        let min;
        let max;

        const single_occ_arr = source.filter(src => src.occupation === occupation[i]);


        // sorting array
        const sorted_arr = single_occ_arr.sort((a, b) => a.age - b.age);

        min = sorted_arr[0];
        max = sorted_arr[single_occ_arr.length-1];

        result.push({
            "Occupation": occupation[i],
            "Min_Age": min.age,
            "Max_Age": max.age
        });
    }

    result.sort((a, b) => {
        var occA = a.Occupation.toUpperCase(); 
        var occB = b.Occupation.toUpperCase(); 
        if (occA < occB) return -1;
        if (occA > occB) return 1;
        return 0;
      });

    console.log(result);
    console.log("total: ", result.length);
    
    var csv = JSONToCSV(result, { fields: ["Occupation", "Min_Age", "Max_Age" ]});
    FileSystem.writeFileSync("./output/answer-2/main.csv", csv);
});