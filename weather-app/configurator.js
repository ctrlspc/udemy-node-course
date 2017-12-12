const fs = require('fs');

var getConfig = () => {

  try {
    return notes = JSON.parse(fs.readFileSync('config.json'));
  } catch (e) {
    return {};
  }
}

var saveConfig = (configObject) => {
  fs.writeFileSync('config.json', JSON.stringify(configObject));
}

module.exports = {
  getConfig,
  saveConfig
};
