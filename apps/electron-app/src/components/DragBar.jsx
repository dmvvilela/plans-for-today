import React, { useState, useEffect } from 'react';
import { GripHorizontal } from 'lucide-react';

const DragBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouseNearTop, setMouseNearTop] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      const nearTop = e.clientY < 60;
      setMouseNearTop(nearTop);

      if (nearTop) {
        setIsVisible(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`drag-bar ${isVisible ? 'visible' : ''}`}
      style={{ WebkitAppRegion: 'drag' }}
      onMouseEnter={() => setIsVisible(true)}
    >
      <GripHorizontal size={20} />
    </div>
  );
};

export default DragBar;