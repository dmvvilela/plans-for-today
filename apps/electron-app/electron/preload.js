const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveBoard: (data) => ipcRenderer.invoke('save-board', data),
  loadBoard: (date) => ipcRenderer.invoke('load-board', date),
  getAllBoards: () => ipcRenderer.invoke('get-all-boards')
});