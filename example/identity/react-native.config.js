const path = require('path');
const pak = require('../../packages/identity/package.json');

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
