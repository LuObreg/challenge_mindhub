const passport = require ("passport");

const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");

const User = require("./database/models/userModel");

const key = require("./keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey= key.secretOrKey;


module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
                })
            .catch(err => console.log(err));
        })

); 