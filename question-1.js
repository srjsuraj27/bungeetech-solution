// Question-1 
// Group the year by decades and sum the values

const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");

CSVToJSON().fromFile("./input/question-1/main.csv").then(source => {

    let startInx = 0;
    let endIndx = 10;

    const result = [];

    for(let i = 0; i < source.length/10; i++) {

        const arr = source.slice(startInx, endIndx);
        let sum_of_voilent = 0;
        let sum_of_property = 0;
        let sum_of_murder = 0;
        let sum_of_forcible_rape = 0;
        let sum_of_robbery = 0;
        let sum_of_aggravated_assault = 0;
        let sum_of_burglary = 0;
        let sum_of_larceny_theft = 0;
        let sum_of_vehicle_theft = 0;
        let year = arr[0].Year;
        let population = 0

        arr.forEach(arr => {
            population += arr.Population - population;
            sum_of_voilent += parseInt(arr.Violent);
            sum_of_property += parseInt(arr.Property);
            sum_of_murder += parseInt(arr.Murder);
            sum_of_forcible_rape += parseInt(arr.Forcible_Rape);
            sum_of_robbery += parseInt(arr.Robbery);
            sum_of_aggravated_assault += parseInt(arr.Aggravated_assault);
            sum_of_burglary += parseInt(arr.Burglary);
            sum_of_larceny_theft += parseInt(arr.Larceny_Theft);
            sum_of_vehicle_theft += parseInt(arr.Vehicle_Theft);
        });

        result.push({
            "Year": year,
            "Population": population,
            "Voilent": sum_of_voilent,
            "Property": sum_of_property,
            "Murder": sum_of_murder,
            "Forcible_Rape": sum_of_forcible_rape,
            "Robbery": sum_of_robbery,
            "Aggravated_assault": sum_of_aggravated_assault,
            "Burglary": sum_of_burglary,
            "Larceny_Theft": sum_of_larceny_theft,
            "Vehicle_Theft": sum_of_vehicle_theft
        })

        startInx = startInx + 10;
        endIndx = endIndx + 10;
    }

    console.log(result);
    console.log("total: ", result.length);
    
    var csv = JSONToCSV(result, { fields: ["Year", "Population", "Voilent", "Property", "Murder", "Forcible_Rape", "Robbery", "Aggravated_assault", "Burglary", "Larceny_Theft", "Vehicle_Theft" ]});
    FileSystem.writeFileSync("./output/answer-1/main.csv", csv);
});
