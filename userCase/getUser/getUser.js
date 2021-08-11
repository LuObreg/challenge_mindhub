const userRepository = require('../../repositories/userRepository');
const response = require('../userModule');

const getUserById = async (req, res = response) => {
    try{
        const userDb = await userRepository.getUserById(req.params.userId);

        if(!userDb){
            return res.status(401).json({
                ok: false,
                message: "No hay un usuario con ese id"
            });
        }
        else{
            return res.status(200).json({
                ok: true,
                message: "User",
                user: userDb
            })
        }
    }
    catch(error){
        return res.status(500).json({
            ok: false,
            message: "Error",
            error
        });
    }
}

const getUserByMail = async (req, res = response) => {
    try{
        const mail = req.query.mail;
        const userDb = await userRepository.getUserByMail(mail);

        if(!userDb){
            return res.status(401).json({
                ok: false,
                message: "El usuario no existe en los registros"
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Usuario',
            user: userDb
        })
    }
    catch(error){
        res.status(500).json({
            ok: false,
            message: "Error",
            error
        });
    }
}

module.exports = {
    getUserById,
    getUserByMail
}