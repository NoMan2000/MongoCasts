const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  // mongoose.set('debug', true);
  mongoose.plugin(schema => { schema.options.usePushEach = true });
  mongoose.connect('mongodb://localhost/users_test', {'useMongoClient': true});
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
