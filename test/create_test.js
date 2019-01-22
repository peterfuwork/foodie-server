const assert = require('assert');
const User = require('../schema/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const mike = new User(
            {
                first_name: 'Mike',
                last_name: 'Collins',
                gender: 'male',
                ethnicity: 'white',
                birth_year: '1994',
                birth_place: 'Germany',
                user_image: 'https://dl.dropboxusercontent.com/s/nfh34fz5hc3cxy4/Mike.png',
                email: 'mikeC@email.com',
                password: '1234'
            }
        );
        mike.save()
            .then(() => {
                // Has mike been saved successfully?
                assert(!mike.isNew);
                done();
            });
    });
});