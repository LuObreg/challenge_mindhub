const itineraryRepository = require('../../repositories/itineraryRepository');

const getAllItineraries = async (req, res) => {
    try {
        const itinerariesDb = await itineraryRepository.getAllItineraries();

        if (itinerariesDb.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'No hay registros en la base de datos'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Itinerarios',
            itinerarios: itinerariesDb,
            cantidad: itinerariesDb.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Hubo un error',
            error
        });
    }
}


const getbyCityID = async (req, res) => {
    try{
        const id = req.params.id;
        const itinerariesByCity = await itineraryRepository.getbyCityID(id);
        if (itinerariesByCity.length == 0){
            return res.status(401).json({
                success: false,
                message: `No entries for this city`
            });
        }

        res.status(200).json({
            success: true,
            response: itinerariesByCity
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        });
    }
}

const getUserComments = async(req, res = response) => {
    try{
        const user = req.user;
        const id = req.params.id;
        const userId = user._id

        const comments = await itineraryRepository.getById(id);

        let arrayOwnerCheck = comments[0].comments.map(comment =>{
            if(comment.userId.toString() == userId.toString()){
                return comment._id
            }
        })

        const likedChek = comments[0].usersLike.includes(userId);

       // let arrayOwnerCheck = comments[0].comments.filter((comment) => comment.userId.toString() === userId.toString()).map(({_id}) => _id);

        res.status(200).json({
            success: true,
            response:{
                arrayOwnerCheck, 
                likedChek
            }
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}

const postComment = async(req, res = response) => {
    try{
        const user = req.user;
        const id = req.params.id //ID del itinerario
        const text = req.body.text

        var comment = {
            id,
            data: {
                userId: user._id,
                text,
                userName: user.firstName,
                userPic: user.userPic
            }
        }
        
        const itinerary = await itineraryRepository.postComment(comment);
        let userComments = itinerary.comments.map(comment =>{
            if(comment.userId.toString() == req.user._id.toString()){
                return comment._id
            }
        })

        res.status(200).json({
            success: true,
            response: {
                response: itinerary.comments,
                arrayUserComments: userComments
            }
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}
const editComment = async(req, res = response) => {
    try{       
        const itineraryModified = await itineraryRepository.edit({"comments._id": req.params.id}, { $set: { "comments.$.text" : req.body.text }}, { new: true });
        res.status(200).json({
            success: true,
            response: itineraryModified.comments
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}

const deleteComment = async(req, res = response) => {
    try{
        const commentId = req.params.id; 
        const deletedItinerary = await itineraryRepository.edit({ "comments._id": commentId },{ $pull: { "comments" : { '_id': commentId } }}, { new: true });
        res.status(200).json({
            success: true, 
            response: deletedItinerary.comments
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}

const likeIt = async(req, res = response) => {
    const { id: paramId } = req.params;
    const { _id: userId } = req.user;

    try{
        const itineraryToLike = await  itineraryRepository.findOne({ "_id": paramId, "usersLike": userId })
        let filter = itineraryToLike ? "$pull" : "$push";
        let liked = itineraryToLike ? false : true;
        
        let itineraryLiked = await itineraryRepository.edit({ "_id": paramId }, { [filter]: { 'usersLike': userId } }, { new: true });

        let likesFromDb = parseInt(itineraryLiked.likes);

        let itineraryModified = await itineraryRepository.edit({ "_id": paramId }, { $set: { "likes": likesFromDb += liked ? 1 : -1 }}, { new: true });

        res.status(200).json({ success: true,  response: { likes: itineraryModified.likes, liked  } });

    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}


module.exports = {
    getAllItineraries,
    getbyCityID,
    getUserComments,
    postComment,
    likeIt,
    deleteComment,
    editComment
}