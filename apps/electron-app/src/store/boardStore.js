import { create } from 'zustand';
import { splitDrawing } from '../utils/eraser';

const useBoardStore = create((set, get) => ({
  // Board settings
  currentFont: 'caveat',
  currentColor: '#2c3e50',

  // Title and date
  title: 'Plans for Today',
  currentDate: new Date(),
  date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),

  // Plans list
  plans: [],

  // Drawing strokes
  drawings: [],

  // History for undo/redo
  history: [],
  historyIndex: -1,

  // Editing state
  editingId: null,

  // Drawing mode
  isDrawingMode: false,
  isEraserMode: false,

  // Toast notification
  toast: null,

  // Actions
  setFont: (font) => set({ currentFont: font }),
  setColor: (color) => set({ currentColor: color }),

  saveToHistory: () => {
    const state = get();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push({
      plans: JSON.parse(JSON.stringify(state.plans)),
      drawings: JSON.parse(JSON.stringify(state.drawings))
    });
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  undo: () => set((state) => {
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      const historyItem = state.history[newIndex];
      return {
        plans: JSON.parse(JSON.stringify(historyItem.plans || historyItem)),
        drawings: JSON.parse(JSON.stringify(historyItem.drawings || [])),
        historyIndex: newIndex
      };
    }
    return state;
  }),

  redo: () => set((state) => {
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      const historyItem = state.history[newIndex];
      return {
        plans: JSON.parse(JSON.stringify(historyItem.plans || historyItem)),
        drawings: JSON.parse(JSON.stringify(historyItem.drawings || [])),
        historyIndex: newIndex
      };
    }
    return state;
  }),

  setEditingId: (id) => set({ editingId: id }),

  toggleDrawingMode: () => set((state) => ({
    isDrawingMode: !state.isDrawingMode,
    isEraserMode: false // Turn off eraser when toggling drawing
  })),

  setDrawingMode: (mode) => set({ isDrawingMode: mode, isEraserMode: false }),

  toggleEraserMode: () => set((state) => ({
    isEraserMode: !state.isEraserMode,
    isDrawingMode: state.isEraserMode ? false : true // Keep drawing mode on when toggling eraser
  })),

  setEraserMode: (mode) => set({ isEraserMode: mode }),

  showToast: (message, type = 'success') => set({
    toast: { message, type, id: Date.now() }
  }),

  hideToast: () => set({ toast: null }),

  navigateToDate: async (targetDate) => {
    const state = get();

    // Save current board before navigating
    if (state.plans.length > 0 || state.drawings.length > 0) {
      await get().saveBoard();
    }

    // Load the target date board
    set({
      currentDate: targetDate,
      date: targetDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      title: targetDate.toDateString() === new Date().toDateString()
        ? 'Plans for Today'
        : `Plans for ${targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    });

    await get().loadBoardForDate(targetDate);
  },

  navigateDays: async (days) => {
    const state = get();
    if (days === 0) {
      // Go to today
      await get().navigateToDate(new Date());
    } else {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + days);
      await get().navigateToDate(newDate);
    }
  },

  loadBoardForDate: async (targetDate) => {
    const dateString = targetDate.toISOString().split('T')[0];

    // Try to load from Electron first
    let data = null;
    if (window.electronAPI) {
      try {
        data = await window.electronAPI.loadBoard(dateString);
      } catch (error) {
        console.error('Error loading board via Electron:', error);
      }
    }

    // Fall back to localStorage if Electron didn't have it
    if (!data) {
      const saved = localStorage.getItem(`board-${dateString}`);
      if (saved) {
        data = JSON.parse(saved);
      }
    }

    if (data) {
      const plans = data.plans || [];
      const drawings = data.drawings || [];
      set({
        plans,
        drawings,
        currentFont: data.font || get().currentFont,
        currentColor: data.color || get().currentColor,
        history: [{
          plans: JSON.parse(JSON.stringify(plans)),
          drawings: JSON.parse(JSON.stringify(drawings))
        }],
        historyIndex: 0
      });
    } else {
      // Clear board for new date
      set({
        plans: [],
        drawings: [],
        history: [{ plans: [], drawings: [] }],
        historyIndex: 0
      });
    }
  },

  addDrawing: (points) => set((state) => {
    get().saveToHistory();
    return {
      drawings: [...state.drawings, {
        id: Date.now(),
        points,
        color: state.currentColor,
        strokeWidth: 3
      }]
    };
  }),

  eraseDrawings: (eraserPoints) => {
    get().saveToHistory();

    set((state) => {
      const newDrawings = [];

      state.drawings.forEach(drawing => {
        const segments = splitDrawing(drawing.points, eraserPoints);

        // If no segments remain, the drawing was completely erased
        if (segments.length === 0) return;

        // Add each segment as a new drawing with the same properties
        segments.forEach(segment => {
          newDrawings.push({
            ...drawing,
            id: Date.now() + Math.random(), // Ensure unique IDs
            points: segment
          });
        });
      });

      return { drawings: newDrawings };
    });
  },

  clearDrawings: () => set((state) => {
    get().saveToHistory();
    return { drawings: [] };
  }),

  addPlan: (text) => set((state) => {
    get().saveToHistory();
    return {
      plans: [...state.plans, {
        id: Date.now(),
        text,
        completed: false,
        strikethrough: null,
        color: state.currentColor,  // Save the color when plan is created
        x: 80,
        y: 200 + (state.plans.length * 60)
      }]
    };
  }),

  updatePlan: (id, text) => set((state) => {
    get().saveToHistory();
    return {
      plans: state.plans.map(plan =>
        plan.id === id ? { ...plan, text } : plan
      ),
      editingId: null
    };
  }),

  togglePlan: (id, strikethrough = null) => set((state) => {
    get().saveToHistory();
    return {
      plans: state.plans.map(plan =>
        plan.id === id ? { ...plan, completed: !plan.completed, strikethrough } : plan
      )
    };
  }),

  removePlan: (id) => set((state) => {
    get().saveToHistory();
    return {
      plans: state.plans.filter(plan => plan.id !== id)
    };
  }),

  clearCompleted: () => set((state) => ({
    plans: state.plans.filter(plan => !plan.completed)
  })),

  saveBoard: async () => {
    const state = get();
    const boardData = {
      date: new Date().toISOString().split('T')[0],
      title: state.title,
      plans: state.plans,
      drawings: state.drawings,
      font: state.currentFont,
      color: state.currentColor
    };

    try {
      // Save to localStorage as backup
      localStorage.setItem(`board-${boardData.date}`, JSON.stringify(boardData));

      // Save via Electron if available
      if (window.electronAPI) {
        const result = await window.electronAPI.saveBoard(boardData);
        console.log('Board saved:', result);
      }

      // Show success toast
      get().showToast('Board saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving board:', error);
      get().showToast('Failed to save board', 'error');
    }
  },

  loadTodayBoard: async () => {
    const today = new Date().toISOString().split('T')[0];

    // Try to load from Electron first
    let data = null;
    if (window.electronAPI) {
      try {
        data = await window.electronAPI.loadBoard(today);
      } catch (error) {
        console.error('Error loading board via Electron:', error);
      }
    }

    // Fall back to localStorage if Electron didn't have it
    if (!data) {
      const saved = localStorage.getItem(`board-${today}`);
      if (saved) {
        data = JSON.parse(saved);
      }
    }

    if (data) {
      const plans = data.plans || [];
      const drawings = data.drawings || [];
      set({
        plans,
        drawings,
        currentFont: data.font || 'caveat',
        currentColor: data.color || '#2c3e50',
        history: [{
          plans: JSON.parse(JSON.stringify(plans)),
          drawings: JSON.parse(JSON.stringify(drawings))
        }],
        historyIndex: 0
      });
    } else {
      set({
        history: [{ plans: [], drawings: [] }],
        historyIndex: 0
      });
    }
  }
}));

export default useBoardStore;