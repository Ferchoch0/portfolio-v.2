import '../assets/styles/works.css';
import { useState, useMemo, useCallback, memo } from 'react';
import Name from './NameBanner';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, User, Clock, Check } from 'lucide-react';

// Memoizar componentes para evitar re-renders innecesarios
const WorkItem = memo(({ project, onSelect }) => (
    <motion.div
        className={`fd-work--item ${project.reverse ? 'reverse' : ''}`}
        initial={{ opacity: 0, x: project.reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            <img
                src={project.image}
                alt={`${project.title} ${project.subtitle}`}
                loading="lazy"
            />
        </div>
    </motion.div>
));

WorkItem.displayName = 'WorkItem';

const WorkMenu = memo(({ projects, onSelect, onClose }) => (
    <aside className="fd-work--menu">
        <button className="fd-work--menu-close" onClick={onClose}>✕</button>
        <ul>
            {projects.map((p, i) => (
                <li key={i} onClick={() => onSelect(p)}>
                    {p.title} {p.subtitle}
                </li>
            ))}
        </ul>
    </aside>
));

WorkMenu.displayName = 'WorkMenu';

const WorkDetail = memo(({ project, onClose }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = useMemo(() => project.gallery || [project.image], [project.gallery, project.image]);

    const nextImage = useCallback(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleThumbnailClick = useCallback((index) => {
        setCurrentImage(index);
    }, []);

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <motion.div
            className="fd-work--detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
        >
            <div className="fd-work--details-container" onClick={(e) => e.stopPropagation()}>
                <button className="fd-work--detail-close" onClick={onClose}>✕</button>

                <div className="fd-work--detail-left">
                    <div className="fd-work--detail-overlay">
                        <h2 dangerouslySetInnerHTML={{ __html: `${project.title} <span>${project.subtitle}</span>` }} />
                        <p>{project.longDescription || project.description}</p>
                        
                        {/* Nueva sección de metadata del proyecto */}
                        <div className="fd-work--metadata">
                            {project.collaborators && (
                                <div className="fd-work--meta-item">
                                    <Users size={16} />
                                    <span>{project.collaborators}</span>
                                </div>
                            )}
                            
                            {project.duration && (
                                <div className="fd-work--meta-item">
                                    <Calendar size={16} />
                                    <span>{project.duration}</span>
                                </div>
                            )}
                            
                            {project.role && (
                                <div className="fd-work--meta-item">
                                    <User size={16} />
                                    <span>{project.role}</span>
                                </div>
                            )}
                            
                            {project.year && (
                                <div className="fd-work--meta-item">
                                    <Clock size={16} />
                                    <span>{project.year}</span>
                                </div>
                            )}
                        </div>

                        {/* Características principales */}
                        {project.features && project.features.length > 0 && (
                            <div className="fd-work--features">
                                <h3>Características principales</h3>
                                <ul>
                                    {project.features.map((feature, i) => (
                                        <li key={i}>
                                            <Check size={12} strokeWidth={3} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.languages && (
                            <ul className="fd-work--langs">
                                {project.languages.map((lang, i) => (
                                    <li key={i}>{lang}</li>
                                ))}
                            </ul>
                        )}
                        
                        <div className="fd-work--links">
                            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                            {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>}
                        </div>
                    </div>
                </div>

                <div className="fd-work--detail-right">
                    <div className="fd-work--gallery">
                        <div className="fd-work--gallery-main">
                            <img
                                key={currentImage}
                                src={images[currentImage]}
                                alt={`${project.title} - ${currentImage + 1}`}
                                className="fd-work--gallery-image"
                            />
                        </div>

                        {images.length > 1 && (
                            <>
                                <button className="fd-work--gallery-nav prev" onClick={prevImage}>‹</button>
                                <button className="fd-work--gallery-nav next" onClick={nextImage}>›</button>

                                <div className="fd-work--gallery-counter">
                                    {currentImage + 1} / {images.length}
                                </div>

                                <div className="fd-work--gallery-thumbs">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`Thumbnail ${i + 1}`}
                                            className={`fd-work--gallery-thumb ${i === currentImage ? 'active' : ''}`}
                                            onClick={() => handleThumbnailClick(i)}
                                            loading="lazy"
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

WorkDetail.displayName = 'WorkDetail';

export default function WorkScreen() {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Datos de proyectos - ahora memoizados
    const projectsData = useMemo(() => [
        {
            key: "otter-v2",
            subtitleKey: "taskPanel",
            image: "works/ottertaskv2/ott-v2-1.png",
            gallery: ["works/ottertaskv2/ott-v2-1.png", "works/ottertaskv2/ott-v2-2.png", "works/ottertaskv2/ott-v2-3.png", "works/ottertaskv2/ott-v2-4.png", "works/ottertaskv2/ott-v2-5.png", "works/ottertaskv2/ott-v2-6.png", "works/ottertaskv2/ott-v2-7.png"],
            languages: ["React", "PHP", "REST API", "MySQL"],
            features: [
                "Sistema de gestión de tareas",
                "Dashboard en tiempo real",
                "API REST completa",
                "Notificaciones push"
            ],
            demo: ""
        },
        {
            key: "cpa",
            subtitleKey: "panel",
            image: "works/pr-6.png",
            gallery: ["works/pr-6.png", "works/cpa/cpa-res-1.png", "works/cpa/cpa-res-2.png", "works/cpa/cpa-res-3.png", "works/cpa/cpa-res-5.png", "works/cpa/cpa-res-6.png"],
            reverse: true,
            languages: ["React", "PHP", "CSS", "MYSQL"],
            features: [
                "Panel administrativo web",
                "App móvil nativa",
                "Sistema de reportes",
                "Gestión de incidencias"
            ]
        },
        {
            key: "cpa-desinfeccion",
            subtitleKey: "mobileSystem",
            image: "works/cpa/cpa-des-1.png",
            gallery: ["works/cpa/cpa-des-2.png", "works/cpa/cpa-des-3.png", "works/cpa/cpa-des-4.png", "works/cpa/cpa-des-5.png", "works/cpa/cpa-des-6.png"],
            languages: ["Angular", "Node.js", "Mobile"],
        },
        {
            key: "mottoso",
            subtitleKey: "panel",
            image: "works/pr-8.png",
            gallery: ["works/pr-8.png", "works/mottoso/mtt-1.png", "works/mottoso/mtt-2.png", "works/mottoso/mtt-3.png", "works/mottoso/mtt-4.png", "works/mottoso/mtt-5.png", "works/mottoso/mtt-6.png", "works/mottoso/mtt-7.png", "works/mottoso/mtt-8.png", "works/mottoso/mtt-9.png", "works/mottoso/mtt-10.png"],
            languages: ["React", "PHP", "CSS", "MYSQL"],
        },
        {
            key: "beretta",
            subtitleKey: "panel",
            image: "works/pr-7.png",
            gallery: ["works/pr-7.png", "works/beretta/btt-1.png", "works/beretta/btt-2.png", "works/beretta/btt-3.png"],
            reverse: true,
            languages: ["React", "PHP", "TAILWINDS"],
        },
        {
            key: "otter",
            subtitleKey: "task",
            image: "works/pr-5.png",
            gallery: ["works/pr-5.png", "works/ottertaskv1/ot-v1-1.png", "works/ottertaskv1/ot-v1-2.png", "works/ottertaskv1/ot-v1-3.png"],
            languages: ["PHP", "CSS", "MYSQL"],
            demo: "https://task-forge-plus.fwh.is/View/login?email=delvalle.fernando.d@gmail.com&password=papelera123&i=1"
        },
        {
            key: "tateti",
            subtitleKey: "game",
            image: "works/pr-4.png",
            gallery: ["works/pr-4.png"],
            languages: ["React", "CSS"],
        },
        {
            key: "portfolio-v.1",
            subtitleKey: "game",
            image: "works/pr-9.png",
            gallery: ["works/pr-9.png", "works/pr-9-1.png"],
            languages: ["React", "CSS"],
            demo: "https://fern-portfolio.netlify.app/"
        },
        {
            key: "otter-solutions",
            subtitleKey: "game",
            image: "works/pr-10.png",
            gallery: ["works/pr-10.png"],
            languages: ["React", "CSS"],
            demo: "https://ottersolutions.netlify.app/"
        },
        {
            key: "sassa",
            subtitleKey: "financialApp",
            image: "works/pr-3.png",
            gallery: ["works/pr-3.png", "works/pr-3-1.png", "works/pr-3-2.png"],
            reverse: true,
            languages: ["PHP", "MySQL", "Bootstrap"],
        },
        {
            key: "tattoo",
            subtitleKey: "sizer",
            image: "works/pr-1.png",
            gallery: ["works/pr-1.png"],
            languages: ["JavaScript", "Canvas API"],
        },

    ], []);

    // Memoizar la traducción de proyectos
    const projects = useMemo(() => projectsData.map(p => ({
        ...p,
        title: t(`works.projects.${p.key}.title`),
        subtitle: t(`works.projects.${p.key}.subtitle`),
        description: t(`works.projects.${p.key}.description`),
        longDescription: t(`works.projects.${p.key}.longDescription`, ""),
        moreDetailsText: t("works.moreDetails"),
        year: t(`works.projects.${p.key}.year`, p.year),
        duration: t(`works.projects.${p.key}.duration`, p.duration),
        role: t(`works.projects.${p.key}.role`, p.role),
        collaborators: t(`works.projects.${p.key}.collaborators`, p.collaborators),
        features: p.features ? p.features.map((feature, i) => t(`works.projects.${p.key}.features.${i}`, feature)) : [],
    })), [projectsData, t]);

    // Callbacks memoizados
    const handleSelect = useCallback((project) => {
        setSelectedProject(project);
        setMenuOpen(false);
    }, []);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const handleProjectClose = useCallback(() => {
        setSelectedProject(null);
    }, []);

    // Memoizar slices de proyectos
    const mainProjects = useMemo(() => projects.slice(0, 3), [projects]);
    const menuProjects = useMemo(() => projects.slice(3), [projects]);

    return (
        <section id='works' className='fd-work--container'>
            <div className='fd-work--title'>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {t("works.title")}<span>_</span>
                </motion.h1>

                <motion.button
                    className="fd-work--menu-btn"
                    onClick={handleMenuOpen}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t("works.moreProjects")}
                </motion.button>
            </div>

            <div className='fd-work--content'>
                {mainProjects.map((p, i) => (
                    <WorkItem key={p.key} project={p} onSelect={handleSelect} />
                ))}
                {selectedProject && <WorkItem project={selectedProject} onSelect={handleSelect} />}
            </div>

            <Name />

            <AnimatePresence mode="wait">
                {menuOpen && (
                    <WorkMenu
                        projects={menuProjects}
                        onSelect={handleSelect}
                        onClose={handleMenuClose}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {selectedProject && (
                    <WorkDetail
                        project={selectedProject}
                        onClose={handleProjectClose}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}