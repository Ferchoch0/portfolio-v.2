import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Users, Calendar, User, Clock } from 'lucide-react';
import '../assets/styles/project-details.css';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = useProjects();
    const { t } = useTranslation();
    const [currentImage, setCurrentImage] = useState(0);

    const project = useMemo(() => {
        return projects.find(p => p.key === id);
    }, [projects, id]);

    // Find prev/next project for navigation
    const projectIndex = useMemo(() => {
        return projects.findIndex(p => p.key === id);
    }, [projects, id]);

    const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentImage(0);
    }, [id]);

    const images = project ? (project.gallery || [project.image]) : [];

    const nextImage = useCallback(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    if (!project) {
        return (
            <div className="fd-pd" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <h2 className="fd-pd--title">{t("works.projectNotFound", "Proyecto no encontrado")}</h2>
                <button onClick={() => navigate(-1)} className="fd-pd--back">
                    <FaArrowLeft /> {t("works.goBack", "Volver")}
                </button>
            </div>
        );
    }

    return (
        <div className="fd-pd">
            {/* ── Top Bar ── */}
            <div className="fd-pd--topbar">
                <button onClick={() => navigate(-1)} className="fd-pd--back">
                    <FaArrowLeft />
                    <span>{t("works.goBack", "Volver")}</span>
                </button>
            </div>

            {/* ── Gallery ── */}
            <div className="fd-pd--gallery">
                <div className="fd-pd--gallery-main">
                    <img
                        src={'/' + images[currentImage]}
                        alt={`${project.title} - ${currentImage + 1}`}
                        className="fd-pd--gallery-main-img"
                        loading="eager"
                    />
                </div>
                {images.length > 1 && (
                    <div className="fd-pd--gallery-side">
                        {(() => {
                            let visibleIndices = [];
                            if (images.length >= 3) {
                                visibleIndices = [
                                    (currentImage - 1 + images.length) % images.length,
                                    currentImage,
                                    (currentImage + 1) % images.length
                                ];
                            } else {
                                visibleIndices = images.map((_, i) => i);
                            }
                            
                            return visibleIndices.map((idx, position) => (
                                <button
                                    key={`${idx}-${position}`}
                                    className={`fd-pd--gallery-thumb ${idx === currentImage ? 'active' : ''}`}
                                    onClick={() => setCurrentImage(idx)}
                                >
                                    <img src={'/' + images[idx]} alt={`${project.title} Preview ${idx + 1}`} loading="lazy" />
                                </button>
                            ));
                        })()}
                    </div>
                )}
            </div>

            {/* ── Content ── */}
            <div className="fd-pd--content">
                {/* Left: Info */}
                <div className="fd-pd--info">
                    <span className="fd-pd--subtitle">{project.subtitle}</span>
                    <h1 className="fd-pd--title">{project.title}</h1>
                    <p className="fd-pd--desc">{project.longDescription || project.description}</p>

                    {/* Actions */}
                    <div className="fd-pd--actions">
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="fd-pd--action-btn fd-pd--action-primary">
                                <FaExternalLinkAlt /> {t("works.viewDemo", "Ver Demo")}
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="fd-pd--action-btn fd-pd--action-outline">
                                <FaGithub /> {t("works.viewCode", "Ver Código")}
                            </a>
                        )}
                    </div>
                </div>

                {/* Right: Metadata */}
                <div className="fd-pd--meta-side">
                    {/* Metadata Grid */}
                    <div className="fd-pd--meta">
                        {project.role && (
                            <div className="fd-pd--meta-item">
                                <User size={16} />
                                <div>
                                    <span className="fd-pd--meta-label">{t("works.meta.role", "Rol")}</span>
                                    <span className="fd-pd--meta-value">{project.role}</span>
                                </div>
                            </div>
                        )}
                        {project.year && (
                            <div className="fd-pd--meta-item">
                                <Clock size={16} />
                                <div>
                                    <span className="fd-pd--meta-label">{t("works.meta.year", "Año")}</span>
                                    <span className="fd-pd--meta-value">{project.year}</span>
                                </div>
                            </div>
                        )}
                        {project.duration && (
                            <div className="fd-pd--meta-item">
                                <Calendar size={16} />
                                <div>
                                    <span className="fd-pd--meta-label">{t("works.meta.duration", "Duración")}</span>
                                    <span className="fd-pd--meta-value">{project.duration}</span>
                                </div>
                            </div>
                        )}
                        {project.collaborators && (
                            <div className="fd-pd--meta-item">
                                <Users size={16} />
                                <div>
                                    <span className="fd-pd--meta-label">{t("works.meta.team", "Equipo")}</span>
                                    <span className="fd-pd--meta-value">{project.collaborators}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tech Stack */}
                    {project.languages && project.languages.length > 0 && (
                        <div className="fd-pd--techs">
                            <h3 className="fd-pd--section-title">{t("works.meta.stack", "Stack")}</h3>
                            <div className="fd-pd--tech-list">
                                {project.languages.map((lang, i) => (
                                    <span key={i} className="fd-pd--tech-badge">{lang}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="fd-pd--features">
                            <h3 className="fd-pd--section-title">{t("works.meta.features", "Funcionalidades")}</h3>
                            <ul className="fd-pd--feature-list">
                                {project.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Removed Bottom Thumbnails Strip ── */}
            {/* ── Project Navigation ── */}
            <div className="fd-pd--nav-projects">
                {prevProject ? (
                    <Link to={`/project/${prevProject.key}`} className="fd-pd--nav-link fd-pd--nav-prev">
                        <FaArrowLeft />
                        <div>
                            <span className="fd-pd--nav-label">{t("works.prevProject", "Anterior")}</span>
                            <span className="fd-pd--nav-name">{prevProject.title}</span>
                        </div>
                    </Link>
                ) : <div />}
                {nextProject ? (
                    <Link to={`/project/${nextProject.key}`} className="fd-pd--nav-link fd-pd--nav-next">
                        <div>
                            <span className="fd-pd--nav-label">{t("works.nextProject", "Siguiente")}</span>
                            <span className="fd-pd--nav-name">{nextProject.title}</span>
                        </div>
                        <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                ) : <div />}
            </div>
        </div>
    );
}
