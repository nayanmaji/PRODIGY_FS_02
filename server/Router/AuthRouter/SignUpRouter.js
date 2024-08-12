const User = require('../../Model/UserModel');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;