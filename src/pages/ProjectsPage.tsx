import { useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/types/portfolio'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import ProjectCard from '@/components/sections/Projects/ProjectCard'
import AdvancedFilter from '@/components/sections/Projects/AdvancedFilter'

const data = portfolioData as PortfolioData

export default function ProjectsPage() {
    const navigate = useNavigate()
    const { selectedTags, searchQuery, resetFilters } = useProjectFilter()

    // Reset filters on unmount to keep home page clean
    useEffect(() => {
        return () => resetFilters()
    }, [resetFilters])

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        data.projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [])

    const filteredProjects = useMemo(() => {
        return data.projects.filter((p) => {
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => p.tags.includes(tag))

            const matchesSearch =
                !searchQuery ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                p.tags.some((t) =>
                    t.toLowerCase().includes(searchQuery.toLowerCase()),
                )

            return matchesTags && matchesSearch
        })
    }, [selectedTags, searchQuery])

    return (
        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24 space-y-12">
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </button>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-50">
                        All Projects
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">
                        A comprehensive collection of my work, ranging from
                        full-stack applications to experimental design systems.
                    </p>
                </div>
            </div>

            <AdvancedFilter tags={allTags} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 space-y-3"
                >
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                        No projects found matching your criteria.
                    </p>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                        Clear all filters
                    </button>
                </motion.div>
            )}
        </main>
    )
}
