const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const usersRoute = require("./routes/products");

const app = express();
const PORT = 3000;

// Middleware to handle JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Basic route for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use the users route for any routes starting with /users
app.use("/products", usersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
