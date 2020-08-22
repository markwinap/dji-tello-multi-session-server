const { exec } = require("child_process");


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

const telloSSID = 'TELLO-AB855A';
const wifiInterval = 1000;//MS
let wifi = false;


async function main(){
  const test = setInterval(async ()=> {
    wifiStatus();

  }, wifiInterval)
}
main()




const wifiStatus = async () => {
  try{
    const a = await exectCommand()
    const ssid = a.replace(/(\r\n|\n|\r)/gm,'');
    if(ssid == telloSSID){
      wifi = true;
    }
  }
  catch(e){
    wifi = false;
  }
}