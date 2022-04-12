import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/magic-conch-shell/assets/conch_shell_logo.png"),
        webPreferences: {
            nodeIntegration: true, // Allows IPC and other APIs
        },
        width: 1200,
        height: 800
    });
    mainWindow.removeMenu();

    mainWindow.loadFile(path.join(__dirname, "../dist/magic-conch-shell/index.html"));
}

app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});