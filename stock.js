var http = require('http');

function printStock(symbol, value, change)
{
    console.log(symbol + " has value " + value + " with change of " + change);
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