var http = require('http');
var colors = require('colors');

//Prints the stock information
function printStock(symbol, value, change)
{
    //Check if there has been a positive of negative change in stock price
    var changeSymbol = change.slice(0,1);
    //If positive change print change in green
    if(changeSymbol === "+")
    {
        console.log("\n" + symbol + " has value " + value.blue.bold + " with change of " + change.green.bold + "\n");
    }
    //If negative change, print change in red
    else{
        console.log("\n" + symbol + " has value " + value.blue.bold + " with change of " + change.red.bold + "\n");
    }
}

//Handle printing of all error messages
function printError(error)
{
    console.error(error.message);
}

function getStockInfo(symbol){
    //Get stock from google's json finance data
    var request = http.get("http://www.google.com/finance/info?client=ig&q="+symbol, function(response){
        //Go ahead only is information is recieved successfully
        if(response.statusCode == 200)
        {
            var body = ""; //To store data received from get call
            response.on('data', function(data){
                body+=data; //Store data as it comes in
            });
            //After all data is received the .on('end') is called
            response.on('end', function(){
                try{
                    //Slice out the starting // google add's to prevent use of the data
                    body = body.slice(3);
                    //Convert the rest into JSON data
                    var jsonBody = JSON.parse(body);
                    //Call the printStock function with the symbol, value and change data
                    printStock(jsonBody[0].t, jsonBody[0].l, jsonBody[0].c);
                }
                catch(error)
                {
                    printError(error.message);
                }
            });
        }
        else{
            printError({message: "There was an error getting information for "+ symbol +". ("+ http.STATUS_CODES[response.statusCode] + ")"});
        }
    });

    request.on("error", function(error){
        printError(error);
    })
}

module.exports.getStockInfo = getStockInfo;