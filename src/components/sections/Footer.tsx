import { motion } from 'framer-motion'
import type { Footer as FooterType } from '@/types/portfolio'

const Footer = ({ footer }: { footer: FooterType }) => {
    return (
        <section id="contact" className="pb-20 sm:pb-24">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-12 text-center shadow-sm">
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-50"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
            `,
                        backgroundSize: '20px 20px',
                        WebkitMaskImage:
                            'radial-gradient(circle at center, #000 0%, transparent 100%)',
                        maskImage:
                            'radial-gradient(circle at center, #000 0%, transparent 100%)',
                    }}
                />

                <div className="relative z-10 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs relative inline-flex items-center rounded-lg bg-white dark:bg-zinc-950 border border-zinc-400/40 px-3 py-1 font-medium tracking-wide text-zinc-600 dark:text-zinc-200"
                    >
                        Contact
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl font-bold tracking-tight sm:text-2xl text-zinc-900 dark:text-zinc-100"
                    >
                        Get in touch
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-125 text-muted-foreground text-sm leading-relaxed"
                    >
                        Want to chat? Just shoot me an email at
                        itssarfarazstark@gmail.com and I'll respond whenever I
                        can.
                    </motion.p>
                    <div className="flex justify-center gap-4 sm:gap-6 pt-4">
                        {footer.socials.map((social) => (
                            <a
                                key={social.platform}
                                href={
                                    social.platform === 'Email'
                                        ? `mailto:${social.url}`
                                        : social.url
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                            >
                                {social.platform}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
