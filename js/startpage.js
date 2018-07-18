$(function(){
    $(".typed").typed({
        strings: [
          "Welcome to the Corporate<br>Institutional Bank of Time.",
          "Second sentence. <br> Longer than 300px pls.",
          "30 characters max."
        ],
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 2000,
        // loop
        loop: true,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "█",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
    });
});

$(function() {
    $('.marquee').marquee({
        duration: 5000,
        startVisible: true,
        duplicated: true
    });
});

google.load("feeds", "1");

function initialize() {
  // Main feed on the front page
  var p1Feed1 = new google.feeds.Feed("https://www.archlinux.org/feeds/news/", {
    api_key: "yfckojdqldak65hi03zdkx75kccxxn6spd5ratof",
    count: 5
  });

  var p2Feed1 = new google.feeds.Feed("https://news.ycombinator.com/rss", {
    api_key: "yfckojdqldak65hi03zdkx75kccxxn6spd5ratof",
    count: 5
  });
  var p2Feed2 = new google.feeds.Feed("http://rss.slashdot.org/Slashdot/slashdot", {
    api_key: "yfckojdqldak65hi03zdkx75kccxxn6spd5ratof",
    count: 5
  });

  var p3Feed1 = new google.feeds.Feed("http://feeds.bbci.co.uk/news/rss.xml", {
    api_key: "yfckojdqldak65hi03zdkx75kccxxn6spd5ratof",
    count: 10
  });

  p1Feed1.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("feed");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var link = document.createElement("a");

        link.appendChild(document.createTextNode(entry.title));
        link.href = entry.link;
        container.appendChild(link);
      }
    }
  });

  p2Feed1.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("p2-feed1");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var link = document.createElement("a");

        link.appendChild(document.createTextNode(entry.title));
        link.href = entry.link;
        container.appendChild(link);
      }
    }
  });

  p2Feed2.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("p2-feed2");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var link = document.createElement("a");

        link.appendChild(document.createTextNode(entry.title));
        link.href = entry.link;
        container.appendChild(link);
      }
    }
  });

  p3Feed1.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("p3-feed1");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var link = document.createElement("a");

        link.appendChild(document.createTextNode(entry.title));
        link.href = entry.link;
        container.appendChild(link);
      }
    }
  });
}
google.setOnLoadCallback(initialize);


$(document).ready(function() {
  $.simpleWeather({
    location: 'Toronto, ON',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<ul><li id="weather-temp"> '+weather.temp+'&deg;'+weather.units.temp+'</li>';
      html += '<li id="weather-location">'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      html += '<ul id="weather-forecast">';
      for(var i=0;i<5;i++) {
        html += '<li>'+weather.forecast[i].day+': '+weather.forecast[i].high+' '+weather.forecast[i].text+',</li>';
      }
      html += '</ul>';
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});

function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    var v = hours + ":" + minutes + ":" + seconds + " ";
    setTimeout("updateTime()",1000);
    document.getElementById('time').innerHTML=v;
}
updateTime();