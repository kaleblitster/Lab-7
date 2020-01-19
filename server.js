let net = require('net');
let sockets = [];
let port = 8000;
let userId = 0;

const server = net.createServer(function(socket) {

	userId++;
	
	socket.nickname = "User " + userId;
	const clientName = socket.nickname;

	sockets.push(socket);

	console.log(clientName + ' has joined this chat.');

	socket.write("You have joined the chat!\n");

	broadcast(clientName, clientName + ' has joined this chat.\n');


	socket.on('data', function(data) {

		const message = clientName + ': ' + data.toString();

		broadcast(clientName, message);

		process.stdout.write(message);
	});


	socket.on('end', function() {

		const message = clientName + ` has left. See you later, ${clientName}!\n`;

		process.stdout.write(message);

		removeSocket(socket);

		broadcast(clientName, message);
	});


	socket.on('error', function(error) {

		console.log('Socket error: ', error.message);

	});
});


function broadcast(from, message) {

	if (sockets.length === 0) {
		process.stdout.write('No one remains in the chat');
		return;
	}

	sockets.forEach(function(socket, index, array){
		if(socket.nickname === from) return;
		
		socket.write(message);
	
	});
	
};

function removeSocket(socket) {

	sockets.splice(sockets.indexOf(socket), 1);

};


server.on('error', function(error) {

	console.log("error", error.message);

});


server.listen(3000, () => {
    console.log('server is running');
});

