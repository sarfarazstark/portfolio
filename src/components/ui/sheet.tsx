import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Full-bleed divider strip that heads every section of the sheet. */
export function SectionHeader({ children }: { children: ReactNode }) {
    return <h2 className="sheet-header">{children}</h2>
}

/** Plain padded block inside the column, below a header strip. */
export function SheetBlock({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return <div className={cn('px-4 py-5 sm:px-6.5', className)}>{children}</div>
}

/**
 * Label/value row that expands. Uses grid-template-rows 0fr -> 1fr so the
 * panel animates to its natural height without measuring or a height hack.
 * The inner content fades slightly faster on open than the row grows, which
 * is what makes it read as smooth rather than a sliding block.
 */
export function ExpandRow({
    header,
    expanded,
    onToggle,
    children,
}: {
    header: ReactNode
    expanded: boolean
    onToggle: () => void
    children: ReactNode
}) {
    return (
        <div className="hl">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                className="group flex w-full items-start gap-3.5 px-4 py-4.5 text-left transition-colors duration-300 ease-out-expo hover:bg-surface-2/70 sm:px-6"
            >
                {header}
                <Chevron expanded={expanded} />
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-500 ease-out-expo"
                style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
            >
                <div className="min-h-0 overflow-hidden">
                    <div
                        className={cn(
                            'pb-5 pr-4 pl-4 transition-[opacity,transform] ease-out-expo sm:pr-6 sm:pl-19.5',
                            expanded
                                ? 'translate-y-0 opacity-100 delay-100 duration-500'
                                : '-translate-y-1 opacity-0 duration-200',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Chevron({
    expanded,
    className,
}: {
    expanded: boolean
    className?: string
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn(
                'mt-1 size-3.5 shrink-0 text-muted-4 transition-[transform,color] duration-500 ease-out-expo group-hover:text-muted-2',
                expanded && 'rotate-180',
                className,
            )}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

/** Small icon tile: logo or glyph on a card surface with a hairline ring. */
export function LogoTile({
    src,
    alt,
    className,
}: {
    src?: string
    alt: string
    className?: string
}) {
    return (
        <span
            className={cn(
                'grid size-10 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-card ring-1 ring-border-2 shadow-(--shadow-card)',
                className,
            )}
        >
            {src && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="size-full object-cover"
                />
            )}
        </span>
    )
}

/** Ringed chip that lifts on hover, with the sliding sheen. */
export function Chip({
    children,
    icon,
    className,
}: {
    children: ReactNode
    icon?: ReactNode
    className?: string
}) {
    return (
        <span
            className={cn(
                'group/chip relative inline-flex items-center gap-1.75 overflow-hidden rounded-lg bg-card px-2.75 py-1.25 text-xs font-medium text-muted-2 ring-1 ring-border-2 shadow-(--shadow-card)',
                'transition-[transform,box-shadow] duration-300 ease-spring',
                'hover:shadow-(--shadow-lift) hover:ring-border-hover',
                className,
            )}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-[-70%] h-full w-[45%] skew-x-[-22deg] bg-linear-to-r from-transparent via-black/8 to-transparent transition-[left] duration-650 ease-out-expo group-hover/chip:left-[130%] dark:via-white/10"
            />
            {icon && (
                <span className="grid size-4 shrink-0 place-items-center transition-transform duration-300 ease-spring group-hover/chip:scale-125 group-hover/chip:-rotate-6">
                    {icon}
                </span>
            )}
            {children}
        </span>
    )
}

/** Row title + monospace date. Stacks on mobile so long names never wrap. */
export function RowTitle({
    title,
    meta,
}: {
    title: ReactNode
    meta?: ReactNode
}) {
    return (
        <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <b className="text-base leading-snug font-medium">{title}</b>
            {meta && (
                <span className="font-mono text-[11.5px] text-muted-foreground sm:whitespace-nowrap">
                    {meta}
                </span>
            )}
        </span>
    )
}
