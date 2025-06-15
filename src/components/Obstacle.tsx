import './Style.css';
import React, { useEffect, useState, forwardRef } from 'react';

interface ObstacleProps {
  id: number;
  remove: () => void;
}

// Tipagem explícita do componente com forwardRef
const Obstacle = forwardRef<HTMLDivElement, ObstacleProps>(({ remove }, ref) => {
  const [left, setLeft] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft((prev) => {
        if (prev <= -10) {
          remove();
          return prev;
        }
        return prev - 1;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [remove]);

  return (
    <div
      ref={ref}
      className="obstacle"
      style={{ left: `${left}%` }}
    />
  );
});

Obstacle.displayName = 'Obstacle';

export default Obstacle;
