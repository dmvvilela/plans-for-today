import React, { useState, useEffect, useRef } from 'react';
import useBoardStore from '../store/boardStore';

const TextInput = () => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const { addPlan, editingId } = useBoardStore();

  useEffect(() => {
    // Focus input whenever isTyping becomes true
    if (isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger new input when editing existing items
      if (editingId !== null) return;

      // Don't trigger for input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Cancel typing on Escape
      if (e.key === 'Escape' && isTyping) {
        setIsTyping(false);
        setInputText('');
        return;
      }

      // Start typing when any letter/number is pressed
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !isTyping) {
        e.preventDefault(); // Prevent the character from being typed twice
        // Only capture first character when not already typing
        setIsTyping(true);
        setInputText(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingId, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addPlan(inputText.trim());
      // Hide immediately
      setIsTyping(false);
      setInputText('');
      // Blur without delay
      inputRef.current?.blur();
    }
  };

  const handleBlur = () => {
    // Only hide if empty
    if (!inputText.trim()) {
      setIsTyping(false);
      setInputText('');
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className={`text-input-wrapper ${isTyping ? 'active' : ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Type to add a plan..."
          className="text-input"
          autoFocus={isTyping}
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