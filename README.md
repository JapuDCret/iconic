[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![macOS](https://svgshare.com/i/ZjP.svg)](https://svgshare.com/i/ZjP.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)
[![Npm package version](https://badgen.net/npm/v/japudcret/iconic)](https://npmjs.com/package/japudcret/iconic)
[![Minimum node.js version](https://badgen.net/npm/node/japudcret/iconic)](https://npmjs.com/package/japudcret/iconic)

# Iconic - Simplify your Icon usage during development!

This package provides a web ui for visualizing your icons and making them easier to find.

Basic usage `npx iconic --iconpath src/icons/`

## CLI

```bash
$ npx iconic -h

Usage: npx iconic [-v] [-p port] [-h]


Options:
      --version   Show version number                                  [boolean]
  -v, --verbose   Debug Mode                          [boolean] [default: false]
  -p, --port      Port                                  [number] [default: 5000]
  -i, --iconpath  Icon Path (e.g. src/icons/)                         [required]
  -h, --help      Show help                                            [boolean]
```


## Development

### Local testing

#### Start the express dev server

Start a local server that will mimic the environment created by `npx`
```bash
npm run start-express
```

This server uses only static source files found under `build/` and assumes you have icons under `test/`.

### React dev server

TODO: Currently not working, as an Express server is expected
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
npm install -g japudcret-iconic-0.1.0.tgz
```

Afterwards you can use `npx iconic` to test your latest version.