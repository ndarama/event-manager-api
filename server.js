// event/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./api-docs/swagger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

// Ensure Passport is required after dotenv
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // 1-hour session
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import Routes
const oauthRoutes = require('./routes/oauthRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/oauth', oauthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvps', rsvpRoutes);
app.use('/api/categories', categoryRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Manager API');
});

// Global Error Handler Middleware
app.use(errorHandler);

// Handle Undefined Routes
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
