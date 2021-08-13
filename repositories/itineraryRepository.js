
const Itinerary  = require('../database/models/itineraryModel');

const getAllItineraries  = async ()  =>  await Itinerary.find({});

const countItineraries = async ()  =>  await Itinerary.count();

//const getOne  = async id  =>  await Itinerary.findById(id)
const getbyCityID = async id  =>  await Itinerary.find({cityId:id});

const getById = async id => await Itinerary.find({_id: id});

const postComment = async comment => await Itinerary.findByIdAndUpdate({_id: comment.id}, {$push: { comments: comment.data }}, { new:true });

const likeIt = async updateFields => await Itinerary.findByIdAndUpdate({_id: updateFields.id}, {[updateFields.method]: {usersLike: updateFields.userId }}, {$sum: {likes: updateField.amt}}, { new:true });

const deleteComment = async toDel => await Itinerary.findAndUpdate({comments:{_id: toDel.comment, userId: toDel.user}}, {$pull: { comments:{_id: toDel.comment }}}, { new:true });

const getToLike = async toLike => await Itinerary.findOne({_id: toLike.id, usersLike: toLike.userId});

const editComment = async updString => await Itinerary.findOneAndUpdate([updString]);




module.exports  = {
  getAllItineraries,
  //getOne,
  getbyCityID,
  countItineraries,
  getById,
  postComment,
  likeIt,
  deleteComment,
  getToLike,
  editComment
}