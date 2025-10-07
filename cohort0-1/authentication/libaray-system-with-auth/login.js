const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const app = express();
app.use(express.json()); // Middleware to parse JSON body

const SECRET_KEY = 'YOUR_SECRET_KEY_12345'; // In production, use environment variables for this!
const saltRounds = 10; // Cost factor for bcrypt hashing

// In-memory "database" for users and books. In a real app, this would be a database.
const users = [];
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];

// --- 1. User Registration Endpoint ---
app.post('/register', async (req, res) => {
    try {
        const { email, password, role = 'member' } = req.body;

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: users.length + 1, // Simple ID generation
            email,
            password: hashedPassword,
            role
        };

        users.push(newUser);

        console.log('User registered:', newUser);
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration." });
    }
});

// --- 2. User Login Endpoint ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare submitted password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate Payload (Claims) for the JWT
    const payload = { 
        userId: user.id, 
        userRole: user.role 
    };

    // Sign and Issue the JWT
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 

    // Send the JWT back to the client
    res.json({ 
        message: "Login successful", 
        accessToken: token // The client stores this
    });
});

// --- 3. Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // The token is expected in the format: "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token is present
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid or expired
        }
        // Attach the decoded user payload to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

// --- 4. Protected Route to Get Books ---
// This route is protected by our `authenticateToken` middleware.
app.get('/books', authenticateToken, (req, res) => {
    console.log('Accessing protected route. User:', req.user);
    res.json(books);
});

// --- Server ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available users:', users);
});