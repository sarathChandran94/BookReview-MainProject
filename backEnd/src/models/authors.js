const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AuthorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Author name required']
    },
    description: {
        type: String,
        default: 'No Description available'
    },
    books: [
        {
            // type: Schema.Types.ObjectId,
            // ref: 'Book'
            type: String,
            required: [true, 'Book(s) required']
        },
    ],
    languages: [
        {
            type: String,
            default: 'Not Available'
        }
    ],
    avgRating: {
        type: Number,
        default: 0
    },
    votes: Number,
    comment: [
        {
            username: String,
            created: {
                type: Date,
                default: Date.now
            },
            body: String,
            rating: {
                type: Number,
                max: [5, "Rating out of bounds"],
            }
        }
    ]
});

let Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
