import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { Github, ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
    project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all hover:shadow-lg"
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center size-8 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github size={14} />
                        </a>
                    )}
                    {project.links.live && (
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center size-8 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowUpRight size={14} />
                        </a>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-3 sm:p-4">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold tracking-tight text-sm sm:text-base">
                            {project.title}
                        </h3>
                    </div>
                    {project.period && (
                        <p className="text-[11px] font-medium text-muted-foreground">
                            {project.period}
                        </p>
                    )}
                    <p className="text-[11px] sm:text-[12px] text-muted-foreground line-clamp-3 sm:line-clamp-4 leading-relaxed pt-1">
                        {project.description}
                    </p>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center rounded-full bg-muted border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
