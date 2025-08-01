import { ipcMain } from "electron";
import { execFile } from "child_process";

import os from "os";

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
      preload: path.join(__dirname, "preload.js"),
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

// Youtube Video Download
ipcMain.handle("start-download", async (event, { url, format, quality }) => {
  console.log("url coming from ui-", url);
  console.log("format coming from ui-", format);
  console.log("quality coming from ui-", quality);
  // console.log("event coming from ui-", event);

  try {
    // Output Path
    const desktopPath = path.join(os.homedir(), "Downloads");
    const outputTemplate = path.join(desktopPath, `%(title)s.%(ext)s`);

    // Dynamic yt-dlp path
    const ytDlpPath = app.isPackaged
      ? path.join(process.resourcesPath, "yt-dlp.exe")
      : path.join(__dirname, "../public/bin/yt-dlp.exe");

    const args = [
      url,
      "-f",
      format === "mp3" ? "bestaudio" : `bestvideo[height<=${quality}]`,
      "-o",
      outputTemplate,
    ];

    if (format === "mp3") args.push("--extract-audio", "--audio-format", "mp3");

    execFile(
      ytDlpPath,
      args,
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.error("yt-dlp error:", stderr);
          event.sender.send("download-error", stderr);
          return;
        }

        console.log("Download complete:", stdout);
        event.sender.send("download-complete", {
          title: "Download Successful!",
          filePath: desktopPath,
        });
      }
    );
  } catch (err) {
    console.error("IPC Error:", err);
    event.sender.send("download-error", "Something went wrong!");
  }
});

// function mapQuality(quality: string): string {
//   switch (quality) {
//     case "4k":
//       return "2160p";
//     case "1080p":
//       return "137";
//     case "720p":
//       return "136";
//     case "480p":
//       return "135";
//     case "360p":
//       return "18";
//     default:
//       return "18";
//   }
// }

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
