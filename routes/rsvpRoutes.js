// routes/rsvpRoutes.js
const express = require('express');
const { getRsvps, createRsvp, updateRsvp, deleteRsvp } = require('../controllers/rsvpController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/rsvps:
 *   get:
 *     summary: Retrieve all RSVPs
 *     tags: [RSVPs]
 *     responses:
 *       200:
 *         description: A list of RSVPs
 *       500:
 *         description: Server error
 */
router.get('/', auth, getRsvps);

/**
 * @swagger
 * /api/rsvps:
 *   post:
 *     summary: Submit an RSVP
 *     tags: [RSVPs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: RSVP submitted successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post('/', auth, createRsvp);

/**
 * @swagger
 * /api/rsvps/{id}:
 *   put:
 *     summary: Update an RSVP
 *     tags: [RSVPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: RSVP updated successfully
 *       404:
 *         description: RSVP not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, updateRsvp);

/**
 * @swagger
 * /api/rsvps/{id}:
 *   delete:
 *     summary: Delete an RSVP
 *     tags: [RSVPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RSVP deleted successfully
 *       404:
 *         description: RSVP not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, deleteRsvp);

module.exports = router;