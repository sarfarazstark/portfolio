import { motion } from 'framer-motion'
import type { Footer as FooterType } from '@/types/portfolio'
import { RollPill } from './Hero'
import { Mail } from 'lucide-react'
import NameBanner from './NameBanner'

/**
 * Three separate sections: the CTA on the orbit gif, then the name banner,
 * then the credit line. Each owns only its own bottom hairline.
 */
const Footer = ({ footer }: { footer: FooterType }) => {
    const email = footer.socials.find((s) => s.platform === 'Email')?.url

    return (
        <>
            <section id="contact" className="hl relative isolate overflow-hidden">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                >
                    <img
                        src="/ascii-rest-edge-orbit.gif"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/75" />
                </div>

                {/* The gif is opaque and full-bleed, so it covers the ring the
                    sheet-frame draws behind it. --border is dark ink at 10%, which
                    vanishes over this art; reuse the dark-theme light hairline. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
                />

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-5 px-4 py-14 text-center sm:px-6.5 sm:py-16"
                >
                    <h3 className="max-w-[26ch] text-[19px] leading-[1.45] font-normal text-white/65 sm:text-[21px]">
                        If you are still here,{' '}
                        <b className="font-medium text-white">say hello.</b>
                    </h3>
                    {email && (
                        <RollPill
                            href={`mailto:${email}`}
                            icon={<Mail />}
                            variant="white"
                            size="lg"
                        >
                            Send an email
                        </RollPill>
                    )}
                </motion.div>
            </section>

            <NameBanner />

            <section id="credit">
                <div className="px-4 py-5 text-center font-mono text-[10.5px] tracking-wide text-muted-4 sm:px-6.5">
                    © {new Date().getFullYear()} Sarfaraz — built in the open.
                </div>
            </section>
        </>
    )
}

export default Footer
