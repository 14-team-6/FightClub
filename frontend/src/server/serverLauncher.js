const { ssrServer } = require('../../../dist/server');

const port = process.env.PORT || 9001;

ssrServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
