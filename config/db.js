const mongoose = require("mongoose")
require("dotenv").config()

const mongodbUri = process.env.DATABASE_URI;

const conn = mongoose.connect(mongodbUri, {
}).then(() => {
    console.log("the data base is conected succesfully")
}).catch((err) => {
    throw new Error("Database Connection Error",err.message)
})


module.exports = conn
