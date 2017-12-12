const request = require('request');

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

module.exports.getWeather = getWeather;
