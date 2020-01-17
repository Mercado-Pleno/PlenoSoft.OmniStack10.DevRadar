const axios = require('axios');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async remove(request, response) {
        const { github_username } = request.query;

        const dev = await Dev.deleteMany({
            github_username: {
                $eq: github_username
            }
        });
        return response.json(dev);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, login, avatar_url, bio } = apiResponse.data;

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs,
                location
            });

            const sendSocketMessageTo = findConnections({ latitude, longitude }, techs);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },
};