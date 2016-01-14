var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

//create the app
var app = express();

//connect local to db
//var db = mongojs('phonebook', ['phonebook']);
//connect remote
var db = mongojs('104.131.59.52:27017/phonebook', ['phonebook']);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//retrieve all data
app.get('/phonebook', function (req, res){
    db.phonebook.find(function (err, doc){
        res.json(doc);
    });
});

//add record
app.post('/phonebook',function (req, res){
    console.log('added record: '+ req.body.name);
    db.phonebook.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

//select a record
app.get('/phonebook/:id', function (req, res){
    var id = req.params.id;
    var query = {
        _id : mongojs.ObjectId(id)
    };
    db.phonebook.findOne(query, function(err, doc){
        res.json(doc);
    });
});

//update a record
app.put('/phonebook/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.email)
    var document = {
        query : {  _id : mongojs.ObjectId(id) },
        update: { $set:{
            name : req.body.name,
            email : req.body.email,
            number : req.body.number
        }}
    }
    db.phonebook.findAndModify(document, function (err, doc) {
        res.json(doc);
    });
});

//delete a record
app.delete('/phonebook/:id', function (req, res) {
    var id = req.params.id;
    console.log('deleted record id: '+ id);
       var query = {
        _id : mongojs.ObjectId(id)
    };
    db.phonebook.remove(query, function (err, doc) {
        res.json(doc);
    });
});
    




app.listen(3000);
console.log("Listening on port 3000....");