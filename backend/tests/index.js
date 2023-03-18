// starting server
require('../app');

// waiting for server to start
before(async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
});

// Used to wait for previous test output
beforeEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});

// running test cases serially
require('./media/media.test');
require('./worker/worker.test');
