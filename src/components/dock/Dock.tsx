import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import {
    Home,
    Briefcase,
    GraduationCap,
    Code,
    FolderOpen,
    Mail,
    Sun,
    Moon,
    Volume2,
    VolumeX,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useSound } from '@/hooks/use-sound'
import { useSoundSettings } from '@/hooks/useSoundSettings'
import { click001Sound } from '@/lib/click-001'
import { toggle001Sound } from '@/lib/toggle-001'
import type { SoundAsset } from '@/lib/sound-types'
import { cn } from '@/lib/utils'
import { useWebHaptics } from 'web-haptics/react'

interface DockItem {
    icon: LucideIcon
    label?: string
    href: string
    onClick?: (e?: React.MouseEvent) => void
    sound?: SoundAsset
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity)
    const { theme, toggleTheme } = useTheme()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState<string>('home')
    const [isMobile, setIsMobile] = useState(false)

    const soundEnabled = useSoundSettings((s) => s.soundEnabled)
    const toggleSound = useSoundSettings((s) => s.toggleSound)

    const [playToggle] = useSound(toggle001Sound, { interrupt: true })

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'home',
                'work',
                'education',
                'skills',
                'projects',
                'contact',
            ]

            // Priority 1: Check if we are at the very bottom of the page
            const scrollPosition = window.innerHeight + window.scrollY
            const totalHeight = document.documentElement.scrollHeight
            const isAtBottom = scrollPosition >= totalHeight - 50

            if (isAtBottom) {
                setActiveSection('contact')
                return
            }

            // Priority 2: Precise scroll spy using a fixed threshold from the top
            // This aligns with our scroll-padding-top in index.css
            let currentSection = 'home'
            const threshold = 150 // px from the top

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // If the top of the section is at or above the threshold
                    if (rect.top <= threshold) {
                        currentSection = sectionId
                    }
                }
            }

            setActiveSection(currentSection)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        // Trigger initial check
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems: DockItem[] = [
        { icon: Home, label: 'Home', href: '#home' },
        { icon: Briefcase, label: 'Experience', href: '#work' },
        { icon: FolderOpen, label: 'Projects', href: '#projects' },
        { icon: Code, label: 'Skills', href: '#skills' },
        { icon: GraduationCap, label: 'Education', href: '#education' },
        { icon: Mail, label: 'Contact', href: '#contact' },
    ].map((item) => ({
        ...item,
        onClick: (e?: React.MouseEvent) => {
            if (pathname !== '/') {
                e?.preventDefault()
                navigate('/' + item.href)
            }
        },
    }))

    const themeItem: DockItem = {
        icon: theme === 'light' ? Moon : Sun,
        label: 'Theme',
        href: '#',
        onClick: (e) => {
            e?.preventDefault()
            playToggle()
            toggleTheme()
        },
    }

    const soundItem: DockItem = {
        icon: soundEnabled ? Volume2 : VolumeX,
        label: soundEnabled ? 'Mute sound' : 'Unmute sound',
        href: '#',
        onClick: (e) => {
            e?.preventDefault()
            if (soundEnabled) playToggle()
            toggleSound()
        },
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <nav
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-14 sm:h-16 max-w-[calc(100vw-1.5rem)] items-end gap-1.5 sm:gap-4 rounded-4xl bg-background/80 px-2.5 pb-2.5 ring-1 ring-border shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] sm:px-4 sm:pb-3 backdrop-blur-md"
                role="navigation"
                aria-label="Main navigation"
            >
                {navItems.map((item) => (
                    <IconContainer
                        mouseX={mouseX}
                        key={item.label}
                        active={activeSection === item.href.replace('#', '')}
                        isMobile={isMobile}
                        {...item}
                    />
                ))}
                <div className="mb-1 h-6 w-px bg-border sm:h-8" />
                {/* Reference groups the two toggles in one capsule with a
                    divider, so they read as a single control cluster. */}
                <div className="flex items-center gap-1 rounded-full bg-muted p-1 ring-1 ring-border-2">
                    <IconContainer
                        mouseX={mouseX}
                        key={soundItem.label}
                        active={false}
                        isMobile={isMobile}
                        staticSize
                        {...soundItem}
                    />
                    <div className="h-5 w-px bg-border sm:h-6" />
                    <IconContainer
                        mouseX={mouseX}
                        key={themeItem.label}
                        active={false}
                        isMobile={isMobile}
                        staticSize
                        {...themeItem}
                    />
                </div>
            </nav>
        </motion.div>
    )
}

function IconContainer({
    mouseX,
    icon: Icon,
    label,
    href,
    onClick,
    active,
    isMobile = false,
    staticSize = false,
}: DockItem & {
    mouseX: MotionValue<number>
    active: boolean
    isMobile?: boolean
    /** Controls keep a fixed size; only nav items magnify. */
    staticSize?: boolean
}) {
    const ref = useRef<HTMLAnchorElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        }
        return val - bounds.x - bounds.width / 2
    })

    // Controls are deliberately smaller so the pill wrapping them stays no
    // taller than a nav item; anything bigger lifts its top past the nav edge.
    const minSize = staticSize ? (isMobile ? 28 : 32) : isMobile ? 36 : 40
    // Nav is h-14/h-16 with items-end, so magnification may only use the
    // space left after the bottom padding; bigger applied sizes burst out.
    const maxSize = staticSize ? minSize : isMobile ? 44 : 52

    const widthTransform = useTransform(
        distance,
        [-150, 0, 150],
        [minSize, maxSize, minSize],
    )
    const heightTransform = useTransform(
        distance,
        [-150, 0, 150],
        [minSize, maxSize, minSize],
    )

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [play] = useSound(click001Sound, { interrupt: true })
    const { trigger } = useWebHaptics()

    return (
        <motion.a
            href={href}
            onClick={(e) => {
                play()
                if (isMobile) {
                    trigger('success')
                }
                onClick?.(e)
            }}
            onMouseEnter={() => {
                if (!isMobile) {
                    play()
                }
                if (isMobile) {
                    trigger(10)
                }
            }}
            style={{ width, height }}
            ref={ref}
            aria-label={label}
            className={cn(
                'group relative flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                active
                    ? 'bg-foreground'
                    : 'bg-muted hover:bg-muted-foreground/10',
            )}
        >
            {label && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 pointer-events-none">
                    {label}
                </span>
            )}
            <Icon
                className={cn(
                    'h-1/2 w-1/2 transition-colors',
                    active
                        ? 'text-background'
                        : 'text-muted-foreground group-hover:text-foreground',
                )}
            />
            {active && (
                <motion.span
                    layoutId="active-pill"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-foreground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
        </motion.a>
    )
}
