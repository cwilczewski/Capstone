//global variables
var movieName;
var i = 0;
var movieGenre;
//Loading animation
$(document).ready(function () {
    setTimeout(function () {
        $('.sk-folding-cube').css('opacity', '0');
        $('#movie-section').css('visibility', 'hidden');
    }, 5000);
    setTimeout(function () {
        $('.load-title h1').css('opacity', '1');
        $('.load-title h1').css('transform', 'translatex(0px)');
    }, 5500);
    setTimeout(function () {
        $('.load-title h1').css('opacity', '0');
        $('.load-title h1').css('visibility', 'hidden');
    }, 7500);
    setTimeout(function () {
        $('#movie-section').css('visibility', 'visible');
        $('#movie-section').css('opacity', '1');
        $('.genres').css('opacity', '1');
    }, 8000);
});
//Loop to go through JSON file and randomly populate 8 movies on load
$(document).ready(function () {
    setTimeout(function () {
        $.ajax({
            url: "metaData/movies.json"
            , success: function (data) {
                var i = 0;
                for (var titles in data) {
                    if (i < 5) {
                        var i = i + 1
                        if (data.hasOwnProperty(titles)) {
                            var random = data[Math.floor(Math.random() * data.length)];
                            var recentContainer = $('<div class="recent-container movie-container" id="recent-' + i + '"> </div>');
                            var movieText = $("<div class='movie-text'></div>");
//                            var moviePoster = $("<img class='movie-poster' src=https://image.tmdb.org/t/p/w500" + random.poster_path + ">");
                            var movieTitle = $("<h1 class='movie-title'>" + random.title + " " + "</h1>");
                            var moviePath = $("<input class='filepath' type='text' value='" + random.filepath + "'>");
                            var movieDesc =  $("<span class='movie-desc' style='display: none;'>" + random.overview + " " + "</span>");
                            $('#container').append(recentContainer);
                            $(recentContainer).append(moviePath);
                            $(recentContainer).append(movieDesc);
                            $(recentContainer).append(movieText);
                            $(movieText).append(movieTitle);
                            $('#recent-' + i).css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/w500' + random.poster_path) + ')'
                            $('#recent-' + i).css('background-size', 'cover')
                        }
                        else {}
                    }
                }
            }
        });
    }, 7000);
    //Loop to go through the JSON file and populate all movie files
    setTimeout(function () {
        $.ajax({
            url: "metaData/movies.json"
            , success: function (data) {
                var i = 0
                for (var titles in data) {
                    var i = i + 1
                    if (data.hasOwnProperty(titles)) {
                        var movieContainer = $('<div class="movie-container" id="movie-' + i + '"> </div>');
                        var movieText = $("<div class='movie-text'></div>");
                        var movieTitle = $("<h1 class='movie-title'>" + data[titles].title + " " + "</h1>");
                        var moviePath = $("<input class='filepath' type='text' value='" + data[titles].filepath + "'>");
                        var movieDesc =  $("<span class='movie-desc' style='display: none;'>" + data[titles].overview + " " + "</span>");
                        var movieGenre = data[titles].genre_ids[0];
                        if (movieGenre == 28) {
                            movieGenre = "<p id='genre' class='action'>Action</p>";
                        }
                        if (movieGenre == 12) {
                            movieGenre = "<p id='genre' class='adventure'>Adventure</p>";
                        }
                        if (movieGenre == 16) {
                            movieGenre = "<p id='genre' class='animation'>Animation</p>";
                        }
                        if (movieGenre == 35) {
                            movieGenre = "<p id='genre' class='comedy'>Comedy</p>";
                        }
                        if (movieGenre == 80) {
                            movieGenre = "<p id='genre' class='crime'>Crime</p>";
                        }
                        if (movieGenre == 99) {
                            movieGenre = "<p id='genre' class='documentary'>Documentary</p>";
                        }
                        if (movieGenre == 18) {
                            movieGenre = "<p id='genre' class='drama'>Drama</p>";
                        }
                        if (movieGenre == 10751) {
                            movieGenre = "<p id='genre' class='family'>Family</p>";
                        }
                        if (movieGenre == 14) {
                            movieGenre = "<p id='genre' class='fantasy'>Fantasy</p>";
                        }
                        if (movieGenre == 36) {
                            movieGenre = "<p id='genre' class='history'>History</p>";
                        }
                        if (movieGenre == 27) {
                            movieGenre = "<p id='genre' class='horror'>Horror</p>";
                        }
                        if (movieGenre == 10402) {
                            movieGenre = "<p id='genre' class='music'>Music</p>";
                        }
                        if (movieGenre == 9648) {
                            movieGenre = "<p id='genre' class='myster'>Mystery</p>";
                        }
                        if (movieGenre == 10749) {
                            movieGenre = "<p id='genre' class='romance'>Romance</p>";
                        }
                        if (movieGenre == 878) {
                            movieGenre = "<p id='genre' class='scifi'>Science Fiction</p>";
                        }
                        if (movieGenre == 10770) {
                            movieGenre = "<p id='genre' class='tvmovie'>TV Movie</p>";
                        }
                        if (movieGenre == 53) {
                            movieGenre = "<p id='genre' class='thriller'>Thriller</p>";
                        }
                        if (movieGenre == 10752) {
                            movieGenre = "<p id='genre' class='war'>War</p>";
                        }
                        if (movieGenre == 371) {
                            movieGenre = "<p id='genre' class='wastern'>Western</p>";
                        }
                        $('#allContainer').append(movieContainer);
                        $(movieContainer).append(movieGenre);
                        $(movieContainer).append(moviePath);
                        $(movieContainer).append(movieDesc);
                        $(movieContainer).append(movieText);
                        $(movieText).append(movieTitle);
                        $('#movie-' + i).css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/w500' + data[titles].poster_path) + ')'
                        $('#movie-' + i).css('background-size', 'cover')
                    }
                    else {}
                }
            }
        });
    }, 7000);
});
//Restart or Resume Popup
$(document).ready(function () {
    setTimeout(function () {
        $('.movie-container').click(function () {
                //set the movie path
                var clickedMovie = $(this).children('.filepath').val();
                var clickedTitle = $(this).find('.movie-title').text();
                var clickedDesc = $(this).find('.movie-desc').text();
                console.log(clickedMovie)
                console.log(clickedTitle)
                    //make the little modal div
                $("body").append(
                    '<div class="play-from">' +
                    '<div id=close-pre>X</div>' +
                        '<h2>Resume: ' + clickedTitle + '</h2>' +
                        '<p>' + clickedDesc + '</p>' +
                        '<div class="button-holder">' +
                            '<div class="button" id="begin">' +
                                '<h3>FROM BEGINNING</h3>' +
                                '<img src="restart.png" />' +
                            '</div>' +
                            '<div class="button" id="current">' +
                                '<h3>FROM LAST POSITION</h3>' +
                                '<img src="resume.png" />' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
            $('#close-pre').click(function() {
                $('.play-from').remove();
                $('.overlay').css('visibility', 'hidden');
                $('.overlay').css('opacity', '0');
            });
                $('.play-from').css('opacity', '1');
                $('.overlay').css('visibility', 'visible');
                $('.overlay').css('opacity', '1');
                var video = document.getElementById('videoPlayer');
                var source = document.createElement('source');
                source.setAttribute('src', clickedMovie);
                video.appendChild(source);
                video.load()
                console.log(source);
                //play from beginning
                $('#begin').click(function () {
                    console.log(clickedMovie);
                    video.currentTime = 0;
                    $('.play-from').remove();
                    $('.overlay').css('opacity', '0');
                    $('.overlay').css('visibility', 'hidden');
                    $('.player').css('visibility', 'visible');
                    $('.player').css('opacity', '1');
                    $('.player').css('display', 'inherit');
                    setTimeout(function () {
                        video.play();
                    }, 2000);
                });
                //play from saved state
                $('#current').click(function () {
                    console.log(clickedMovie);
                    //set global var movieName as the name of the CURRENTLY clicked movie
                    movieName = $(this).children('.movie-text').text();
                    //THIS CALLS THE TIMESTAMP
                    var obj = JSON.parse(localStorage.getItem(movieName));;
                    $('.play-from').remove();
                    $('.overlay').css('opacity', '0');
                    $('.overlay').css('visibility', 'hidden');
                    //SET START TIME
                    video.currentTime = obj.CurrentPlace;
                    $('.player').css('visibility', 'visible');
                    $('.player').css('opacity', '1');
                    $('.player').css('display', 'inherit');
                    setTimeout(function () {
                        video.play();
                    }, 2000);
                });
                //close button
                $('#close').css('visibility', 'visible');
                $('#close').css('opacity', '1');
            })
            //On close save timestap and emtpy the video player
        $('#close').click(function () {
            console.log("clicked");
            var player = $('.video-player');
            var video = document.getElementById('videoPlayer');
            movieName = $(this).children('.movie-text').text();
            //START TIMESTAMP SAVING
            var timeStamp = player.get(0).currentTime;
            var obj = {
                CurrentPlace: timeStamp
            };
            console.log(obj);
            localStorage.setItem(movieName, JSON.stringify(obj));
            //END TIMESTAMP SAVING
            $('.player').css('visibility', 'hidden');
            $('.player').css('opacity', '0');
            $('.player').css('display', 'none');
            $('#close').css('visibility', 'hidden');
            $('#close').css('opacity', '0');
            video.pause();
            $('#videoPlayer > source').remove()
        })
    }, 7500);
});

var easterEgg = document.createElement('audio');
easterEgg.setAttribute('src', '/shhhh/thriller.mp3');

$(document).ready(function () {
    setTimeout(function () {
        $('#action').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="action"])').parent().hide();
        });
        $('#adventure').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="adventure"])').parent().hide();
        });
        $('#animation').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="animation"])').parent().hide();
        });
        $('#comedy').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="comedy"])').parent().hide();
        });
        $('#crime').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="crime"])').parent().hide();
        });
        $('#documentary').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="documentary"])').parent().hide();
        });
        $('#drama').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="drama"])').parent().hide();
        });
        $('#family').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="family"])').parent().hide();
        });
        $('#fantasy').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="fantasy"])').parent().hide();
        });
        $('#history').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="history"])').parent().hide();
        });
        $('#horror').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="horror"])').parent().hide();
        });
        $('#music').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="music"])').parent().hide();
        });
        $('#mystery').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="mystery"])').parent().hide();
        });
        $('#romance').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="romance"])').parent().hide();
        });
        $('#scifi').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="scifi"])').parent().hide();
        });
        $('#tvmovie').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="tvmovie"])').parent().hide();
        });
        $('#thriller').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="thriller"])').parent().hide();
            easterEgg.play();
        });
        $('#war').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="war"])').parent().hide();
        });
        $('#western').click(function () {
            $('#allContainer').children().show();
            $('.movie-container p:not([class*="western"])').parent().hide();
        });
        $('#clear').click(function () {
            $('#allContainer').children().show();
        });
    }, 7500);
});
//Video Player Stuff Start Here
$('.movie-container').on('hover', function () {
    console.log('worked')
    $(this).addClass('movie-desc-hover');
})
$('.movie-container').hover(function () {
    console.log('hovered')
    $('.movie-desc').addClass('movie-desc-hover');
}, function () {
    $('.movie-desc').removeClass('movie-desc-hover');
})
console.log('loaded');
setTimeout(function () {
    /* Get Our Elements */
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress-filled');
    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player-slider');
    /* Build out functions */
    function togglePlay() {
        const method = video.paused ? 'play' : 'pause';
        video[method]();
    }

    function updateButton() {
        const icon = this.paused ? '<img src="play.png" alt="Play">' : '<img src="pause.png" id="pause" alt="Pause">';
        //  console.log(icon);
        toggle.innerHTML = icon;
    }

    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
    /* Hook up the event listners */
    //video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);
    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
    var timeout = null;
    $(document).on('mousemove', function () {
        clearTimeout(timeout);
        $('.controls').addClass('move');
        $('#close').css('opacity', '1') 
        timeout = setTimeout(function () {
            console.log('Mouse idle');
            $('.controls').removeClass('move');
            $('#close').css('opacity', '0') 
        }, 3000);
    });
}, 5000)