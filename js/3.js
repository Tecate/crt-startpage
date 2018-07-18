$(function() {
  // get bulletin listing for today
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth()+1;
  if (month < 10) { month = "0" + month.toString(); }
  var day = d.getDate()
  var dateString = year.toString() + month.toString() + day.toString();
  var url = "https://cors.io/?http://dd.weather.gc.ca/bulletins/alphanumeric/" + dateString + "/FP/CWTO/";

  var bulletins;

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange=function(){
    if (xmlHttp.readyState==4 && xmlHttp.status==200) {
      var r = xmlHttp.responseText;
      // cut out useless lines
      r = r.slice(r.indexOf("<img src=\"/icons/folder.gif\""), r.indexOf("<hr></pre>"));
      bulletins = r.split("\n");
      bulletins.splice(-1,1);
      // isolate the number we're looking for (the hour of the reception of the bulletin)
      for (i=0;i<bulletins.length;i++) {
        bulletins[i] = bulletins[i].slice(51, 53);
      }
      url = url + bulletins[bulletins.length-1];
      
      checkBulletins(url);
    }
  }
  xmlHttp.open("GET", url, false);
  xmlHttp.send();

  function checkBulletins(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange=function(){
      if (xmlHttp.readyState==4 && xmlHttp.status==200) {
        var r = xmlHttp.responseText;
        // cut out useless lines
        r = r.slice(r.indexOf("<img src=\"/icons/text.gif\""), r.indexOf("<hr></pre>"));
        var rArray = r.split("\n");
        rArray.splice(-1,1);
        // isolate the number we're looking for (the hour of the reception of the bulletin)
        for (i=0;i<rArray.length;i++) {
          rArray[i] = rArray[i].slice(49, rArray[i].length);
          rArray[i] = rArray[i].slice(0, rArray[i].indexOf("\">"));
          if(rArray[i].substring(0, 6) == "FPCN11") {
            url = url + "/" + rArray[i];
            console.log(url);
            return true;
          }
        }
        return false;
        // console.log(r);
      }
    }
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
  }

/*
  var url = "https://cors.io/?http://dd.weather.gc.ca/bulletins/alphanumeric/20180717/FP/CWTO/02/FPCN11_CWTO_170209_AAD__16368";
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange=function(){
    if (xmlHttp.readyState==4 && xmlHttp.status==200) {
      var headerString = xmlHttp.responseText.slice(0, xmlHttp.responseText.indexOf("\n\n"));
      var startForecast = xmlHttp.responseText.indexOf("CITY OF TORONTO");
      var forecastString = xmlHttp.responseText.slice(startForecast, xmlHttp.responseText.indexOf("\n\n", startForecast));
      var fullForecast = headerString + "\n\n" + forecastString + "\n\nEND";
      initTyped(fullForecast);
    }
  }
  xmlHttp.open("GET", url, false);
  xmlHttp.send();
  xmlHttp.responseText;

function initTyped(forecast) {
  $(".typed-forecast").typed({
    strings: [ forecast ],
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
    loop: false,
    // false = infinite
    loopCount: false,
    // show cursor
    showCursor: true,
    // character for cursor
    cursorChar: "█",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: 'text',
  });
}
*/
});
