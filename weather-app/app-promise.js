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

var getWeatherFromAddress = async (address, apiKey) => {
  console.log("In getWeatherFromAddress");
  try {
    var geocodeResult = await geocode.geocodeAddressPromise(address);

    if (geocodeResult.data.status === 'ZERO_RESULTS'){
      throw new Error ('Unable to find that address');
    }

    console.log(geocodeResult.data.results[0].formatted_address);
    var lat = geocodeResult.data.results[0].geometry.location.lat;
    var lng = geocodeResult.data.results[0].geometry.location.lng;

    var weatherResponse = await weather.getWeatherPromise(apiKey, lat, lng);

    var temperature = weatherResponse.data.currently.temperature;
    var apparentTemperature = weatherResponse.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like: ${apparentTemperature}.`);

  } catch (e) {
    console.log('There was an Error:', e);
  }
}

getWeatherFromAddress(applicationConfig.address,applicationConfig.apiKey);
