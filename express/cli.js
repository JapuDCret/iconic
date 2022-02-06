#!/usr/bin/env node
const INDEX_FILE = 'index.js';
const PACKAGE_JSON_FILE = 'package.json';

const indexModule = require('./' + INDEX_FILE);

let modulePath = require.resolve('../' + PACKAGE_JSON_FILE);
modulePath = modulePath.substring(0, modulePath.length - PACKAGE_JSON_FILE.length);
console.debug("modulePath = ", modulePath);

const yargs = require('yargs')
  .usage(`
Usage: npx japudcret-iconic --icon-path <path-to-icons> [-v] [-p port] [-r regex] [-h]
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
    'icon-path': {
      alias: 'i',
      demandOption: true,
    },
    regex: {
      alias: 'r',
      default: '([^\.]+)\.(apng|avif|gif|jpg|jpeg|ico|svg|png|webp)',
    },
  })
  .describe({
    verbose: 'Debug Mode',
    port: 'Port',
    'icon-path': 'Icon Path (e.g. src/icons/)',
    regex: 'Regular Expression to find the icon files',
  })
  .help()
  .alias('h', 'help');

const argv = yargs.argv;

function initializeLogging() {
  console.debug = function(message, ...optionalParams) {
    if(!argv.verbose) return;
    console.log.apply(this, [message, optionalParams]);
  };
}

initializeLogging();

const config = {
  modulePath: modulePath,
  iconRelativePath: argv['icon-path'],
  currentWorkingDir: process.cwd(),
  port: argv.port,
  debug: argv.verbose,
  iconFileRegEx: argv.regex
};

indexModule.startExpress(config);