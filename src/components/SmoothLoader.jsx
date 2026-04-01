import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const colors = ["#70286f", "#541e53", "#381437", "#1c0a1c", "#141414"];
const boxSize = '90vmin'; // Todos los recuadros comparten el tamaño grande original

export default function SmoothLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // A los 3.2 segundos el último recuadro cubre completamente la pantalla
    const timer = setTimeout(() => setIsVisible(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const boxStyles = {
    position: 'absolute', 
    width: boxSize, 
    height: boxSize, 
    borderRadius: '24px' // El radius elegante que te gustaba
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           className="fd-smooth-loader"
           style={{
             position: 'fixed',
             top: 0, 
             left: 0,
             width: '100vw', 
             height: '100vh',
             backgroundColor: '#ffffff', // Fondo principal blanco
             zIndex: 9999,
             pointerEvents: 'none',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             overflow: 'hidden'
           }}
           exit={{ opacity: 0, transition: { duration: 0.6 } }} // Fade out suave
        >
          {/* Recuadro 1 */}
          <motion.div
             style={{ ...boxStyles, backgroundColor: colors[0], zIndex: 1 }}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.3 }}
          />
          {/* Recuadro 2 */}
          <motion.div
             style={{ ...boxStyles, backgroundColor: colors[1], zIndex: 2 }}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.4, duration: 0.6, type: 'spring', bounce: 0.3 }}
          />
          {/* Recuadro 3 */}
          <motion.div
             style={{ ...boxStyles, backgroundColor: colors[2], zIndex: 3 }}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.6, duration: 0.6, type: 'spring', bounce: 0.3 }}
          />
          {/* Recuadro 4 */}
          <motion.div
             style={{ ...boxStyles, backgroundColor: colors[3], zIndex: 4 }}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.8, duration: 0.6, type: 'spring', bounce: 0.3 }}
          />
          {/* Recuadro 5 (El último que se expande del tamaño de la pantalla) */}
          <motion.div
             style={{ ...boxStyles, backgroundColor: colors[4], zIndex: 5 }}
             initial={{ scale: 0 }}
             animate={{ scale: [0, 1, 1, 20] }} // Crece a 1, pausa, y explota a 20x
             transition={{ 
                duration: 2.2, 
                times: [0, 0.25, 0.6, 1],
                ease: "easeInOut",
                delay: 1.0 
             }}
          />

          {/* Logo Blanco superpuesto al último recuadro */}
          <motion.img 
             src="/logo_blanco.png"
             alt="Logo Fernando Delvalle"
             style={{ position: 'absolute', width: '50vmin', height: 'auto', objectFit: 'contain', zIndex: 6 }}
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: [0, 1, 1, 0.8], opacity: [0, 1, 1, 0] }}
             transition={{
                 duration: 2.2,
                 times: [0, 0.25, 0.5, 0.58], 
                 delay: 1.0,
                 ease: "easeInOut"
             }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
