import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Connect from '@/components/sections/Connect'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects/ProjectGrid'
import Footer from '@/components/sections/Footer'
import type { PortfolioData } from '@/types/portfolio'
import portfolioData from '@/data/portfolio.json'

const data = portfolioData as PortfolioData

export default function HomePage() {
    return (
        <main className="relative z-10 mx-auto max-w-215 px-3 pt-7 pb-32">
            <div className="sheet-frame bg-background">
                <section id="home">
                    <Hero profile={data.profile} />
                </section>
                <About about={data.about} />
                <Connect
                    socials={data.footer.socials}
                    resume={data.profile.resume}
                />
                <Experience experiences={data.experience} />
                <Education education={data.education} />
                <Skills skills={data.skills} />
                <Projects projects={data.projects} />
                <Footer footer={data.footer} />
            </div>
        </main>
    )
}
