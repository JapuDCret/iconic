const path = require('path');
const { promises: fs } = require('fs');
const express = require('express');
const cors = require('cors');

var packageJson = require('../package.json');

const { hashCyrb53 } = require('./util.js');

const PUBLIC_DIR = 'build/';

async function writeConfig(config) {
  try {
    await fs.writeFile(path.join(config.buildPath, '/config.json'), JSON.stringify(config), 'utf8');
    console.log('writeConfig(): JSON file has been saved.');
  } catch(err) {
    console.error('writeConfig(): An error occured while writing JSON Object to File.');
    return console.log(err);
  }
}

async function findIcons(config, currentPath = config.iconPath, depth = 0) {
  let icons = [];

  try {
    const fileNames = await fs.readdir(currentPath);

    for(const fileName of fileNames) {
      const filePath = path.join(currentPath, fileName);

      const fileInfo = await fs.lstat(filePath);

      if(fileInfo.isDirectory()) {
        icons = icons.concat(await findIcons(config, filePath, depth+1));
      } else if(fileName.match(config.iconFileRegEx) != null) {
        console.log('findIcons(): config.iconPath: ', config.iconPath);
        console.log('findIcons(): currentPath: ', currentPath);
        const relativeDir = currentPath.replaceAll(path.sep, '/').substring(config.iconPath.length) + '/';
        console.log('findIcons(): relativeDir: ', relativeDir);
        const relativeFilePath = relativeDir + fileName
        icons.push({
          name: fileName,
          filePath: relativeFilePath,
          directory: relativeDir,
          alias: null,
          depth: depth,
          hash: hashCyrb53(relativeFilePath),
        });
      }
    }
  } catch(err) {
    console.error('findIcons(): Could not get icons, err = ', err);
  }

  return icons;
}

async function getIcons(config) {
  const icons = await findIcons(config);

  console.debug('getIcons(): icons = ', icons);

  return icons;
}

async function startExpress(cliConfig) {
  console.log('startExpress(): Starting Express.js server for "' + packageJson.name + '" on version ' + packageJson.version);
  console.log('startExpress(): cliConfig: ', cliConfig);

  const buildPath = path.join(cliConfig.modulePath, PUBLIC_DIR)
  const iconPath = path.join(cliConfig.currentWorkingDir, cliConfig.iconRelativePath + '/');
  const config = {
    ...cliConfig,
    buildPath,
    iconPath,
  };

  await writeConfig(config);

  const app = express(); // create express app

  app.use(cors());
  app.options('*', cors());

  // add middleware
  console.log('startExpress(): Listening on: ' + buildPath);
  app.use(express.static(buildPath));
  app.use('/icons/files', express.static(iconPath));

  app.get('/icons', async (req, res) => {
    return res.send(await getIcons(config));
  });

  // start express server on specific port
  app.listen(config.port, () => {
    console.log('startExpress(): Server started on port ' + config.port);
  });
}

exports.startExpress = startExpress;