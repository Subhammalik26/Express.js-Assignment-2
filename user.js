const express = require('express');   // Include the HTTP module.
const bodyParser = require('body-parser');   // Include the body-parser module.
const fs = require('fs');    // Include the File System module.

const user = express();

user.use(bodyParser.urlencoded({ extended: false }));  // Parsing the URL-encoded data.

// Define a simple middleware function
user.use((req, res, next) => {
  console.log('Middleware function called');
  next();     // Call the next middleware function or route handler
});
// Home page with greeting text
user.get('/', (req, res, next) => {
  res.send(`
  <head><title>Home Page</title></head>
  <h3>Welcome to the 2nd Assignment of Node.js course.</h3>  
  `);
});
// Create page 
user.get('/create', (req, res, next) => {
  res.send(`
  <head><title>Create Page</title></head>
    <form action="/add" method="POST">
      <label for="userName"><b>userName:</b></label>
      <input type="text" id="userName" name="userName">
      <button type="submit">Submit</button>
    </form>
  `);    // Show the form with "userName" input and submit button.
});
// Call POST request to "/add" and store user name in text file.
user.post('/add', (req, res, next) => {
  const userName = req.body.userName;
  fs.appendFile('users.txt', userName + '\n', err => {   // Store the data in the text file.
    if (err) throw err; 
      res.redirect('/create');    // After storing the data redirect to "create" route.
  });
});
// User page 
user.get('/users', (req, res, next) => {
 fs.readFile('users.txt', 'utf-8', (err, data) => {    // Read the data from the text file.
  if (err) {
    res.redirect('/create');   //If there are no user then redirect to "create" route.
  } else if (data === null) {
    res.redirect('/create');   //If there are no user then redirect to "create" route.
  }
  else {
      res.send(data);  // Response back or show the data to the client or user.
    }
  });
});
// Spin Node.js server on port 3000.
user.listen(3000, () => {
  console.log('Server listening on port 3000!');
});