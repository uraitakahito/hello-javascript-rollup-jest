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
