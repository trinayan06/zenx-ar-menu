import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function TiltCard({ children, className, style, onClick }) {
  const cardRef = useRef(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotation 8 degrees
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className={`cursor-pointer ${className}`}
    >
      <div style={{ transform: 'translateZ(10px)', height: '100%', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
