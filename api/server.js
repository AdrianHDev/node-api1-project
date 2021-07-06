// BUILD YOUR SERVER HERE
const { find, findById, insert, update, remove } = require('../api/users/model');
const express = require('express');


const server = express();
server.use(express.json());


server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio){
    res.status(400).json({ message: 'Missing name or bio.' });
  }
  else {
    insert({ name, bio })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(() => {
        res.status(500).json({ message: "There was an error while saving the user to the database", ...err });
      })
  }
})

server.get('/api/users', (req, res) => {
  find()
    .then(users => {
      res.status(200).json(users);
    }) 
    .catch(() => {
      res.status(500).json({ message: "Could not locate any user data" });
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(result => {
      if(result) {
        res.status(200).json(result);
      }
      else{
        res.status(404).json({ message: "No user exists with specified ID." });
      }
    }) 
    .catch(() => {
      res.status(500).json({ message: "Could not obtain user info." });
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(removed => {
      if(removed) {
        res.status(200).json(removed);
      }
      else{
        res.status(404).json({ message: "No user exists with specified ID" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error." });
    })
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio){
    res.status(400).json({ message: 'Missing name or bio.' });
  }
  else {
    update(id, {name, bio})
      .then(response => {
        if(response) {
          res.status(200).json(response);
        }
        else{
          res.status(404).json({ message: "No user exists with specified ID" });
        }
        }) // eslint-disable-next-line
      .catch(e => {
        res.status(500).json({ message: "Server Error" });
      })
  }
})
