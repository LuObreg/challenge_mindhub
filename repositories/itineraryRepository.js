
const Itinerary  = require('../database/models/itineraryModel');

const getAllItineraries  = async ()  =>  await Itinerary.find({});

//const getOne  = async id  =>  await Itinerary.findById(id)
const getbyCityID = async id  =>  await Itinerary.find({cityId:id});

const getById = async id => await Itinerary.find({_id: id});

const postComment = async comment => await Itinerary.findByIdAndUpdate({_id: comment.id}, {$push: { comments: comment.data }}, { new:true });

const edit = async (filter, update, option) => await Itinerary.findOneAndUpdate(filter, update, option);

const findOne = async value => await Itinerary.findOne(value);





module.exports  = {
  getAllItineraries,
  //getOne,
  getbyCityID,
  getById,
  postComment,
  edit,
  findOne
}
