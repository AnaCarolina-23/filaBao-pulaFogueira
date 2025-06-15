import { useState, useEffect, useRef } from "react";
import Dino from "./Dino";
import Obstacle from "./Obstacle";
import Score from "./Score";
import './Style.css';


export default function Game() {
  const [jumping, setJumping] = useState(false);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dinoRef = useRef<HTMLDivElement>(null);
  const obstacleRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleJump = () => {
  if (!jumping && !gameOver) {
    setJumping(true);

    const isMobile = window.innerWidth <= 768;
    const jumpDuration = isMobile ? 600 : 300;  // tempo maior no mobile

    setTimeout(() => setJumping(false), jumpDuration);
  }
};


  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setObstacles([]);
  };

  // Criar obstáculos
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstacles((prev) => [...prev, Date.now()]);
    }, 1800);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Pontuação
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setScore((s) => s + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Checar colisões
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const dino = dinoRef.current;
      if (!dino) return;
      const dinoRect = dino.getBoundingClientRect();

      for (const [, obstacle] of obstacleRefs.current.entries()) {
        const obsRect = obstacle.getBoundingClientRect();

        const collided =
          dinoRect.left < obsRect.right &&
          dinoRect.right > obsRect.left &&
          dinoRect.bottom > obsRect.top;

        if (collided) {
          setGameOver(true);
          break;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, [obstacles, gameOver]);

  return (
    <div onClick={handleJump} className="game-container">
  <Dino isJumping={jumping} ref={dinoRef} />
  {obstacles.map((id) => (
    <Obstacle
      key={id}
      id={id}
      remove={() => setObstacles((prev) => prev.filter((obsId) => obsId !== id))}
      ref={(el) => {
        if (el) obstacleRefs.current.set(id, el);
        else obstacleRefs.current.delete(id);
      }}
    />
  ))}
  <Score value={score} />
  {gameOver && (
    <div className="game-over">
      <h1 className="game-over-title">Game Over</h1>
      <button onClick={restartGame} className="retry-button">
        Tentar de novo
      </button>
    </div>
  )}
</div>
  );
}
