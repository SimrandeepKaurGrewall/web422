const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send(`
    <h1>This is the Home Page of the application</h1>
    <a href="/about">About page</a>
  `);
});

app.get('/about', (req, res) => {
  res.send(`
    <h1>About This Application</h1>
    <p>This application is created by Simrandeep Kaur using a simple Node.js app built with Express.</p>
    <a href="/">Back to Home</a>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
