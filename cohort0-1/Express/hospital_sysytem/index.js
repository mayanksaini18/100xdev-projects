const express = require('express');
const PORT = process.env.PORT || 3111;
const app = express();

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.post('/data', (req, res) => {
  // Respond with JSON instead of a plain string
  res.json({
    message: 'Data received successfully',
    yourData: req.body
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
