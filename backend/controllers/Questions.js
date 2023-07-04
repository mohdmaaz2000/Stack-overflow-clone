const mongoose = require('mongoose');
const question = require('../models/Question');

const askQuestion = async (req, res) => {
    const questionData = req.body;
    const postQuestion = new question({ ...questionData });

    try {
        await postQuestion.save();
        res.status(200).json({ message: "Question posted successfully" });
    } catch (error) {
        res.status(409).json({ message: "Error occured" });
    }
}

const getAllQuestion = async (req, res) => {
    try {
        const questions = await question.find();
        res.status(200).json(questions);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error occured" });
    }
}

const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question not found" });
    }

    try {
        await question.findByIdAndDelete(_id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Internal Server error" });
    }
}

const updateVote = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question not found" });
    }

    try {
        const Question = await question.findById(_id);

        var upIndex = -1;
        var downIndex = -1;
        if (Question.upVotes.length !== 0) {
            upIndex = Question.upVotes.findIndex((id) => id === String(userId));

        }
        if (Question.downVotes.length !== 0) {
            downIndex = Question.downVotes.findIndex((id) => id === String(userId));
        }

        if (value === 'upVote') {
            if (downIndex !== -1) {
                Question.downVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                Question.upVotes.push(userId);
            }
            else {
                Question.upVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                Question.upVotes = Question.upVotes.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                Question.downVotes.push(userId);
            }
            else {
                Question.downVotes = Question.downVotes.filter((id) => id !== String(userId));
            }
        }
        await question.findByIdAndUpdate(_id, Question);
        res.status(200).json({ message: "Voted Successfully" });
    } catch (error) {
        res.status(409).json({ message: "Internal server error" });
    }
}

module.exports = { askQuestion, getAllQuestion, deleteQuestion, updateVote };