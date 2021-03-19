var eventContainerEl = document.querySelector('#PLACEHOLDER');
var cardEl1 = document.querySelector('#card1');
var cardEl2 = document.querySelector('#card2');
var cardEl3 = document.querySelector('#card3');
var cardEl4 = document.querySelector('#card4');
var cardEl5 = document.querySelector('#card5');
//store all the card elements in an array so we can itereate over them later
var cardArray = [cardEl1, cardEl2, cardEl3, cardEl4, cardEl5];
var lat;
var lon;
var coordsCombined;


$(document).ready(function(){
  $('select').formSelect()
})

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, areError);
  } else {
      window.alert("Location information is not availiable");
      return;
  }
}

function showPosition(position) {
  lat = position.coords.latitude; 
  lon = position.coords.longitude
  console.log(lat + "," + lon)
  var searchUrl = getSearchUrl(lat + "," + lon); 
  makeEventFetch(searchUrl, position);
}

function areError(error){
  if(error){
    window.alert("An error has occrured");
    return;
  }
}

function getSearchUrl(coordParams){
  var currentSearch = 'https://app.ticketmaster.com/discovery/v2/events.json?&apikey=xXOSaYto3DEydI9ZpFXj78cQVnDGuiH3&latlon=' + coordParams;
  return currentSearch;
}

function makeEventFetch(searchUrlParam, position){
  fetch(searchUrlParam)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        initMap(position, data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to GitHub');
  });
}


function displayEvents(){
  //loop over the card array to target each card and changes its display to inline from none.
  for(i = 0; i<cardArray.length; i++){
    cardArray[i].style.display = inline;
  }


}

let map;

function initMap(position, data) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 12,
  });
  for(i=0; i<data.page.size; i++){}
}



function addMarker(map, event) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
  }
  


getLocation();

//moods/events

//Happy: converts