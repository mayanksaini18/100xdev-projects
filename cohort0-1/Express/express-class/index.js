//  setup express
const express = require('express');
const app = express();
app.use(express.json());

// Data storage (in-memory for simplicity)
const users = [{
    name: "mayank",
    kidneys: [ {
        healthy: false,
    },
    {
        healthy: true,
    }],
  }];


// Get routes
  app.get('/users', (req, res)=>{
    res.json(users);
  });
  
 app.get("/kidneys", (req, res) => {
  const allKidneys = users.flatMap(user => user.kidneys);
  res.json(allKidneys);
});


  const port = 3221;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  