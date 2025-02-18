// routes/eventRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *               organizer:
 *                 type: string
 *               maxAttendees:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post('/', [
    check('title', 'Event title is required').not().isEmpty(),
    check('description', 'Event description is required').not().isEmpty(),
    check('date', 'Valid date is required').isISO8601(),
    check('location', 'Event location is required').not().isEmpty(),
    check('category', 'Event category is required').not().isEmpty(),
    check('organizer', 'Organizer information is required').not().isEmpty(),
    check('maxAttendees', 'Maximum attendees must be a number').isInt()
], createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *       500:
 *         description: Server error
 */
router.get('/', getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the event to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event data retrieved
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *               organizer:
 *                 type: string
 *               maxAttendees:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteEvent);

module.exports = router;
