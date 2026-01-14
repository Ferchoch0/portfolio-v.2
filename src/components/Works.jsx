import '../assets/styles/works.css';
import { useState } from 'react';
import Name from './NameBanner';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const WorkItem = ({ project, onSelect }) => (
    <motion.div
        className={`fd-work--item ${project.reverse ? 'reverse' : ''}`}
        initial={{ opacity: 0, x: project.reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
    >
        <div className="fd-work--text">
            <h2 dangerouslySetInnerHTML={{ __html: `${project.title} <br /><span>${project.subtitle}</span>` }} />
            <p>{project.description}</p>
        </div>
        <div className="fd-work--image">
            <button className='fd-work--more' onClick={() => onSelect(project)}>
                {project.moreDetailsText}
            </button>
            <img src={project.image} alt={`${project.title} ${project.subtitle}`} />
        </div>
    </motion.div>
);

const WorkMenu = ({ projects, onSelect, onClose }) => (
    <aside className="fd-work--menu">
        <button className="fd-work--menu-close" onClick={onClose}>✕
        </button>
        <ul>
            {projects.map((p, i) => (
                <li key={i} onClick={() => onSelect(p)}>
                    {p.title} {p.subtitle}
                </li>))}
        </ul>
    </aside>
);

const WorkDetail = ({ project, onClose }) => (
    <motion.div
        className="fd-work--detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="fd-work--details-container">
            <img src={project.image} alt={project.title} className="fd-work--detail-bg" />
            <div className="fd-work--detail-overlay">
                <button className="fd-work--detail-close" onClick={onClose}>✕</button>
                <h2 dangerouslySetInnerHTML={{ __html: `${project.title} <span>${project.subtitle}</span>` }} />
                <p>{project.longDescription || project.description}</p>
                {project.languages && (
                    <ul className="fd-work--langs">
                        {project.languages.map((lang, i) => (
                            <li key={i}>{lang}</li>
                        ))}
                    </ul>
                )}
                <div className="fd-work--links">
                    {project.github && <a href={project.github} target="_blank">GitHub</a>}
                    {project.demo && <a href={project.demo} target="_blank">Demo</a>}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function WorkScreen() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const projectsData = [
        {
            key: "otter",
            subtitleKey: "task",
            image: "works/pr-5.png",
            languages: ["PHP", "CSS", "MYSQL"],
            demo: "https://task-forge-plus.fwh.is/View/login?email=delvalle.fernando.d@gmail.com&password=papelera123&i=1"
        },
        {
            key: "cpa",
            subtitleKey: "panel",
            image: "works/pr-6.png",
            reverse: true,
            languages: ["React", "PHP", "CSS", "MYSQL"],
        },
        {
            key: "mottoso",
            subtitleKey: "panel",
            image: "works/pr-8.png",
            languages: ["React", "PHP", "CSS", "MYSQL"],
        },
        {
            key: "beretta",
            subtitleKey: "panel",
            image: "works/pr-7.png",
            reverse: true,
            languages: ["React", "PHP", "TAILWINDS"],
        },
        {
            key: "tateti",
            subtitleKey: "game",
            image: "works/pr-4.png",
            languages: ["React", "CSS"],
        },
        {
            key: "portfolio-v.1",
            subtitleKey: "game",
            image: "works/pr-9.png",
            languages: ["React", "CSS"],
            demo: "https://fern-portfolio.netlify.app/"
        },
        {
            key: "portfolio-other",
            subtitleKey: "game",
            image: "works/pr-10.png",
            languages: ["React", "CSS"],
            demo: "https://ottersolutions.netlify.app/"

        },
        {
            key: "sassa",
            subtitleKey: "financialApp",
            image: "works/pr-3.png",
            reverse: true,
            languages: ["PHP", "MySQL", "Bootstrap"],
        },
        {
            key: "tattoo",
            subtitleKey: "sizer",
            image: "works/pr-1.png",
            languages: ["JavaScript", "Canvas API"],
        },
        {
            key: "another",
            subtitleKey: "project",
            reverse: true,
            image: "works/pr-2.png",
        },
    ];

    const projects = projectsData.map(p => ({
        ...p,
        title: t(`works.projects.${p.key}.title`),
        subtitle: t(`works.projects.${p.key}.subtitle`),
        description: t(`works.projects.${p.key}.description`),
        longDescription: t(`works.projects.${p.key}.longDescription`, ""),
        moreDetailsText: t("works.moreDetails")
    }));

    const handleSelect = (project) => {
        setSelectedProject(project);
        setMenuOpen(false);
    };

    return (
        <section id='works' className='fd-work--container'>
            <div className='fd-work--title'>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {t("works.title")}<span>_</span>
                </motion.h1>

                <motion.button
                    className="fd-work--menu-btn"
                    onClick={() => setMenuOpen(true)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t("works.moreProjects")}
                </motion.button>
            </div>

            <div className='fd-work--content'>
                {projects.slice(0, 3).map((p, i) => (
                    <WorkItem key={i} project={p} onSelect={handleSelect} />
                ))}
                {selectedProject && <WorkItem project={selectedProject} onSelect={handleSelect} />}
            </div>

            <Name />

            <AnimatePresence>
                {menuOpen && (
                    <WorkMenu
                        projects={projects.slice(3)}
                        onSelect={handleSelect}
                        onClose={() => setMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedProject && (
                    <WorkDetail
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
