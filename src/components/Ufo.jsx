import { motion, useReducedMotion } from 'framer-motion';

export default function Ufo({ constraintsRef }) {
  const prefersReducedMotion = useReducedMotion();

  // Floating animation for idle state
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -12, 0],
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: prefersReducedMotion ? 0 : [0, -12, 0] }}
      transition={{ 
        opacity: { duration: 0.8 }, 
        scale: { duration: 0.8, type: 'spring' },
        y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
      }}
      // Position it near the top right so it's always visible on mobile regardless of section height
      className="absolute right-4 top-24 z-50 flex cursor-grab flex-col items-center justify-center md:right-12 lg:right-[15%] lg:top-[15%] select-none"
      style={{ touchAction: 'none', WebkitUserSelect: 'none' }} // Crucial for mobile drag
      aria-label="Interactive UFO"
    >
      {/* UFO Spaceship SVG */}
      <div className="relative z-10 w-28">
        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" draggable="false">
          {/* Beam Glow Emitter (bottom ring) */}
          <ellipse cx="50" cy="45" rx="18" ry="6" fill="#7DD3FC" className="animate-pulse" />
          
          {/* Glass Dome */}
          <path d="M25 30 C25 5, 75 5, 75 30 Z" fill="#BAE6FD" opacity="0.6" stroke="#E0E7FF" strokeWidth="2" />
          {/* Dome reflection highlight */}
          <path d="M35 25 C35 15, 60 15, 60 25" stroke="#F0F9FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          
          {/* Alien passenger */}
          <circle cx="50" cy="22" r="5" fill="#4ADE80" />
          {/* Alien Eyes */}
          <ellipse cx="48" cy="21" rx="1.5" ry="2.5" fill="#0A0F1E" transform="rotate(-25 48 21)" />
          <ellipse cx="52" cy="21" rx="1.5" ry="2.5" fill="#0A0F1E" transform="rotate(25 52 21)" />

          {/* Saucer Lower Body */}
          <ellipse cx="50" cy="35" rx="45" ry="12" fill="#94A3B8" stroke="#cbd5e1" strokeWidth="1" />
          {/* Saucer Upper Rim */}
          <ellipse cx="50" cy="32" rx="45" ry="12" fill="#E2E8F0" />
          
          {/* Navigation Lights (Blinking) */}
          <circle cx="15" cy="32" r="2.5" fill="#FDE047" className="animate-pulse" />
          <circle cx="30" cy="36" r="2.5" fill="#F87171" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <circle cx="50" cy="38" r="2.5" fill="#4ADE80" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="70" cy="36" r="2.5" fill="#60A5FA" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <circle cx="85" cy="32" r="2.5" fill="#FDE047" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
        </svg>
      </div>

      {/* Abduction Beam */}
      <div 
        className="pointer-events-none -mt-3 h-56 w-48 origin-top opacity-50"
        style={{
          background: 'linear-gradient(to bottom, rgba(125, 211, 252, 0.9) 0%, rgba(125, 211, 252, 0) 100%)',
          clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
          animation: prefersReducedMotion ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
    </motion.div>
  );
}
