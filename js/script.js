// YOUTUBE API

// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: 'ygVX1z6tDGI',
//     events: {
//       'onReady': onPlayerReady,
//     }
//   });

//   player.loadVideoById({'videoId': 'bHQqvYy5KYo',
//                'startSeconds': 890,
//                'endSeconds': 999,
//                'suggestedQuality': 'large'});
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   player.setPlaybackRate(1);
//   event.target.playVideo();
// }

// console.log('I have made it here 4');

  // START OF THE document READY FUNCTION

$(function () {
  console.log("ready!");


var myKey = config.MY_KEY;
var url = 'https://newsapi.org/v2/everything?q=mountain+biking&from=2018-11-14&sortBy=publishedAt&apiKey=' + myKey;
var url2 = 'https://newsapi.org/v2/everything?q=smurfs&from=2018-11-14&sortBy=publishedAt&apiKey=' + myKey;
var urlArray = [url, url2];
var data = [];
var html = '';
var articles = [];
var i = '';

for (i = 0; i < urlArray.length; i ++){

        $.ajax({
          type:'GET',
          url: urlArray[i],
          dataType:'json',
          async:true,
          data: data,
          success:function(data){
            console.log(data.articles);
            articles = data.articles;

            articles.forEach(function(article){
              console.log(article.title);
              html += '<div class="latest-news flex">';
                html += '<img class="thumbnail" src="' + article.urlToImage + '">';
                html += '<div class="text">';
                html += '<a href="' + article.url + '" target="_blank">';
                html += '<h2 class="headline">' + article.title + '</h2>';
                html += '<h4 class="byline">by ' + article.author + ', <em>' + article.source.name + '</em></h4>';
                html += '</a></div>';
              html += '</div>';
            });
              $('#results').html(html);
            }
          });
}

  $(window).scroll(function () {
    parallax();
  })

  function parallax() {

    var wScroll = $(window).scrollTop()


    $('.parallax--bg').css('background-position', 'center ' + (wScroll * 0.75) + 'px');


    $('.parallax--box').css('top', -5 + (wScroll * .005) + 'em')

  }


  // mapboxgl.accessToken = 'pk.eyJ1IjoiY3N2MTciLCJhIjoiY2pwMDhvMnduMDUzajNrcnp2cGhvN2EwaiJ9.OIhZD-GOKgPn0qEI9wCz0A';
  // var map = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/satellite-v9',
  //   zoom: 0
  // });

  // map.on('load', function () {
  //   // We use D3 to fetch the JSON here so that we can parse and use it separately
  //   // from GL JS's use in the added source. You can use any request method (library
  //   // or otherwise) that you want.
  //   d3.json('https://www.mapbox.com/mapbox-gl-js/assets/hike.geojson', function (err, data) {
  //     if (err) throw err;

  //     // save full coordinate list for later
  //     var coordinates = data.features[0].geometry.coordinates;

  //     // start by showing just the first coordinate
  //     data.features[0].geometry.coordinates = [coordinates[0]];

  //     // add it to the map
  //     map.addSource('trace', { type: 'geojson', data: data });
  //     map.addLayer({
  //       "id": "trace",
  //       "type": "line",
  //       "source": "trace",
  //       "paint": {
  //         "line-color": "yellow",
  //         "line-opacity": 0.75,
  //         "line-width": 5
  //       }
  //     });

  //     // setup the viewport
  //     map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
  //     map.setPitch(30);

  //     // on a regular basis, add more coordinates from the saved list and update the map
  //     var i = 0;
  //     var timer = window.setInterval(function () {
  //       if (i < coordinates.length) {
  //         data.features[0].geometry.coordinates.push(coordinates[i]);
  //         map.getSource('trace').setData(data);
  //         map.panTo(coordinates[i]);
  //         i++;
  //       } else {
  //         window.clearInterval(timer);
  //       }
  //     }, 10);
  //   });
  // });





});
