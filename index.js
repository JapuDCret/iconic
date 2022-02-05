const PUBLIC_DIR = 'build/';

async function writeConfig(buildPath, config) {
  const { promises: fs } = require("fs");

  try {
    await fs.writeFile(buildPath + '/config.json', JSON.stringify(config), 'utf8');
    console.log('JSON file has been saved.');
  } catch(err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
}

async function getIcons(iconPath) {
  const { promises: fs } = require("fs");

  let names;
  try {
    names = await fs.readdir(iconPath);
  } catch(err) {
    console.log('Could not get icons');
    return console.log(err);
  }
  console.debug('getIcons(): names = ', names);
}

async function startExpress(modulePath, currentWorkingDir, iconRelativePath, port = 5000) {
  console.log('Starting Express.js server for "@JapuDCret/iconic"');
  console.log('Current working directory: ' + currentWorkingDir);
  
  const buildPath = modulePath + '/' + PUBLIC_DIR;
  
  const iconPath = currentWorkingDir + '/' + iconRelativePath;
  
  const config = {
    modulePath: modulePath,
    buildPath: buildPath,
    currentWorkingDir: currentWorkingDir,
    port: port,
  };
  await writeConfig(buildPath, config);

  getIcons(iconPath);
  
  const path = require('path');
  const express = require('express');
  const app = express(); // create express app

  // add middleware
  console.log('Listening on: ' + buildPath);
  app.use(express.static(buildPath));
  app.use('/icons', express.static(iconPath));

  // start express server on specific port
  app.listen(port, () => {
    console.log('server started on port ' + port);
  });
}

if (require.main === module) {
  console.debug('called directly');
  startExpress('.', process.cwd(), 'test');
} else {
  console.debug('required as a module');
}

exports.startExpress = startExpress;