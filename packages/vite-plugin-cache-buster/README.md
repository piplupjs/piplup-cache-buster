# @piplup/vite-plugin-cache-buster

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/vite-plugin-cache-buster)

A Vite plugin to automatically run cache busting during the build process using
`@piplup/cache-buster`.

**[Documentation](https://www.piplupjs.com/docs/vite-plugin-cache-buster/installation)**
·
[Reload users after a deploy](https://www.piplupjs.com/docs/reload-after-deploy)

## Installation

You can install the plugin via npm or yarn:

```bash
npm install -D @piplup/vite-plugin-cache-buster

# or

yarn add -D @piplup/vite-plugin-cache-buster

#or

pnpm add -D @piplup/vite-plugin-cache-buster
```

## Usage

In your Vite configuration file (usually `vite.config.js` or `vite.config.ts`),
import and use the plugin:

```javascript
import { vitePluginCacheBuster } from '@piplup/vite-plugin-cache-buster';

export default {
  // Other Vite config options...
  plugins: [vitePluginCacheBuster()],
};
```

## Options

The plugin accepts the following options:

- `publicDir` (string, optional): Specifies the directory containing the public
  files. Default is `public`.
- `debug` (boolean, optional): Enables debug mode. Default is `false`.

You can pass options to the plugin when importing it:

```javascript
import { vitePluginCacheBuster } from '@piplup/vite-plugin-cache-buster';

export default {
  // Other Vite config options...
  plugins: [vitePluginCacheBuster({ publicDir: 'custom-public' })],
};
```

## How It Works

The plugin runs the `piplup-cache-buster` command from `@piplup/cache-buster` at
the start of a production build, or of any build when `debug` is `true`, and
when the dev server starts. The command writes a new release ID to
`public/RELEASE` (the `publicDir` option changes the folder), which Vite copies
into the build output. The file changes on every build, so add it to
`.gitignore`.

See
[Reload users after a deploy](https://www.piplupjs.com/docs/reload-after-deploy)
for the rest of the setup.

## License

This plugin is open-source and available under the [MIT License](LICENSE).
