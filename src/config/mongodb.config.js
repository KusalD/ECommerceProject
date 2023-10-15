const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_NAME,
    autoIndex: true,
    autoCreate: true
})
.then((db) =>{
    console.log("Db server connected successfully...")
})
.catch((error) =>{
    console.log("Error connecting database server")
    throw error;
})