import { motion } from 'framer-motion'
import type { Skill } from '@/types/portfolio'

const Skills = ({ skills }: { skills: Skill[] }) => {
    return (
        <section id="skills" className="space-y-6 pt-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-full flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-zinc-400/20 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 font-medium tracking-wide text-zinc-600 dark:text-zinc-200"
                    >
                        Skills
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="inline-flex items-center gap-2 rounded-sm border border-muted-foreground/20 bg-transparent px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/30"
                    >
                        {skill.icon && (
                            <i
                                className={`devicon-${skill.icon}-plain colored text-sm`}
                            />
                        )}
                        <span className="leading-none">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Skills
