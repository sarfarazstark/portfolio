import type { Education as EducationType } from '@/types/portfolio'
import { LogoTile, RowTitle, SectionHeader } from '@/components/ui/sheet'

const Education = ({ education }: { education: EducationType[] }) => {
    return (
        <section id="education">
            <SectionHeader>Education</SectionHeader>
            <div>
                {education.map((edu) => (
                    <div
                        key={edu.id}
                        className="hl flex items-start gap-3.5 px-4 py-4.5 transition-colors duration-300 ease-out-expo hover:bg-surface-2/70 sm:px-6"
                    >
                        <LogoTile src={edu.logo} alt={edu.school} />
                        <div className="min-w-0 flex-1">
                            <RowTitle title={edu.school} meta={edu.period} />
                            <p className="text-[13.5px] text-muted-foreground">
                                {edu.degree}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Education
