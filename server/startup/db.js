const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('info', 'Connected to MongoDB'));
}