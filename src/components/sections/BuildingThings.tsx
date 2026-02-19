import { motion } from 'framer-motion';

const BuildingThings = () => {
  return (
    <section className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl font-semibold tracking-tight"
      >
        I like building things
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground leading-relaxed"
      >
        I am a lifelong learner and I love to build things. From small experiments to full-scale applications, I am always exploring new technologies and pushing the boundaries of what's possible on the web.
      </motion.p>
    </section>
  );
};

export default BuildingThings;
