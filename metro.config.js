const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    blacklistRE: blacklist([/amplify\/#current-cloud-backend\/.*/]),
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  }
};
