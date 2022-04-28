import { app, BrowserWindow } from "electron";
import * as path from "path";

if(require('electron-squirrel-startup')) 
    app.quit();

let mainWindow: Electron.BrowserWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/magic-conch-shell/assets/conch_shell_logo.png"),
        webPreferences: {
            nodeIntegration: true,
        },
        width: 1200,
        height: 800,
        minWidth: 440,
        minHeight: 540,
        show: false
    });
    mainWindow.removeMenu();
    mainWindow.loadURL('http://localhost:4200/');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
}

app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // Recreate window on macOS when the dock icon is clicked 
        // and there are no other windows open
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// As usual, don't quit on macOS when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});