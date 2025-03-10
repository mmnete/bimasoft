const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the Angular dist directory
app.use(express.static(path.join(__dirname, "dist/BimaSoft/browser")));

// Redirect all other routes to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/BimaSoft/browser/index.html"));
});

// Use Heroku's port or default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
