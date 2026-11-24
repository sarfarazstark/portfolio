import { motion } from 'framer-motion'
import type { Activity as ActivityData } from '@/types/portfolio'
import { SectionHeader } from '@/components/ui/sheet'
import {
    ContributionGraph,
    ContributionGraphBlock,
    ContributionGraphCalendar,
    ContributionGraphFooter,
    ContributionGraphLegend,
} from '@/components/ui/contribution-graph'

const fmt = (n: number) => n.toLocaleString('en-US')
const plural = (n: number, word: string) =>
    `${fmt(n)} ${word}${n === 1 ? '' : 's'}`

/**
 * Contribution and merge counts, fetched at build time by
 * scripts/fetch-activity.mjs. Numbers only: no repo names, no links.
 */
const Activity = ({ activity }: { activity: ActivityData }) => {
    const { github, gitlab } = activity
    // GitLab's merge count needs a token, so only GitHub can report one.
    const total = github.total + (gitlab?.total ?? 0)
    // Both calendars are already merged into github.days by the build script.
    const graph = github.days.map((d) => ({
        date: d.d,
        count: d.c,
        level: d.l,
    }))

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
                    {/* Weekday labels sit outside the scroller so they stay put.
                        Upstream's Labels.weekdays is declared but never rendered. */}
                    <div className="flex gap-1.5">
                        <div
                            aria-hidden
                            className="flex shrink-0 flex-col pt-[18px] text-[10px] text-muted-foreground"
                        >
                            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map(
                                (d, i) => (
                                    <span
                                        key={i}
                                        className="flex h-[11px] items-center mb-[3px]"
                                    >
                                        {d}
                                    </span>
                                ),
                            )}
                        </div>
                        {/* w-max on the root sizes to the whole row, not to the
                            space left of the weekday gutter, so it spills. */}
                        <ContributionGraph
                            className="w-auto min-w-0 flex-1"
                            data={graph}
                            blockSize={11}
                            blockMargin={3}
                            blockRadius={2}
                            fontSize={10}
                        >
                            <ContributionGraphCalendar
                                className="[scrollbar-width:none]"
                                title="Contributions"
                            >
                                {({ activity, dayIndex, weekIndex }) => (
                                    <ContributionGraphBlock
                                        activity={activity}
                                        dayIndex={dayIndex}
                                        weekIndex={weekIndex}
                                    >
                                        <title>{`${activity.count} on ${activity.date}`}</title>
                                    </ContributionGraphBlock>
                                )}
                            </ContributionGraphCalendar>
                            <ContributionGraphFooter>
                                <ContributionGraphLegend className="ml-auto text-muted-foreground" />
                            </ContributionGraphFooter>
                        </ContributionGraph>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Activity
