var pageCounter = 1;
var StationID = 24;
var departureDisplay = 15;
var Container = document.getElementById("info");
var btn = document.getElementById("btn");


btn.addEventListener("click", function() {
  
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://insa-ms.netzmap.com/stations/' + StationID + '.json');
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
//  document.getElementById('btn').innerText = 'mehr anzeigen';
  pageCounter--;
  if (pageCounter <= 0) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";
    
    htmlString += "<h2>Haltestelle: " + data.name + "<br>Zeit: " + data.departures.time_now + "</h2>";
  if (data.departures.journeys.length < departureDisplay) {
	  departureDisplay = data.departures.journeys.length;
	  }
  for (i = (data.departures.journeys.length -1 ) ; i >= (data.departures.journeys.length - departureDisplay); i--) {
	  console.log("data.departures.journeys.length " + data.departures.journeys.length);
	htmlString += "<p>" + data.departures.journeys[i].prognosis_text + " nach " + data.departures.journeys[i].route.terminus.name + " Linie " + data.departures.journeys[i].route.name + " Gleis: " + data.departures.journeys[i].platform;
    htmlString += '.</p>';
}
  
  Container.innerHTML = htmlString;
  
  
  setTimeout(function(){
   window.location.reload(1);
}, 30000);
}


