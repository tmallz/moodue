var eventContainerEl = document.querySelector('#mood-selector');
var cardEl1 = document.querySelector('#card1');
var cardEl2 = document.querySelector('#card2');
var cardEl3 = document.querySelector('#card3');
var cardEl4 = document.querySelector('#card4');
var cTitleEl1 = document.querySelector('#cardTitle1');
var cTitleEl2 = document.querySelector('#cardTitle2');
var cTitleEl3 = document.querySelector('#cardTitle3');
var cTitleEl4 = document.querySelector('#cardTitle4');
var cTextEl1 = document.querySelector('#cText1');
var cTextEl2 = document.querySelector('#cText2');
var cTextEl3 = document.querySelector('#cText3');
var cTextEl4 = document.querySelector('#cText4');
var livleyButtonEl = document.querySelector('#livelyButton');
var mellowButtonEl = document.querySelector('#mellowButton');
//store all the card elements in an array so we can itereate over them later
var cardArray = [cardEl1, cardEl2, cardEl3, cardEl4];
var cardTitleArray = [cTitleEl1, cTitleEl2, cTitleEl3, cTitleEl4];
var cardParArray = [cTextEl1, cTextEl2, cTextEl3, cTextEl4];
var lat;
var lon;
var coordsCombined;
var globalData;
var livelyArray = [];
var mellowArray = [];


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
  //var currentSearch = 'https://app.ticketmaster.com/discovery/v2/events.json?&apikey=xXOSaYto3DEydI9ZpFXj78cQVnDGuiH3&latlon=' + coordParams;
  //var currentSearch = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&latlong='+ coordParams;
  var currentSearch = 'https://my.api.mockaroo.com/moodue_dummy_data.json?key=a6b46f00'
  return currentSearch;
}

function displayEvents(moodParam){
  if (moodParam === "lively"){
    for(i=0; i<cardTitleArray.length; i++){
      cardTitleArray[i].textContent = livelyArray[i].title;
      cardParArray[i].textContent = livelyArray[i].genre;
    } 
  }else{
    cardTitleArray[i].textContent = mellowArray[i].title;
    cardParArray[i].textContent = mellowArray[i].genre;
  }

}

function moodFinder(){
  var mood;
  if(livleyButtonEl.checked){
    mood = "lively";
  }else if (mellowButtonEl.checked){
    mood = "mellow";
  }
  return mood;
}

function setEventArrays(dataParam){
  for(i = 0; i<dataParam.length; i++){
    if(dataParam[i].Movie.genre === "Action" || "Adventure" || "Crime" || "Horror" || "Crime" || "War" || "Thiller"){
      livelyArray[i] = dataParam[i].Movie;
    }else{
      mellowArray[i] = dataParam[i].Movie;
    }
  }
}

function makeEventFetch(searchUrlParam){
  fetch(searchUrlParam)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        setEventArrays(data);
        displayEvents(data,livelyArray, mellowArray);
        initMap(data);
        //return data;
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to TicketMaster');
  });
}


function displayCards(){
  //loop over the card array to target each card and changes its display to inline from none.
  for(i = 0; i<cardArray.length; i++){
    cardArray[i].style.display = 'inline';
  }
}

//let map;

function initMap(dataParam) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 12,
  });
  for(i=0; i<dataParam.length; i++){
    addMarker(map, dataParam[i].event);
  }
}

function addMarker(map, data) {
  var latlon = data.event.lat + ',' + data.event.lon;
  var marker = new google.maps.Marker({
    position: latlon, //new google.maps.LatLng(event.event.lat, event.event.lon),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
}
  
var handleButtonClick = function(event){
  event.preventDefault();
  var mood = moodFinder(event);
  displayEvents(mood);
  displayCards();
  loadMap();
}

getLocation();

eventContainerEl.addEventListener('click', handleButtonClick);
//moods/events