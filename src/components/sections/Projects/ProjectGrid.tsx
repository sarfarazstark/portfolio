import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import ProjectCard from './ProjectCard'
import { SectionHeader } from '@/components/ui/sheet'

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
    const navigate = useNavigate()

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.featured),
        [projects],
    )

    return (
        <section id="projects">
            <SectionHeader>Projects</SectionHeader>
            {featuredProjects.map((project, i) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    flip={i % 2 === 1}
                />
            ))}

            {featuredProjects.length === 0 && (
                <p className="hl px-4 py-10 text-center text-sm text-muted-foreground sm:px-6">
                    No featured projects to display.
                </p>
            )}

            <div className="hl flex justify-center px-4 py-5 sm:px-6">
                <motion.button
                    onClick={() => navigate('/projects')}
                    className="group inline-flex h-8.5 items-center gap-1.75 rounded-lg px-3.25 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
                >
                    All projects
                    <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
                </motion.button>
            </div>
        </section>
    )
}

export default ProjectGrid
