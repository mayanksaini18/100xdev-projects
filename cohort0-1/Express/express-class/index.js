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
   

  //  put routes -Update a user’s name or a kidney’s health status.

  app.put('/users/:userId',(req, res)=>{
    const userId = parseInt(req.params.userId);
    const user = users.find((u, index) => index === userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.name = req.body.name 
    res.json({ msg: "User name updated successfully", user });

  })

  app.put('/users/:userId/kidneys/:kidneyId',(req, res)=>{
    const userId = parseInt(req.params.userId);
    const kidneyId = parseInt(req.params.kidneyId);
     const user = users.find((u, index) => index === userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const kidney = user.kidneys.find((k, index) => index === kidneyId);
    if (!kidney) {
      return res.status(404).json({ msg: "Kidney not found" });
    
    }
    kidney.healthy = req.body.healthy;
    res.json({ msg: "Kidney health status updated successfully", kidney }); 
  });

  // delete routes -Delete a user or a kidney.

  app.delete('/users/:userId',(req, res)=>{
    const userId = parseInt(req.params.userId);
    const userIndex = users.findIndex((u, index) => index === userId);

    if (userIndex === -1) {
      return res.status(404).json({ msg: "User not found" });
    }
    users.splice(userIndex, 1);
    res.json({ msg: "User deleted successfully" });

  });

  app.delete('/users/:userId/kidneys/:kidneyId',(req , res)=>{
    const userId = parseInt(req.params.userId);
    const kidneyId = parseInt(req.params.kidneyId);
     const user = users.find((u, index) => index === userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const kidneyIndex = user.kidneys.findIndex((k, index) => index === kidneyId);
    if (kidneyIndex === -1) {
      return res.status(404).json({ msg: "Kidney not found" });
    
    }
    user.kidneys.splice(kidneyIndex, 1);
    res.json({ msg: "Kidney deleted successfully" });

  });


  const port = 3221;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  