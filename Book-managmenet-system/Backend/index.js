const express = require('express');
const cors = require('cors');
const books = require('./db/Config')

const app = express();

app.use(express.json());
app.use(cors());

app.get('/fetch-data',async(req,res)=>{
  let result = await books.find();
  res.send(result);
})

app.post('/add-data',async(req,res)=>{
  let book = new books(req.body);
  let result = await book.save();
  res.send(result);
})

app.put('/update-data/:id',async(req,res)=>{
  try {
    let result = await books.updateOne(
      {_id : req.params.id},
      {$set : req.body}
    )
    res.json(result);
  } catch (err) {
    res.status(500).send({error:err.message});
  }
})

app.delete('/delete-data/:id', async (req, res) => {
  try {
    let result = await books.deleteOne({
      _id: req.params.id
    });
    res.send(result)
  } catch (error) {
    res.send(error);
  }
})

app.get('/search/:key',async(req,res)=>{
  let result = await books.find(
    {
      $or:[
        {title : {$regex : req.params.key}},
        {subTitle : {$regex : req.params.key}},
        {author : {$regex : req.params.key}},
        {price : {$regex : req.params.key}}
      ]
    }
  )
  res.send(result);
})

app.listen(5000,()=>{
  console.log("server stated");
})