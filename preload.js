const os = require("os");
const path = require("path");
const { contextBridge, shell } = require("electron");
const fs = require("fs");
const toastify = require("toastify-js");

const { spawn } = require("child_process");
const { format } = require("path");

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

contextBridge.exposeInMainWorld("file", {
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

    dataArray.forEach((line, index, array) => {
        if(line === "") {
            formatData.push(object)
            object = {}
        } else {
            line = line.replace("\t", '').split(" ")
            object[line[0]] = line[1]
        }

        if(index === array.length - 1) {
          formatData.push(object)
        }
    });

    // TODO: Create a Json File with the SSH Data for manage more easy the delete option

    // const jsonContent = JSON.stringify(formatData)

    // console.log(jsonContent)

    // fs.writeFileSync('./ssh_json.json', jsonContent, 'utf-8')
    
    return formatData
  },
  updateSshFile: (username) => {
    fs.appendFileSync(sshPath, `\n\nHost github.com-${username}\n\tHostName github.com\n\tUser git\n\tIdentityFile ${process.env.HOME}/.ssh/${username}`)
  }
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
    const cmd = spawn(process.platform === "win32" ? "powershell.exe": "bash")

    cmd.stdin.write(`${command}\n`)

    cmd.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`)
    })

    cmd.stdin.write("\r\n")

    cmd.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`)
    })

    cmd.stdin.write("\r\n")

    setInterval(() => {
      cmd.stdin.end()
    }, 1000);
  }
})
