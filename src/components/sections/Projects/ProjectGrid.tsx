import { useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/types/portfolio'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'

interface ProjectGridProps {
    projects: Project[]
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
    const { selectedTags, removeTag } = useProjectFilter()

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [projects])

    useEffect(() => {
        selectedTags.forEach((tag) => {
            if (!allTags.includes(tag)) {
                removeTag(tag)
            }
        })
    }, [allTags, selectedTags, removeTag])

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return projects
        return projects.filter((p) =>
            selectedTags.every((tag) => p.tags.includes(tag)),
        )
    }, [projects, selectedTags])

    return (
        <section id="projects" className="space-y-6">
            <div className="space-y-2">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xl font-semibold tracking-tight text-center"
                >
                    Check out my latest work
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-center"
                >
                    I've worked on a variety of projects, from simple websites
                    to complex web applications.
                </motion.p>
            </div>

            <ProjectFilter tags={allTags} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                >
                    No projects found matching these tags.
                </motion.p>
            )}
        </section>
    )
}

export default ProjectGrid
