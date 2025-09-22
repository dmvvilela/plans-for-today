// Generate hand-drawn strikethrough path
export const generateStrikethrough = (startX, startY, endX, endY) => {
  const points = [];
  const segments = 20;
  const amplitude = 3;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;

    // Add some random wobble for hand-drawn effect
    const wobbleY = Math.sin(t * Math.PI * 4) * amplitude + (Math.random() - 0.5) * 2;
    const wobbleX = (Math.random() - 0.5) * 1;

    points.push(x + wobbleX, y + wobbleY);
  }

  return points;
};

// Calculate strike intensity based on speed and distance
export const calculateStrikeIntensity = (points) => {
  if (points.length < 4) return 'none';

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 2; i < points.length; i += 2) {
    const dx = points[i] - points[i - 2];
    const dy = points[i + 1] - points[i - 1];
    totalDistance += Math.sqrt(dx * dx + dy * dy);
  }

  // Calculate speed (distance / number of points)
  const speed = totalDistance / (points.length / 2);

  // High speed or long distance = hard strike (delete)
  // Low speed or short distance = gentle strike (complete)
  if (speed > 15 || totalDistance > 400) {
    return 'hard';
  } else if (totalDistance > 50) {
    return 'gentle';
  }

  return 'none';
};