import { FaArrowRight } from 'react-icons/fa';
import '@styles/works-mobile.css';

const mainProjects = [
    { id: "otter-v2", title: "Otter Task V2", category: "System Management", image: "works/ottertaskv2/ott-v2-1.png" },
    { id: "cpa", title: "CPA Admin Panel", category: "Dashboard UI", image: "works/pr-6.png" },
    { id: "mottoso", title: "Mottoso Real Estate", category: "Web Application", image: "works/pr-8.png" }
];

/**
 * WorksMobile — Pure static layout, zero GSAP.
 * Each project is a card with an image thumbnail, title, and category.
 */
export default function WorksMobile({ onOpenProjectsModal }) {
    return (
        <section className="fd-works-m" id="works">
            <h2 className="fd-works-m--title">Selected Works</h2>

            <div className="fd-works-m--list">
                {mainProjects.map((project, index) => (
                    <a 
                        href={`/project/${project.id}`} 
                        key={project.id} 
                        className="fd-works-m--card"
                    >
                        <div className="fd-works-m--img-wrap">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="fd-works-m--img"
                                loading="lazy"
                            />
                        </div>
                        <div className="fd-works-m--info">
                            <span className="fd-works-m--num">0{index + 1}</span>
                            <h3 className="fd-works-m--card-title">{project.title}</h3>
                            <span className="fd-works-m--cat">{project.category}</span>
                        </div>
                    </a>
                ))}
            </div>

            <div className="fd-works-m--footer">
                <button className="fd-works-m--view-all" onClick={onOpenProjectsModal}>
                    View all projects <FaArrowRight />
                </button>
            </div>
        </section>
    );
}
