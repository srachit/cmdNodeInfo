<h1>Node JS Command Line Tool</h1>
<p>A command line tool that can fetch information such as weather of city, stock of company or trends and tweets from twitter.<p>
<p>Future plan is to add twitter tweet based on username<p>

<h3>Usage examples </h3>

```
node index.js weather london dubai
```

```
node index.js stock goog msft
```

```
node index.js trendTweet //defaults to 3 trend tweets
node index.js trendTweet 10 //prints 10 trends tweets
```

```
node index.js trends //defaults to 3 trends
node index.js trends 10 //prints 10 trends
```

<h3>Getting Twitter To Work</h3>

<ol>
    <li>Go to dev.twitter.com/apps and login with twitter id</li>
    <li>Create a new app, you will have to provide a name, description and website. The website can be any as it is not used in this app</li>
    <li>Open twitter_auth.js and copy paste the consumer key and consumer secret from twitter there</li>
    <li>cd into the twitter directory and run the command node twitter_auth.js , this will generate a auth.json file in that folder</li>
    <li>It should now work!</li>
</ol>