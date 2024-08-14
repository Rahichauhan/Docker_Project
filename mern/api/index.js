const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./schema');

const app = express();
app.use(cors()); // middlewares
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  
app.get('/api/notes', async (req, res) => {
    try {
      const notes = await UserModel.find();
      res.status(200).json({ message: "Fetched data successfully", data: notes });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data', error: error });
    }
  });
  
  app.post('/api/notes', async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new UserModel({ title, content });
      await newNote.save();
      res.status(201).json({ message: 'Note saved successfully' });
    } catch (error) {
      console.error('Error saving the data:', error);
      res.status(500).json({ message: 'Error saving the data', error: error });
    }
  });
  app.all('*',(req,res)=>{
    res.status(404).send("<h1>404 | page not found")
  })
  
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });