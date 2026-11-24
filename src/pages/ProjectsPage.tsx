import { useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/types/portfolio'
import { useSeo } from '@/hooks/useSeo'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import ProjectCard from '@/components/sections/Projects/ProjectCard'
import AdvancedFilter from '@/components/sections/Projects/AdvancedFilter'

const data = portfolioData as PortfolioData

export default function ProjectsPage() {
    useSeo({
        title: 'Projects — Sarfaraz, Full Stack Developer in Kolkata',
        description:
            'Selected work by Sarfaraz: Next.js and Laravel apps including a gym management system, a podcast streaming app and Frontend Mentor challenges.',
        path: '/projects',
    })

    const navigate = useNavigate()
    const { selectedTags, resetFilters } = useProjectFilter()

    useEffect(() => {
        return () => resetFilters()
    }, [resetFilters])

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        data.projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [])

    const filteredProjects = useMemo(() => {
        return data.projects.filter(
            (p) =>
                selectedTags.length === 0 ||
                selectedTags.some((tag) => p.tags.includes(tag)),
        )
    }, [selectedTags])

    return (
        <main className="relative z-10 mx-auto max-w-215 px-3 pt-7 pb-16">
            <div className="sheet-frame bg-background">
                <div className="hl px-4 pt-6 pb-5 sm:px-6.5">
                    <button
                        onClick={() => navigate('/')}
                        className="group mb-3.5 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-3 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5" />
                        Back to home
                    </button>
                    <h1 className="text-[26px] font-medium tracking-[-0.02em]">
                        All projects
                    </h1>
                    <p className="mt-1.5 max-w-120 text-sm leading-relaxed text-muted-2">
                        A comprehensive collection of my work, ranging from
                        full-stack applications to experimental design systems.
                    </p>
                </div>

                <AdvancedFilter tags={allTags} />

                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ProjectCard project={project} flip={i % 2 === 1} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 py-16 text-center"
                    >
                        <p className="text-sm font-medium text-muted-foreground">
                            No projects found matching your criteria.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="text-sm text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    )
}
