"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    sendDownloadRequest: (data) => electron_1.ipcRenderer.invoke("start-download", data),
    onDownloadComplete: (callback) => electron_1.ipcRenderer.on("download-complete", callback),
    onDownloadError: (callback) => electron_1.ipcRenderer.on("download-error", callback),
});
