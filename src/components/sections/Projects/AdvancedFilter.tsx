import { Search, X } from 'lucide-react'
import { useProjectFilter } from '@/hooks/useProjectFilter'

interface AdvancedFilterProps {
    tags: string[]
}

export default function AdvancedFilter({ tags }: AdvancedFilterProps) {
    const {
        selectedTags,
        toggleTag,
        searchQuery,
        setSearchQuery,
        resetFilters,
    } = useProjectFilter()

    return (
        <div className="space-y-6">
            <div className="relative group max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-zinc-100" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-zinc-400/20 bg-zinc-400/5 py-2.5 pl-10 pr-4 text-sm outline-hidden transition-all focus:border-zinc-400/40 focus:ring-2 focus:ring-zinc-400/10 dark:text-zinc-100"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 hover:bg-zinc-400/10"
                    >
                        <X className="h-3.5 w-3.5 text-zinc-400" />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => toggleTag('All')}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                        selectedTags.length === 0
                            ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                            : 'bg-zinc-400/10 text-zinc-600 hover:bg-zinc-400/20 dark:text-zinc-400'
                    }`}
                >
                    All Projects
                </button>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                            selectedTags.includes(tag)
                                ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                : 'bg-zinc-400/10 text-zinc-600 hover:bg-zinc-400/20 dark:text-zinc-400'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
                {(selectedTags.length > 0 || searchQuery) && (
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-500/10 transition-colors"
                    >
                        Reset <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </div>
    )
}
