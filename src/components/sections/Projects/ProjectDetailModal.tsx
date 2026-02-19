import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, Globe, Github, Calendar, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/portfolio'

interface ProjectDetailModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 12 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 8,
        transition: { duration: 0.3, ease: 'easeInOut' },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
}

export default function ProjectDetailModal({
    project,
    isOpen,
    onClose,
}: ProjectDetailModalProps) {
    return (
        <AnimatePresence>
            {isOpen && project && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-2xl bg-white dark:bg-zinc-950 border border-zinc-400/20 flex flex-col"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden shrink-0 border-b border-zinc-400/10"
                        >
                            <motion.img
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-6 sm:p-8">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                                >
                                    {project.title}
                                </motion.h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-20 rounded-full bg-black/30 p-2.5 text-white/90 hover:bg-black/50 hover:text-white transition-all backdrop-blur-md border border-white/20"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>

                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                            <div className="space-y-8">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-wrap items-center justify-between gap-4"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-zinc-400/10 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-400/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {project.period}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="space-y-3"
                                >
                                    <h3 className="text-xs font-bold text-zinc-400 tracking-wide">
                                        Project overview
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[14px]">
                                        {project.description}
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="space-y-4"
                                >
                                    <h3 className="text-xs font-bold text-zinc-400 tracking-wide">
                                        Technologies used
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {project.techStack.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-2.5 rounded-xl border border-zinc-400/10 bg-zinc-400/5 px-3 py-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:border-zinc-400/20"
                                            >
                                                <div className="h-1 w-1 rounded-full bg-zinc-400/60" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="pt-6 flex flex-col sm:flex-row gap-3"
                                >
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-400/20 bg-zinc-400/5 px-6 py-3.5 text-sm font-semibold transition-all hover:border-zinc-400/40 hover:bg-zinc-400/10 dark:text-zinc-200"
                                        >
                                            <Github className="h-4 w-4" />
                                            View source code
                                            <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )}
                                    {project.links.live &&
                                        project.links.live !== '#' && (
                                            <a
                                                href={project.links.live}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-[1.4] flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3.5 text-sm font-semibold text-zinc-100 dark:text-zinc-900 transition-all hover:scale-[0.99] hover:opacity-90 shadow-xl"
                                            >
                                                <Globe className="h-4 w-4" />
                                                Launch live site
                                                <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
