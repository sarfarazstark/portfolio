import { motion } from 'framer-motion'
import { Ascii } from 'ascii.rest/react'
import type { Profile } from '@/types/portfolio'

const Hero = ({ profile }: { profile: Profile }) => {
    return (
        <div className="hl relative flex flex-col gap-4.5 px-4 py-5 sm:flex-row sm:items-center sm:gap-4.5 sm:px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-23 shrink-0 rounded-[14px] bg-card p-1 ring-1 ring-border-2 shadow-(--shadow-card) max-sm:mx-auto"
            >
                <img
                    src={profile.avatar}
                    alt={profile.name}
                    width={184}
                    height={184}
                    className="aspect-square w-full rounded-[10px] object-cover"
                />
            </motion.div>

            <div className="min-w-0 flex-1">
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[28px] leading-[1.15] font-medium tracking-[-0.02em] max-sm:text-center"
                >
                    {profile.name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.06,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-0.75 flex h-6.5 items-center gap-2 text-base text-muted-foreground max-sm:justify-center"
                >
                    <span>{profile.role}</span>
                </motion.div>
            </div>

            {/* Pinned, not in flow: the wheel must not change the row's height.
                Offsets resolve against the padding box, whose bottom edge is the
                row's border. The rail glyph inks 0.41em above its line box, hence
                the 1.7px nudge, so the ground line sits on the border. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 bottom-[-1.7px] right-0 hidden items-end sm:flex"
            >
                <Ascii
                    piece="ferris-wheel"
                    mono
                    className="text-muted-4"
                    style={{
                        fontSize: '4.2px',
                        lineHeight: 1.1,
                    }}
                />
            </div>
        </div>
    )
}

export default Hero

/** Pill whose label letters roll up and out on hover. */
export function RollPill({
    href,
    children,
    icon,
    variant = 'solid',
    size = 'sm',
}: {
    href: string
    children: string
    icon: React.ReactNode
    variant?: 'solid' | 'outline' | 'white'
    size?: 'sm' | 'lg'
}) {
    const letters = [...children]
    // Each copy moves exactly one window height, so the leading must match the
    // window: lg 20px / sm 18px. A fixed 18px leading overshot the 20px window
    // by 6px and left the hovered label sitting low.
    const win = size === 'lg' ? 'h-5' : 'h-4.5'
    const line = size === 'lg' ? 'leading-5' : 'leading-[18px]'

    return (
        <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className={[
                size === 'lg'
                    ? 'h-11 gap-2.25 rounded-xl px-5 text-[13px]'
                    : 'h-8.5 gap-1.75 rounded-lg px-3.25 text-xs',
                'group inline-flex items-center font-medium transition-[box-shadow,background-color] duration-300 ease-spring',
                variant === 'solid'
                    ? 'bg-primary text-primary-foreground shadow-(--shadow-card) hover:bg-neutral-800 hover:shadow-(--shadow-lift) dark:hover:bg-neutral-300'
                    : variant === 'white'
                      ? 'bg-white text-neutral-900 shadow-(--shadow-card) hover:bg-neutral-100 hover:shadow-(--shadow-lift)'
                      : 'bg-card text-foreground ring-1 ring-border-2 shadow-(--shadow-card) hover:shadow-(--shadow-lift) hover:ring-border-hover',
            ].join(' ')}
        >
            <span
                className={
                    size === 'lg'
                        ? 'size-4 [&>svg]:size-4'
                        : 'size-3.5 [&>svg]:size-3.5'
                }
            >
                {icon}
            </span>
            <span className={`relative block overflow-hidden ${win}`}>
                <span className="flex h-full items-center whitespace-pre">
                    {letters.map((ch, i) => (
                        <span
                            key={i}
                            className={`inline-block transition-transform duration-550 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full ${line}`}
                            style={{ transitionDelay: `${i * 16}ms` }}
                        >
                            {ch}
                        </span>
                    ))}
                </span>
                <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex h-full translate-y-full items-center whitespace-pre"
                >
                    {letters.map((ch, i) => (
                        <span
                            key={i}
                            className={`inline-block transition-transform duration-550 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full ${line}`}
                            style={{ transitionDelay: `${i * 16}ms` }}
                        >
                            {ch}
                        </span>
                    ))}
                </span>
            </span>
        </a>
    )
}
