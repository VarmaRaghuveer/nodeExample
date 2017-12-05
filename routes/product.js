const express = require('express');
const router = express.Router();
const products = require('../models/product');

//Fetch all products
router.get('/fetchAll', (req, res) => {    
    products.find({})
    .then( data => res.json({'status':true,'message':data}))
    .catch(err => res.json({'status':false,'message':err}))   
});

//Fetch product from title
router.post('/fetchOne', (req, res) => {
    const title = req.body.title;
    //ES6 syntax for creating query through out code base
    const query = {title}    
    products.find(query)
    .then( data => res.json({'status':true,'message':data}))
    .catch(err => res.json({'status':false,'message':err}))   
});

//Fetch product from category
router.post('/fetchByCategory', (req, res) => {
    const category = req.body.category;
    const query = {category}    
    products.find(query)
    .then( data => res.json({'status':true,'message':data}))
    .catch(err => res.json({'status':false,'message':err}))   
});

//update product price and/or title
router.put('/update', (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const newTitle = req.body.newTitle;
    const query = {title}
    let update;
    if(price && newTitle){
        update = {"price":price, "title":newTitle}
    } else if (newTitle){
        update = {"title":newTitle}
    } else {
        update = {"price":price}
    }
    update.updDate = Date.now();
    const opts = {upsert: true};
    products.findOneAndUpdate(query, update, opts)
    .then( data => res.json({'status':true,'message':'product updated'}))
    .catch(err => res.json({'status':false,'message':err}))   
});

//add product with only one category inititally
router.post('/add', (req, res) => {
    const newProduct = new products({
        "title" : req.body.title,
        "description" : req.body.description,
        "price" : req.body.price,        
        "category" : [ 
            req.body.category
        ]
    })

    newProduct.save()
    .then( data => res.json({'status':true,'message':data}))
    .catch(err => res.json({'status':false,'message':err}))   
});

//add more categories to existing product
router.put('/addCategory', (req, res) => {
    const title = req.body.title;
    const category = req.body.category
    const query = {title}
    const update = {category}
    const opts = {upsert: true};
    console.log(JSON.stringify(update));
    products.findOneAndUpdate(query, {$push:update}, opts)
    .then( data => res.json({'status':true,'message':'category inserted in product'}))
    .catch(err => res.json({'status':false,'message':err}))   
});

module.exports = router;
