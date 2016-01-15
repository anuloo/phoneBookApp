var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var PhoneBook = mongoose.model('PhoneBook');

// ROUTES FOR OUR API
// =============================================================================

//api for all posts
router.route('/posts').


    //retrieve all data
get(function (req, res){
    PhoneBook.find(function (err, doc){
        if(err){
			return res.send(500, err);
		}
        res.json(doc);
    });
}).

//add record
post(function (req, res){
    console.log('added record: '+ req.body.name);
    var phoneBook = new PhoneBook();
    phoneBook.name = req.body.name;
    phoneBook.email = req.body.email;
    phoneBook.number = req.body.number;
    phoneBook.save(function (err, doc) {
        if(err){
			return res.send(500, err);
		}
        res.json(doc);
    });
});

//api with id's
router.route('/posts/:id').
//select a record
get(function (req, res){
    PhoneBook.findById(req.params.id, function(err, doc){
        if(err){
			return res.send(500, err);
		}
        res.json(doc);
    });
}).

//update a record
put(function (req, res) {
    PhoneBook.findById(req.params.id, function(err, doc){
			if(err){
				res.send(err);
            }

			doc.name = req.body.name;
			doc.email = req.body.email;
			doc.number = req.body.number;

			doc.save(function(err, doc){
				if(err){
					res.send(err);
                }

				res.json(doc);
			});
		});
}).

//delete a record
delete(function (req, res) {
    console.log('deleted record id: '+ req.params.id);
    PhoneBook.remove({_id : req.params.id}, function (err, doc) {
        res.json(doc);
    });
});



module.exports = router;
