var coordinates = post.coordinates;
    
mapboxgl.accessToken = 'pk.eyJ1Ijoia21lcnkiLCJhIjoiY2tsYTVoZzBpMGQyeTJucDI4ajl4eXd4byJ9.Oa9HXfXX1DJl9lcUg6j9CQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coordinates,
    zoom: 8
});
    
var marker = new mapboxgl.Marker({
    // color: "#FFFFFF",
    draggable: true
    })
    .setLngLat(coordinates)
    .addTo(map);    

map.on('click', (e) => {
    var addPopup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>')
        .addTo(map);
});  