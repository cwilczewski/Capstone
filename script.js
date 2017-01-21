var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var fs = require('fs');
var getJSON = require('get-json');
var express = require('express');
var RateLimiter = require('limiter').RateLimiter;
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
router.use(express.static(path.resolve(__dirname, 'client')));
// Variables to hold the messages and the sockets
var sockets = [];
var stringInfo = [];
// I created an array to hold the movies
var movies = [];
//limit the api call
var limiter = new RateLimiter(1, 1000);
io.on('connection', function (socket) {
    console.log('client connected');
    socket.on('press', function (press) {
        fs.readdir('client/directory', function (err, files) {
            if (err) return;
            files.forEach(function (f) {
                var movieName = (path.parse(f).name.replace(/\s/g, '%20'));
                var actualName = (path.parse(f).name);
                limiter.removeTokens(1, function () { //BYPASS API LIMIT
                    getJSON("https://api.themoviedb.org/3/search/movie?api_key=9a094988e96e2398c36e5d3b8727b1c0&language=en-US&query=" + movieName, function (error, data) {
                        if (data.results[0] != undefined) {
                            data.results[0].filepath = "directory/" + f + "";
                            // Each time we loop through the array, we will add the movie to your Movie array
                            movies.push(data.results[0]);
                            // Console will let you see as we add the new movie
                            console.log(data.results[0]);
                        }
                    });
                });
            });
            movies.sort(function (a, b) {
                var nameA = a.title.toLowerCase()
                    , nameB = b.title.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB) return 1
                return 0 //default return value (no sorting)
            });
            // Before we write to the output file, makesure to stringify for JSON
            setTimeout(function () {
                moviesSort = JSON.stringify(movies);
                var wstream = fs.createWriteStream('client/metadata/movies.json');
                wstream.write(moviesSort);
                //                fs.writeFile('client/metaData/' + 'movies' + '.json', moviesSort); //****!!!!Depricated method!!!!****
                //console.log("wrote to file");
            }, 5000);
        });
    });
});
// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});