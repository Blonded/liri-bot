
require("dotenv").config();

var inquirer = require('inquirer');
var keys = require('./keys.js')
// console.log(keys);

// variable holding keys to twitter
var Twitter = require('twitter');
// variable holding keys to spotify
var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }

  }
});

// function to hold question to ask the user when opened aka a list of options
function questionPrompt(){

inquirer.prompt([
    {
      type: "list",
      message: "You look a little nosey today. How can I help you?",
      choices: "Play me a Song", "Tweet Me", "", "", ""

    }
  ])

}




// 5 functions: questionprompt, playSongs from spotify, get the tweet, omdb request and random text
