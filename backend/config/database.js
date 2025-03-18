const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const  db_connect = () =>{
    mongoose.connect(DATABASE_URL)
    .then(console.log("Database is connectd successfully"))
    .catch((error) =>{
        console.error(error);
        console.log("Error while connecting with database");
        process.exit(1);
    });
}

module.exports = db_connect;