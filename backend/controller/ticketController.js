const Ticket = require('../model/Ticket');


// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(...req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tickets (for operations team)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tickets by student ID (for students)
exports.getTicketsByStudent = async (req, res) => {
  try {
    const tickets = await Ticket.find({ studentId: req.params.studentId })
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
