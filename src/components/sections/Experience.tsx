import { useState } from 'react'
import type { Experience as ExperienceType } from '@/types/portfolio'
import {
    ExpandRow,
    LogoTile,
    RowTitle,
    SectionHeader,
} from '@/components/ui/sheet'

const Experience = ({ experiences }: { experiences: ExperienceType[] }) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([])

    const toggle = (id: string) =>
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )

    return (
        <section id="work">
            <SectionHeader>Experience</SectionHeader>
            <div>
                {experiences.map((exp) => (
                    <ExpandRow
                        key={exp.id}
                        expanded={expandedIds.includes(exp.id)}
                        onToggle={() => toggle(exp.id)}
                        header={
                            <>
                                <LogoTile src={exp.logo} alt={exp.company} />
                                <span className="min-w-0 flex-1">
                                    <RowTitle
                                        title={exp.company}
                                        meta={exp.period}
                                    />
                                    <span className="block text-[13.5px] text-muted-foreground">
                                        {exp.role}
                                    </span>
                                </span>
                            </>
                        }
                    >
                        <p className="prose-body text-[13.5px] text-muted-3">
                            {exp.description}
                        </p>
                    </ExpandRow>
                ))}
            </div>
        </section>
    )
}

export default Experience
