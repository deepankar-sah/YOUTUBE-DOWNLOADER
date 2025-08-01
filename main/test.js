const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL("https://github.com/deepankar-sah");
}

app.whenReady().then(() => {
  createWindow();
});
