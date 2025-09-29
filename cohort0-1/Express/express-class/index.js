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


  // Post routes
   app.post("/users", (req, res)=>{
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({ msg: "User created successfully", user: newUser });
   });

   app.post("/users/:userId/kidneys", (req, res)=>{
   const userId = parseInt(req.params.userId) ; //index of user in users array
    const newKidney = req.body;
    if (!users[userId]){
      return res.status(404).json({ msg: "User not found" });
    }

    users[userId].kidneys.push(newKidney); 
    res.status(201).json({ msg: "Kidney added successfully" , kidney: newKidney});
   });
   


  const port = 3221;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  