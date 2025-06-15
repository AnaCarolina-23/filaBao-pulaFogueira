import React, { forwardRef } from "react";
import dinoImg from "../assets/caipira1.png";
import caipiraPulando from "../assets/caipira2.png";
import "./Style.css";

interface DinoProps {
  isJumping: boolean;
}

const Dino = forwardRef<HTMLDivElement, DinoProps>(({ isJumping }, ref) => {
  return (
    <div ref={ref} className={`dino ${isJumping ? "jump" : ""}`}>
      <img src={isJumping ? caipiraPulando : dinoImg} alt="Caipira" />
    </div>
  );
});

Dino.displayName = "Dino";

export default Dino;