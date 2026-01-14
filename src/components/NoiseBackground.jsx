import React, { useRef, useEffect } from "react";

const TVNoise = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const drawNoise = () => {
      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const value = Math.random() < 0.8 ? 0xff000000 : 0xffffffff;
        buffer[i] = value;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let animationFrameId;
    const render = () => {
      drawNoise();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99,
        opacity: 0.2,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
};

export default TVNoise;
