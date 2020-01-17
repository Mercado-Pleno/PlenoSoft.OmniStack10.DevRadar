const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const { getDistanceFromLatLonInKm } = require('./utils/getDistanceFromLatLonInKm');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
	io = socketio(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude),
			},
			techs: parseStringAsArray(techs),
		});
		//setTimeout(() => socket.emit('message', 'Hello OmniStack'), 3000);
	});
}

exports.findConnections = (coordinates, techs) => {
	return connections.filter(connection => {
		return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
			&& connection.techs.some(item => techs.includes(item));
	});
};

exports.sendMessage = (connections, message, data) => {
	connections.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};

