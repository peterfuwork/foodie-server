const assert = require('assert');
const User = require('../schema/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({ first_name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.first_name;

        assert(message === 'First name is required.');
    });

    it('requires a first name longer than 1 character', () => {
        const user = new User({ first_name: 'A' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.first_name;

        assert(message === 'First name must be longer than 1 character.');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ first_name: 'A' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.first_name;

                assert(message === 'First name must be longer than 1 character.');
                done();
            });
    })
});