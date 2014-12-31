var http = require('http');
var colors = require('colors');
function printStock(symbol, value, change)
{
    var changeSymbol = change.slice(0,1);
    if(changeSymbol === "+")
    {
        console.log("\n" + symbol + " has value " + value.blue.bold + " with change of " + change.green.bold + "\n");
    }
    else{
        console.log("\n" + symbol + " has value " + value.blue.bold + " with change of " + change.red.bold + "\n");
    }
}

function printError(error)
{
    console.error(error.message);
}

function getStockInfo(symbol){
    var request = http.get("http://www.google.com/finance/info?client=ig&q="+symbol, function(response){
        if(response.statusCode == 200)
        {
            var body = "";
            response.on('data', function(data){
                body+=data;
            });
            response.on('end', function(){
                try{
                    body = body.slice(3);
                    var jsonBody = JSON.parse(body);
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