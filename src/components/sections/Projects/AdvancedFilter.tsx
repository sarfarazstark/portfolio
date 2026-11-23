import { X } from 'lucide-react'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import { cn } from '@/lib/utils'

interface AdvancedFilterProps {
    tags: string[]
}

export default function AdvancedFilter({ tags }: AdvancedFilterProps) {
    const { selectedTags, toggleTag, resetFilters } = useProjectFilter()

    return (
        <div className="hl px-4 py-5 sm:px-6.5">
            <div className="flex flex-wrap items-center gap-1.5">
                <FilterPill
                    active={selectedTags.length === 0}
                    onClick={() => toggleTag('All')}
                >
                    All
                </FilterPill>
                {tags.map((tag) => (
                    <FilterPill
                        key={tag}
                        active={selectedTags.includes(tag)}
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                    </FilterPill>
                ))}
                {selectedTags.length > 0 && (
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground"
                    >
                        Reset <X className="size-3" />
                    </button>
                )}
            </div>
        </div>
    )
}

function FilterPill({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-medium transition-[transform,box-shadow,background-color] duration-300 ease-spring',
                active
                    ? 'bg-primary text-primary-foreground shadow-(--shadow-lift)'
                    : 'bg-card text-muted-2 ring-1 ring-border-2 shadow-(--shadow-card) hover:shadow-(--shadow-lift) hover:ring-border-hover hover:text-foreground',
            )}
        >
            {children}
        </button>
    )
}
