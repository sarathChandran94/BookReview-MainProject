const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('../models/authors')



const BookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title required']
    },
    author: {
        // type: Schema.Types.ObjectId,
        // ref: Author,
        type: String,
        trim: true,
        required: [true, 'Author name required']
    },
    synopsis: {
        type: String,
        trim: true,
        default: 'No synopsis found'
    },
    genre: {
        type: String,
        required: [true, 'Genre required']
    },
    year: {
        type: Number,
        required: [true, 'Year required']
    },
    language: {
        type: String,
        default: 'Unknown'
    },
    avgRating: {
        type: Number,
        default: 0
    },
    // votes: Number,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    addedBy: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: "../../assets/public/no_thumb.png"
    }
});

let Book = mongoose.model('Book', BookSchema);

module.exports = Book;
