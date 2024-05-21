import React, { useEffect, useRef } from 'react';
import "./Stars.css";

function Stars({children}) {
    const COLORS = ["#fff2", "#fff4", "#fff7", "#fffc"];
    const space1Ref = useRef(null);
    const space2Ref = useRef(null);
    const space3Ref = useRef(null);
  
    const generateSpaceLayer = (size, totalStars, duration, ref) => {
      const layer = [];
      for (let i = 0; i < totalStars; i++) {
        const color = COLORS[~~(Math.random() * COLORS.length)];
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}`);
      }
      const container = ref.current;
      container.style.setProperty("--size", size);
      container.style.setProperty("--duration", duration);
      container.style.setProperty("--space-layer", layer.join(","));
    }
  
    useEffect(() => {
      generateSpaceLayer("3px", 250, "20s", space1Ref);
      generateSpaceLayer("3px", 100, "20s", space2Ref);
      generateSpaceLayer("6px", 25, "15s", space3Ref);
    }, []);
  
    return (
      <div className="container">
        <div className="space space-1" ref={space1Ref}></div>
        <div className="space space-2" ref={space2Ref}></div>
        <div className="space space-3" ref={space3Ref}></div>
        {children}
      </div>
    )
  }
export default Stars;
