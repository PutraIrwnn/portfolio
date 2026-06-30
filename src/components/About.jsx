import { motion, useReducedMotion } from 'framer-motion';

const funFacts = [
  { emoji: '🌌', title: 'Interstellar is peak cinema', sub: 'Nolan, come on' },
  { emoji: '☕', title: 'Coffee-driven development', sub: 'Ngopi dulu baru ngoding' },
  { emoji: '🛵', title: 'Motoran as therapy', sub: 'Karawang streets know me' },
  { emoji: '🎵', title: 'EDM on Spotify loop', sub: 'Flow state activated' },
  { emoji: '📚', title: 'Self-taught & self-driven', sub: 'Always learning something new' },
  { emoji: '🧠', title: 'Execute first, think later', sub: 'Prototype > perfect plan' },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5 },
      };

  return (
    <section id="about" className="bg-white-base py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        {/* Text Column */}
        <motion.div {...fadeIn}>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-fluid-blue">
            About Me
          </p>
          <h2
            className="font-display text-3xl font-bold leading-tight text-space-navy md:text-4xl"
            style={{ letterSpacing: '-2px' }}
          >
            Curious mind.
            <br />
            Systems thinker.
            <br />
            Karawang-born.
          </h2>
          <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
            <p>
              I&apos;m Putra — a semester-5 Information Systems student at UBP
              Karawang who builds real products, not just class assignments. My
              thing is translating messy business problems into clean, working
              software.
            </p>
            <p>
              I&apos;m at my best when I&apos;m deep in a feature idea that came
              purely from my own head. Time just disappears. That&apos;s the
              feeling I chase every project.
            </p>
            <p>
              When I&apos;m not coding? Black coffee, motorcycling around
              Karawang, or rewatching Interstellar for the nth time wondering
              about the cosmos.
            </p>
          </div>
        </motion.div>

        {/* Fun Facts Grid */}
        <div className="grid grid-cols-2 gap-4 content-start">
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '-60px' },
                    transition: { duration: 0.4, delay: i * 0.08 },
                  })}
              className="group rounded-2xl bg-ice-blue/30 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-fluid-blue/10 cursor-default"
            >
              <span className="text-2xl" style={{fontFamily:'"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'}}>{fact.emoji}</span>
              <p className="mt-2 text-sm font-semibold text-space-navy">
                {fact.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{fact.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
