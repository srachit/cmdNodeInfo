var https = require('https');
var colors = require('colors');
//Headers used to call twitter API
var headers = {
    'User-Agent': 'Node Command Line Information Tool',
    Authorization: 'Bearer ' + require('./auth.json').access_token
};

//Object that holds everything required to pull trending tweets from twitter
var trendingTopics = module.exports = {
    //Object with current trends options
    trends: {
        urlOpts: {
            host: 'api.twitter.com',
            path: '/1.1/trends/place.json?id=1',
            headers: headers
        }
    },
    //Object with tweets options
    tweets:{
        maxResults: 3,
        resultsType: 'recent',
        urlOpts:{
            host: 'api.twitter.com',
            headers: headers
        }
    },
    //Converts data into JSON
    jsonHandler: function(response, cb){
        var json = '';
        response.setEncoding('utf8');
        if(response.statusCode === 200)
        {
            response.on('data', function(chunk){
                json+=chunk;
            }).on('end', function(){
                cb(JSON.parse(json));
            });
        }
        else{
            throw ("Server Returned Error: " + response.statusCode);
        }
    },
    //Pulls the tweets from twitter
    tweetPath: function(q){
        var p = '/1.1/search/tweets.json?q=' + q + '&count=' + this.tweets.maxResults + '&include_entities=true&result_type='+
            this.tweets.resultsType;
        this.tweets.urlOpts.path = p;
    }
};

//Used to retrieve trends and tweets from above object
function makeCall(urlOpts, cb){
    https.get(urlOpts, function(response){
        trendingTopics.jsonHandler(response, cb);
    }).on('error', function(e){
        console.log("Connection Error: " + e.message);
    });
}

//Function exported to be used by other modules to get tweets with trends
function getTrendTweets(numOfTweets){

    trendingTopics.tweets.maxResults = numOfTweets;

    makeCall(trendingTopics.trends.urlOpts, function(trendsArr){
        trendingTopics.tweetPath(trendsArr[0].trends[0].query);
        makeCall(trendingTopics.tweets.urlOpts, function(tweetsObj){
            tweetsObj.statuses.forEach(function (tweet){
                var name = tweet.user.screen_name, text = tweet.text;
                console.log("\n"+name.yellow.bold + ": "+ text);
            });
        });

    });
}

//Function exported to be used by other modules to get trends
function getTrends(numOfTrends){
    makeCall(trendingTopics.trends.urlOpts, function(trendsArr) {
        trendingTopics.tweetPath(trendsArr[0].trends[0].query);
        for(var i=0; i<numOfTrends;i++)
        {
            if(i%2 == 0)
            {
                console.log("\n" + trendsArr[0].trends[i].name.green.bold);
            }
            else
            {
                console.log("\n" + trendsArr[0].trends[i].name.blue.bold);
            }
        }
    });
}

module.exports.getTrendTweets = getTrendTweets;
module.exports.getTrends = getTrends;