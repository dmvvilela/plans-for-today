import React from "react";
import {
  Palette,
  Trash2,
  Undo2,
  Redo2,
  PenTool,
  Eraser,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FontDropdown from "./FontDropdown";
import CalendarPicker from "./CalendarPicker";
import useBoardStore from "../store/boardStore";

const Controls = () => {
  const {
    currentFont,
    currentColor,
    setFont,
    setColor,
    clearCompleted,
    saveBoard,
    undo,
    redo,
    history,
    historyIndex,
    isDrawingMode,
    isEraserMode,
    toggleDrawingMode,
    toggleEraserMode,
    navigateDays,
    currentDate,
  } = useBoardStore();

  const colors = [
    { name: "Navy", value: "#2c3e50" },
    { name: "Blue", value: "#3498db" },
    { name: "Green", value: "#27ae60" },
    { name: "Red", value: "#e74c3c" },
    { name: "Purple", value: "#8e44ad" },
    { name: "Orange", value: "#f39c12" },
  ];

  const fonts = [
    { name: "Caveat", value: "caveat" },
    { name: "Kalam", value: "kalam" },
    { name: "Architects", value: "architect" },
    { name: "Indie Flower", value: "indie" },
    { name: "Marker", value: "marker" },
    { name: "Shadows", value: "shadows" },
  ];

  const isToday =
    currentDate && currentDate.toDateString() === new Date().toDateString();

  return (
    <div className="controls">
      {/* Date Navigation */}
      <div className="control-group date-nav">
        <button
          className="action-btn"
          onClick={() => navigateDays(-1)}
          title="Previous day (←)"
        >
          <ChevronLeft size={18} />
        </button>
        <CalendarPicker />
        <button
          className="action-btn"
          onClick={() => navigateDays(1)}
          title="Next day (→)"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="divider" />

      {/* Color Picker */}
      <div className="control-group">
        <Palette size={20} />
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`color-btn ${
                currentColor === color.value ? "active" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setColor(color.value)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Font Switcher */}
      <FontDropdown fonts={fonts} currentFont={currentFont} setFont={setFont} />

      {/* Drawing Mode */}
      <div className="control-group">
        <button
          className={`action-btn ${
            isDrawingMode && !isEraserMode ? "active-mode" : ""
          }`}
          onClick={toggleDrawingMode}
          title={isDrawingMode ? "Exit drawing mode (ESC)" : "Drawing mode"}
        >
          <PenTool size={18} />
        </button>
        {isDrawingMode && (
          <button
            className={`action-btn ${isEraserMode ? "active-eraser" : ""}`}
            onClick={toggleEraserMode}
            title={isEraserMode ? "Back to drawing" : "Eraser mode"}
          >
            <Eraser size={18} />
          </button>
        )}
      </div>

      {/* Undo/Redo */}
      <div className="control-group">
        <button
          className="action-btn"
          onClick={undo}
          disabled={historyIndex <= 0}
          title="Undo (Cmd+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button
          className="action-btn"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          title="Redo (Cmd+Shift+Z)"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Actions */}
      <div className="control-group">
        <button
          className="action-btn"
          onClick={clearCompleted}
          title="Clear completed"
        >
          <Trash2 size={18} />
        </button>
        <button
          className="action-btn save"
          onClick={saveBoard}
          title="Save board"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Controls;
