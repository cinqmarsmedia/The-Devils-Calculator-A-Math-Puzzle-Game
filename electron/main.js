'use strict';
const electron = require('electron');
const url = require("url");
const path = require("path");

// Module to control application life.
const {
    app } = electron;
// Module to create native browser window.
const {
    BrowserWindow
} = electron;
let win;
function createWindow() {
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    var dimensions = mainScreen.workAreaSize    ;


    // Create the browser window.
    win = new BrowserWindow({
        width: Math.round(dimensions.height*0.595),
        height: dimensions.height,
        webPreferences: {
            nodeIntegration: false,
            sandbox: true
        }
    });
    win.setMenuBarVisibility(false);
    win.setMenu(null);
    const WEB_FOLDER = '../www';
    const PROTOCOL = 'file';

    electron.protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
        // // Strip protocol
        let url = request.url.substr(PROTOCOL.length + 1);
          // Build complete path for node require function
          url = path.join(__dirname, WEB_FOLDER, url);
          // Replace backslashes by forward slashes (windows)
          // url = url.replace(/\\/g, '/');
          url = path.normalize(url);
          callback({path: url});
        });
        

      
    var Args = process.argv.slice(2);
    Args.forEach(function (val) {
        if (val === "test") {
            url = 'http://localhost:8100'
        }
    });
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: 'index.html',
        protocol: PROTOCOL + ':',
        slashes: true
        }));
    // Open the DevTools.
    //win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });
      
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
