const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const Author = require('../models/authors');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Review = require('../models/review');
const verifyToken = require('../config/authentication');



// '/user/register'
router.post('/register', (req, res) => {
    let userData = {};
    if (req.body.username == 'admin' && req.body.password == '12345abcde') {
        userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: true
        }
    } else {
        userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: false
        }
    }
    User.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            res.status(400).send(err)
        } else if (user) {
            res.status(400).send('Username taken!!')
        } else {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userData.password, salt, function(err, hash) {
                    userData.password = hash;
                    let user = new User(userData)
                    user.save((err, product) => {
                        if (err) {
                            res.status(502).json({msg: 'Some error occured registering the User!', error: err})
                        }
                        else {
                            res.status(201).send({msg: 'User registration successfull!', User: product});
                        }
                    });
                });
            });
        }
    });

});



// '/user/login'
router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!user) {
            res.status(404).send('User not Found!');
        }
        if (user) {
            bcrypt.compare(userData.password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                if (result === true) {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'SecretIsKey');
                    res.status(201).send({ token, user });
                }
                if (result === false) {
                    res.status(401).send('Incorrect Password!');
                }
            });
        }

    });

});



// '/user/addBook'
router.post('/addBook', verifyToken, (req, res) => {
    let bookData = req.body;
    // console.log(req.body);
    let book = new Book(bookData);
    book.save((err, product) => {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: err });
        } else {
            res.status(201).json({ msg: 'Book added successfully!', product });
        }
    })
});



// '/user/editBook/:id'
router.get('/editBook/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    Book.findById(id, (err, resultBook) => {
        if (err) {
            console.log(err)
            res.status(404).json({ msg: err });
        } else {
            console.log(resultBook)
            res.status(200).json(resultBook);
        }
    });
});



// '/user/editedBook/:id'
router.post('/newEditedBook/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Book.findByIdAndUpdate(id, data, (err, resultBook) => {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: err });
        } else {
            res.status(200).json({msg: 'Successfully edited book!', resultBook});
        }
    });
});




// '/user/deleteBook/:id'
router.get('/deleteBook/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    Book.findByIdAndRemove(id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(404).json({msg: err})
        } else {
            res.status(200).json({ msg: 'Successfully deleted book!' });
        }
    })
})



// '/user/addAuthor'
router.post('/addAuthor', (req, res) => {
    let authorData = req.body;
    // console.log(req.body);
    let author = new Author(authorData);
    author.save((err, product) => {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: err });
        } else {
            res.status(201).json(product);
        }
    });
});



// '/user/editAuthor/:id'



// '/user/editedAuthor/:id'



// '/user/deleteAuthor/:id'



// '/user/addComment/:id'
router.put('/addReview/:id', verifyToken, (req, res) => {
    console.log(req.body);
    let reviewData = req.body;
    let review = new Review(reviewData);
    review.save().then((doc) => {
        // console.log(doc);
        Book.findByIdAndUpdate(req.body.book, { $push: { review: doc._id }}, { useFindAndModify: false, new: true }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({msg: err})
            }
            // else {
            //     res.status(200).json({ msg: 'Updated!'})
            // };
        });
        res.status(201).json({ msg: 'Review added successfully!', doc });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({msg: err});
    });
});


// 'user/getReview'
router.get('/getReview/:uname', verifyToken, (req, res) => {
    let uname = req.params.uname;
    // console.log(uname);
    Review.find({ username: uname }).populate('book').then((reviews) => {
        // console.log(reviews)
        res.status(200).json(reviews);
    }).catch((err) => {
        console.log(err);
        res.status(404).json({ msg: err });
    })
})


// '/user/editComment/:id'
router.post('/editReview/:id', verifyToken, (req, res) => {
    let data = req.body;
    let id = req.params.id;
    Review.findByIdAndUpdate(id, data, {useFindAndModify: false,new: true}).then((result) => {
        res.status(200).json({ msg: 'Successfully edited!', result });
    }).catch((err) => {
        res.status(500).json({ msg: err });
    })
})

router.get('/getMyBooks/:uname', verifyToken, (req, res) => {
    let uname = req.params.uname;
    Book.find({ addedBy: uname }, (err, myBooks) => {
        if (err) {
            res.status(404).json({ msg: err });
        } else {
            res.status(200).json(myBooks);
        }
    })
})


// '/user/deleteComment/:id'
router.delete('/deleteReview/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    Review.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        }
        else {
            res.status(200).json({msg: 'successfully deleted!'})
        }
    })
})



module.exports = router;
