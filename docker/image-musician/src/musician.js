const IP = "239.32.32.32";
const PORT = 56420;

const SOUNDS = {
    piano: "ti-ta-ti",
    trumpet: "pouet",
    flute: "trulu",
    violin: "gzi-gzi",
    drum: "boum-boum"
};

var dgram = require('dgram');
var uuid = require('uuid');

var socket = dgram.createSocket("udp4");

var instrument = process.argv[2]; // les arguments commencent à l'index 2

// création du message à envoyer
var json = {
    uuid: uuid.v4(),
    instrument: instrument,
    sound: SOUNDS[instrument]
};

function play() {
    // envoie le message
    console.log("Sending ...");
    socket.send(JSON.stringify(json), PORT, IP);
}

// broadcast chaque seconde
setInterval(play, 1000);