var https = require('https');
var output = require('fs').createWriteStream('auth.json');
var consumer = {
    key: '<Your Consumer Key>',
    secret: 'Y2CEfHDxJ7TdGeuSoI8YRiY0sjMw395IMUiDq7KTZjY5chs7oN'
};

var request = https.request({
    method: 'POST',
    host: 'api.twitter.com',
    path: '/oauth2/token',
    headers:{
        'User-Agent': 'Node Cookbook: Twitter Trends',
        Authorization: 'Basic ' + Buffer((encodeURIComponent(consumer.key)+ ':'+ encodeURIComponent(consumer.secret))).toString('base64'),
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-length': 29
    }
});

request.end('grant_type=client_credentials');

request.on('response', function(res){
    if(res.statusCode !== 200){
        return console.log('Error, status: '+ res.statusCode);
    }
    res.pipe(output);
});