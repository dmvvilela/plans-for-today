import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Text, Line, Rect } from 'react-konva';
import EditableText from './EditableText';
import useBoardStore from '../store/boardStore';
import { generateStrikethrough, calculateStrikeIntensity } from '../utils/strikethrough';

const WhiteboardCanvas = () => {
  const stageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);

  const {
    title,
    date,
    plans,
    drawings,
    currentFont,
    currentColor,
    togglePlan,
    removePlan,
    addPlan,
    updatePlan,
    setEditingId,
    isDrawingMode,
    isEraserMode,
    addDrawing,
    eraseDrawings
  } = useBoardStore();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFontFamily = () => {
    switch (currentFont) {
      case 'caveat': return 'Caveat, cursive';
      case 'kalam': return 'Kalam, cursive';
      case 'architect': return 'Architects Daughter, cursive';
      case 'indie': return 'Indie Flower, cursive';
      case 'marker': return 'Permanent Marker, cursive';
      case 'shadows': return 'Shadows Into Light, cursive';
      default: return 'Caveat, cursive';
    }
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);
    setCurrentLine([pos.x, pos.y]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setCurrentLine([...currentLine, point.x, point.y]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (isEraserMode) {
      // In eraser mode, erase parts of drawings
      if (currentLine.length > 2) {
        eraseDrawings(currentLine);
      }
    } else if (isDrawingMode) {
      // In drawing mode, save the stroke
      if (currentLine.length > 2) {
        addDrawing(currentLine);
      }
    } else {
      // In normal mode, check for strikethrough
      const intensity = calculateStrikeIntensity(currentLine);

      // Check if line crosses any plan item
      plans.forEach(plan => {
        const planY = plan.y;
        const planX = plan.x;
        const planWidth = 600;

        // Simple intersection check
        const lineMinY = Math.min(...currentLine.filter((_, i) => i % 2 === 1));
        const lineMaxY = Math.max(...currentLine.filter((_, i) => i % 2 === 1));
        const lineMinX = Math.min(...currentLine.filter((_, i) => i % 2 === 0));
        const lineMaxX = Math.max(...currentLine.filter((_, i) => i % 2 === 0));

        if (
          lineMinY <= planY + 20 && lineMaxY >= planY - 20 &&
          lineMinX <= planX + planWidth && lineMaxX >= planX
        ) {
          if (intensity === 'hard') {
            // Hard strike - delete the item
            removePlan(plan.id);
          } else if (intensity === 'gentle') {
            // Gentle strike - mark as complete with hand-drawn strikethrough
            const strikethrough = generateStrikethrough(
              planX - 10,
              planY + 16,
              planX + 600,
              planY + 16
            );
            togglePlan(plan.id, strikethrough);
          }
        }
      });
    }

    setCurrentLine([]);
  };

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      style={{ cursor: isEraserMode ? 'grab' : isDrawingMode ? 'crosshair' : isDrawing ? 'crosshair' : 'default' }}
    >
      <Layer>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill="#fafaf8"
        />

        {/* Title */}
        <Text
          x={80}
          y={40}
          text={title}
          fontSize={48}
          fontFamily={getFontFamily()}
          fill={isDrawingMode ? '#2c3e50' : currentColor}
          fontStyle="bold"
        />

        {/* Date */}
        <Text
          x={80}
          y={100}
          text={date}
          fontSize={24}
          fontFamily={getFontFamily()}
          fill={isDrawingMode ? '#2c3e50' : currentColor}
          opacity={0.7}
        />

        {/* Saved drawings */}
        {drawings.map((drawing) => (
          <Line
            key={drawing.id}
            points={drawing.points}
            stroke={drawing.color}
            strokeWidth={drawing.strokeWidth}
            lineCap="round"
            lineJoin="round"
            opacity={0.8}
            tension={0.1}
          />
        ))}

        {/* Plans */}
        {plans.map((plan) => (
          <React.Fragment key={plan.id}>
            <EditableText
              plan={plan}
              fontFamily={getFontFamily()}
              color={plan.color || currentColor}
              onUpdate={updatePlan}
              onClick={setEditingId}
            />
            {plan.completed && plan.strikethrough && (
              <Line
                points={plan.strikethrough}
                stroke={plan.color || currentColor}
                strokeWidth={3}
                opacity={0.6}
                lineCap="round"
                lineJoin="round"
                tension={0.2}
              />
            )}
          </React.Fragment>
        ))}

        {/* Current drawing/eraser line */}
        {currentLine.length > 0 && (
          <Line
            points={currentLine}
            stroke={isEraserMode ? '#ff6b6b' : currentColor}
            strokeWidth={isEraserMode ? 20 : 4}
            lineCap="round"
            lineJoin="round"
            opacity={isEraserMode ? 0.3 : 0.8}
            dash={isEraserMode ? [10, 5] : []}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default WhiteboardCanvas;