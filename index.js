const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist/BimaSoft')));

// Handle all other routes by serving the 'index.html' for the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/BimaSoft', 'index.html'));
});

// Set the port to the one Heroku provides
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
