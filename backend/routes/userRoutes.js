const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { auth, adminOnly } = require('../middlewares/auth')

//get all users admin only
router.get('/', auth, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

//get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

//update profile
router.put('/me', auth, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const updateData = {
            name,
            email
        };

        // if password provided → hash it
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//delete the user
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

module.exports = router