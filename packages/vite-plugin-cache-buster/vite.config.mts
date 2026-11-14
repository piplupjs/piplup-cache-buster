import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import * as path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import packageJSON from './package.json' with { type: 'json' };

const license = readFileSync(path.resolve('./LICENSE'), {
  encoding: 'utf-8',
});
const banner = ['/*', '@license', license, '*/'].join('\n');

// The plugin runs in Node, inside Vite: peers and node builtins all stay external.
const external = [
  ...new Set([
    ...Object.keys(packageJSON.peerDependencies),
    ...builtinModules,
    ...builtinModules.map((name) => `node:${name}`),
  ]),
];

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'mjs' : 'js';
        return `${entryName}.${extension}`;
      },
      formats: ['es', 'cjs'],
      name: 'piplupVitePluginCacheBuster',
    },
    minify: true,
    outDir: './dist',
    reportCompressedSize: true,
    rollupOptions: {
      external,
      output: {
        banner,
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: false,
  },
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.lib.json',
    }),
  ],
});
