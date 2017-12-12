const request = require('request');
const axios = require('axios');

var getWeather = (apiCode, longitude, latitude, callback) => {

  request({
    url:`https://api.darksky.net/forecast/${apiCode}/${longitude},${latitude}`,
    json:true
  }, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    } ;

  });
}

var getWeatherPromise = (apiKey, lat,lng) => {
  var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`
  return axios.get(weatherUrl);
}

module.exports ={
  getWeather,
  getWeatherPromise
};
