import { motion } from 'framer-motion';

export default function TiltCard({ children, className = '', ...props }) {
  return (
    <motion.div
      {...props}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
