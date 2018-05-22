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
var request = require("request");
var fs = require("fs");


//for spotify SEARCH, pulled ex
// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
// SPOTIFY request, pulled ex





// FIRST FUNC - question lists.
// function to hold question to ask the user when opened aka a list of options
function questionPrompt(){
inquirer.prompt([
    {
      name: 'theQuestion',
      type: "list",
      message: "You look a little nosey today. How can I help you?",
      choices: ["Play me a Song", "Tweet Me", "What's that movie?", "Whatever I want"]

    }
  ]).then(function(answers){
    console.log('we got our answers!!!!', answers.theQuestion);

    switch(answers.theQuestion) {
        case 'Play me a Song':
            //playSongs('Home');
            secondQuestion('spotify')
            break;
        case "Tweet Me":
            tweets();
            break;
        case "What's that movie?":
            //movies();
            secondQuestion('movie')
            break;
        case "Whatever I want":
            doWhatItSays();
            break;
        default:
            console.log("boo")
    }

    //big switch statement
  })
}
questionPrompt();
// -----------------------------------------

function secondQuestion(command) {
  inquirer.prompt([
      {
        name: 'secondQuestion',
        type: "input",
        message: "What do you want?",
      }
    ]).then(function(answers){
      console.log('this is our command', command);
      console.log('Second Question answers', answers.secondQuestion);
      if (command === "spotify") {
        playSongs(answers.secondQuestion);
      } else  {
        movies(answers.secondQuestion);
      }

    })
}


// 2nd FUNCTION - spotify.
function playSongs(songTitle){
// artist name, track name, previewlink,
  spotify.search({ type: 'track', query: songTitle }).then(function(response) {
      // artist name
      console.log("Artist name: " + response.tracks.items[0].artists[0].name);

      // album name
      console.log("Album name: " + response.tracks.items[0].album.name)

      //track name
      console.log("Song name: " + response.tracks.items[0].name);

      //preview url
     console.log("Url: " + response.tracks.items[0].external_urls.spotify);

    }).catch(function(err) {
      console.log(err);
    });
}

//playSongs();



// -----------------------------------------



//3rd function - Tweets
function tweets(){
  var params = {screen_name: 'KarlTheFog'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
      }
    } else {
      throw error;
    }
  });
}

 //tweets();

// -----------------------------------------

//4th function - omdb
function movies(movieTitle){
  // * Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.

  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Movie -----" , JSON.parse(body));
    }
  });


}

//movies()


// -----------------------------------------

//5th function - RANDOM TXT FILE
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    var text = data.split(',')

    console.log('song title', text[1].replace('/\r?\n|\r/'));
    console.log('command', text[0]);

    switch(text[0]) {
        case 'spotify-this-song':
            playSongs(text[1].replace('/\r?\n|\r/'));
            break;
        case "Tweet Me":
            tweets();
            break;
        case "What's that movie?":
            //movies();
            break;
        case "Whatever I want":
            doWhatItSays();
            break;
        default:
            console.log("boo")
    }
  });
}
//doWhatItSays();




// 5 functions: questionprompt, playSongs from spotify, get the tweet, omdb request and random text
