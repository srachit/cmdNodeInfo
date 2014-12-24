var http = require('http');

function printWeather(city, temperature, country){
    console.log("It is " + temperature + " degrees celsius " + "in " + city +","+country);
}

function printError(error){
    console.error(error.message);
}

function getWeather(city){
    var request = http.get("http://api.openweathermap.org/data/2.5/find?q="+city+"&units=metric", function(response){
        //If response recieved succesfully
        if(response.statusCode == 200)
        {
            var body = ""; //To store the information received from website
            response.on("data", function(data){
               body += data;
            });
            //After all information from website is received
            response.on("end", function(){
                try{
                    //Parse the data
                    var jsonBody = JSON.parse(body);
                    for(var i=0; i<jsonBody.count;i++)
                    {
                        printWeather(jsonBody.list[i].name , jsonBody.list[i].main.temp, jsonBody.list[i].sys.country);
                    }
                }catch(error)
                {
                    printError(error);
                }
            })
        }
        //If failure to recieve response
        else
        {
            printError({message: "There was an error getting information for "+ city +". ("+ http.STATUS_CODES[response.statusCode] + ")"});
        }
    });

    request.on("error", function(error){
        printError(error);
    })
}

module.exports.getWeather = getWeather;