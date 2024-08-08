const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todos');

const mySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subTitle:{
      type:String,
      required:true
    },

    postedAt:{
      type:Date,
      default:Date.now()
    }
  }
)

module.exports= mongoose.model('todos',mySchema);