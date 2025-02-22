const mongoose = require("mongoose")
require("dotenv").config()

const mongodbUri = "mongodb+srv://anshshr:ansh123@freelancing-platform.esbya.mongodb.net/"

const conn = mongoose.connect(mongodbUri, {
}).then(() => {
    console.log("the data base is conected succesfully")
}).catch((err) => {
    console.error("Database connection error:", err);
})


module.exports = conn
