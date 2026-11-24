import { motion } from 'framer-motion'
import { ArrowUpRight, GlobeIcon, Github } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import { cn } from '@/lib/utils'
import { Chip } from '@/components/ui/sheet'

/**
 * Split row: screenshot on one side, copy on the other. `flip` swaps the
 * sides so consecutive rows alternate, matching the sheet's rhythm.
 */
const ProjectCard = ({
    project,
    flip = false,
}: {
    project: Project
    flip?: boolean
}) => (
    <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hl grid grid-cols-1 md:grid-cols-[1fr_1fr] min-h-76"
    >
        {/* Image fills its half edge to edge: no padding, no inner frame. */}
        <div
            className={cn(
                'group relative min-h-45 overflow-hidden bg-surface-2 md:min-h-53.5',
                flip ? 'md:order-2' : 'md:order-1',
            )}
        >
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
        </div>

        <div
            className={cn(
                'flex flex-col justify-center px-4 py-5 sm:px-6 md:py-6',
                flip ? 'md:order-1' : 'md:order-2',
            )}
        >
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {project.title}
                </h3>
            </div>

            <p className="prose-body mt-2 text-[13.5px] text-muted-2 text-pretty">
                {project.description}
            </p>

            <div className="mt-3.5 flex flex-wrap gap-1.75">
                {project.techStack.map((tech) => (
                    <Chip key={tech} className="text-[11.5px]">
                        {tech}
                    </Chip>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.links.github && (
                    <LinkChip
                        href={project.links.github}
                        label="Source"
                        srLabel={`${project.title} source on GitHub`}
                        icon={<Github />}
                    />
                )}
                {project.links.live && project.links.live !== '#' && (
                    <LinkChip
                        href={project.links.live}
                        label="Visit"
                        srLabel={`Visit ${project.title}`}
                        icon={<GlobeIcon />}
                    />
                )}
            </div>
        </div>
    </motion.article>
)

function LinkChip({
    href,
    label,
    srLabel,
    icon,
}: {
    href: string
    label: string
    /** Distinct accessible name; the visible label repeats across cards. */
    srLabel?: string
    icon: React.ReactNode
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="btn-bevel group/link inline-flex items-center gap-1.25 rounded-lg py-1 pr-2 pl-2.5 text-xs font-medium text-foreground transition-[box-shadow] duration-300 ease-spring"
        >
            <span className="size-3 text-muted-foreground [&>svg]:size-3">
                {icon}
            </span>
            <span className="sr-only">{srLabel ?? label}</span>
            <span aria-hidden="true">{label}</span>
            <ArrowUpRight className="size-3 text-muted-4 transition-transform duration-300 ease-spring group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
        </a>
    )
}

export default ProjectCard
