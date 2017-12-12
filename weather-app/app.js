const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const darkSkyAPIKey = 'e2ae9c43988fec7a7a1d5ca1fd69a933';

const argv = yargs.
  options({
    a: {
      demand:true,
      alias:'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(geocodeResults.address);
    weather.getWeather(darkSkyAPIKey ,geocodeResults.latitude,geocodeResults.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature} degF. It feels like ${weatherResults.apparentTemperature} degF`);
      }
    });
  }
});
