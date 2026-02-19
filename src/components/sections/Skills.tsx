import { motion } from 'framer-motion'
import type { Skill } from '@/types/portfolio'

const Skills = ({ skills }: { skills: Skill[] }) => {
    return (
        <section id="skills" className="space-y-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-semibold tracking-tight"
            >
                Skills
            </motion.h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="inline-flex items-center gap-2 rounded-md border border-muted-foreground/20 bg-transparent px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/30"
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
