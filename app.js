const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TestDb', { useMongoClient: true }, (err) => {
    if(err)
        console.log('errorrrrrrr : ' + err);
});
mongoose.Promise = global.Promise;

const category = require('./routes/category');
const product = require('./routes/product');

app.use('/category',category);
app.use('/product',product);

const port = process.env.PORT || 3000;

app.get('*', (req, res) =>{
    res.json({'status':'sucess', 'message':'home Page'})
});

app.listen(port);