// Check if a point is near a line segment
const pointNearLine = (px, py, x1, y1, x2, y2, threshold = 10) => {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= threshold;
};

// Check if eraser path intersects with a drawing
export const checkEraserIntersection = (eraserPoints, drawingPoints, threshold = 10) => {
  // Check each segment of the drawing
  for (let i = 0; i < drawingPoints.length - 2; i += 2) {
    const x1 = drawingPoints[i];
    const y1 = drawingPoints[i + 1];
    const x2 = drawingPoints[i + 2];
    const y2 = drawingPoints[i + 3];

    // Check if any eraser point is near this segment
    for (let j = 0; j < eraserPoints.length; j += 2) {
      const ex = eraserPoints[j];
      const ey = eraserPoints[j + 1];

      if (pointNearLine(ex, ey, x1, y1, x2, y2, threshold)) {
        return true;
      }
    }
  }

  return false;
};

// Split a drawing into segments, removing the erased portion
export const splitDrawing = (drawingPoints, eraserPoints, threshold = 15) => {
  const segments = [];
  let currentSegment = [];

  for (let i = 0; i < drawingPoints.length - 2; i += 2) {
    const x1 = drawingPoints[i];
    const y1 = drawingPoints[i + 1];
    const x2 = drawingPoints[i + 2];
    const y2 = drawingPoints[i + 3];

    // Check if this segment should be erased
    let shouldErase = false;
    for (let j = 0; j < eraserPoints.length; j += 2) {
      const ex = eraserPoints[j];
      const ey = eraserPoints[j + 1];

      if (pointNearLine(ex, ey, x1, y1, x2, y2, threshold)) {
        shouldErase = true;
        break;
      }
    }

    if (!shouldErase) {
      if (currentSegment.length === 0) {
        currentSegment.push(x1, y1);
      }
      currentSegment.push(x2, y2);
    } else {
      // Save current segment if it has points
      if (currentSegment.length > 2) {
        segments.push([...currentSegment]);
      }
      currentSegment = [];
    }
  }

  // Save final segment
  if (currentSegment.length > 2) {
    segments.push(currentSegment);
  }

  return segments;
};