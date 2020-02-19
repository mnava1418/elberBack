const mongoose = require('mongoose');
const appAuth = require('../config/appAuth');

module.exports = (env) => {
    mongoose.connect(appAuth.mongoDB[env].dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
        if(err){
          console.log(err)
        } else {
          console.log("Connected to Mongo!!");
        }
    })
}