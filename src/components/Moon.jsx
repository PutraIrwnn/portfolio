import { motion, useReducedMotion } from 'framer-motion';

export default function Moon() {
  const prefersReducedMotion = useReducedMotion();

  const alienVariants = prefersReducedMotion
    ? {
        initial: { y: 20, opacity: 0 },
        hover: { y: -45, opacity: 1 },
      }
    : {
        initial: { y: 20, rotate: -15, opacity: 0, scale: 0.8 },
        hover: { y: -45, rotate: 5, opacity: 1, scale: 1 },
      };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="hover"
      className="absolute left-6 top-16 z-20 flex cursor-help flex-col items-center md:left-16 lg:left-32 lg:top-24 select-none"
      aria-label="Interactive Moon Easter Egg"
    >
      {/* The Peeking Alien */}
      <motion.div
        variants={alienVariants}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2"
      >
        <svg viewBox="0 0 100 100" className="h-14 w-14 drop-shadow-md">
          {/* Hand waving */}
          <motion.path
            d="M 80 70 Q 100 60 90 40 Q 80 50 75 70"
            fill="#4ADE80"
            variants={{
              initial: { rotate: 0, transformOrigin: '75px 70px' },
              hover: { rotate: [0, 20, -10, 20, 0], transition: { delay: 0.2, duration: 1.5, repeat: Infinity, repeatType: 'reverse' } }
            }}
          />
          {/* Alien Head */}
          <path
            d="M50 20 C 20 20, 15 55, 25 80 C 35 95, 65 95, 75 80 C 85 55, 80 20, 50 20 Z"
            fill="#4ADE80"
          />
          {/* Left Eye */}
          <ellipse cx="35" cy="55" rx="10" ry="16" transform="rotate(-20 35 55)" fill="#0A0F1E" />
          {/* Right Eye */}
          <ellipse cx="65" cy="55" rx="10" ry="16" transform="rotate(20 65 55)" fill="#0A0F1E" />
          {/* Eye highlights */}
          <circle cx="33" cy="48" r="2.5" fill="white" />
          <circle cx="67" cy="48" r="2.5" fill="white" />
        </svg>
      </motion.div>

      {/* The Moon */}
      <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full bg-[#E2E8F0] shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/10 md:h-28 md:w-28">
        {/* Inner glow for 3D effect */}
        <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)]" />
        
        {/* Craters */}
        <div className="absolute left-[15%] top-[20%] h-4 w-4 rounded-full bg-[#CBD5E1] opacity-70 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] md:h-6 md:w-6" />
        <div className="absolute right-[20%] top-[40%] h-6 w-6 rounded-full bg-[#CBD5E1] opacity-60 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] md:h-8 md:w-8" />
        <div className="absolute bottom-[15%] left-[30%] h-3 w-3 rounded-full bg-[#CBD5E1] opacity-50 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] md:h-5 md:w-5" />
        <div className="absolute bottom-[35%] right-[15%] h-2 w-2 rounded-full bg-[#CBD5E1] opacity-80 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] md:h-3 md:w-3" />
        <div className="absolute left-[10%] top-[50%] h-2.5 w-2.5 rounded-full bg-[#CBD5E1] opacity-40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] md:h-4 md:w-4" />
      </div>
    </motion.div>
  );
}
