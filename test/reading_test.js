const assert = require('assert');
const User = require('../schema/user');

describe('Reading users out of the database', () => {
    let mike, lisa, melissa, john;

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
        lisa = new User(
            {
                first_name: 'Lisa',
                last_name: 'Elliott',
                gender: 'female',
                ethnicity: 'white',
                birth_year: '1995',
                birth_place: 'USA',
                user_image: 'https://dl.dropboxusercontent.com/s/2ley3orxko9bugx/Lisa.png',
                email: 'lisaE@email.com',
                password: '1234'
            }
        );
        melissa = new User (
            {
                first_name: 'Melissa',
                last_name: 'Bennett',
                gender: 'female',
                ethnicity: 'white',
                birth_year: '1986',
                birth_place: 'Phoenix, AZ',
                user_image: 'https://dl.dropboxusercontent.com/s/vzwc04ijoyi6gy8/Melissa.png',
                email: 'melissaB@email.com',
                password: '1234'
            }
        );
        john = new User (
            {
                first_name: 'John',
                last_name: 'Rodriguez',
                gender: 'male',
                ethnicity: 'hispanic',
                birth_year: '1992',
                birth_place: 'Mexico City',
                user_image: 'https://dl.dropboxusercontent.com/s/es0ed6rbbqd02a1/Johnny.png',
                email: 'johnR@email.com',
                password: '1234'
            }
        );
        Promise.all([john.save(), melissa.save(), mike.save(), lisa.save()])
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

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ first_name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].first_name === 'Lisa');
                assert(users[1].first_name === 'Melissa');
                done();
            })
    });
});