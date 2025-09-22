const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 20, y: 20 },
    backgroundColor: '#fafaf8',
    show: false
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
const userDataPath = app.getPath('userData');
const boardsPath = path.join(userDataPath, 'boards');

// Ensure boards directory exists
if (!fs.existsSync(boardsPath)) {
  fs.mkdirSync(boardsPath, { recursive: true });
}

ipcMain.handle('save-board', async (event, boardData) => {
  try {
    const fileName = `board-${boardData.date}.json`;
    const filePath = path.join(boardsPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(boardData, null, 2));
    return { success: true, path: filePath };
  } catch (error) {
    console.error('Error saving board:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-board', async (event, date) => {
  try {
    const fileName = `board-${date}.json`;
    const filePath = path.join(boardsPath, fileName);

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }

    return null;
  } catch (error) {
    console.error('Error loading board:', error);
    return null;
  }
});

ipcMain.handle('get-all-boards', async () => {
  try {
    const files = fs.readdirSync(boardsPath);
    const boards = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(boardsPath, file);
        const stats = fs.statSync(filePath);
        const date = file.replace('board-', '').replace('.json', '');
        return {
          date,
          modified: stats.mtime,
          size: stats.size
        };
      })
      .sort((a, b) => b.modified - a.modified);

    return boards;
  } catch (error) {
    console.error('Error getting boards:', error);
    return [];
  }
});