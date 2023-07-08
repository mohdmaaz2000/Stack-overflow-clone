const { json } = require('express');
const question = require('../models/Question');
const mongoose = require('mongoose');

const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswer, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question not found" });
    }
    updateNumberOfAnswer(_id, noOfAnswer);
    try {
        const updatedQuestion = await question.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } });
        return res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: "Error in uploading the question" });
    }

}

const updateNumberOfAnswer = async (_id, noOfAnswer) => {
    try {
        await question.findByIdAndUpdate(_id, { $set: { 'noOfAnswer': noOfAnswer } });
    } catch (error) {
        console.log(error);
    }
}

const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).json({ message: "Answer not found" });
    }
    updateNumberOfAnswer(_id, noOfAnswer);
    try {
        await question.updateOne(
            { _id },
            { $pull: { 'answer': { _id: answerId } } }
        )
        res.status(200).json({ message: "Answer Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: "Internal server error" });
    }
}

module.exports = { postAnswer, deleteAnswer };