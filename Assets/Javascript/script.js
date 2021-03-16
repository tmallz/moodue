var eventContainerEl = document.querySelector('#PLACEHOLDER');
var cardEl1 = document.querySelector('#card1');
var cardEl2 = document.querySelector('#card2');
var cardEl3 = document.querySelector('#card3');
var cardEl4 = document.querySelector('#card4');
var cardEl5 = document.querySelector('#card5');
//store all the card elements in an array so we can itereate over them later
var cardArray = [cardEl1, cardEl2, cardEl3, cardEl4, cardEl5];


$(document).ready(function(){
  $('select').formSelect()
})

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
  });
}

fetch('https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/topics?query=tech&only=id,name')
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      displayEvents();

      console.log(data);
    });
  } else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to GitHub');
});

function displayEvents(){
  //loop over the card array to target each card and changes its display to inline from none.
  for(i = 0; i<cardArray.length, i++){
    cardArray[i].style.display = inline;
  }


}