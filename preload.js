const os = require("os");
const path = require("path");
const { contextBridge, shell } = require("electron");
const fs = require("fs");
const toastify = require("toastify-js");

const pty = require('node-pty')

const sshPath = process.env.HOME + "/.ssh/config";


contextBridge.exposeInMainWorld("os", {
  path: () => { 
    let path
    let splited = process.env.HOME.split("\\")
    splited[splited.length-1] = '"' + splited[splited.length-1] + '"'
    
    path = splited.join('/')

    return path
  }
})

contextBridge.exposeInMainWorld("ssh", {
  fileExists: () => fs.existsSync(sshPath),
  createFile: () => {
    try {
      // check if exist the directory
      !fs.existsSync(process.env.HOME + "/.ssh") && fs.mkdirSync(process.env.HOME + "/.ssh")

      fs.writeFileSync(sshPath, "");
      toastify({
        text: "Created a new Config File",
        gravity: "top",
        duration: 5000,
        close: false,
        style: {
          background: "green",
          color: "white",
          textAlign: "center",
        },
      }).showToast();
    } catch (e) {
      toastify({
        text: e,
        duration: 5000,
        close: false,
        style: {
          background: "red",
          color: "white",
          textAlign: "center",
        },
      }).showToast();
    }
  },
  getFileData: () => {
    let dataArray = fs.readFileSync(sshPath, 'utf-8').split(/\r?\n/)
    let formatData = []
    let object = {}

    dataArray.forEach(line => {
        if(line === "") {
            formatData.push(object)
            object = {}
        } else {
            line = line.replace("\t", '').split(" ")
            object[line[0]] = line[1]
        }
    });

    // TODO: Create a Json File with the SSH Data for manage more easy the delete option

    // const jsonContent = JSON.stringify(formatData)

    // console.log(jsonContent)

    // fs.writeFileSync('./ssh_json.json', jsonContent, 'utf-8')
    
    return formatData
  },
});

contextBridge.exposeInMainWorld("toastify", {
  success: (msg) =>
    toastify({
      text: msg,
      gravity: "top",
      duration: 1000,
      close: false,
      style: {
        background: "green",
        color: "white",
        textAlign: "center",
      },
    }).showToast(),

  failed: (msg) =>
    toastify({
      text: msg,
      duration: 1000,
      close: false,
      style: {
        background: "red",
        color: "white",
        textAlign: "center",
      },
    }).showToast(),
});

contextBridge.exposeInMainWorld('command', {
  console: (command) => {
    const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash'
    const terminal = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.cwd(),
      env: process.env
    })

    terminal.write(command)

    terminal.on('data', (data) => {
      console.log(data)

      terminal.write('\r\n\r\n')
    })

    terminal.on('error', (err) => {
      console.log(err)
    })
  }
  // TODO: Create multiples terminal commands 
  // console: (command) => {
  //   console.log(command)
  //   exec(command, (error, stdout, stderr) => {
  //     if (error) {
  //       console.log(`error: ${error.message}`)
  //       return
  //     } else if(stderr) {
  //       console.log(`stderr: ${stderr}`)
  //       return
  //     }

  //     console.log(`stdout: ${stdout}`)
  //     console.error(`stderr: ${stderr}`)
  //   })
  // }
})
