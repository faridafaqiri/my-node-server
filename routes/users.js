const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "farhad" },
  { id: 2, name: "salim" },
  { id: 3, name: "zahra" },
];

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// POST new user
router.post("/", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  users = users.map((user) => (user.id === userId ? { id: userId, ...updatedUser } : user));
  res.json(updatedUser);
});

// DELETE user
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json({ message: "User deleted" });
});

module.exports = router;
