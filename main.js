'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, dialog, protocol  } = require('electron');
const fs = require("fs")
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Keep a reference for dev mode
let dev = false

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      preload: path.join(`${__dirname}`, '/preload.js')
    }
  })

  // and load the index.html of the app.
  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
      indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow )
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on("loadFileDialog", (e, message) => {
  // console.log(require('path').join(process.cwd(), "my/relative/path.txt"));
  // dialog.showSaveDialog({
  //       title: 'Select the File Path to save',
  //       defaultPath: path.join(__dirname, '../assets/sample.txt'),
  //       // defaultPath: path.join(__dirname, '../assets/'),
  //       buttonLabel: 'Save',
  //       // Restricting the user to only Text Files.
  //       filters: [
  //           {
  //               name: 'Text Files',
  //               extensions: ['txt', 'docx']
  //           }, ],
  //       properties: []
  //   }).then(file => {
  //       // Stating whether dialog operation was cancelled or not.
  //       console.log(file.canceled);
  //       if (!file.canceled) {
  //           console.log(file.filePath.toString());
  //           // Creating and Writing to the sample.txt file
            
  //       }
  //   }).catch(err => {
  //       console.log(err)
  //   });
});

ipcMain.on("getbackgroundRequest", (e, msj) => {
  console.log("Obteniendo backgrounds", );
  // fs.readdir(dirname, function(err, filenames) {
  //   if (err) {
  //     onError(err);
  //     return;
  //   }
  //   filenames.forEach(function(filename) {
  //     fs.readFile(dirname + filename, 'utf-8', function(err, content) {
  //       if (err) {
  //         onError(err);
  //         return;
  //       }
  //       onFileContent(filename, content);
  //     });
  //   });
  // });
});

function init() {
  ipcMain.handle('getPath', () => app.getPath("appData"));
}

init()