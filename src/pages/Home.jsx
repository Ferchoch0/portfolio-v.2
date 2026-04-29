import { useState, useRef } from "react";
import useIsMobile from "@hooks/useIsMobile";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Desktop (GSAP-heavy) */
import HeroScreen from "@sections/Hero";
import AboutMe from "@sections/AboutMe";
import Works from "@sections/Works";
import Services from "@sections/Services";
import CTA from "@sections/CTA";

/* Mobile (pure static) */
import AboutMeMobile from "@sections/AboutMeMobile";
import WorksMobile from "@sections/WorksMobile";
import ServicesMobile from "@sections/ServicesMobile";

import ProjectsSidebar from "@components/ProjectsSidebar";

export default function HomeScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useIsMobile();
    const svgLineRef = useRef(null);

    useGSAP(() => {
        if (isMobile) return;

        // Pin the SVG exactly during the Works GSAP animation
        ScrollTrigger.create({
            trigger: ".fd-works",
            start: "top top",
            end: () => `+=${window.innerHeight * 2.0}`, // matches Works pin duration
            pin: svgLineRef.current,
            pinSpacing: false
        });

        // Pin the SVG exactly during the Services GSAP animation
        ScrollTrigger.create({
            trigger: ".fd-services",
            start: "top top",
            end: () => `+=${window.innerHeight * 5.0}`, // matches Services pin duration (5 items)
            pin: svgLineRef.current,
            pinSpacing: false
        });
    }, { dependencies: [isMobile] });

    return(
        <>
            <main>
                <HeroScreen />

                {isMobile ? <AboutMeMobile /> : <AboutMe />}
                <div 
                    className="home-works-services-wrapper" 
                    style={{ 
                        position: 'relative', 
                        backgroundColor: 'var(--bg-inverted-color, #f9f9fb)',
                        overflow: 'hidden',
                        zIndex: 10
                    }}
                >
                    <img 
                        ref={svgLineRef}
                        src="/scene/line.svg" 
                        alt="" 
                        style={{ 
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%', 
                            height: '200vh', 
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            zIndex: 0,
                            pointerEvents: 'none',
                            opacity: 0.15 
                        }} 
                    />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {isMobile 
                            ? <WorksMobile onOpenProjectsModal={() => setIsSidebarOpen(true)} />
                            : <Works onOpenProjectsModal={() => setIsSidebarOpen(true)} />
                        }
                        {isMobile ? <ServicesMobile /> : <Services />}
                    </div>
                </div>
                
                <CTA />
            </main>
            <ProjectsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}