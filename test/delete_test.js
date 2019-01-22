const assert = require('assert');
const User = require('../schema/user');

describe('Deleting a user', () => {
    let mike;
    let melena;

    beforeEach((done) => {
        mike = new User(
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
            .then(() => {});
        melena = new User(
            {
                first_name: 'Melena',
                last_name: 'Elliott',
                gender: 'female',
                ethnicity: 'white',
                birth_year: '1995',
                birth_place: 'USA',
                user_image: 'https://dl.dropboxusercontent.com/s/2ley3orxko9bugx/Lisa.png',
                email: 'melenaE@email.com',
                password: '1234'
            }
        );
        melena.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        mike.remove()
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // Remove a bunch of records with some given criteria
        User.remove({ first_name: 'Mike' })
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ first_name: 'Mike' })
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(mike._id)
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});