const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            backgroundThrottling: false
        }
    });

    mainWindow.loadFile('UniSchedule.html');

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'Escape') {
            mainWindow.close();
        }
    });
};


app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})