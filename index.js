var weather = require("./weather");
var stock = require("./stock");
var twitter = require("./twitter/twitter_trends");
var colors = require('colors');


var option = process.argv.slice(2,3); //Option like weather/stock/twTrends
var list = process.argv.slice(3); //List of cities/stocks
var numOftrends = process.argv.slice(3,4); //Number of tweets to print out

if(option == "weather")
{
    //If list of cities is empty call help function and exit
    if(list.length === 0)
    {
        help();
        return;
    }
    list.forEach(weather.getWeather);
}
else if(option == "stock")
{
    //If list of stock symbols is empty call help function and exit
    if(list.length === 0)
    {
        help();
        return;
    }
    list.forEach(stock.getStockInfo);
}
else if(option == "trendTweet")
{
    //If number of trends to print is not provided, default to 3
    if(numOftrends.length === 0)
    {
        numOftrends = 3;
    }
    twitter.getTrendTweets(numOftrends);
}
else if(option == "trends")
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

//Help function called to inform user of different options available
function help(){
    var weather = "weather";
    var stock = "stock";
    var trendTweet = "trendTweet";
    var trends = "trends";
    console.log("\nUse format is: "+ "node index.js option list".green.bold.italic);
    console.log("Options are: " + weather.yellow.bold + ", " + stock.red.bold + ", " + trendTweet.blue.bold + ", " +trends.green.bold);
    console.log("List is: list of cities, list of company symbols, number of tweets, number of trends");
    console.log("\nHow To Use Twitter".green.bold);
    console.log("\nTo print tweets with trending hash tags:");
    console.log("node index.js trendTweet numOfTweets=default 3".blue.italic);
    console.log("\nTo print the current trends:");
    console.log("node index.js trends numOfTrends=default 3\n".blue.italic);
}