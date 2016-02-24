'use strict';

const electron = require('electron');
// Module to control application life.
const App = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let _MainWindow;

/*
 * Function to be fun when application is ready to start.
 * @param {Object} evt Event object
 */
var CreateWindow  = function(evt) {  
  // Create the browser window.
  _MainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  _MainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  _MainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  _MainWindow.on('closed', CleanupWindow);
};

/*
 * Function to be run when application is closed
 * @param {Object} evt Event object
 */
var CloseWindow = function(evt){
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    App.quit();
  }
};

/*
 * Function to be run after application has been closed.
 * @param {Object} evt Event object
 */
var CleanupWindow = function(evt){
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  _MainWindow = null;
};

/*
 * Function to be run when application is activated
 * @param {Object} evt Event object
 */
var ActivateWindow = function (evt) {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_MainWindow === null) {
    CreateWindow();
  }
};

/**
 * Bind application events
 */
var BindEvents = function(){
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  App.on('ready', CreateWindow);
  // Quit when all windows are closed.
  App.on('window-all-closed', CloseWindow);
  App.on('activate', ActivateWindow);
};
BindEvents();

