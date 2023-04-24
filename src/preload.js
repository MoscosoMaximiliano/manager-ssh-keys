const { contextBridge } = require('electron')
const fs = require('fs')

const toastify = require('toastify-js')
const { spawn } = require('child_process')

const sshPath = process.env.HOME + '/.ssh/config'

contextBridge.exposeInMainWorld('os', {
  path: () => {
    const splited = process.env.HOME.split('\\')
    splited[splited.length - 1] = '"' + splited[splited.length - 1] + '"'

    const path = splited.join('/')

    return path
  }
})

contextBridge.exposeInMainWorld('file', {
  fileExists: () => isFileExist(),
  createFile: () => createFile(),
  getFileData: () => {
    try {
      const dataArray = fs.readFileSync(sshPath, 'utf-8').split(/\r?\n/)

      const splitedData = []

      if (dataArray.length !== 1) {
        let object = {}

        dataArray.forEach((line, index, array) => {
          if (line === '') {
            splitedData.push(object)
            object = {}
          } else {
            line = line.replace('\t', '').split(' ')
            object[line[0]] = line[1]
          }

          if (index === array.length - 1) {
            splitedData.push(object)
          }
        })
      }

      const formattedData = splitedData.filter(value => Object.keys(value).length !== 0)

      // TODO: Create a Json File with the SSH Data for manage more easy the delete option

      // const jsonContent = JSON.stringify(formatData)

      // console.log(jsonContent)

      // fs.writeFileSync('./ssh_json.json', jsonContent, 'utf-8')

      return formattedData
    } catch (error) {
      toastifyFailed(`Error getting the file data: ${error}`)
      return []
    }
  },
  updateSshFile: (username) => {
    try {
      if (!isFileExist) {
        fs.appendFileSync(sshPath, `Host github.com-${username}\n\tHostName github.com\n\tUser git\n\tIdentityFile ${process.env.HOME}/.ssh/${username}`)
      } else {
        fs.appendFileSync(sshPath, `\n\nHost github.com-${username}\n\tHostName github.com\n\tUser git\n\tIdentityFile ${process.env.HOME}/.ssh/${username}`)
      }
      toastifySuccess('SSH Added')
    } catch (error) {
      toastifyFailed(`Can't add the SSH, error: ${error}`)
    }
  },
  deleteSshKey: (id) => {
    // TODO: See how to send id from table
    console.log(id)
  }
})

const isFileExist = () => fs.existsSync(sshPath)

const createFile = () => {
  try {
    // check if exist the directory
    !fs.existsSync(process.env.HOME + '/.ssh') && fs.mkdirSync(process.env.HOME + '/.ssh')

    fs.writeFileSync(sshPath, '')

    toastifySuccess('Created a new Config File')
  } catch (e) {
    toastifyFailed(`Error creating a new file: ${e}`)
  }
}
contextBridge.exposeInMainWorld('command', {
  addSSH: (email, username) => {
    const cmd = spawn(process.platform === 'win32' ? 'powershell.exe' : 'bash')

    cmd.stdin.write(`cd ${os.path()}/.ssh/ && ssh-keygen -t rsa -C "${email}" -f "${username}" && ssh-add -K ${os.path()}/.ssh/${username}`)

    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    cmd.stdin.write('\r\n')

    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    cmd.stdin.write('\r\n')

    setInterval(() => {
      cmd.stdin.end()
    }, 1000)
  }
})

contextBridge.exposeInMainWorld('toastify', {
  success: (msg) => toastifySuccess(msg),
  failed: (msg) => toastifyFailed(msg)
})

const toastifySuccess = (msg) => toastify({
  text: msg,
  duration: 2000,
  gravity: 'bottom',
  position: 'center',
  style: {
    width: '50%',
    background: 'linear-gradient(to right, #00b09b, #96c93d)',
    color: 'white',
    textAlign: 'center'
  }
}).showToast()

const toastifyFailed = (msg) => toastify({
  text: msg,
  duration: 2000,
  gravity: 'bottom',
  position: 'center',
  style: {
    width: '50%',
    background: 'linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)',
    color: 'white',
    textAlign: 'center'
  }
}).showToast()
