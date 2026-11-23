import { motion } from 'framer-motion'
import type { Social } from '@/types/portfolio'
import { RollPill } from './Hero'
import { SectionHeader } from '@/components/ui/sheet'
import {
    Github,
    Linkedin,
    Mail,
    ArrowUpRight,
    FileText,
} from 'lucide-react'

const ICONS: Record<string, React.ReactNode> = {
    GitHub: <Github />,
    LinkedIn: <Linkedin />,
    Email: <Mail />,
    X: <ArrowUpRight />,
    Twitter: <ArrowUpRight />,
    Medium: <FileText />,
}

/**
 * Connect block above Experience: same header treatment as the other
 * sections, links left-aligned in a wrapping row.
 */
const Connect = ({
    socials,
    resume,
}: {
    socials: Social[]
    resume: string
}) => {
    const links = socials.map((s) =>
        s.platform === 'Email'
            ? { ...s, url: `mailto:${s.url}` }
            : s,
    )

    return (
        <section id="connect">
            <SectionHeader>Connect</SectionHeader>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="hl flex flex-wrap items-center gap-1.75 px-4 py-5 sm:px-6.5"
            >
                <RollPill href={resume} icon={<FileText />}>
                    Resume
                </RollPill>
                {links.map((social) => (
                    <RollPill
                        key={social.platform}
                        href={social.url}
                        icon={ICONS[social.platform] ?? <ArrowUpRight />}
                    >
                        {social.platform}
                    </RollPill>
                ))}
            </motion.div>
        </section>
    )
}

export default Connect
