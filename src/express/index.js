const path = require('path');
const { promises: fs } = require("fs");
const express = require('express');
const cors = require('cors');

var packageJson = require('../../package.json');

const PUBLIC_DIR = 'build/';

let config;

async function writeConfig(newConfig) {
  config = newConfig;

  try {
    await fs.writeFile(path.join(newConfig.buildPath, '/config.json'), JSON.stringify(newConfig), 'utf8');
    console.log('JSON file has been saved.');
  } catch(err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
}

async function getIcons() {

  let icons;
  try {
    iconsNames = await fs.readdir(config.iconPath);

    icons = iconsNames.map(e => {
      return {
        name: e,
        filePath: path.join(config.iconPath, e),
        alias: null
      }
    });
  } catch(err) {
    console.log('getIcons(): Could not get icons, err = ', err);
  }
  console.debug('getIcons(): icons = ', icons);

  return icons;
}

async function startExpress(config) {
  console.log('Starting Express.js server for "' + packageJson.name + '" on version ' + packageJson.version);
  console.log('Current working directory: ' + config.currentWorkingDir);

  const buildPath = path.join(config.modulePath, PUBLIC_DIR)
  config.buildPath = buildPath;
  const iconPath = path.join(config.currentWorkingDir, config.iconRelativePath);
  config.iconPath = iconPath;

  await writeConfig(config);

  const app = express(); // create express app

  app.use(cors());
  app.options('*', cors());

  // add middleware
  console.log('Listening on: ' + buildPath);
  app.use(express.static(buildPath));
  app.use('/icons/files', express.static(iconPath));

  app.get('/icons', async (req, res) => {
    return res.send(await getIcons());
  });

  // start express server on specific port
  app.listen(config.port, () => {
    console.log('server started on port ' + config.port);
  });
}

if (require.main === module) {
  console.debug('called directly');
  startExpress({
    modulePath: '.',
    iconRelativePath: 'test',
    currentWorkingDir: process.cwd(),
    port: 5000,
    debug: true
  });
} else {
  console.debug('required as a module');
}

exports.startExpress = startExpress;