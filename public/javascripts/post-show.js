// var coordinates = post.coordinates;
//create a map with mapbox 
mapboxgl.accessToken = 'pk.eyJ1Ijoia21lcnkiLCJhIjoiY2tsYTVoZzBpMGQyeTJucDI4ajl4eXd4byJ9.Oa9HXfXX1DJl9lcUg6j9CQ';
// console.log(post);
// console.log(mapBoxToken);
// mapboxgl.accessToken = mapBoxToken;
var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v11',
    style: 'mapbox://styles/mapbox/light-v9',
    center: post.geometry.coordinates,
    zoom: 8
});
//create a marker for the map    
var marker = new mapboxgl.Marker({
    // color: "#FFFFFF",
    draggable: true
    })
    .setLngLat(post.geometry.coordinates)
    .addTo(map);    
//create a popup for the marker in the map
map.on('click', function(e) {
    var addPopup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(post.geometry.coordinates)
        .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>')
        .addTo(map);
});  
//Toggle edit review form
$('.toggle-edit-form').on('click', function() {
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    $(this).siblings('.edit-review-form').toggle();
});

//Add click listener to clear rating from edit form
$('.clear-rating').click(function() {
    $(this).siblings('.input-no-rate').click();
});