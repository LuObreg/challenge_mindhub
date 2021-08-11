const mongoose = require("mongoose");
const { ObjectID } = require('mongodb');


const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    activities: {type: [{ name: String, img: String }]},
    authorName: { type: String, required: true },
    authorPic: { type: String, required: true },
    price: { type: Number, required: true, min: 1, max: 5},
    duration: { type: Number, required: true, min: 1},
    likes: { type: Number, required: true, default: 0},
    hashtags: { type: String, required: true },
    comments: [{userId: {type: ObjectID, ref: 'user'}, text: String, userName: String, userPic: String}],
    usersLike: { type: String },
    cityID: { type: ObjectID, ref: 'City', required: true}
})

module.exports = mongoose.model("itinerary", itinerarySchema);