var fs = require("fs");


var request = require("request");

var Spotify = require('node-spotify-api');


var keys = require('./key');



var cmd = process.argv[2];
var option1 = process.argv[3];

var nodeArgs = process.argv;

var movieName = "";


if (cmd === "spotify-this-song") {

    if (option1) {
        getSpotify(option1);
    } else {
        getSpotify("Ace of Base"); //defaut song
    }

} else if (cmd === "movie-this") {
    if (option1) {
        var nodeArgs = process.argv.slice(2).join(' ');
        movieName = option1;
        getMovie();
    } else {
        movieName = "Mr.Nobody";
        getMovie();
    }

} else if (cmd === "do-what-it-says") {
    readFile();
} else {
    console.log("Your instructions could not be understood.  Please check random.txt and try again.");

}





function getSpotify(input) {
    var spotify = new Spotify({
        id: '97d05772cd42485c99ac65c34863e799',
        secret: 'c641361037b04989a03cb145b551e04e',
    });

    if (input) {
        spotify.search({
            type: 'track',
            query: input
        }, function(err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.dir("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log('----------------');

            console.dir("Song: " + data.tracks.items[0].name);
            console.log('----------------');

            console.dir("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
            console.log('----------------');

            console.dir("The album that the song is from: " + data.tracks.items[0].album.name);
            console.log('----------------');

        });


    } else {
        spotify.search({
            type: 'track',
            query: input
        }, function(err, data) {
            if (err) {

                return console.log("song cannot be found " + err);
            }

            console.dir("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log('----------------');

            console.dir("Song: " + data.tracks.items[0].name);
            console.log('----------------');

            console.dir("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
            console.log('----------------');

            console.dir("The album that the song is from: " + data.tracks.items[0].album.name);
            console.log('----------------');

        });

    }

}


function getMovie() {


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=40e9cece";

    console.dir(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            var omdb = JSON.parse(body, null, 2);

            console.dir("Title of the movie: " + omdb.Title);
            console.dir("Year the movie came out: " + omdb.Year);
            console.dir("imdbRating: " + omdb.imdbRating);
            console.dir("Rotten Tomatoes Rating of the movie: " + omdb.Ratings[1].Value);
            console.dir("Language: " + omdb.Language);
            console.dir("Plot: " + omdb.Plot);
            console.dir("Actors: " + omdb.Actors);

        }

    });

}

function readFile() {

    fs.readFile("random.txt", "utf-8", function(error, data) {


        if (error) {
            return console.log(error);
        }

        var dataArr = data.trim().split(",");

        console.log(dataArr);


    });

}