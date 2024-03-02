const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/BlogProject'
const liveDB = 'mongodb+srv://ermadhulikasharma:1234@cluster0.1fxutnf.mongodb.net/Blog-Project?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = ()=> {
    // return mongoose.connect(url)
    return mongoose.connect(liveDB)

    .then(()=>{
        console.log('DataBase connected successfully.')
    })
    .catch((err)=> {
        console.log(err)
    })
}

module.exports = connectDB

