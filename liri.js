require("dotenv").config();

var inquirer = require('inquirer');
var keys = require('./keys.js');
// console.log(keys);

// variable holding keys to twitter
var Twitter = require('twitter');
// variable holding keys to spotify


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// OMDB API - using a request call.
// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require("request");
//
// // Then run a request to the OMDB API with the movie specified
// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
//
//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {
//
//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    }

  }
});

//for spotify SEARCH, pulled ex
// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
// SPOTIFY request, pulled ex

spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log("52");
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });



// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err);
//   });






// function to hold question to ask the user when opened aka a list of options
// function questionPrompt(){
// inquirer.prompt([
//     {
//       type: "list",
//       message: "You look a little nosey today. How can I help you?",
//       choices: "Play me a Song", "Tweet Me", "", "", ""
//
//     }
//   ])
// }
//
// function playSongs(){
//
// }






// 5 functions: questionprompt, playSongs from spotify, get the tweet, omdb request and random text
