const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ReviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    title: String,
    username: String,
    created: {
        type: Date,
        default: Date.now()
    },
    comment: String,
    rating: {
        type: Number,
        max: [5, 'Invalid rating'],
    },
});

let Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
