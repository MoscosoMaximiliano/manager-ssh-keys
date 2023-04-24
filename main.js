const { app, BrowserWindow } = require('electron')

const path = require('path')

const isDev = process.env.NODE_ENV !== 'development'

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'SSH Manager',
    width: isDev ? 1200 : 800,
    height: 800,
    minHeight: 400,
    minWidth: 400,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), 'src/preload.js')
    }
  })

  // Open Devtools if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile(path.join(__dirname, 'src/renderer/index.html'))
}

app.on('ready', () => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
