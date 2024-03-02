const express = require('express')
//console.log(express)
const app = express()
const port = 3000

const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileupload')
var cloudinary = require('cloudinary');
var flash = require('connect-flash')
var session = require('express-session')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Connect Database
connectDB()

// data insert convert to JSON
app.use(express.urlencoded({extended:false}))

// to upload image files
app.use(fileUpload({useTempFiles:true}))

// To show messages on html pages
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))

app.use(flash())

// router load
app.use('/', web)

// ejs set up
app.set('view engine', 'ejs')

// to add static files in public
app.use(express.static('public'))


// Server Create
app.listen(port, ()=> {
    console.log(`Server is running on the localhost:${port}`)
})