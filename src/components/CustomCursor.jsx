import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')) {
        document.querySelector('.custom-cursor-ring')?.classList.add('cursor-active');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')) {
        document.querySelector('.custom-cursor-ring')?.classList.remove('cursor-active');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x,
          y,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid #E63946',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#E63946',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  );
}
