const { response } = require('../itineraryModule');
const itineraryRepository = require('../../repositories/itineraryRepository');
const cityRepository = require('../../repositories/cityRepository');

const getAll = async (req, res) => {
    try {
        const itinerariesDb = await itineraryRepository.getAllItineraries();
        const count = await itineraryRepository.countItineraries();

        if (itinerariesDb.length === 0) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay registros en la base de datos'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Itinerarios',
            itinerarios: itinerariesDb,
            cantidad: count
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error',
            error
        });
    }
}

const getbyCityID = async (req, res) => {
    try{
        const city = req.params.city;
        const { id }  = await cityRepository.getCity(city);
        const itinerariesByCity = await itineraryRepository.getItinerariesByCityId(id);

        if (itinerariesByCity.length == 0){
            return res.status(401).json({
                ok: false,
                msg: `No hay registros vinculados a ${city}`
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Itinerarios: ",
            itinerarios: itinerariesByCity
        });
    }
    catch(error){
        res.status(500).json({
            ok: false,
            msg: "Error",
            error
        });
    }
}

module.exports = {
    getAll,
    getbyCityID
}