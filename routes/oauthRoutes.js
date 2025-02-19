const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * /api/oauth/google:
 *   get:
 *     summary: Redirects user to Google for authentication
 *     tags: [OAuth]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth
 */
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account' // Ensures user can choose an account
    })
);

/**
 * @swagger
 * /api/oauth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Successfully authenticated and returns user info
 *       401:
 *         description: Unauthorized
 */
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ msg: 'Authentication failed' });
        }
        res.json({
            msg: 'Authentication successful, Welcome at Event Manager API!',
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email,
                profilePicture: req.user.profilePicture || '',
            }
        });
    }
);

/**
 * @swagger
 * /api/oauth/logout:
 *   get:
 *     summary: Logs out the user
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); // Clear session cookie
            res.json({ msg: 'User logged out successfully, Good Bye!' });
        });
    });
});

module.exports = router;