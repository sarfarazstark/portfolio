import { motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { Github, Globe } from 'lucide-react'

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
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="space-y-1">
                    <h3 className="font-semibold tracking-tight text-base">
                        {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Github size={14} />
                                Source
                            </a>
                        )}
                        {project.links.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Globe size={14} />
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
