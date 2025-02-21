const mongoose = require("mongoose")
require("dotenv").config()

const mongodbUri = process.env.MONGO_DB_URI
console.log(mongodbUri)

const conn = mongoose.connect(mongodbUri, {
}).then(() => {
    console.log("the data base is conected succesfully")
}).catch((err) => {
    console.error("Database connection error:", err);
})


module.exports = conn
