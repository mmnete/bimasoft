const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular build directory
app.use(express.static(path.join(__dirname, 'dist/BimaSoft/browser')));

// All routes that aren't handled by the server (like '/car-insurance-flow') should return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/BimaSoft/browser', 'index.html'));
});

// Start the server on the correct port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
