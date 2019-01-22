const assert = require('assert');
const User = require('../schema/user');

describe('Reading users out of the database', () => {
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

    it('finds all users with a name of mike', (done) => {
        User.find({ first_name: 'Mike' })
            .then((users) => {
                assert(users[0]._id.toString() === mike._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: mike._id })
            .then((user) => {
                assert(user.first_name === 'Mike');
                done();
            });
    });
});