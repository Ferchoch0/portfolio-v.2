import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "@styles/aboutme.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const { t } = useTranslation();

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    useGSAP(() => {
        // On mobile, skip all GSAP pinning and horizontal scroll animations
        if (isMobile) {
            const path = document.querySelector(".f-path-anim");
            if (path) {
                const length = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: 0,
                    stroke: "rgba(255,255,255, 0)",
                    strokeWidth: 2,
                    fill: "rgba(255,255,255, 0.15)"
                });
            }
            return;
        }

        const panels = gsap.utils.toArray(".fd-about--panel");
        const path = document.querySelector(".f-path-anim");
        const length = path.getTotalLength();
        
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            stroke: "rgba(255,255,255, 0.8)",
            strokeWidth: 2,
            fill: "rgba(255,255,255, 0)"
        });

        const DURATION_H = window.innerHeight * 1.5;
        const DURATION_ZOOM = window.innerHeight * 0.8;

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: targetRef.current,
                pin: true,
                pinSpacing: true,
                start: "top top",
                end: () => `+=${DURATION_H + DURATION_ZOOM}`,
                scrub: 1
            }
        });

        const panelsLength = panels.length;
        
        masterTl.to(trackRef.current, {
            xPercent: -100 * (panelsLength - 1) / panelsLength,
            ease: "none",
            duration: DURATION_H
        }, 0);

        masterTl.to(path, {
            strokeDashoffset: 0,
            duration: DURATION_H * 0.7,
            ease: "none"
        }, 0)
        .to(path, {
            fill: "rgba(255,255,255, 1)",
            stroke: "rgba(255,255,255, 0)",
            duration: DURATION_H * 0.3,
            ease: "none"
        }, DURATION_H * 0.7);

        masterTl.to(".fd-about--f-container", {
            scale: 150,
            yPercent: -50,
            transformOrigin: "center center",
            duration: DURATION_ZOOM * 0.8,
            ease: "power2.in"
        }, DURATION_H)
        
        .to(".fd-about--wrapper", {
            opacity: 0,
            duration: DURATION_ZOOM * 0.2,
            ease: "none"
        }, DURATION_H + DURATION_ZOOM * 0.8);

    }, { scope: targetRef });

    return (
        <section ref={targetRef} className={`fd-about--wrapper ${isMobile ? 'fd-about--mobile' : ''}`} id="about" style={isMobile ? {} : { height: '100vh', overflow: 'hidden' }}>
            <div className="fd-about--sticky">
                
                {/* Contenedor estático lado izquierdo para la letra F */}
                <div className="fd-about--f-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" className="fd-about--svg-f">
                        <path 
                            className="f-path-anim"
                            d="M 50 30 L 150 30 L 150 60 L 80 60 L 80 90 L 130 90 L 130 120 L 80 120 L 80 170 L 50 170 Z" 
                        />
                    </svg>
                </div>

                <div ref={trackRef} className="fd-about--track" style={{ width: '300vw' }}>
                    <article className="fd-about--panel">
                        <header>
                            <h2 className="fd-about--title" dangerouslySetInnerHTML={{ __html: t("about.title_1", "About me") }} />
                        </header>
                        <p className="fd-about--text">
                            {t("about.text_1", "I don't just write code. I build robust solutions that scale and simplify complex business problems with solid architecture.")}
                        </p>
                    </article>
                    
                    <article className="fd-about--panel">
                        <header>
                            <h2 className="fd-about--title" dangerouslySetInnerHTML={{ __html: t("about.title_2", "My approach") }} />
                        </header>
                        <p className="fd-about--text">
                            {t("about.text_2", "I combine meticulous design with technical leadership, always seeking the sweet spot between user experience and raw performance.")}
                        </p>
                    </article>
                    
                    <article className="fd-about--panel">
                        <header>
                            <h2 className="fd-about--title" dangerouslySetInnerHTML={{ __html: t("about.title_3", "The vision") }} />
                        </header>
                        <p className="fd-about--text">
                            {t("about.text_3", "I work closely in collaboration with clients and teams to ensure that the chosen technology always drives strategic objectives.")}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
