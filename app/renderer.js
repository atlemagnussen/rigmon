// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('new-window')
newWindowBtn.addEventListener('click', function (event) {
    let modalPath = path.join('file://', __dirname, "/components/windows/window.html")
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})


const newFramelessWindowBtn = document.getElementById('frameless-window')
newFramelessWindowBtn.addEventListener('click', function (event) {
    let modalPath = path.join('file://', __dirname, "/components/windows/window.html")
    let win = new BrowserWindow({ frame: false, width: 1024, height: 768 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})
