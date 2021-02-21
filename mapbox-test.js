require('dotenv').config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

let location1 = 'Argentina, Cordoba';

async function geocoder(location) {
    try {
        let response = await geocodingClient
            .forwardGeocode({
                query: location,
                limit: 1
            })
            .send();
        // console.log(response.body.features[0].geometry.coordinates);
        console.log(response.body.features[0]);
    } catch (error) {
        console.error(error.message);
    }
};

geocoder(location1);
