import { motion } from 'framer-motion'
import { Code, ArrowUpLeft } from 'lucide-react'
import type { Project } from '@/types/portfolio'

interface ProjectCardProps {
    project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-zinc-400/20 bg-zinc-400/5 transition-all hover:bg-zinc-400/10 hover:shadow-xl hover:border-zinc-400/40 dark:bg-zinc-900/50"
        >
            <div className="relative aspect-video overflow-hidden shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Top-right aligned action buttons */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                    {project.links.live && project.links.live !== '#' && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/50 text-white backdrop-blur-md border border-white/10 hover:bg-zinc-950/80 transition-colors"
                            title="Live Preview"
                        >
                            <ArrowUpLeft className="h-4 w-4" />
                        </motion.a>
                    )}
                    {project.links.github && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/50 text-white backdrop-blur-md border border-white/10 hover:bg-zinc-950/80 transition-colors"
                            title="View Code"
                        >
                            <Code className="h-4 w-4" />
                        </motion.a>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                        {project.title}
                    </h3>

                    {project.period && (
                        <p className="text-[11px] font-medium text-zinc-400">
                            {project.period}
                        </p>
                    )}

                    <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-400/10">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5 min-h-6 items-center">
                            {project.techStack.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center rounded-md border border-zinc-400/20 px-1.5 py-0.5 text-[11px] font-normal text-zinc-500 dark:text-zinc-400"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 3 && (
                                <span className="inline-flex items-center text-[11px] font-medium text-zinc-400 border border-zinc-400/20 px-1.5 py-0.5 rounded-md">
                                    +{project.techStack.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
