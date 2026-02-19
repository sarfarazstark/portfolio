import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Experience as ExperienceType } from '@/types/portfolio'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const Experience = ({ experiences }: { experiences: ExperienceType[] }) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([])

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )
    }

    return (
        <section id="work" className="space-y-6 pt-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-full flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-zinc-400/20 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 font-medium tracking-wide text-zinc-600 dark:text-zinc-200"
                    >
                        Work experience
                    </motion.div>
                </div>
            </div>
            <div className="space-y-2">
                {experiences.map((exp, index) => {
                    const isExpanded = expandedIds.includes(exp.id)
                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative flex gap-4 p-2.5 sm:p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-pointer"
                            onClick={() => toggleExpand(exp.id)}
                        >
                            <div className="relative flex shrink-0 overflow-hidden size-10 border border-zinc-400/40 rounded-full shadow-lg ring-4 ring-muted bg-white">
                                <img
                                    src={exp.logo}
                                    alt={exp.company}
                                    className="aspect-square h-full w-full object-contain p-1.5"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0">
                                    <h3 className="text-xs font-bold leading-tight">
                                        {exp.company}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-muted-foreground tabular-nums">
                                            {exp.period}
                                        </span>
                                        <ChevronDown
                                            size={14}
                                            className={cn(
                                                'text-muted-foreground transition-transform duration-300',
                                                isExpanded && 'rotate-180',
                                            )}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs font-medium leading-tight text-muted-foreground/90">
                                    {exp.role}
                                </p>
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                                marginTop: 0,
                                            }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                                marginTop: 8,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                                marginTop: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                                                {exp.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

export default Experience
