[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![Npm package version](https://badgen.net/npm/v/@japudcret/iconic)](https://npmjs.com/package/@japudcret/iconic)
[![Minimum node.js version](https://badgen.net/npm/node/@japudcret/iconic)](https://npmjs.com/package/@japudcret/iconic)

# Iconic - Simplify your Icon usage during development!

This package provides a web ui for visualizing your icons and making them easier to find.

Basic usage `npx @japudcret/iconic  --icon-path src/icons/`

## CLI

```bash
$ npx japudcret-iconic -h

Usage: npx japudcret-iconic --icon-path <path-to-icons> [-v] [-p port] [-r regex] [-h]


Options:
      --version    Show version number                                 [boolean]
  -v, --verbose    Debug Mode                         [boolean] [default: false]
  -p, --port       Port                                 [number] [default: 5000]
  -i, --icon-path  Icon Path (e.g. src/icons/)                        [required]
  -r, --regex      Regular Expression to find the icon files
                  [default: "([^.]+).(apng|avif|gif|jpg|jpeg|ico|svg|png|webp)"]
  -h, --help       Show help                                           [boolean]
```

## Development

### Local testing

You can locally test the functionality by starting the backend and the frontend separately.

#### Start the backend (express dev server)

Start a local server that will mimic the environment created by `npx`
```bash
npm run start-express
```

This server uses only static source files found under `build/` and assumes you have icons under `test/`.

### Start the frontend (React dev server)

```bash
npm run start-react
```

### Test the package

Compile with
```bash
npm run build
```

Create a package
```bash
npm pack
```

Publish the package to your local (global) repository
```bash
npm install -g japudcret-iconic-0.2.0.tgz
```

Afterwards you can use `npx iconic` to test your latest version.