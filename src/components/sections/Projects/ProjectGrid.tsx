import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
    projects: Project[]
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
    const navigate = useNavigate()

    const featuredProjects = useMemo(() => {
        return projects.filter((p) => p.featured)
    }, [projects])

    return (
        <section id="projects" className="space-y-6 pt-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-full flex justify-center items-center">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-zinc-400/20 to-transparent" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 font-medium tracking-wide text-zinc-600 dark:text-zinc-200"
                    >
                        Featured projects
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <AnimatePresence mode="popLayout">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>

            {featuredProjects.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground"
                >
                    No featured projects to display.
                </motion.p>
            )}

            <div className="flex justify-center pt-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/projects')}
                    className="group flex items-center gap-2 cursor-pointer rounded-full bg-zinc-900 dark:bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-100 dark:text-zinc-900 shadow-lg transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200"
                >
                    View All Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </div>
        </section>
    )
}

export default ProjectGrid
