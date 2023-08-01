const { app, BrowserWindow } = require("electron");
const path = require("path");

let appWin;

createWindow = () => {
  appWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Angular and Electron",
    resizable: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  appWin.loadURL(
    `file://${path.join(__dirname, "dist", "weather-app", "index.html")}`
  );

  appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
