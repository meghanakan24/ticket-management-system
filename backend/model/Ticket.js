const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);