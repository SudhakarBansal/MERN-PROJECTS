const express = require('express');
const cors = require('cors');
const students = require('./db/config')

const app = express();
app.use(cors());
app.use(express.json())

app.get('/fetch-data',async(req,res)=>{
  let result = await students.find();
  res.send(result)
})

app.post('/add-data',async(req,res)=>{
  let student = new students(req.body);
  let result = await student.save();
  res.send(result)
})

app.put('/update-data/:id',async(req,res)=>{
  let result = await students.updateOne(
    {_id : req.params.id},
    {$set : req.body}
  );
  res.send(result)
})

app.delete('/delete-data/:id',async(req,res)=>{
  try {
    let result = await students.deleteOne({
      _id:req.params.id
    });
    res.send(result);
  } catch (error) {
    res.send(error)
  }
})

app.listen(5000,()=>{
  console.log("server started..");
})