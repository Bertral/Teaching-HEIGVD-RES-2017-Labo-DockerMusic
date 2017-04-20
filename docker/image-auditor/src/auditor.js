const MULTICAST_IP = "239.32.32.32";
const MULTICAST_PORT = 56420;
const SERVER_PORT = 2205;

var dgram = require('dgram');
var net = require('net');

var multicastSocket = dgram.createSocket("udp4");

var musicians = [];

// SERVEUR
var serverSocket = net.createServer(function (socket) {
// lors de la connexion au serveur, le client reçoit la liste des musiciens puis est déconnecté
    socket.end(JSON.stringify(musicians));
});

// MULTICAST
multicastSocket.on("message", function (msg, rinfo) {
    var json = JSON.parse(msg);
    json.lastSeen = new Date();

    console.log("Recieving : " + msg);

    for (var i = 0; i < musicians.length; i++) {
        if (musicians[i].uuid == json.uuid) {
            musicians[i].lastSeen = json.lastSeen;
            return;
        }
    }

    musicians.add(json);
});

// purge les inactifs
function purgeInactives() {
    for (var i = 0; i < musicians.length; i++) {
        var now = new Date();

        if (now - musicians[i].lastSeen > 5000) {
            console.log("Purging : " + musicians[i].uuid);
            musicians.removeItem(musicians[i]);
        }
    }
}


multicastSocket.bind(MULTICAST_PORT, function () {
    multicastSocket.addMembership(MULTICAST_IP);
});

serverSocket.listen(SERVER_PORT);

setInterval(purgeInactives, 1000);