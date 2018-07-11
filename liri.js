require("dotenv").config();

var Twitter = require("Twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require('file-system');

var nodeAction = process.argv[2];
var userInput = process.argv[3];


//      TWITTER
if (nodeAction === "my-tweets") {
  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: 'fakeaccountttt6'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (let i = 0; i < 3; i++) {
        console.log(JSON.stringify(tweets[i].text, null, 2));
      }
    }
  });
};


//      SPOTIFY
if (nodeAction === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);
    if (userInput === ""){
      userInput = "The Sign";
      console.log(userInput);
    }
  spotify.search({
    type: 'track',
    query: userInput,
    limit: 1
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].external_urls, null, 2));
    console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
  });
}


//      OMDB
if (nodeAction === "movie-this") {

  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
    if (!body) {
      return console.log("Watch Mr Nobody");
    }
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value)
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);

    }
  });
}

//      FS
if (nodeAction === "do-what-it-says") {
  var readFile = fs.readfile('random.txt');
}