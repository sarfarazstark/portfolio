export interface Profile {
    name: string
    role: string
    avatar: string
    location: string
    bio: string
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
    image: string
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
