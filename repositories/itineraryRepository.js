
const Itinerary  = require('../database/models/itineraryModel');

const getAllItineraries  = async ()  =>  await Itinerary.find({});
const countItineraries = async ()  =>  await Itinerary.count()
//const getOne  = async id  =>  await Itinerary.findById(id)
const getbyCityID = async name  =>  await Itinerary.find({name:name})

module.exports  = {
  getAllItineraries,
  //getOne,
  getbyCityID,
  countItineraries
}