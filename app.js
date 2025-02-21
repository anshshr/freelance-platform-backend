require("dotenv").config()
const express = require("express");
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const db  = require("./config/db")
const freelancerRouter = require("./routes/freelance")
const clinetRouter = require("./routes/client")

app.use("/freelancer" ,freelancerRouter )
app.use("/clients" ,clinetRouter )
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('server is running on the port', PORT)
})