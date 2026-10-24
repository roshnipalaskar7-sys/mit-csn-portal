const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Login API route with @mit.asia validation
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Check if email ends with @mit.asia
    if (email && email.endsWith('@mit.asia')) {
        if (password && password.length >= 6) {
            return res.json({ success: true, redirect: '/dashboard.html' });
        } else {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Access restricted! Please login using your official @mit.asia email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});