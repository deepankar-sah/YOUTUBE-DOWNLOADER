const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  invokeDownload: (data) => ipcRenderer.invoke("start-download", data),
  onDownloadComplete: (callback) =>
    ipcRenderer.on("download-complete", callback),
  onDownloadError: (callback) => ipcRenderer.on("download-error", callback),
});
