const electron = require("electron");
const path = require("path");
const url = require("url");

let win;

function create_window () {
    win = new electron.BrowserWindow({ 
        width: 800, 
        height: 600, 
        frame: false, 
        transparent: true,
        fullscreen: false
    });
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../public/index.html"),
        protocol: "file:",
        slashes: true
    }));

    // electron.shell.openExternal('https://github.com');
    // electron.shell.showItemInFolder("E:/media/");
    
    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;

    });
}

electron.app.on("ready", function() {
    create_window();

    const bring_to_front = electron.globalShortcut.register("ctrl+space", () => {
        win.focus();
    });
});

electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") 
        electron.app.quit();
});

electron.app.on("activate", () => {
    if (win === null) 
        create_window();
});