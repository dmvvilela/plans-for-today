import React, { useState, useEffect, useRef } from 'react';
import useBoardStore from '../store/boardStore';

const TextInput = () => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const { addPlan, editingId } = useBoardStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger new input when editing existing items
      if (editingId !== null) return;

      // Don't trigger for input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Start typing when any letter is pressed
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setIsTyping(true);
        inputRef.current?.focus();
      }

      // Cancel typing on Escape
      if (e.key === 'Escape') {
        setIsTyping(false);
        setInputText('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addPlan(inputText.trim());
      setInputText('');
      setIsTyping(false);
    }
  };

  const handleBlur = () => {
    if (!inputText.trim()) {
      setIsTyping(false);
    }
  };

  return (
    <div className={`text-input-wrapper ${isTyping ? 'active' : ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onBlur={handleBlur}
          placeholder="Type to add a plan..."
          className="text-input"
        />
      </form>
      {isTyping && (
        <div className="input-hint">
          Press Enter to add • Escape to cancel
        </div>
      )}
    </div>
  );
};

export default TextInput;