const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Student_managment");

const mySchema = new mongoose.Schema({
  roll_no:{
    type : String,
    required : true
  },
  st_name:{
    type : String,
    required : true
  },
  st_class:{
    type : String,
    required : true
  }
})

module.exports = mongoose.model('Students',mySchema);