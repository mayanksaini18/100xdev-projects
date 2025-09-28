const express = require('express');
const app = express();
const port = 4000; // You can choose any available port

// Define a route for GET requests to the root URL

app.get('/', function(req, res){
  res.send('Hello World from Express!');
});

app.get('/mayank', function(req, res){
  res.send('Hello Mayank!');
});

// Start the server and listen on the specified port
app.listen(port, function() {
  console.log(`Express app listening at http://localhost:${port}`);
});
