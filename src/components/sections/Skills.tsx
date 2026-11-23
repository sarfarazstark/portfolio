import { motion } from 'framer-motion'
import type { Skill } from '@/types/portfolio'
import { Chip, SectionHeader } from '@/components/ui/sheet'

const Skills = ({ skills }: { skills: Skill[] }) => {
    return (
        <section id="skills">
            <SectionHeader>Skills</SectionHeader>
            <div className="hl flex flex-wrap gap-x-1.75 gap-y-1.75 px-4 py-5 sm:px-6">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10, scale: 0.82 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                            duration: 0.55,
                            delay: index * 0.038,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                    >
                        <Chip
                            icon={
                                skill.icon && (
                                    <i
                                        className={`devicon-${skill.icon}-${
                                            skill.icon === 'electron'
                                                ? 'original'
                                                : 'plain'
                                        } colored text-base`}
                                    />
                                )
                            }
                        >
                            {skill.name}
                        </Chip>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Skills
