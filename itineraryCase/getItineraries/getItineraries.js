const itineraryRepository = require('../../repositories/itineraryRepository');
const cityRepository = require('../../repositories/cityRepository');

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
        console.log(itinerariesByCity)

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

module.exports = {
    getAllItineraries,
    getbyCityID
}