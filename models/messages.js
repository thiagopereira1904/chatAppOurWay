const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    cIdUser:{
        type: String,
        required: true
    },
    cLogin:{
        type: String,
        required: true
    },
    cIdTrip:{
        type: String,
        required: true
    },
    cContent:{
        type: String,
        required: true
    },
    GeneralDescription:{
        type: String,
        required: true
    }
});

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;
