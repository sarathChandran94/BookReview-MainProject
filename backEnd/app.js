const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./src/config/database');
const bodyParser = require('body-parser');
const router = require('./src/routes/user');
const Book = require('./src/models/books');
const Author = require('./src/models/authors');
const Review = require('./src/models/review');


mongoose.connect(config.database, config.dbOpts, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to database');
    }
});


app.use(cors());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', router);



// '/'
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'server' });
});

// DISPLAY ALL BOOKS
app.get('/books', (req, res) => {
    Book.find().populate('review').exec((err, books) => {
        if (err) {
            console.log(err)
            res.status(404).json({ msg: err });
        }
        else {
            Review.aggregate([{ '$group': { '_id': '$book', 'avgRating': { $avg: '$rating' } } }]).exec((err, rrr) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                } else {
                    for (let i = 0; i < rrr.length; i++) {
                        Book.findByIdAndUpdate(rrr[i]._id, { avgRating: rrr[i].avgRating }, { useFindAndModify: false }, (error, update) => {
                            if (error) {
                                console.log(error);
                                res.status(404).json({ msg: error });
                            } else {
                                // console.log(update);
                                // res.status(200);
                                return;
                            }
                            // res.status(200).json(update)
                        });
                    }
                    // res.status(200).json(rrr);
                }
            });
            res.status(200).json(books);
        }
    })
})


// DISPLAY BY SORT

app.get('/books/sortby/:sort', (req, res) => {
    let sortBy = req.params.sort;
    // console.log(sortBy);
    if (sortBy == 1) {
        Book.find().sort("title").exec((err, doc) => {
            if (err) {
                res.status(500).json({ msg: 'sort not found', err: err});
            }
            else {
                res.status(200).json(doc);
            }
        })
    }
    if (sortBy == 2) {
        Book.find().sort("-title").exec().then((sortAlpha) => {
            res.status(200).json(sortAlpha);
        }).catch((err) => {
            res.status(500).json({ msg: 'sort not found', err: err});
        });
    }
    if (sortBy == 3) {
        Book.find().sort("-avgRating").exec().then((sortAlpha) => {
            res.status(200).json(sortAlpha);
        }).catch((err) => {
            res.status(500).json({ msg: 'sort not found', err: err});
        });
    }
    if (sortBy == 4) {
        Book.find().sort("-year").exec().then((sortAlpha) => {
            res.status(200).json(sortAlpha);
        }).catch((err) => {
            res.status(500).json({ msg: 'sort not found', err: err});
        });
    }
    if (sortBy == 5) {
        Book.find().sort("year").exec().then((sortAlpha) => {
            res.status(200).json(sortAlpha);
        }).catch((err) => {
            res.status(500).json({ msg: 'sort not found', err: err});
        });
    }

});


// DISPLAY SINGLE BOOK
app.get('/books/:id', (req, res) => {
    let id = req.params.id;
    Book.findById(id).populate('review').exec().then( (doc) => {
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Some error occured!', err: err });
    });;
});


// '/authors'
app.get('/authors', (req, res) => {
    Author.find().then((result) => {
        res.status(200).json(result);
    });
});



app.listen(5000, () => {
    console.log('port: 5000');
});
