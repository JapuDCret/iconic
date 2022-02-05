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

### React dev server

TODO: Currently not working, as an Express server is expected

### Local express dev server

Start a local server that will mimic the environment created by `npx`
```bash
npm run start-express
```

This server uses only static source files found under `build/` and assumes you have icons under `test/`.

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
npm install -g JapuDCret-iconic-0.1.0.tgz
```

Afterwards you can use `npx iconic` to test your latest version.