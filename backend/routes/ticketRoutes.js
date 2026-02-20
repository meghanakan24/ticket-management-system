const express = require('express');
const { createTicket, getAllTickets, getTicketsByStudent } = require('../controller/ticketController');

const router = express.Router();

router.post('/', createTicket); // Create a ticket
router.get('/', getAllTickets); // Get all tickets (for operations team)
router.get('/:studentId', getTicketsByStudent); // Get tickets by student ID

module.exports = router;
