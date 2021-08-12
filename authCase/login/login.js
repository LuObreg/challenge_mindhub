const { response, userRepository } = require('../authModule');
const bcrypt = require("bcrypt");
const key = require("../../keys");
const jwt = require("jsonwebtoken");

const login = async(req, res = response) => {
    try{
        const { mail, password } = req.body;

        let user = await userRepository.getUserByMail(mail);
        if(!user){
            return res.status(400).json({
                ok: false,
                message: "El usuario no se encuentra en nuestros registros"
            });
        }
        else{
            const pass = await bcrypt.compare(password, user.password);
            if(!pass){
                return res.status(400).json({
                    ok: false,
                    message: "Contraseña incorrecta"
                });
            }

            const payload = {
                id: user.id,
                username: user.username,
                avatarPicture: user.avatarPicture
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
                      token: token
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



module.exports = {
    login
}