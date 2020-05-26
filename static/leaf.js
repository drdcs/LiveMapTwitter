var mymap = L.map('mapid').setView([51.512, -0.104], 1);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlwdGlyYW5qYW5lbGUiLCJhIjoiY2thbmQ1cWpqMHhxODJ4azhnYTV5Nm95eiJ9.EJ_zQIwB6l2cok-kTTgkvA'
}).addTo(mymap);

var source = new EventSource('/topic/pykafka');
source.addEventListener('message', function (e) {
        obj = JSON.parse(e.data);
        console.log(obj);
        lat = obj.place.bounding_box.coordinates[0][0][1];
        long = obj.place.bounding_box.coordinates[0][0][0];
        username=obj.user.name;
        tweet=obj.text;

        marker = L.marker([lat, long],).addTo(mymap).bindPopup('Username: <strong>' + username + '</strong><br> Tweet:<strong>' + tweet + '</strong>' );

    },false)
