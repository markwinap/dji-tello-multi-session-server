const { exec } = require("child_process");
//UPP
const dgram = require('dgram');
let mainSocket = dgram.createSocket('udp4'); // UDP SERVER IPv4 FOR SENDING COMMANDS AND RECEIVING COMMAND CONFIRMATION

const port = 8889; //TELLO PORT
const port_status = 8890; //TELLO STATUS PORT
const port_video = 11111; //TELLO VIDEO PORT

const telloSSID = 'TELLO-AB855A';
const telloIP = '192.168.10.2';
const wifiInterval = 1000;//MS
let wifiStatus = false;//
let udpStatus = false;


//UDP CLIENT SERVER
mainSocket.on('error', (err) => {
  console.log(`ERROR :\n${err.stack}`);
  udpStatus = false;
  mainSocket.close();
});
mainSocket.on('message', (msg, rinfo) => {
  //UNCOMNET FOR DEBUG
  console.log(`mainSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  nextCMD(rinfo.address); //Check if commands available
});
mainSocket.on('listening', () => {
  let address = mainSocket.address();
  //UNCOMNET FOR DEBUG
  console.log(`UDP CMD RESPONSE SERVER - ${address.address}:${address.port}`);
});




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
    console.log(`WIFI ${wifiStatus} UDP ${udpStatus}`)
    connectUDPServers()

  }
  if(!wifiStatus && udpStatus){
    console.log('CLOSE SERVER')
    console.log(`WIFI ${wifiStatus} UDP ${udpStatus}`)
    disconnectUDPServers()

  }
}
const checkWIFI = async () => {
  try{
    const a = await exectCommand()
    const ssid = a.replace(/(\r\n|\n|\r)/gm,'');
    if(ssid == telloSSID){
      wifiStatus = true;
    }
  }
  catch(e){
    wifiStatus = false;
  }
}
const connectUDPServers = () => {
  mainSocket = dgram.createSocket('udp4');
  udpStatus = true;
  mainSocket.bind({
    address: telloIP,
    port: port
  });
}
const disconnectUDPServers = () => {
  udpStatus = false;
  mainSocket.close();
}