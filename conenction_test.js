/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/*
Marco Martinez - markwinap@gmail.com
*/

// Env variables
require('dotenv').config();
const { exec } = require('child_process');
// UPP
const dgram = require('dgram');

let mainSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR SENDING COMMANDS AND RECEIVING COMMAND CONFIRMATION
let statusSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR RECEIVING STATUS
const videoSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR RECEIVING VIDEO RAW H264 ENCODED YUV420p
// WS
const WebSocket = require('ws'); // WEBSOCKET

let wifiStatus = false; //
let udpStatus = false;
let bat = -1;

// ###WEBSOCKET### SERVER GAMEPAD & VIDEO
const websocket = new WebSocket.Server({
  port: process.env.WS_PORT,
  backlog: 1,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});

function sendWS(data) {
  websocket.clients.forEach((client) => {
    if (client.readyState === 1 && client.bufferedAmount === 0) {
      try {
        client.send(data); // SEND OVER WEBSOCKET
      } catch (e) {
        console.log('Sending failed:', e);
      }
    }
  });
}
const sendCMD = (command) => {
  // SEND BYTE ARRAY TO TELLO OVER UDP
  if (udpStatus && wifiStatus) {
    const msg = Buffer.from(command);
    mainSocket.send(
      msg,
      0,
      msg.length,
      process.env.TELLO_PORT,
      process.env.TELLO_IP
    );
  }
};
function dataSplit(str) {
  const data = {};
  const arrCMD = str.split(';');
  for (const i in arrCMD) {
    const tmp = arrCMD[i].split(':');
    if (tmp.length > 1) {
      data[tmp[0]] = tmp[1];
    }
  }
  return data;
}

websocket.on('connection', (websocket) => {
  console.log('Socket connected. sending data...');
  websocket.on('error', (error) => {
    console.log('WebSocket error');
  });
  websocket.on('message', (msg) => {
    const obj = JSON.parse(msg);
    if (obj.msg.startsWith('#')) {
      sendWS(JSON.stringify(obj));
    } else {
      sendCMD(obj.msg);
      sendWS(JSON.stringify(obj));
    }
  });
  websocket.on('close', (msg) => {
    console.log('WebSocket close');
  });
});

function bindMainEvents(socket) {
  // UDP CLIENT SERVER
  socket.on('error', (err) => {
    console.log(`ERROR :\n${err.stack}`);
    udpStatus = false;
    mainSocket.close();
  });
  socket.on('message', (msg, rinfo) => {
    // UNCOMNET FOR DEBUG
    console.log(`mainSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log(msg.toString());
    console.log(msg);
    sendWS(
      JSON.stringify({
        name: 'Tello',
        emoji: '🤖',
        msg: msg.toString(),
      })
    );
  });
  socket.on('listening', () => {
    const address = mainSocket.address();
    // UNCOMNET FOR DEBUG
    console.log(`UDP CMD RESPONSE SERVER - ${address.address}:${address.port}`);
  });
}
function bindStatusEvents(socket) {
  // UDP CLIENT SERVER
  socket.on('error', (err) => {
    console.log(`STATUS ERROR :\n${err.stack}`);
    udpStatus = false;
    statusSocket.close();
  });
  socket.on('listening', () => {
    const address = statusSocket.address();
    // UNCOMNET FOR DEBUG
    console.log(`UDP STATUS SERVER - ${address.address}:${address.port}`);
  });
  socket.on('message', (message, remote) => {
    const status = dataSplit(message.toString());
    const tempBat = parseInt(status.bat, 10);
    if (tempBat !== bat) {
      bat = tempBat;
      sendWS(
        JSON.stringify({
          name: 'bat',
          msg: tempBat,
        })
      );
      console.log(`BATTERY ${tempBat}`);
    }
  });
}

function exectCommand() {
  return new Promise((resolve, reject) => {
    exec('iwgetid -r', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

const checkWIFI = async () => {
  try {
    const a = await exectCommand();
    const ssid = a.replace(/(\r\n|\n|\r)/gm, '');
    wifiStatus = true;
    if (ssid === process.env.TELLO_SSID) {
      wifiStatus = true;
    }
  } catch (e) {
    wifiStatus = false;
  }
};
const connectUDPServers = async () => {
  udpStatus = true;
  mainSocket = dgram.createSocket('udp4');
  bindMainEvents(mainSocket);
  mainSocket.bind(process.env.TELLO_PORT);
  statusSocket = dgram.createSocket('udp4');
  bindStatusEvents(statusSocket);
  statusSocket.bind(process.env.TELLO_PORT_STATUS);
  // cmdBuff.push('command')
  sendCMD('command');
  sendWS(
    JSON.stringify({
      name: 'Tello',
      emoji: '🤖',
      msg: 'Online',
    })
  );
};
const disconnectUDPServers = () => {
  console.log('disconnectUDPServers');
  udpStatus = false;
  mainSocket.close();
  statusSocket.close();
};
const checkUDP = async () => {
  if (wifiStatus && !udpStatus) {
    console.log('CONNECT SERVER');
    connectUDPServers();
  }
  if (!wifiStatus && udpStatus) {
    console.log('CLOSE SERVER');
    disconnectUDPServers();
    sendWS(
      JSON.stringify({
        name: 'Tello',
        emoji: '🤖',
        msg: 'Offline',
      })
    );
  }
};
const main = async () => {
  const mainInt = setInterval(async () => {
    checkWIFI();
    checkUDP();
  }, process.env.WIFI_SCAN_INTERVAL);
};
main();

// ###OTHER FUNCTIONS

/*
Info available
{ pitch: '2',
  roll: '0',
  yaw: '0',
  vgx: '0',
  vgy: '0',
  vgz: '0',
  templ: '63',
  temph: '65',
  tof: '10',
  h: '0',
  bat: '88',
  baro: '1774.64',
  time: '0',
  agx: '36.00',
  agy: '-4.00',
  agz: '-1000.00' }

*/
