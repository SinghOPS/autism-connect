const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/encryption');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const user = await User.findOneAndUpdate(
      { auth0Id: req.user.sub },
      { name, preferences },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findOneAndUpdate(
      { auth0Id: req.user.sub },
      { $push: { progressHistory: { date: new Date(), score } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.progressHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};