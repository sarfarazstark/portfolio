export interface Profile {
    name: string
    role: string
    avatar: string
    location: string
    bio: string
    resume: string
}

export interface Experience {
    id: string
    company: string
    role: string
    period: string
    description: string
    logo: string
}

export interface Education {
    id: string
    school: string
    degree: string
    period: string
    logo: string
}

export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    techStack: string[]
    links: {
        live?: string
        github?: string
    }
    period?: string
    image: string
    featured: boolean
    slug: string
}

export interface Social {
    platform: string
    url: string
}

export interface Footer {
    socials: Social[]
}

export interface Skill {
    name: string
    icon?: string
}

export interface PortfolioData {
    profile: Profile
    about: string
    experience: Experience[]
    education: Education[]
    skills: Skill[]
    projects: Project[]
    footer: Footer
}

/** One day of the contribution calendar; `l` is GitHub's 0-4 shade bucket. */
export interface ActivityDay {
    d: string
    l: number
    c: number
}

export interface ActivitySource {
    user: string
    total: number
    merged: number
    currentStreak: number
    longestStreak: number
    bestDay: { date: string; count: number }
    days: ActivityDay[]
}

export interface Activity {
    generated: string
    /** GitHub totals; `days` is the merged GitHub+GitLab calendar. */
    github: ActivitySource
    gitlab: {
        host: string
        user: string
        total: number
        days: { d: string; c: number }[]
    } | null
}
