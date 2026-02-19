import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, User, Briefcase, GraduationCap, Code2, FolderKanban, MessageSquare, Sun, Moon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

interface DockItem {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: (e?: React.MouseEvent) => void;
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    const sections = ['home', 'about', 'work', 'education', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const items: DockItem[] = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Work', href: '#work' },
    { icon: GraduationCap, label: 'Education', href: '#education' },
    { icon: Code2, label: 'Skills', href: '#skills' },
    { icon: FolderKanban, label: 'Projects', href: '#projects' },
    { icon: MessageSquare, label: 'Contact', href: '#contact' },
    {
      icon: theme === 'light' ? Moon : Sun,
      label: 'Toggle Theme',
      href: '#',
      onClick: (e) => {
        e?.preventDefault();
        toggleTheme();
      }
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl border border-border bg-background/80 px-4 pb-3 backdrop-blur-md"
        role="navigation"
        aria-label="Main navigation"
      >
        {items.map((item) => (
          <IconContainer
            mouseX={mouseX}
            key={item.label}
            active={activeSection === item.href.replace('#', '')}
            {...item}
          />
        ))}
      </nav>
    </motion.div>
  );
}

function IconContainer({
  mouseX,
  icon: Icon,
  label,
  href,
  onClick,
  active,
}: DockItem & {
  mouseX: MotionValue<number>;
  active: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      href={href}
      onClick={onClick}
      style={{ width, height }}
      ref={ref}
      aria-label={label}
      className={cn(
        "group relative flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        active ? "bg-foreground" : "bg-muted hover:bg-muted-foreground/10"
      )}
    >
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 pointer-events-none">
        {label}
      </span>
      <Icon className={cn(
        "h-1/2 w-1/2 transition-colors",
        active ? "text-background" : "text-muted-foreground group-hover:text-foreground"
      )} />
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-foreground"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}
