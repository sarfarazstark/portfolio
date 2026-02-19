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
        <section id="work" className="space-y-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-semibold tracking-tight"
            >
                Work Experience
            </motion.h2>
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
                            className="group relative flex gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-pointer"
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
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold leading-tight">
                                        {exp.company}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground tabular-nums">
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
                                <p className="text-sm font-medium leading-tight text-muted-foreground/90">
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
                                            <p className="text-sm text-muted-foreground leading-relaxed pt-1">
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
