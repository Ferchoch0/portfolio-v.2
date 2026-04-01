import React, { useMemo } from "react";

const TVNoise = () => {
  const noiseUrl = useMemo(() => {
    // Generate a small chunk of noise once, rather than every frame
    const canvas = document.createElement("canvas");
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(150, 150);
    const buffer = new Uint32Array(imgData.data.buffer);
    
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.random() < 0.8 ? 0xff000000 : 0xffffffff;
    }
    
    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }, []);

  return (
    <>
      <style>{`
        @keyframes tvNoise {
          0%, 100% { transform: translate3d(0, 0, 0); }
          10% { transform: translate3d(-5%, -10%, 0); }
          20% { transform: translate3d(-15%, 5%, 0); }
          30% { transform: translate3d(7%, -25%, 0); }
          40% { transform: translate3d(-5%, 25%, 0); }
          50% { transform: translate3d(-15%, 10%, 0); }
          60% { transform: translate3d(15%, 0%, 0); }
          70% { transform: translate3d(0%, 15%, 0); }
          80% { transform: translate3d(3%, 35%, 0); }
          90% { transform: translate3d(-10%, 10%, 0); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          zIndex: 99,
          opacity: 0.15,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          backgroundImage: `url(${noiseUrl})`,
          backgroundRepeat: "repeat",
          animation: "tvNoise 0.2s infinite steps(2)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
};

export default TVNoise;
