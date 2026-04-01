import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';
import '@styles/works.css';

gsap.registerPlugin(ScrollTrigger);

const gridImages = [
    { id: "otter-v2", title: "Otter Task V2", img: "works/ottertaskv2/ott-v2-1.png", isMain: true },
    { id: "cpa-1", title: "CPA Admin", img: "works/pr-6.png" },
    { id: "mott-1", title: "Mottoso", img: "works/pr-8.png" },
    { id: "ph-1", title: "Project 4", img: "works/pr-7.png" },
    { id: "ph-2", title: "Project 5", img: "works/pr-3.png" },
    { id: "ph-3", title: "Project 6", img: "works/pr-11.png" },
    { id: "ph-4", title: "Project 7", img: "works/pr-10.png" },
    { id: "ph-5", title: "Project 8", img: "works/pr-12.png" },
    { id: "ph-6", title: "Project 9", img: "works/pr-6.png" },
    { id: "ph-7", title: "Project 10", img: "works/pr-1.png" },
    
];

const mainProjects = [
    { id: "otter-v2", title: "Otter Task V2", category: "System Management", image: "works/ottertaskv2/ott-v2-1.png" },
    { id: "cpa", title: "CPA Admin Panel", category: "Dashboard UI", image: "works/pr-6.png" },
    { id: "mottoso", title: "Mottoso Real Estate", category: "Web Application", image: "works/pr-8.png" }
];

export default function Works({ onOpenProjectsModal }) {
    const sectionRef = useRef(null);
    const splitLayoutRef = useRef(null);
    const gridIntroRef = useRef(null);
    const targetImageRef = useRef(null);
    const visualDestRef = useRef(null);
    const activeIndex = useRef(0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    useGSAP((context, contextSafe) => {
        // On mobile, skip ALL grid animations and pinning
        if (isMobile) {
            if (gridIntroRef.current) {
                gsap.set(gridIntroRef.current, { display: 'none' });
            }
            if (splitLayoutRef.current) {
                gsap.set(splitLayoutRef.current, { opacity: 1 });
            }
            return;
        }

        const WORKS_ANIM = window.innerHeight * 2.8;
        
        // Timeline Maestro Atado al Scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${WORKS_ANIM}`,
                pin: true,     
                scrub: 1,      
                onLeave: () => gsap.set(gridIntroRef.current, { pointerEvents: 'none', display: 'none' }),
                onEnterBack: () => gsap.set(gridIntroRef.current, { display: 'block' })
            }
        });

        const gridItems = gsap.utils.toArray('.fd-works-grid-item:not(.hero-target)');
        const heroItem = targetImageRef.current; 
        
        gsap.set(splitLayoutRef.current, { opacity: 0 }); 
        
        // Fase 1: Desarmar la Grilla de 9 asegurando caída total fuera de pantalla
        tl.to(gridItems, {
            y: window.innerHeight, 
            opacity: 0,
            scale: 0.5,
            rotation: () => gsap.utils.random(-15, 15),
            duration: window.innerHeight * 0.8,
            stagger: { amount: window.innerHeight * 0.3, from: "start" }, 
            ease: "power2.in"
        }, 0);

        // Fase 2: Otter Task se expande a Full Screen
        tl.to(heroItem, {
            width: '100vw',
            height: '100vh',
            x: '0vw', 
            y: '0vh',
            duration: window.innerHeight * 0.8,
            ease: "power3.inOut"
        }, window.innerHeight * 0.2);

        // Fase 3: Reducción al Split Layout
        const destinyContainer = visualDestRef.current.querySelector('.fd-works-image-container');
        
        tl.to(heroItem, {
            width: () => destinyContainer.offsetWidth,
            height: () => destinyContainer.offsetHeight,
            x: () => destinyContainer.getBoundingClientRect().left,
            y: () => destinyContainer.getBoundingClientRect().top - sectionRef.current.getBoundingClientRect().top,
            borderRadius: "0px", 
            duration: window.innerHeight * 1.0,
            ease: "power3.inOut"
        }, window.innerHeight * 1.0);

        // EXTRA FASE: El Hero desaparece EXACTAMENTE al terminar de achicarse, como pediste
        tl.to(heroItem, { opacity: 0, duration: window.innerHeight * 0.3 }, window.innerHeight * 1.9);

        // Fase 4: Lista izquierda aparece apenas desaparece el Hero
        tl.to(splitLayoutRef.current, { 
            opacity: 1, 
            duration: window.innerHeight * 0.5 
        }, window.innerHeight * 2.0);
        
        const rows = gsap.utils.toArray('.fd-works-row');
        tl.fromTo(rows, 
            { y: 50, opacity: 0, rotateX: 10 }, 
            { 
                y: 0, 
                opacity: 1, 
                rotateX: 0, 
                duration: window.innerHeight * 0.5, 
                stagger: window.innerHeight * 0.1, 
                ease: "power2.out" 
            }, 
            window.innerHeight * 2.0
        );

        // ** Interactive Hover Effects para cuando la animación de scroll acaba **
        const images = gsap.utils.toArray('.fd-works-image');
        gsap.set(images, { opacity: 0, scale: 1.05 });
        gsap.set(images[0], { opacity: 1, scale: 1 }); // Mostrar el 1ro pre-definido

    }, { scope: sectionRef });

    // API ContextSafe recomendada de @gsap/react para manejo de eventos
    const { contextSafe } = useGSAP({ scope: sectionRef });

    const handleMouseEnter = contextSafe((index) => {
        if (index === activeIndex.current) return;
        const images = gsap.utils.toArray('.fd-works-image');
        const tl = gsap.timeline();
        
        tl.to(images[activeIndex.current], { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0);
        tl.fromTo(images[index], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0);
        
        activeIndex.current = index;
    });

    return (
        <section className="fd-works" id="works" ref={sectionRef} style={{ position: 'relative' }}>
            
            {/* The Awwwards 3x3 Grid Intro */}
            <div className="fd-works-intro-wrapper" ref={gridIntroRef}>
                <div className="fd-works-intro-grid">
                    {gridImages.map((p, i) => (
                        <div 
                            key={`grid-${i}`} 
                            className={`fd-works-grid-item ${p.isMain ? 'hero-target' : ''}`}
                            ref={p.isMain ? targetImageRef : null}
                            style={p.isMain ? { position: 'absolute', top: 0, left: 0, width: '33.333vw', height: '33.333vh' } : {}}
                        >
                            <img src={p.img} alt={`Grid ${i}`} className="fd-works-grid-img" />
                        </div>
                    ))}
                </div>
            </div>

            {/* The Actual Split Layout (Hidden initially, then fade in) */}
            <div className="fd-works-container" ref={splitLayoutRef}>
                <header className="fd-works-header">
                    <h2 className="fd-works-title">Selected Works</h2>
                </header>

                <div className="fd-works-split">
                    <div className="fd-works-list">
                        {mainProjects.map((project, index) => (
                            <a 
                                href={`/project/${project.id}`}
                                key={project.id} 
                                className="fd-works-row"
                                onMouseEnter={(e) => {
                                    if(handleMouseEnter) handleMouseEnter(index);
                                }}
                            >
                                <span className="fd-works-row-num">0{index + 1}</span>
                                <h3 className="fd-works-row-title">{project.title}</h3>
                                <span className="fd-works-row-cat">{project.category}</span>
                            </a>
                        ))}
                    </div>

                    <div className="fd-works-visual" ref={visualDestRef}>
                        <div className="fd-works-image-container" style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '16/9' }}>
                            {mainProjects.map((project, index) => (
                                <img 
                                    key={`img-${project.id}`}
                                    src={project.image} 
                                    alt={`Project ${project.title}`} 
                                    className={`fd-works-image img-${index}`} 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="fd-works-footer">
                    <button 
                        className="fd-works-view-all" 
                        onClick={onOpenProjectsModal}
                    >
                        View all projects <FaArrowRight className="link-arrow" />
                    </button>
                </div>
            </div>
        </section>
    );
}
