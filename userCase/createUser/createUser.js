const { User, response } = require('../userModule');
const bcrypt = require('bcrypt');
const userRepository = require('../../repositories/userRepository')


const create = async(req, res = response) => {
   try{
       const user = await userRepository.getUserByMail(req.body.mail)
        if (!user){
            const saltRounds = 10
            const hash = bcrypt.hashSync(req.body.password, saltRounds)
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userPic: req.body.userPic,
                mail: req.body.mail,
                password: hash,
                country: req.body.country
            })

            await  newUser.save((err, userDB) =>  {
                if(err){
                    return  res.status(500).json({
                    ok:false,
                    message:  'Error interno del servidor',
                    err
                    })
                }
                
                const user  = userDB
                res.status(201).json({
                    ok: true,
                    message:  'Usuario Registrado Correctamente',
                    user
                })
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