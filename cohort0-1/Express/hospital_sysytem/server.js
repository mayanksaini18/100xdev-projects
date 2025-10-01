const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('home page!');
});

app.get('/hospital-chekup', (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = parseInt(req.query.kidneyId);
    
    // 1. Authentication check
    if (username !== 'mayank' || password !== 'pass') {
        res.status(401).send('Unauthorized: Invalid username or password');
        return;
    }

    // 2. Input validation for kidneyId
    if (kidneyId !== 1 && kidneyId !== 2) {
        res.status(400).send('Bad Request: Invalid kidneyId. It must be 1 or 2.');
        return;
    }

    // 3. Success response
    res.status(200).send(`Your kidney with id ${kidneyId} is healthy`);
});

app.listen(2000);