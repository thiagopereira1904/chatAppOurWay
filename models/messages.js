
const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    cIdTrip:{
        type: String,
        required: true
    },
    listUserTrip: [
        {
            cIdUser:{
                type: Number,
                required: true
            }
        }
    ],
    listMessages:[
        {
            cIdMessage:{
                type: Number,
                required: true
            },
            date:{
                type: Date,
                required: true
            },
            cContent:{
                type: Number,
                required: true
            },
            xTypeMessageContent:{
                type: String,
                required: true
            }
        }
    ]
});

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;
