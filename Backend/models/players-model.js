const { date } = require('joi');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bidPrice: {
        type: Number,
        min: 0,
    },
    basePrice: {
        type: Number,
        min: 0,
    },
    course : {
        type:String,
        required:true
    },
    currentSemester: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    currentTeam: {
        type: String,
        required: true,
    },
    playerType: {
        type: String,
        required: true,
    },
    battingHand: {
        type:String,
        required:true
    },
    bowlingStyle: {
        type:String,
        required:true
    },
    status: String
});

module.exports = mongoose.model('New_Players', playerSchema);