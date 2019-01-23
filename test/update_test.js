const assert = require('assert');
const User = require('../schema/user');

describe('Updating records', () => {
    let mike;

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
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].birth_year === 1995);
                done();
            });
    }

    it('instance type using set n save', (done) => {
        mike.set('birth_year', 1995);
        assertName(mike.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(mike.update({ birth_year: 1995 }), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({ birth_year: 1994 }, { birth_year: 1995 }),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ birth_year: 1994 }, { birth_year: 1995 }),
            done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(mike._id, { birth_year: 1995 }),
            done
        );
    });
});