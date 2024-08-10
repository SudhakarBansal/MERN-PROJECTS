const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Book_management');

const mySchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  subTitle:{
    type:String,
    required : true
  },
  author:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('books',mySchema)
