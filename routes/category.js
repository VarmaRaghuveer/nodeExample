const express = require('express');
const router = express.Router();
const category = require('../models/category');

router.get('/fetchAll',(req, res) => {
    category.find({})
    .then(data => res.json({'status':true, 'message':data}))
    .catch(err => res.json({'status':false, 'message':err}))
});

router.post('/add',(req, res) => {
    const newCategory = new category({
        "title":req.body.title,
        "products":[
            req.body.products
        ],
        "description":req.body.description        
    });
    newCategory.save()
    .then(data => res.json({'status':true, 'message':data}))
    .catch(err => res.json({'status':false, 'message':err}))    
});

router.put('/addsubCategoryL2',(req, res) => {
    const title = req.body.title;
    const query = {title};
    const update = {                
        "child":{},
        "products":[
            req.body.childProducts
        ],
        "description":req.body.childDescription,
        "title":req.body.childTitle,        
    };    
    const opts = {upsert:true};
    category.findOneAndUpdate(query, {$push:{"child":update}}, opts )
    .then(data => res.json({'status':true, 'message':'child added'}))
    .catch(err => res.json({'status':false, 'message':err}))    
});

router.put('/addsubCategoryL3',(req, res) => {
    const title = req.body.title;
    const child = req.body.childTitle;
    const query = {"child.title" : child};
    console.log(JSON.stringify(query));
    const update = {
        "products":[
            req.body.grandChildProducts
        ],
        "description":req.body.grandChildDescription,
        "title":req.body.grandChildTitle
    };
    const opts = {upsert:true};
    category.findOneAndUpdate(query, {$set:{"child.$.child":update}}, opts)
    .then(data => res.json({'status':true, 'message':'grand child added'}))
    .catch(err => res.json({'status':false, 'message':err}))  
});

router.put('/addProductL1', (req, res) => {
    const title = req.body.title;
    const product = req.body.product;
    const query = {title};
    const opts = {upsert:true};    
    category.findOneAndUpdate(query, {$push:{"products":product}, opts})
    .then(data => res.json({'status':true, 'message':'product added in level 1'}))
    .catch(err => res.json({'status':false, 'message':err})) 
});

router.put('/addProductL2', (req, res) => {    
    const child = req.body.childTitle;
    const product = req.body.product;
    const query = {"child.title":child};
    const opts = {upsert:true};    
    category.findOneAndUpdate(query, {$push:{"child.$.products":product}, opts})
    .then(data => res.json({'status':true, 'message':'product added in level 2'}))
    .catch(err => res.json({'status':false, 'message':err})) 
});

module.exports = router;