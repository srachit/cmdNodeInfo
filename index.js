var weather = require("./weather");
var stock = require("./stock");


var option = process.argv.slice(2,3);
var list = process.argv.slice(3);

if(option == "weather")
{
    list.forEach(weather.getWeather);
}
else if(option == "stock")
{
    list.forEach(stock.getStockInfo);
}
else {
    console.log("Use format is node index.js option list");
    console.log("Options are: weather, stock");
    console.log("List is: list of cities, list of company symbols");
}