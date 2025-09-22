import React, { useEffect } from 'react';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import Controls from './components/Controls';
import TextInput from './components/TextInput';
import DragBar from './components/DragBar';
import Toast from './components/Toast';
import useBoardStore from './store/boardStore';
import './App.css';

function App() {
  const { loadTodayBoard, undo, redo, setDrawingMode, setEraserMode, isDrawingMode, isEraserMode, toast, hideToast, navigateDays } = useBoardStore();

  useEffect(() => {
    // Load today's board on mount
    loadTodayBoard();
  }, [loadTodayBoard]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // Exit drawing/eraser mode with ESC
      if (e.key === 'Escape' && (isDrawingMode || isEraserMode)) {
        e.preventDefault();
        setDrawingMode(false);
        setEraserMode(false);
      }

      // Navigate between days with arrow keys
      if (!e.target.tagName || e.target.tagName !== 'INPUT') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateDays(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateDays(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setDrawingMode, setEraserMode, isDrawingMode, isEraserMode, navigateDays]);

  return (
    <div className="app">
      <DragBar />
      <WhiteboardCanvas />
      <Controls />
      <TextInput />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          key={toast.id}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;