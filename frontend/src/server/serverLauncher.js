const isDevelopment = process.env.NODE_ENV === 'development';

const middlewarePath = !isDevelopment ? '.' : '../../../dist';

const path = require('path');

// disable linter to avoid dynamic require error
const { ssrServerWithCallback } = require(`${middlewarePath}/server`); // eslint-disable-line

const port = process.env.EXPRESS_PORT || 9000;

let callback = () => {};

// disable linter to avoid dynamic require error
/* eslint-disable */
if (isDevelopment) {
  callback = () => {
    delete require.cache[path.resolve(__dirname, `${middlewarePath}/clientSSRBundle.js`)];
    return require(`${middlewarePath}/clientSSRBundle.js`).App;
  };
} else {
  const SSRBundle = require(`${middlewarePath}/clientSSRBundle.js`).App;
  callback = () => SSRBundle;
}
/* eslint-enable */

const ssrServer = ssrServerWithCallback(callback);

ssrServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
