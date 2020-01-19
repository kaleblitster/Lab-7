const net = require('net');
const client = net.createConnection({ port: 3000 }, () => {
    console.log('connected to server!');

    process.stdin.on('data', (data) =>{
        client.write(data);
    })
});
client.on('data', (data) => {
    console.log("Msg from server: " + data.toString());
});
client.on('end', () => {
    console.log('End of Message');
});