import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-konva';

const EditableText = ({ plan, fontFamily, color, onUpdate, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(plan.text);
  const textRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      // Create HTML input for editing
      const stage = textRef.current.getStage();
      const textPosition = textRef.current.getAbsolutePosition();
      const stageBox = stage.container().getBoundingClientRect();

      const input = document.createElement('input');
      input.value = editText;
      input.style.position = 'absolute';
      input.style.top = `${stageBox.top + textPosition.y}px`;
      input.style.left = `${stageBox.left + textPosition.x}px`;
      input.style.width = '600px';
      input.style.fontSize = '32px';
      input.style.fontFamily = fontFamily;
      input.style.color = color;
      input.style.border = '2px solid #3498db';
      input.style.borderRadius = '4px';
      input.style.padding = '4px';
      input.style.background = 'rgba(255, 255, 255, 0.95)';
      input.style.zIndex = '1000';

      document.body.appendChild(input);

      input.focus();
      input.select();

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          onUpdate(plan.id, input.value);
          setIsEditing(false);
          onClick(null); // Clear editing ID
          if (document.body.contains(input)) {
            document.body.removeChild(input);
          }
        } else if (e.key === 'Escape') {
          setEditText(plan.text);
          setIsEditing(false);
          onClick(null); // Clear editing ID
          if (document.body.contains(input)) {
            document.body.removeChild(input);
          }
        }
      };

      const handleBlur = () => {
        onUpdate(plan.id, input.value);
        setIsEditing(false);
        onClick(null); // Clear editing ID
        if (document.body.contains(input)) {
          document.body.removeChild(input);
        }
      };

      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('blur', handleBlur);

      return () => {
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('blur', handleBlur);
        if (document.body.contains(input)) {
          document.body.removeChild(input);
        }
      };
    }
  }, [isEditing, editText, plan, fontFamily, color, onUpdate]);

  const handleClick = () => {
    if (!plan.completed) {
      setIsEditing(true);
      onClick(plan.id);
    }
  };

  return (
    <Text
      ref={textRef}
      x={plan.x}
      y={plan.y}
      text={`- ${plan.text}`}
      fontSize={32}
      fontFamily={fontFamily}
      fill={color}
      opacity={plan.completed ? 0.4 : 1}
      visible={!isEditing}
      onClick={handleClick}
      onTap={handleClick}
      hitStrokeWidth={20}
      style={{ cursor: plan.completed ? 'default' : 'text' }}
    />
  );
};

export default EditableText;