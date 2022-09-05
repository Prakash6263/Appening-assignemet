const express = require('express');
var bodyParser = require('body-parser');

const route = require('./userRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://prakash:prakash@cluster0.4qxv0.mongodb.net/appening?authSource=admin&replicaSet=atlas-13sjqg-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",{useNewUrlParser:true})
.then(()=>console.log("mongoose running and  connected"))
.catch(err=>console.log(err))

    
app.use('/',route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});







