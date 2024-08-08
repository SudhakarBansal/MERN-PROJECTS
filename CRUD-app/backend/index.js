const express = require('express');
const todos = require('./db/config')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/fetch-data', async (req, res) => {
  const result = await todos.find();
  if (result.length > 0) {
    res.send(result);
  }
  else {
    res.send("No record Found...");
  }
})


app.post('/add-data', async (req, res) => {
  let todo = new todos(req.body);
  let result = await todo.save();
  res.send(result);
})

app.put('/update-data/:id', async (req, res) => {
  try {
    let result = await todos.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(result); // Use .json() to ensure proper JSON formatting
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete('/delete-data/:id', async (req, res) => {
  try {
    let result = await todos.deleteOne({
      _id: req.params.id
    });
    res.send(result)
  } catch (error) {
    res.send(error);
  }
})

app.listen(4000, () => {
  console.log("server started");
})