/* eslint-disable import/extensions */
import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default (commandLineArgs) => {
  // If the command line argument --config-debug | --configDebug is set, use the debug configuration
  if (commandLineArgs.configDebug === true) {
    return debugConfig;
  }
  return defaultConfig;
};
