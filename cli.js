#!/usr/bin/env node
const INDEX_FILE = 'index.js';
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


const indexModule = require('./' + INDEX_FILE);
let buildPath = require.resolve('./' + INDEX_FILE);
buildPath = buildPath.substring(0, buildPath.length - INDEX_FILE.length);
console.debug("buildPath = ", buildPath);

indexModule.startExpress(buildPath, process.cwd(), argv.iconpath, argv.port);