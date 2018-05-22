# liri-bot

Liri Bot is a Language Interpretation and Recognition Interface.
It is a command line node app that takes in parameters and gives you back data through
Twitter, OMDB, and Spotify, using request & inquirer.

Prompts users a list of options to select from.
Allows for user input on the movie name as well as the song name.


### Installing

This application is run through Node.js.

```
.env
.gitignore
keys.js
liri.js
package-lock.json
random.text
README.md
LICENSE

```

***

Preview of internal bot.

<img src="SRC HERE" alt="screengrab">


### coding style tests
The code listed below is JavaScript listed in node.js
This function lets you print tweets based off of the chosen 'screen name'.

```
function tweets(){
  var params = {screen_name: "KarlTheFog"};
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

```


## Built With
Node.js
JavaScript
Npm Install Packages

## Authors
* **Lena Martinson** - *Github* - [Github](https://github.com/Blonded)
