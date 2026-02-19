import { motion } from 'framer-motion'
import type { Profile } from '@/types/portfolio'

const Hero = ({ profile, about }: { profile: Profile; about: string }) => {
    return (
        <section id="home" className="space-y-6">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
                        >
                            Hi, I'm Sarfaraz
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed"
                        >
                            {profile.bio}
                        </motion.p>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative flex shrink-0 overflow-hidden size-20 sm:size-24 lg:size-32 border border-zinc-400/40 rounded-full shadow-lg ring-4 ring-muted"
                >
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        loading="lazy"
                        className="aspect-square h-full w-full object-cover"
                    />
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="prose prose-zinc dark:prose-invert max-w-none mt-12"
            >
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                    {about}
                </p>
            </motion.div>
        </section>
    )
}

export default Hero
