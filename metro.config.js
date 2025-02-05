const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = {resetCache: true};

const wrappedConfig = wrapWithReanimatedMetroConfig(config);

module.exports = mergeConfig(getDefaultConfig(__dirname), wrappedConfig);
