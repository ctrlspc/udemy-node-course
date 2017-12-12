const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(applicationConfig.address);

if (argv.apiKey) {
  applicationConfig.apiKey = argv.apiKey
} else if (!applicationConfig.apiKey){
  console.log("No api key was supplied, and there isn't one stored");
  return;
}

if(argv.save) {
  configurator.saveConfig(applicationConfig)
}


var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error ('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng
  var weatherUrl = `https://api.darksky.net/forecast/${applicationConfig.apiKey}/${lat},${lng}`

  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl);

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
