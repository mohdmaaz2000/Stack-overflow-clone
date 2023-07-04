const mongoose = require('mongoose');
const posts = require('../models/userpost');
const users = require('../models/auth');

const postData = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Not a valid user" });
    }

    try {
        const file = req?.file?.filename;
        const content = req?.body?.content;
        const postPost = new posts({userPosted:_id,content:content,fileContent:file});
        await postPost.save();
        res.status(200).json({message:"Posted Successfully"});
    } catch (error) {
        res.status(500).json({error:true,message:"Internal server error"});
    }
}

module.exports = { postData };