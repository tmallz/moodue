let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
  });
}

// fetch('https://api.meetup.com/find/topics?query=tech&only=id,name')
// .then(function (response) {
//   if (response.ok) {
//     console.log(response);
//     response.json().then(function (data) {
//       console.log(data);
//       displayRepos(data, user);
//     });
//   } else {
//     alert('Error: ' + response.statusText);
//   }
// })
// .catch(function (error) {
//   alert('Unable to connect to GitHub');
// });