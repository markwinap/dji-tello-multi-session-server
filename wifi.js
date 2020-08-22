//CONSOLE COLORS
const colors = require('colors');

//UPP
const dgram = require('dgram');
const server = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR SENDING COMMANDS AND RECEIVING COMMAND CONFIRMATION
const status = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR RECEIVING STATUS
const video = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR RECEIVING VIDEO RAW H264 ENCODED YUV420p
const port = 8889; //TELLO PORT
const port_status = 8890; //TELLO STATUS PORT
const port_video = 11111; //TELLO VIDEO PORT
//WS
const WebSocket = require('ws'); //WEBSOCKET
const port_websocket = 8080; //WEBSOCKET PORT
//VARIABLES
const tello_default = '192.168.10.2';
let videoBuff = []; //VIDEO BUFFER
let counter = 0; //COUNTER FOR VIDEO BUFFER FRAMES
let temp_input = '';

let int;
async function main() {
  int = setInterval(() => {
    console.log(server);
  }, 1000);
}
main();

//UDP CLIENT SERVER
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});
server.on('message', (msg, rinfo) => {
  //UNCOMNET FOR DEBUG
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  nextCMD(rinfo.address); //Check if commands available
});
server.on('listening', () => {
  let address = server.address();
  //UNCOMNET FOR DEBUG
  console.log(`UDP CMD RESPONSE SERVER - ${address.address}:${address.port}`);
});
server.bind(port);
//UDP STATUS SERVER
status.on('listening', function () {
  let address = status.address();
  //UNCOMNET FOR DEBUG
  console.log(`UDP STATUS SERVER - ${address.address}:${address.port}`);
});
status.on('message', function (message, remote) {
  //UNCOMNET FOR DEBUG
  //console.log(`${remote.address}:${remote.port} - ${message}`);
  let msg_obj = dataSplit(message.toString());
  if (commands.hasOwnProperty(remote.address)) {
    commands[remote.address]['status'] = msg_obj;
  } else {
    commands = Object.assign(commands, {
      [remote.address]: { status: msg_obj },
    });
  }
});
status.bind(port_status);
