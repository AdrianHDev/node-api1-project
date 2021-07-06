// BUILD YOUR SERVER HERE
const {
  find,
  findById,
  insert,
  update,
  remove,
} = require("../api/users/model");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({ message: "Please provide name and bio for the user" });
  } else {
    insert({ name, bio })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(() => {
        res
          .status(500)
          .json({
            message: "There was an error while saving the user to the database",
          });
      });
  }
});

app.get("/api/users", (req, res) => {
  find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    update(id, { name, bio })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});
