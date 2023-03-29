const os = require("os");
const path = require("path");
const { contextBridge } = require("electron");
const fs = require("fs");
const toastify = require("toastify-js");

const sshPath = process.env.HOME + "/.ssh/config";

contextBridge.exposeInMainWorld("ssh", {
  fileExists: () => fs.existsSync(sshPath),
  createFile: () => {
    try {
      fs.writeFileSync(sshPath, "");
      toastify({
        text: "Created a new Config File",
        gravity: "top",
        duration: 1000,
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
        duration: 1000,
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
    
})
