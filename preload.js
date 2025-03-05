const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (msg) => ipcRenderer.send('message', msg),
    onReceiveMessage: (callback) => ipcRenderer.on('message-reply', (_, data) => callback(data))
});
