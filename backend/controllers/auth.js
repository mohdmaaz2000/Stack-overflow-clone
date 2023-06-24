const users = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/auth');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: "User already exist" });

        }
        const hashedPass = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, password: hashedPass });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
        return res.status(200).json({ result: newUser, token });

    } catch (error) {
        res.status(500).json({ message: "Error occured" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const compare = await bcrypt.compare(password, existingUser.password);
        if (!compare) {
            return res.status(404).json({ message: "Enter valid credentials" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
        return res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Error occured" });
    }
}

module.exports = { signup, login }