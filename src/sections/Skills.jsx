import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiGo, SiNextdotjs } from 'react-icons/si';
import '@styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillStack = [
    { name: "React", icon: <FaReact /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Go", icon: <SiGo /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Figma", icon: <FaFigma /> }
];

export default function Skills() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const badges = gsap.utils.toArray('.fd-skill-badge');
        
        gsap.fromTo(badges,
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className="fd-skills" id="skills" ref={containerRef}>
            <div className="fd-skills-container">
                <header className="fd-skills-header text-center">
                    <h2 className="fd-skills-title">Core Technology Stack</h2>
                    <p className="fd-skills-subtitle">
                        The tools and technologies I use to build scalable, high-performance applications.
                    </p>
                </header>

                <div className="fd-skills-grid">
                    {skillStack.map((skill, i) => (
                        <div key={i} className="fd-skill-badge">
                            <span className="fd-skill-icon">{skill.icon}</span>
                            <span className="fd-skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
