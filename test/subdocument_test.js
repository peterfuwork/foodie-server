const assert = require('assert');
const User = require('../schema/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const mike = new User({
                first_name: 'Mike',
                last_name: 'Collins',
                gender: 'male',
                ethnicity: 'white',
                birth_year: '1994',
                birth_place: 'Germany',
                user_image: 'https://dl.dropboxusercontent.com/s/nfh34fz5hc3cxy4/Mike.png',
                email: 'mikeC@email.com',
                password: '1234',
                posts: [{ title: 'HelloWorld' }]
            });
        mike.save()
            .then(() => {
                return User.findOne({ first_name: 'Mike' })
            })
            .then((user) => {
                assert(user.posts[0].title === 'HelloWorld');
                done();
            })
    });

    it('Can add subdocuments to an existing record', (done) => {
        const mike = new User({
            first_name: 'Mike',
            last_name: 'Collins',
            gender: 'male',
            ethnicity: 'white',
            birth_year: '1994',
            birth_place: 'Germany',
            user_image: 'https://dl.dropboxusercontent.com/s/nfh34fz5hc3cxy4/Mike.png',
            email: 'mikeC@email.com',
            password: '1234',
            posts: []
        });
        mike.save()
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                user.posts.push({
                    title: 'New Post'
                });
                return user.save();
            })
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const mike = new User({
            first_name: 'Mike',
            last_name: 'Collins',
            gender: 'male',
            ethnicity: 'white',
            birth_year: '1994',
            birth_place: 'Germany',
            user_image: 'https://dl.dropboxusercontent.com/s/nfh34fz5hc3cxy4/Mike.png',
            email: 'mikeC@email.com',
            password: '1234',
            posts: [{
                title: 'New Post'
            }]
        });
        mike.save()
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ first_name: 'Mike' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});