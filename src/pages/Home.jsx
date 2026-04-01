import { useState } from "react";
import useIsMobile from "@hooks/useIsMobile";

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

    return(
        <>
            <main>
                <HeroScreen />

                {isMobile ? <AboutMeMobile /> : <AboutMe />}
                {isMobile 
                    ? <WorksMobile onOpenProjectsModal={() => setIsSidebarOpen(true)} />
                    : <Works onOpenProjectsModal={() => setIsSidebarOpen(true)} />
                }
                {isMobile ? <ServicesMobile /> : <Services />}
                
                <CTA />
            </main>
            <ProjectsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}