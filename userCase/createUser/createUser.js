const { User, response } = require('../userModule');
const bcrypt = require('bcrypt');
const userRepository = require('../../repositories/userRepository');
const key = require("../../keys");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');


const create = async(req, res = response) => {
     // Check for errors
     const errores = validationResult(req);
     if( !errores.isEmpty() ){
         return res.status(400).json({ errores: errores.array() });
     };
   try{
       const user = await userRepository.getUserByMail(req.body.email);
        if (!user){
            const saltRounds = 10
            const hash = bcrypt.hashSync(req.body.password, saltRounds)
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userPic: req.body.userPic,
                mail: req.body.email,
                password: hash,
                country: req.body.country
            })

            await newUser.save((err, userDB) =>  {
                if(err){
                    return  res.status(500).json({
                    success: false,
                    err
                    })
                }
                
                const user  = userDB
                
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
                                token: token,
                                response:{
                                    id: user.id,
                                    username: user.firstName,
                                    avatarPicture: user.userPic
                                }
                            });
                        }   
                    }
                ); 
    

               /* res.status(201).json({
                    ok: true,
                    message:  'Usuario Registrado Correctamente',
                    user: {
                        userPic,
                        firstName,
                        //¿¿token??
                    }
                })*/
            })
        }
        else{
            res.status(400).json({
                ok: false,
                message:  'El usuario ya existe',
                user
            })
        }
   }
   catch(error){
    return  res.status(500).json({
        ok:false,
        message:  'Error en catch',
        error
        });
   }        
}


module.exports = {
    create
}