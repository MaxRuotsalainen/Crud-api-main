const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');

// Skapa express appen
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./Routes/Route')
app.use('/', routes)

//starta server
app.listen(5381, ()=>{
    console.log("listeniing at port:5381")
}) 