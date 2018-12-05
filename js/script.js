// YOUTUBE API
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'ygVX1z6tDGI',
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
      'startSeconds': 890,
      'endSeconds': 999,
      'suggestedQuality': 'large'
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

//----------------------------------------



//console.log('I have made it here 4');

// START OF THE document READY FUNCTION

map_box = config.map_box //key
mapboxgl.accessToken = map_box;
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  zoom: 0
});

//var data;
map.on('load', function () {
  // We use D3 to fetch the JSON here so that we can parse and use it separately
  // from GL JS's use in the added source. You can use any request method (library
  // or otherwise) that you want.
  d3.json('js/hike.geojson', function (err, data) {
    if (err) throw err;
    //var data = data;
    console.log(data.features[0]);

    // save full coordinate list for later
    var coordinates = data.features[0].geometry.coordinates;

    // start by showing just the first coordinate
    data.features[0].geometry.coordinates = [coordinates[0]];

    // add it to the map
    map.addSource('trace', { type: 'geojson', data: data });
    map.addLayer({
      "id": "trace",
      "type": "line",
      "source": "trace",
      "paint": {
        "line-color": "red",
        "line-opacity": 0.75,
        "line-width": 6
      }
    });

    // setup the viewport
    map.jumpTo({ 'center': coordinates[0], 'zoom': 3 });
    map.setPitch(1);

    // on a regular basis, add more coordinates from the saved list and update the map
    var i = 0;
    var timer = window.setInterval(function () {
      if (i < coordinates.length) {
        data.features[0].geometry.coordinates.push(coordinates[i]);
        map.getSource('trace').setData(data);
        map.panTo(coordinates[i]);
        i++;
      } else {
        window.clearInterval(timer);
      }
    }, 200);
  });
});

//--------------------------- NEWS API
$(function () {
  console.log("ready!");


  var myKey = config.news_key;
  //console.log(config.news_key);
  var url = 'https://newsapi.org/v2/everything?q=caravan+immigration&from=2018-11-14&sortBy=publishedAt&apiKey=' + myKey;
  var url2 = 'https://newsapi.org/v2/everything?q=trump+immigration&from=2018-11-14&sortBy=publishedAt&apiKey=' + myKey;
  var urlArray = [url, url2];
  var data = [];
  var html = '';
  var articles = [];
  var i = '';

  $("#draggable" ).draggable();
  $("#droppable" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Thank you! You have reunited a family!" );
    }
  });

  for (i = 0; i < urlArray.length; i++) {

    $.ajax({
      type: 'GET',
      url: urlArray[i],
      dataType: 'json',
      async: true,
      data: data,
      success: function (data) {
       // console.log(data.articles);
        articles = data.articles;

        articles.forEach(function (article) {
          //console.log(article.title);
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







});
