/* eslint-disable max-len */

// A Rollup plugin to convert CommonJS modules to ES6
import commonjs from 'rollup-plugin-commonjs';
// The @rollup/plugin-node-resolve plugin teaches Rollup how to find external modules.
import resolve from '@rollup/plugin-node-resolve';
// https://rollupjs.org/command-line-interface/#config-intellisense
import { defineConfig } from 'rollup';
// To generate a minified bundle with terser
import terser from '@rollup/plugin-terser';

const config = defineConfig(
  [
    {
      input: 'src/import-check/import-conditional-exports.js',

      output: [
        {
          dir: 'dist/iife',
          format: 'iife',
          plugins: [terser()],
        },
        {
          dir: 'dist/es6',
          format: 'es',
        },
        {
          dir: 'dist/umd',
          format: 'umd',
        },
      ],
      plugins: [
        resolve(),
      ],

      //
      // Sample configuration to explicitly throw an error if an external dependency is not found.
      // By default, Rollup only shows a warning and the build succeeds if an external dependency is not found.
      // https://rollupjs.org/configuration-options/#onwarn
      //
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          throw new Error(`Unresolved import: ${warning.source}`);
        }
        warn(warning);
      },
    },

    {
      input: 'src/import-check/import-external-commonjs.js',

      output: [
        {
          dir: 'dist/iife',
          format: 'iife',
          plugins: [terser()],
        },
        {
          dir: 'dist/es6',
          format: 'es',
        },
        {
          dir: 'dist/umd',
          format: 'umd',
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],
    },

    {
      input: 'src/import-check/import-external-esmodule.js',

      output: [
        {
          dir: 'dist/iife',
          format: 'iife',
          // plugins: [terser()],
        },
        {
          dir: 'dist/es6',
          format: 'es',
        },
        {
          dir: 'dist/umd',
          format: 'umd',
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],
    },

    // In the case of Vite, it seems difficult to disable code splitting for multiple files.
    // https://github.com/uraitakahito/hello-javascript-vite/blob/954cc418e1d7549b78bfd7d1e0f6556ccd4affd4/vite.config.mjs#L16-L25
    //
    // Issues:
    // https://github.com/rollup/rollup/issues/2756
    {
      input: 'src/import-check/import-internal-esmodule.js',

      output: [
        {
          dir: 'dist/es6',
          format: 'es',
        },
        {
          dir: 'dist/umd',
          format: 'umd',
          name: 'MyModule',
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],
    },

    {
      input: 'src/import-check/suppress-warning.js',

      output: [
        {
          dir: 'dist/es6',
          format: 'es',
        },
      ],
      // The hello-esmodule package is not bundled into the output.
      // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
      external: ['@uraitakahito/hello-esmodule'],
    },

    {
      input: 'src/main-a.js', // conditionally required

      output: [
        {
          file: 'dist/iife/bundle.min.js',
          format: 'iife',
          plugins: [terser()],
          globals: {
            'the-answer': 'theAnswer',
          },
        },
        {
          dir: 'dist/es6',
          format: 'es',
        },
        {
          dir: 'dist/umd',
          format: 'umd',
          globals: {
            'the-answer': 'theAnswer',
          },
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
      ],
    },
  ],
);

export default config;
