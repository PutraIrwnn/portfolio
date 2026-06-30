import { motion, useReducedMotion } from 'framer-motion';

export default function Contact() {
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
    <section id="contact" className="bg-light-blue-tint py-24">
      <motion.div
        {...fadeIn}
        className="mx-auto max-w-xl px-6 text-center"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-fluid-blue">
          Contact
        </p>
        <h2
          className="font-display text-3xl font-bold text-space-navy md:text-4xl"
          style={{ letterSpacing: '-2px' }}
        >
          Let&apos;s build something worth shipping.
        </h2>
        <p className="mt-6 text-gray-600 leading-relaxed">
          Open for internship — fullstack or frontend. I move fast, I figure
          things out, and I&apos;ll ask good questions when I&apos;m stuck.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:satyaputra2006@gmail.com"
            className="inline-flex items-center rounded-full bg-space-navy px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            Email Me
          </a>
          <a
            href="https://github.com/PutraIrwnn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border-2 border-space-navy px-8 py-3.5 text-sm font-semibold text-space-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
