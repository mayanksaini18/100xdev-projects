
const express = require('express');
const app = express();
app.use(express.json());

const users = [{
    name: "mayank",
    kidneys: [ {
        healthy: false,
    },
    {
        healthy: true,
    }],
  }];



  app.get('/users', (req, res)=>{
    res.json(users);
  });
  
  app.get("/kidneys", (req, res)=>{
    const johnkidney = users.map(function(user){
        return user.kidneys;
    })
    res.json(johnkidney);

  });

   app.post("/users", (req, res)=>{
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({ msg: "User created successfully", user: newUser });
   });

   app.post("/kidneys", (req, res)=>{
    const newKidney = req.body;
    users[0].kidneys.push(newKidney); // For this example, we add a kidney to the first user
    res.status(201).json({ msg: "Kidney added successfully" });
   });


  const port = 3221;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  