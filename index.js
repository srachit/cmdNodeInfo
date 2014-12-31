var weather = require("./weather");
var stock = require("./stock");
var twitter = require("./twitter/twitter_trends");
var colors = require('colors');


var option = process.argv.slice(2,3);
var list = process.argv.slice(3);
var numOftrends = process.argv.slice(3,4);

if(option == "weather")
{
    if(list.length === 0)
    {
        help();
        return;
    }
    list.forEach(weather.getWeather);
}
else if(option == "stock")
{
    if(list.length === 0)
    {
        help();
        return;
    }
    list.forEach(stock.getStockInfo);
}
else if(option == "twTrends")
{
    if(numOftrends.length === 0)
    {
        numOftrends = 3;
    }
    twitter.getTrends(numOftrends);
}
else{
    help();
}

function help(){
    var node = "node";
    var weather = "weather";
    var stock = "stock";
    var twitter = "twTrends";
    console.log("\nUse format is "+ node.green.bold +" index.js option list");
    console.log("Options are: " + weather.yellow.bold + ", " + stock.red.bold + ", " + twitter.blue.bold);
    console.log("List is: list of cities, list of company symbols, number of tweets \n");
}