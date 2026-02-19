import Hero from '@/components/sections/Hero'
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
        <main className="relative z-10 max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24 space-y-16 sm:space-y-20 lg:space-y-24">
            <Hero profile={data.profile} about={data.about} />
            <Experience experiences={data.experience} />
            <Education education={data.education} />
            <Skills skills={data.skills} />
            <Projects projects={data.projects} limit={4} />
            <Footer footer={data.footer} />
        </main>
    )
}
