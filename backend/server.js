const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://saivijaykiranc2003:Saivijay@cluster0.cvwoqgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const ticketSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Solved', 'Not Solved'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now}
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Routes
app.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tickets/:studentId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ studentId: req.params.studentId })
                              .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/tickets/:id/status', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
