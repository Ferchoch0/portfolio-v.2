import { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaGitAlt, FaFigma, FaPhp, FaMobileAlt, FaCss3Alt, FaServer, FaVectorSquare } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMysql, SiCplusplus, SiLaravel, SiThreedotjs, SiTauri, SiDocker, SiGreensock, SiFramer } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import '@styles/services.css';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const panelsRef = useRef([]);
    const numsRef = useRef([]);
    const { t } = useTranslation();
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const servicesData = useMemo(() => [
        {
            num: "01",
            title: t("services.p1_title", "Frontend Engineering"),
            description: t("services.p1_desc", "Building resilient, interactive user interfaces using React, Next.js, and modern CSS architecture. Focus on performance, accessibility (a11y), and pixel-perfect implementation of complex design systems."),
            isTechGrid: true,
            techs: [
                { name: "React", icon: <FaReact /> },
                { name: "Tailwind", icon: <SiTailwindcss /> },
                { name: "CSS", icon: <FaCss3Alt /> }
            ]
        },
        {
            num: "02",
            title: t("services.p2_title", "Backend & Architecture"),
            description: t("services.p2_desc", "Designing scalable microservices and robust REST/GraphQL APIs. Leveraging Node.js, Go, and relational databases..."),
            isTechGrid: true,
            techs: [
                { name: "PHP", icon: <FaPhp /> },
                { name: "Node.js", icon: <FaNodeJs /> },
                { name: "REST API", icon: <FaServer /> },
                { name: "MySQL", icon: <SiMysql /> },
                { name: "Git", icon: <FaGitAlt /> }
            ]
        },
        {
            num: "03",
            title: t("services.p3_title", "Creative Development"),
            description: t("services.p3_desc", "Bridging the gap between design and engineering. Deeply experienced in crafting highly immersive web experiences using GSAP, Framer Motion, and WebGL..."),
            isTechGrid: true,
            techs: [
                { name: "GSAP", icon: <SiGreensock /> },
                { name: "Framer Motion", icon: <SiFramer /> },
                { name: "Three.js", icon: <SiThreedotjs /> },
                { name: "SVG Animation", icon: <FaVectorSquare /> },
                { name: "Figma", icon: <FaFigma /> }
            ]
        },
        {
            num: "04",
            title: t("services.p4_title", "Desktop & Mobile"),
            description: t("services.p4_desc", "Developing cross-platform applications with native-like performance for both mobile devices and desktop environments."),
            isTechGrid: true,
            techs: [
                { name: "React Native", icon: <FaMobileAlt /> },
                { name: "Tauri", icon: <SiTauri /> },
                { name: "C++", icon: <SiCplusplus /> },
                { name: "C#", icon: <TbBrandCSharp /> }
            ]
        },
        {
            num: "05",
            title: t("services.p5_title", "Learning"),
            description: t("services.p5_desc", "Technologies I'm actively expanding my expertise in. Constantly pushing to broaden my stack and stay at the cutting edge of modern development."),
            isTechGrid: true,
            techs: [
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Laravel", icon: <SiLaravel /> },
                { name: "Docker", icon: <SiDocker /> }
            ]
        }
    ], [t]);

    useGSAP(() => {
        // On mobile, skip all GSAP pinning and crossfade animations
        if (isMobile) return;

        const totalServices = servicesData.length;
        const SCROLL_PER_ITEM = window.innerHeight * 1.0;
        const TOTAL_SCROLL = SCROLL_PER_ITEM * totalServices;

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: () => `+=${TOTAL_SCROLL}`,
                scrub: 1
            }
        });

        // Progress bar fill
        masterTl.to(progressRef.current, {
            height: "100%",
            duration: TOTAL_SCROLL,
            ease: "none"
        }, 0);

        // Crossfade logic
        servicesData.forEach((_, i) => {
            const panel = panelsRef.current[i];
            const numEl = numsRef.current[i];
            const startTime = i * SCROLL_PER_ITEM;

            if (i === 0) {
                gsap.set(panel, { opacity: 1, y: 0 });

                if (totalServices > 1) {
                    masterTl.to(panel, {
                        opacity: 0,
                        y: -30,
                        duration: SCROLL_PER_ITEM * 0.3,
                        ease: "power2.in"
                    }, startTime + SCROLL_PER_ITEM * 0.7);

                    masterTl.to(numEl, {
                        scale: 1,
                        duration: SCROLL_PER_ITEM * 0.3,
                        onStart: () => numEl.classList.remove('active')
                    }, startTime + SCROLL_PER_ITEM * 0.7);
                }
            } else {
                gsap.set(panel, { opacity: 0, y: 30 });

                masterTl.to(panel, {
                    opacity: 1,
                    y: 0,
                    duration: SCROLL_PER_ITEM * 0.3,
                    ease: "power2.out"
                }, startTime);

                masterTl.to(numEl, {
                    scale: 1.3,
                    duration: SCROLL_PER_ITEM * 0.3,
                    onStart: () => numEl.classList.add('active')
                }, startTime);

                if (i < totalServices - 1) {
                    masterTl.to(panel, {
                        opacity: 0,
                        y: -30,
                        duration: SCROLL_PER_ITEM * 0.3,
                        ease: "power2.in"
                    }, startTime + SCROLL_PER_ITEM * 0.7);

                    masterTl.to(numEl, {
                        scale: 1,
                        duration: SCROLL_PER_ITEM * 0.3,
                        onStart: () => numEl.classList.remove('active')
                    }, startTime + SCROLL_PER_ITEM * 0.7);
                }
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="fd-services" id="services" ref={sectionRef}>
            <div className="fd-services-inner">
                
                {/* Left: Vertical Timeline */}
                <div className="fd-services-timeline">
                    <div className="fd-timeline-track">
                        <div className="fd-timeline-progress" ref={progressRef}></div>
                    </div>
                    <div className="fd-timeline-numbers">
                    {servicesData.map((s, i) => (
                            <div 
                                key={`num-${i}`} 
                                className={`fd-timeline-num ${i === 0 && !isMobile ? 'active' : ''}`}
                                ref={el => numsRef.current[i] = el}
                            >
                                {s.num}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Content */}
                <div className="fd-services-content">
                    <header className="fd-services-header">
                        <h2 className="fd-services-title">{t("services.header_title", "Services & Expertise")}</h2>
                    </header>

                    <div className="fd-services-panels">
                        {servicesData.map((service, i) => (
                            <div 
                                key={`panel-${i}`}
                                className={`fd-service-panel ${isMobile ? 'is-active' : (i === 0 ? 'is-active' : '')}`}
                                ref={el => panelsRef.current[i] = el}
                            >
                                <span className="fd-service-panel-num">{service.num}</span>
                                <h3 className="fd-service-panel-title">{service.title}</h3>
                                <p className="fd-service-panel-desc">{service.description}</p>
                                
                                {service.isTechGrid ? (
                                    <div className="fd-service-tech-grid">
                                        {service.techs.map(tech => (
                                            <div key={tech.name} className="fd-service-tech-badge">
                                                <span className="fd-service-tech-icon">{tech.icon}</span>
                                                <span className="fd-service-tech-name">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="fd-service-panel-tags">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="fd-service-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
