import { useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowLeft, Globe, Github, Calendar, ArrowUpRight } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/types/portfolio'

const data = portfolioData as PortfolioData

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1],
        },
    },
}

export default function ProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    const project = useMemo(() => {
        return data.projects.find((p) => p.slug === slug)
    }, [slug])

    useEffect(() => {
        if (!project && slug) {
            navigate('/projects', { replace: true })
        }
    }, [project, slug, navigate])

    if (!project) return null

    return (
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24">
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                className="group mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
            >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back
            </motion.button>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden rounded-3xl border border-zinc-400/20 shadow-2xl">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                                Project Overview
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg italic">
                                "{project.description}"
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="space-y-6"
                        >
                            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                                Technologies used
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map((tech) => (
                                    <div
                                        key={tech}
                                        className="flex items-center gap-2 rounded-xl border border-zinc-400/10 bg-zinc-400/5 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:border-zinc-400/20"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="space-y-8">
                        <motion.div
                            variants={itemVariants}
                            className="space-y-6 rounded-3xl border border-zinc-400/10 bg-zinc-400/5 p-6 backdrop-blur-sm"
                        >
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                    Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-zinc-500">
                                        <Calendar className="h-4 w-4" />
                                        {project.period}
                                    </div>
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
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-zinc-400/10">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between gap-2 rounded-xl border border-zinc-400/20 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-semibold transition-all hover:border-zinc-400/40 shadow-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Github className="h-4 w-4" />
                                            Source Code
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                                    </a>
                                )}
                                {project.links.live &&
                                    project.links.live !== '#' && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-between gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-100 dark:text-zinc-900 transition-all hover:opacity-90 shadow-xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                Live Site
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </a>
                                    )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
