const { app, BrowserWindow } = require("electron");
const path = require("path");
const http = require("http");
import type { IncomingMessage } from "http";

function waitForNextJsReady(url: string, callback: () => void) {
  const tryLoad = () => {
    http
      .get(url, (res: IncomingMessage) => {
        if (res.statusCode === 200) {
          console.log("✅ Next.js is ready");
          callback();
        } else {
          setTimeout(tryLoad, 500);
        }
      })
      .on("error", (_err: Error) => {
        setTimeout(tryLoad, 500);
      });
  };
  tryLoad();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const devUrl = "http://localhost:3000";

  waitForNextJsReady(devUrl, () => {
    win.loadURL(devUrl);
    console.log("✅ Loaded Next.js in Electron");
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
