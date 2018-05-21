
require("dotenv").config();

var keys = require('./keys.js')
// console.log(keys);


var Twitter = require('twitter');

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }

  }
});
