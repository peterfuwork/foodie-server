const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../schema/user');
const Comment = require('../schema/comment');
const Food = require('../schema/food');
const Restaurant = require('../schema/restaurant');

describe('Assocations', () => {
    let mike, food, comment, restaurant;

    beforeEach((done) => {
        mike = new User({
            first_name: 'Mike',
            last_name: 'Collins',
            gender: 'male',
            ethnicity: 'white',
            birth_year: '1994',
            birth_place: 'Germany',
            user_image: 'https://dl.dropboxusercontent.com/s/nfh34fz5hc3cxy4/Mike.png',
            email: 'mikeC@email.com',
            password: '1234',
        });
        food = new Food({
            food_name: 'Fried Chicken',
            price: '7.99',
            food_image: 'https://dl.dropboxusercontent.com/s/37lphidmr9e5stw/fried_chicken.jpg',
            category: 'meat',
            is_Spicy: false,
        });
        comment = new Comment({
            title: 'Just like it!',
            message: 'This is the best chicken dish I ever had!',
            comment_rating: 5,
        });
        restaurant = new Restaurant({
            restaurant_name: 'Magical Seafood',
            address: '1234 Warren st.',
            phone: '123-456-7890',
            type: 'western',
            restaurant_image: 'https://dl.dropboxusercontent.com/s/rcjdokdv3xtmfbs/restaurant_test.JPG',
        });

        mike.foods.push(food);
        food.comments.push(comment);
        restaurant.foods.push(food);
        food.restaurants.push(restaurant);
        comment.user = mike;

        Promise.all([mike.save(), food.save(), comment.save(), restaurant.save()])
            .then(() => done());
    });

    it('saves a relation between a user and food', (done) => {
        User.findOne({ first_name: 'Mike' })
            .populate({ path: 'foods', select: 'food_name price category' })
            .then((user) => {
                assert(user.foods[0].food_name === 'Fried Chicken');
                // console.log(user);
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ first_name: 'Mike' })
            .populate({
                path: 'foods',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.first_name === 'Mike');
                assert(user.foods[0].food_name === 'Fried Chicken');
                assert(user.foods[0].comments[0].title === 'Just like it!');
                assert(user.foods[0].comments[0].user.first_name === 'Mike');
                done();
            })
    });

    it('saves a relation between a restaurant and food', (done) => {
        Restaurant.findOne({ restaurant_name: 'Magical Seafood' })
            .populate({ path: 'foods', select: 'food_name price category' })
            .then((restaurant) => {
                assert(restaurant.foods[0].food_name === 'Fried Chicken');
                done();
            });
    });

    it('saves a relation between food to restaurant', (done) => {
        Food.findOne({ food_name: 'Fried Chicken' })
            .populate({ path: 'restaurants', select: 'restaurant_name address phone' })
            .then((food) => {
                assert(food.restaurants[0].restaurant_name === 'Magical Seafood');
                done();
            });
    });
});