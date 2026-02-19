import { motion } from 'framer-motion'
import type { Education as EducationType } from '@/types/portfolio'

const Education = ({ education }: { education: EducationType[] }) => {
    return (
        <section id="education" className="space-y-6 pt-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-full flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-zinc-400/20 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 font-medium tracking-wide text-zinc-600 dark:text-zinc-200"
                    >
                        Education
                    </motion.div>
                </div>
            </div>
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
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0">
                                <h3 className="text-xs font-bold leading-tight">
                                    {edu.school}
                                </h3>
                                <span className="text-[11px] text-muted-foreground tabular-nums">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="text-xs font-medium leading-tight text-muted-foreground/90">
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
