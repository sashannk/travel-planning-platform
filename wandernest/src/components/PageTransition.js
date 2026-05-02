import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}
