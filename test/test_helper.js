const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect(keys.mongoURI,  { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next test!
        done();
    });
});