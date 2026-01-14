import "../assets/styles/skills.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

import {
    FaReact, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaPhp, FaPython,
    FaJava, FaGitAlt, FaGithub, FaWordpress, FaFigma, FaProjectDiagram
} from "react-icons/fa";

import { SiC, SiMysql, SiTailwindcss, SiThreedotjs, SiVite } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { BsFiletypePsd } from "react-icons/bs";
import { t } from "i18next";
import Name from './NameBanner';


const data = [
    {
        id: "frontend",
        title: "Frontend",
        subtitle: "UI / Interactividad",
        skills: [
            { name: "React", icon: FaReact },
            { name: "HTML", icon: FaHtml5 },
            { name: "CSS", icon: FaCss3Alt },
            { name: "JavaScript", icon: FaJs },
            { name: "Bootstrap", icon: FaBootstrap },
            { name: "Framer Motion", icon: FaReact },
        ],
    },
    {
        id: "backend",
        title: "Backend",
        subtitle: "Lógica & Datos",
        skills: [
            { name: "PHP", icon: FaPhp },
            { name: "C", icon: SiC },
            { name: "C#", icon: SiC },
            { name: "Visual Basic", icon: FaProjectDiagram },
            { name: "Java", icon: FaJava },
            { name: "MySQL", icon: SiMysql },
            { name: "SQL", icon: TbSql },
        ],
    },
    {
        id: "tools",
        title: "Herramientas",
        subtitle: "Workflow & Diseño",
        skills: [
            { name: "Git", icon: FaGitAlt },
            { name: "GitHub", icon: FaGithub },
            { name: "WordPress", icon: FaWordpress },
            { name: "Elementor", icon: BsFiletypePsd },
            { name: "Photoshop", icon: BsFiletypePsd },
            { name: "Figma", icon: FaFigma },
            { name: "Vite", icon: SiVite },
        ],
    },
    {
        id: "learning",
        title: "Learning",
        subtitle: "Explorando",
        skills: [
            { name: "TailwindCSS", icon: SiTailwindcss },
            { name: "Three.js", icon: SiThreedotjs },
        ],
    },
];

export default function SkillsGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" }); // dispara cuando el elemento entra en pantalla
    const controls = useAnimation();

    useEffect(() => {
        if (inView) controls.start({ opacity: 1, x: 0 });
    }, [inView, controls]);

    return (
        <section className="fd-skills-grid--wrap" id="skills" ref={ref}>
            <div className="fd-skills-grid--header">
                <div className="fd-skills-grid--title">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {t("skills.title")}
                    </motion.h2>
                    <motion.p
                        className="muted"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {t("skills.description")}
                    </motion.p>
                </div>

                <motion.div
                    className="fd-skills-grid--brand"
                    initial={{ opacity: 0, x: 30 }}
                    animate={controls}
                    transition={{ duration: 0.6 }}
                >
                    <img src="sculture-skill.png" alt="brand sculpture" />
                </motion.div>
            </div>

            <div className="fd-skills-grid">
                {data.map((cat) => (
                    <motion.article
                        key={cat.id}
                        className="fd-skills-card"
                        whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                    >
                        <div className="fd-card--top">
                            <h3>{cat.title}</h3>
                            <span className="fd-card--sub">{cat.subtitle}</span>
                        </div>

                        <div className="fd-card--body">
                            <ul className="fd-skill-chips">
                                {cat.skills.map((s, i) => {
                                    const Icon = s.icon || FaProjectDiagram;
                                    return (
                                        <motion.li
                                            key={i}
                                            className="fd-skill-chip"
                                            whileHover={{ scale: 1.07, translateY: -4 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            title={s.name}
                                            tabIndex={0}
                                        >
                                            <span className="chip-icon"><Icon /></span>
                                            <span className="chip-label">{s.name}</span>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>
                    </motion.article>
                ))}
                <Name />
            </div>
        </section>
    );
}
