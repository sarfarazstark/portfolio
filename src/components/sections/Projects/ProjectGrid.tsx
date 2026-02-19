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
        <section id="projects" className="space-y-6 pt-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-full flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-zinc-400/20 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xl relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 text-[10px] font-medium tracking-wider uppercase text-zinc-600 dark:text-zinc-400"
                    >
                        My Projects
                    </motion.div>
                </div>
                {/* <div className="space-y-2 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight px-4"
                    >
                        Check out my latest work
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-150 mx-auto px-4"
                    >
                        I've worked on a variety of projects, from simple
                        websites to complex web applications.
                    </motion.p>
                </div> */}
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
