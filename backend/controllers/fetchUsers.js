const mongoose = require('mongoose');
const user = require('../models/auth');

const fetchAllUsers = async (req, res) => {
    try {
        const data = await user.find();
        let userData = [];
        data.forEach(d => {
            userData.push({ _id: d._id, name: d.name, about: d.about, joinedOn: d.joinedOn, tags: d.tags,chatbot : d.chatbot })
        });
        res.status(200).json(userData);
    } catch (error) {
        res.status(409).json({ message: "Internal server error" });
    }
}
const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Not a valid user" });
    }
    try {
        const updatedData = await user.findByIdAndUpdate(_id, { $set: { "name": name, "about": about, "tags": tags } }, { new: true });
        const dataToSend = [{_id:updatedData._id,name:updatedData.name,about:updatedData.about,tags:updatedData.tags,joinedOn:updatedData.joinedOn}];
        res.status(200).json(dataToSend);
    } catch (error) {
        res.status(405).json({message:"Internal Server error"});
    }

}

module.exports = { fetchAllUsers, updateUser };