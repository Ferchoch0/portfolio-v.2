import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@styles/cta.css';

gsap.registerPlugin(ScrollTrigger);
 
export default function CTA() {
    const sectionRef = useRef(null);
    const { t } = useTranslation();

    useGSAP(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        // La sección sube revelándose desde abajo
        gsap.fromTo(sectionRef.current,
            { yPercent: -50 },
            {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "top top",
                    scrub: true
                }
            }
        );

        // Fade in de los elementos internos
        const textElements = gsap.utils.toArray('.fd-cta-anim-fade');
        gsap.fromTo(textElements,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    once: true
                }
            }
        );

        // Climax expandible para el titulo
        gsap.to('.fd-cta-headline', {
            scale: 1.4,
            opacity: 0.4,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "center center",
                end: "bottom top", 
                scrub: true
            }
        });

    }, { scope: sectionRef });

    return (
        <section className="fd-cta" id="contact" ref={sectionRef}>
            <div className="fd-cta-container">
                <h2 className="fd-cta-headline">
                    {t("cta.headline_1", "Let's build the")} <br/>
                    <span className="fd-cta-highlight">{t("cta.headline_2", "future together.")}</span>
                </h2>
                <div className="fd-cta-anim-fade mt-4">
                    <p className="fd-cta-subtitle">
                        {t("cta.subtitle", "Currently available for freelance opportunities and leadership roles.")}
                    </p>
                </div>
                <div className="fd-cta-actions fd-cta-anim-fade">
                    <Link to="/contact" className="fd-cta-primary-btn">
                        {t("cta.button", "Get in Touch")} <FaArrowRight className="fd-cta-arrow" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
