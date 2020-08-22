//Env variables
require('dotenv').config();
const { exec } = require("child_process");
//UPP
const dgram = require('dgram');
let mainSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR SENDING COMMANDS AND RECEIVING COMMAND CONFIRMATION
let statusSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR RECEIVING STATUS
const port = 8889; //TELLO PORT
const port_status = 8890; //TELLO STATUS PORT
const port_video = 11111; //TELLO VIDEO PORT

const telloSSID = 'TELLO-AB855A';
const telloIP = '192.168.10.2';
const wifiInterval = 1000;//MS
let wifiStatus = false;//
let udpStatus = false;





function bindMainEvents(socket){
  //UDP CLIENT SERVER
  socket.on('error', (err) => {
    console.log(`ERROR :\n${err.stack}`);
    udpStatus = false;
    mainSocket.close();
  });
  socket.on('message', (msg, rinfo) => {
    //UNCOMNET FOR DEBUG
    console.log(`mainSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    //nextCMD(rinfo.address); //Check if commands available
  });
  socket.on('listening', () => {
    let address = mainSocket.address();
    //UNCOMNET FOR DEBUG
    console.log(`UDP CMD RESPONSE SERVER - ${address.address}:${address.port}`);
  });
}
function bindStatusEvents(socket){
  //UDP CLIENT SERVER
  socket.on('error', (err) => {
    console.log(`STATUS ERROR :\n${err.stack}`);
    udpStatus = false;
    statusSocket.close();
  });
  socket.on('listening', function () {
    let address = statusSocket.address();
    //UNCOMNET FOR DEBUG
    console.log(`UDP STATUS SERVER - ${address.address}:${address.port}`);
  });
  socket.on('message', function (message, remote) {
    //UNCOMNET FOR DEBUG
    console.log('STATUS MSG')
    //console.log(`${remote.address}:${remote.port} - ${message}`);
    const _msg_obj = dataSplit(message.toString());
    console.log(_msg_obj)
  });
}

function exectCommand(){
  return new Promise((resolve, reject) => {
    exec("iwgetid -r", (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
  });
  })
}




const main = async ()=> {
  const mainInt = setInterval(async ()=> {
    
    checkWIFI();
    checkUDP()
  }, wifiInterval)
};
main()


const checkUDP  = async () => {
  if(wifiStatus && !udpStatus){
    console.log('CONNECT SERVER')
    connectUDPServers()
  }
  if(!wifiStatus && udpStatus){
    console.log('CLOSE SERVER')
    disconnectUDPServers()
  }
}
const checkWIFI = async () => {
  try{
    const a = await exectCommand()
    const ssid = a.replace(/(\r\n|\n|\r)/gm,'');
    wifiStatus = true;
    if(ssid == process.env.TELLO_SSID){
      wifiStatus = true;
    }
  }
  catch(e){
    wifiStatus = false;
  }
}
const connectUDPServers = async () => {
  udpStatus = true;
  mainSocket = dgram.createSocket('udp4');
  bindMainEvents(mainSocket)
  mainSocket.bind(process.env.TELLO_PORT);
  statusSocket = dgram.createSocket('udp4');
  bindStatusEvents(statusSocket)
  statusSocket.bind(process.env.TELLO_PORT_STATUS);
  sendCMD('command')
}
const disconnectUDPServers = () => {
  console.log('disconnectUDPServers')
  udpStatus = false;
  mainSocket.close();
  statusSocket.close();
}

//###OTHER FUNCTIONS
const sendCMD = (command) => {
  //SEND BYTE ARRAY TO TELLO OVER UDP
    let msg = Buffer.from(command);
    mainSocket.send(
      msg,
      0,
      msg.length,
      process.env.TELLO_PORT,
      process.env.TELLO_IP
    );
}
function dataSplit(str) {
  //Create JSON OBJ from String  "key:value;"
  let data = {};
  let arrCMD = str.split(';');
  for (let i in arrCMD) {
    let tmp = arrCMD[i].split(':');
    if (tmp.length > 1) {
      data[tmp[0]] = tmp[1];
    }
  }
  return data;
}