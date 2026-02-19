import { motion } from 'framer-motion';
import type { Profile } from '../../types/portfolio';

const Hero = ({ profile }: { profile: Profile }) => {
  return (
    <section id="home" className="space-y-6">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2 flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Hi, I'm Sarfaraz 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            {profile.role} based in {profile.location}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            {profile.bio}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex shrink-0 overflow-hidden size-24 md:size-32 border border-zinc-400/40 rounded-full shadow-lg ring-4 ring-muted"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            loading="lazy"
            className="aspect-square h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
