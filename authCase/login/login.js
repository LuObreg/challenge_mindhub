const { response, userRepository } = require('../authModule');
const bcrypt = require("bcrypt");
const key = require("../../keys");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');


const login = async(req, res = response) => {
    // Check for errors
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    };
    
    try{
        let user = await userRepository.getUserByMail(req.body.email);
        if(!user){
            return res.status(400).json({
                ok: false,
                message: "El usuario no se encuentra en nuestros registros"
            });
        }
        else{
            const pass = await bcrypt.compare(req.body.password, user.password);
            if(!pass){
                return res.status(400).json({
                    ok: false,
                    message: "Contraseña incorrecta"
                });
            }

            const payload = {
                id: user.id,
                username: user.firstName,
                avatarPicture: user.userPic
            };

            const options = {expiresIn: 2592000};
            jwt.sign(
                payload,
                key.secretOrKey,
                options,
                (err, token) => {
                    if(err){
                    res.json({
                    success: false,
                    token: "There was an error"
                    });
                    }else {
                        res.json({
                            success: true,
                            response: {
                                message: "logged in",
                                token,
                                firstName: user.firstName,
                                userPic: user.userPic
                            }
                        });
                    }   
                }
            ); 

        }
    }
    catch(error){
        console.log(error);
    }
}

const loginls = async(req, res = response) => {
    try{
        res.status(200).json({
            success: true,
            response: {
                userPic: req.user.userPic, 
                firstName: req.user.firstName   
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
    login,
    loginls
}