const itineraryRepository = require('../../repositories/itineraryRepository');
const cityRepository = require('../../repositories/cityRepository');
const itineraryModel = require('../../database/models/itineraryModel');

const getAllItineraries = async (req, res) => {
    try {
        const itinerariesDb = await itineraryRepository.getAllItineraries();
        const count = await itineraryRepository.countItineraries();

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
            cantidad: count
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
            if(comment.userId.toString() == id.toString()){
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
        const data = {
            id: req.params.id,
            userId: req.user._id
        }
        const itinerary = await itineraryRepository.getbyCityID(data)
        console.log(itinerary)
        const updString = `{"comments._id": ${req.params.id}, {$set: {"comments.$.text": ${req.body.text}}, {new: true}`;
        const itineraryModified = await itineraryRepository.findOneandUpdate(updString)
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
        const userId = req.user._id;
        let toDel = {
            comment: commentId,
            user: userId
        }

        const itinerary = await itineraryRepository.getById(toDel);
        console.log(itinerary)
        if(itinerary){
            const deletedItinerary = await itineraryRepository.deleteComment(toDel);
            //console.log(deletedItinerary)
            res.status(200).json({
                success: true, 
                response: deletedItinerary.comments
            })
        }
        else{
            error = "Unauthorized";
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }
}

/*const likeIt = async(req, res = response) => {
    try{
        const user = req.user
        const id = req.params.id
        const likes = await itineraryRepository.getById(id)
        likes = likes[0].usersLike;

        var isLiked = likes.findIndex(user._id)

        var like = {
            id: id,
            user: user._id
        }

        if(isLiked == - 1){
            await itineraryRepository.likeIt(like);
            likes = likes.length + 1
        } 
        else{
            await itineraryRepository.unlikeIt(like)
            likes = likes.length - 1
        }
        const liked = isLiked == -1 ? true : false
        res.status(200).json({
            success: true,
            response: {
                likes, 
                liked
            }
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error
        })
    }

}*/

const likeIt = async(req, res = response) => {
    try{
        const toLike = {
            id: req.params.id,
            userId: req.user._id
        }
        const itineraryToLike = await itineraryRepository.getToLike(toLike);
        //console.log(itineraryToLike);//null
        let pullOrPush = itineraryToLike ? "$pull" : "$push";
        //console.log(pullOrPush)
        let liked = itineraryToLike ? false : true;
        let amt = pullOrPush == "$pull" ? -1 : 1;
        let updateFields = {
            method: pullOrPush,
            id: toLike.id,
            userId: toLike.userId,
            amt
        }
        await itineraryRepository.likeIt(updateFields);
        let itineraryModified = await itineraryRepository.getToLike(toLike)
        res.status(200).json({
            success: true,
            response: {
                likes: itineraryModified.usersLike.length, 
                liked
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


module.exports = {
    getAllItineraries,
    getbyCityID,
    getUserComments,
    postComment,
    likeIt,
    deleteComment,
    editComment
}