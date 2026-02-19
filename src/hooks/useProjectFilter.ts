import { create } from 'zustand'

interface ProjectFilterState {
    selectedTags: string[]
    searchQuery: string
    toggleTag: (tag: string) => void
    removeTag: (tag: string) => void
    resetFilters: () => void
    setSearchQuery: (query: string) => void
}

export const useProjectFilter = create<ProjectFilterState>((set) => ({
    selectedTags: [],
    searchQuery: '',
    toggleTag: (tag: string) =>
        set((state) => {
            if (tag === 'All') {
                return { selectedTags: [] }
            }
            const isSelected = state.selectedTags.includes(tag)
            if (isSelected) {
                return {
                    selectedTags: state.selectedTags.filter((t) => t !== tag),
                }
            } else {
                return {
                    selectedTags: [...state.selectedTags, tag],
                }
            }
        }),
    removeTag: (tag: string) =>
        set((state) => ({
            selectedTags: state.selectedTags.filter((t) => t !== tag),
        })),
    resetFilters: () => set({ selectedTags: [], searchQuery: '' }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
}))
