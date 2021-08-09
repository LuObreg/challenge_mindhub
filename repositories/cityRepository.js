
const City  = require('../database/models/cityModel');

const getAll  = async ()  =>  await City.find({});
const count = async ()  =>  await City.count()
const getOne  = async id  =>  await City.findById(id)
const getCityByName = async name  =>  await City.find({name:name})

module.exports  = {
  getAll,
  getOne,
  getCityByName,
  count
}