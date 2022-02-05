#!/usr/bin/env node
const INDEX_FILE = 'index.js';
const PACKAGE_JSON_FILE = 'package.json';

const indexModule = require('./src/express/' + INDEX_FILE);

let modulePath = require.resolve('./' + PACKAGE_JSON_FILE);
modulePath = modulePath.substring(0, modulePath.length - PACKAGE_JSON_FILE.length);
console.debug("modulePath = ", modulePath);

const yargs = require('yargs')
  .usage(`
Usage: npx iconic [-v] [-p port] [-h]
`)
  .options({
    verbose: {
    default: false,
      type: 'boolean',
      alias: 'v',
    },
    port: {
      default: 5000,
      type: 'number',
      alias: 'p',
    },
    iconpath: {
      alias: 'i',
      demandOption: true
    },
  })
  .describe({
    verbose: 'Debug Mode',
    port: 'Port',
    iconpath: 'Icon Path (e.g. src/icons/)',
  })
  .help()
  .alias('h', 'help');

const argv = yargs.argv;

if (argv.debug) {
  console.debugging = true;
}

function initializeLogging() {
  console.debug = function() {
    if(!console.debugging) return;
    console.log.apply(this, arguments);
  };
}

initializeLogging();

const config = {
  modulePath: modulePath,
  iconRelativePath: argv.iconpath,
  currentWorkingDir: process.cwd(),
  port: argv.port,
  debug: argv.debug
};

indexModule.startExpress(config);