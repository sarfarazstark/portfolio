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
                {skills.map((skill, index) => {
                    const iconUrl = `https://raw.githubusercontent.com/xandemon/developer-icons/main/icons/${skill.icon}.svg`

                    return (
                        <motion.div
                            key={`${skill.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="inline-flex items-center gap-2 rounded-md border border-muted-foreground/20 bg-transparent px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/30"
                        >
                            <img
                                src={iconUrl}
                                alt={`${skill.name} icon`}
                                className="w-4 h-4 object-contain shrink-0"
                                onError={(e) => {
                                    ;(
                                        e.target as HTMLImageElement
                                    ).style.display = 'none'
                                }}
                            />
                            <span className="leading-none">{skill.name}</span>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

export default Skills
