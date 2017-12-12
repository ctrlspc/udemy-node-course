
const request = require('request');
const axios = require('axios');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Google Servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OVER_QUERY_LIMIT') {
      callback("Sorry you've hit your daily API limit");
    } else if (body.status === 'OK') {
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }

  });
}

var geocodeAddressPromise= (address) => {
  var encodedAddress = encodeURIComponent(address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
  return axios.get(geocodeUrl);
}

module.exports = {
  geocodeAddress,
  geocodeAddressPromise
}
