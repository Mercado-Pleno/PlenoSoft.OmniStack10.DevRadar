const Dev = require('../models/Dev');

module.exports = {
    async index (request, response) {
        const { latitude, longitude, techs } = request.query;
console.log(latitude, longitude, techs);

        const devs = await Dev.find({
            techs: { 
                $in: techs,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json(devs);
    },
};

// Buscar todos os Devs num raio de 10Km
// Filtrar por tecnologias
