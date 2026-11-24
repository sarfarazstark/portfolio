import { motion } from 'framer-motion'
import type { Activity as ActivityData, ActivityDay } from '@/types/portfolio'
import { SectionHeader } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

/** Density ramp in the site's own ink, so it reads without a new hue. */
const LEVELS = [
    'bg-surface-3',
    'bg-foreground/20',
    'bg-foreground/40',
    'bg-foreground/65',
    'bg-foreground',
]

/** Seven rows, one column per week, the way the calendar is always drawn. */
function toWeeks(days: ActivityDay[]) {
    const pad = new Date(days[0].d + 'T00:00:00Z').getUTCDay()
    const cells: (ActivityDay | null)[] = [
        ...Array.from({ length: pad }, () => null),
        ...days,
    ]
    const weeks: (ActivityDay | null)[][] = []
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7))
    }
    return weeks
}

const fmt = (n: number) => n.toLocaleString('en-US')
const plural = (n: number, word: string) => `${fmt(n)} ${word}${n === 1 ? '' : 's'}`

/**
 * Contribution and merge counts, fetched at build time by
 * scripts/fetch-activity.mjs. Numbers only: no repo names, no links.
 */
const Activity = ({ activity }: { activity: ActivityData }) => {
    const { github, gitlab } = activity
    const weeks = toWeeks(github.days)
    // GitLab's merge count needs a token, so only GitHub can report one.
    const total = github.total + (gitlab?.total ?? 0)

    const stats: [string, string][] = [
        [fmt(total), 'Contributions'],
        [fmt(github.merged), 'Merged PRs'],
        [plural(github.currentStreak, 'day'), 'Current streak'],
        [plural(github.longestStreak, 'day'), 'Longest streak'],
        [fmt(github.bestDay.count), 'Best day'],
    ]

    return (
        <section id="activity">
            <SectionHeader>Activity</SectionHeader>
            <motion.div
                initial={{ y: 12 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="hl"
            >
                <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-5 sm:divide-x sm:divide-y-0">
                    {stats.map(([value, label]) => (
                        <div key={label} className="px-4 py-4 sm:px-5">
                            <dd className="text-[19px] leading-tight font-medium tracking-tight">
                                {value}
                            </dd>
                            <dt className="mt-1 text-[10.5px] font-medium tracking-wider text-muted-foreground uppercase">
                                {label}
                            </dt>
                        </div>
                    ))}
                </dl>

                <div className="border-t border-border px-4 py-5 sm:px-6.5">
                    {/* 53 weeks never fit a phone; the graph scrolls, the page does not. */}
                    <div className="overflow-x-auto pb-1">
                        <div className="w-max">
                            <div
                                className="grid gap-[3px] pl-6.5 text-[10px] text-muted-foreground"
                                style={{
                                    gridTemplateColumns: `repeat(${weeks.length}, 10px)`,
                                }}
                            >
                                {weeks.map((week, i) => {
                                    const first = week.find(Boolean)
                                    const month = first
                                        ? MONTHS[new Date(first.d + 'T00:00:00Z').getUTCMonth()]
                                        : ''
                                    // Label only when the month changes, so it is not repeated.
                                    const prev = weeks[i - 1]?.find(Boolean)
                                    const prevMonth = prev
                                        ? MONTHS[new Date(prev.d + 'T00:00:00Z').getUTCMonth()]
                                        : ''
                                    return (
                                        <span key={i} className="h-4 whitespace-nowrap">
                                            {month !== prevMonth ? month : ''}
                                        </span>
                                    )
                                })}
                            </div>

                            <div className="mt-1 flex gap-[3px]">
                                <div className="flex w-6 shrink-0 flex-col gap-[3px] pr-1.5 text-[10px] text-muted-foreground">
                                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                                        <span key={i} className="flex h-2.5 items-center">
                                            {d}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    className="grid grid-flow-col gap-[3px]"
                                    style={{
                                        gridTemplateRows: 'repeat(7, 10px)',
                                        gridAutoColumns: '10px',
                                    }}
                                >
                                    {weeks.flat().map((day, i) =>
                                        day ? (
                                            <span
                                                key={day.d}
                                                title={`${day.c} on ${day.d}`}
                                                className={cn(
                                                    'size-2.5 rounded-[2px]',
                                                    LEVELS[day.l] ?? LEVELS[0],
                                                )}
                                            />
                                        ) : (
                                            <span key={`pad-${i}`} className="size-2.5" />
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
                        <span>Less</span>
                        {LEVELS.map((l) => (
                            <span key={l} className={cn('size-2.5 rounded-[2px]', l)} />
                        ))}
                        <span>More</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Activity
