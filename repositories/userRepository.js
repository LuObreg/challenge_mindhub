const User = require('../database/models/userModel');

const getUserByMail = async ( mail ) => await User.findOne({ mail });
const getUserById = async ( id ) => await User.findOne({ id });
const create = async ( user ) => await User.save();

module.exports = {
    getUserById,
    getUserByMail,
    create
}
