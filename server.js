require("dotenv").config()

const express = require ("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080
const path = require('path')

app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pollsRouter = require("./routes/polls")

app.use("/polls", pollsRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, console.log(`Server is running at ${PORT}`));