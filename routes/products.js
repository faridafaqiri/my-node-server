const express = require("express");
const router = express.Router();

let laptops = [
  { id: 1, brand: "Dell", model: "XPS 13", price: 999 },
  { id: 2, brand: "Apple", model: "MacBook Air", price: 1199 },
];

// GET all laptops
router.get("/", (req, res) => {
  res.json(laptops);
});

// POST new laptop
router.post("/", (req, res) => {
  const newLaptop = req.body;
  laptops.push(newLaptop);
  res.status(201).json(newLaptop);
});

// PUT update laptop
router.put("/:id", (req, res) => {
  const laptopId = parseInt(req.params.id);
  const updatedLaptop = req.body;
  laptops = laptops.map((laptop) => (laptop.id === laptopId ? updatedLaptop : laptop));
  res.json(updatedLaptop);
});

// DELETE laptop
router.delete("/:id", (req, res) => {
  const laptopId = parseInt(req.params.id);
  laptops = laptops.filter((laptop) => laptop.id !== laptopId);
  res.json({ message: "Laptop deleted" });
});

module.exports = router;