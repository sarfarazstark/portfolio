import { motion } from 'framer-motion'
import type { Education as EducationType } from '@/types/portfolio'

const Education = ({ education }: { education: EducationType[] }) => {
    return (
        <section id="education" className="space-y-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-semibold tracking-tight"
            >
                Education
            </motion.h2>
            <div className="space-y-2">
                {education.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative flex gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-all"
                    >
                        <div className="relative flex shrink-0 overflow-hidden size-10 border border-zinc-400/40 rounded-full shadow-lg ring-4 ring-muted bg-white">
                            <img
                                src={edu.logo}
                                alt={edu.school}
                                className="aspect-square h-full w-full object-contain p-1.5"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold leading-tight">
                                    {edu.school}
                                </h3>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="text-sm font-medium leading-tight text-muted-foreground/90">
                                {edu.degree}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Education
