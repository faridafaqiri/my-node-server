const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Import the path module
const laptopsRoute = require("./routes/products");

const app = express();
const PORT = 3000;

// Middleware to handle JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public"))); // Use path.join for cross-platform compatibility

// Basic route for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Use path.join for cross-platform compatibility
});

// Link routes for laptops
app.use("/laptops", laptopsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
