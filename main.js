const { app, BrowserWindow } = require("electron");

const path = require("path");

const isDev = process.env.NODE_ENV !== 'development' 

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "SSH Manager",
    width: isDev ? 1200 : 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Open Devtools if in dev env
  if(isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.on("ready", () => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
