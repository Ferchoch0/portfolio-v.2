import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Framer Motion values for smooth interpolation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rotate = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 600, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothRotate = useSpring(rotate, { damping: 20, stiffness: 400, mass: 0.5 });
  
  // A second spring for the outer ring (slower to simulate gravity/drag)
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 350, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 350, mass: 0.8 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouseMove = (e) => {
      if (!visible) setVisible(true);
      
      const prevX = cursorX.get();
      const prevY = cursorY.get();
      
      if (prevX !== -100 && prevY !== -100) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        
        // Only update rotation if moved enough to avoid jitter
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            let currentAngle = rotate.get();
            let targetAngle = angle + 90;
            
            let diff = targetAngle - (currentAngle % 360);
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            
            rotate.set(currentAngle + diff);
        }
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"], .clickable');
      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className={`custom-cursor-core ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        animate={{ scale: hovered ? 0.1 : 1 }}
        style={{
          x: smoothX,
          y: smoothY,
          rotate: smoothRotate,
        }}
      />
      <motion.div
        className={`custom-cursor-ring ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
      />
    </>
  );
};

export default CustomCursor;
