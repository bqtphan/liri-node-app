require("dotenv").config();

var Twitter = require("Twitter");
var Spotify = require("node-spotify-api");
var keys = require("../liri-node-app/keys.js");
var request = require("request");

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
      // console.log(tweets);
      console.log(JSON.parse(response).text);
    }
  });
};

//      SPOTIFY
if (nodeAction === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);
  spotify.search({
    type: 'artist OR album OR track',
    query: userInput
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    if (!error && response.statusCode === 200) {
      console.log(data)
    }
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