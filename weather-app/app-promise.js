const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const configurator = require('./configurator');

const argv = yargs.
  options({
    a: {
      demand:false,
      alias:'address',
      describe: 'Address to fetch weather for',
      string: true
    },
    s: {
      demand:false,
      alias:'save',
      describe: 'Saves current parameters for next time',
      default:false
    },
    k: {
      demand:false,
      alias:'apiKey',
      describe: 'You API key for darksky.net',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var applicationConfig = configurator.getConfig();


if (argv.address) {
  applicationConfig.address = argv.address;
} else if (!applicationConfig.address) {
  console.log("No address was supplied, and there was no address stored");
  return;
}


if (argv.apiKey) {
  applicationConfig.apiKey = argv.apiKey
} else if (!applicationConfig.apiKey){
  console.log("No api key was supplied, and there isn't one stored");
  return;
}

if(argv.save) {
  configurator.saveConfig(applicationConfig)
}


geocode.geocodeAddressPromise(applicationConfig.address).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error ('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng

  return weather.getWeatherPromise(applicationConfig.apiKey, lat, lng);

}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log(`It's currently ${temperature}. It feels like: ${apparentTemperature}.`);
}).catch((e)=>{

  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API server');
  } else {
    console.log('Error: ', e.message);
  }


});
