import { useProjectFilter } from '@/hooks/useProjectFilter'
import { cn } from '@/utils/cn'

interface ProjectFilterProps {
    tags: string[]
}

const ProjectFilter = ({ tags }: ProjectFilterProps) => {
    const { selectedTags, toggleTag } = useProjectFilter()

    return (
        <div
            className="flex flex-wrap gap-1.5 sm:gap-2 py-3 sm:py-4"
            role="group"
            aria-label="Filter projects by tag"
        >
            <button
                onClick={() => toggleTag('All')}
                aria-pressed={selectedTags.length === 0}
                className={cn(
                    'px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                    selectedTags.length === 0
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80',
                )}
            >
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                    className={cn(
                        'px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                        selectedTags.includes(tag)
                            ? 'bg-foreground text-background'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80',
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}

export default ProjectFilter
