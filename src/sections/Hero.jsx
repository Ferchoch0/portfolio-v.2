import React, { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkle, Linkedin, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import BtnSpace from '@components/BtnSpace';
import SpacetimeGrid from '@components/SpacetimeGrid';
import '@styles/hero.css';

/* ── scene layer paths (public/scene/) ── */
const SCENE_LAYERS = {
    background: '/scene/background.svg',
    lake: '/scene/lake.svg',
    mountain: '/scene/mountain.svg',
    rock: '/scene/rock.svg',
    cloud1: '/scene/cloud-1.svg',
    cloud2: '/scene/cloud-2.svg',
    cloud3: '/scene/cloud-3.svg',
};

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth <= 768;

/* ── Loader ends at 3.2s, so hero entrance starts slightly after ── */
const LOADER_DURATION = 3.2;
const BASE_DELAY = LOADER_DURATION + 0.3; // 3.5s

/* ── Staggered entrance config ── */
const entrance = {
    video: {
        initial: { y: -300, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: BASE_DELAY, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
    grid: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: BASE_DELAY + 0.2, duration: 1.2, ease: 'easeOut' },
    },
    title: {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: BASE_DELAY + 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
    marquee: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: BASE_DELAY + 0.7, duration: 0.8, ease: 'easeOut' },
    },
    left: {
        initial: { x: -80, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { delay: BASE_DELAY + 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
    center: {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: BASE_DELAY + 0.9, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
    right: {
        initial: { x: 80, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { delay: BASE_DELAY + 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
};

/* ── Mobile: skip delays, quick fade ── */
const mobileEntrance = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6, duration: 0.6, ease: 'easeOut' },
};


function BlackHole() {
    return (
        <motion.div
            initial={IS_MOBILE ? mobileEntrance.initial : entrance.video.initial}
            animate={IS_MOBILE ? mobileEntrance.animate : entrance.video.animate}
            transition={IS_MOBILE ? mobileEntrance.transition : entrance.video.transition}
            className="fd-hero--blackhole-container"
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
                className="fd-hero--blackhole-video"
            >
                <source src="/blackhole.webm" type="video/webm" />
            </video>

            {/* Fundido suave al final del video */}
            <div className="fd-hero--blackhole-overlay" />
        </motion.div>
    );
}


const HeroScreen = memo(function HeroScreen() {
    const heroRef = useRef(null);
    const { t } = useTranslation();

    const textFirst = "DELVALLE";
    const textSecond = "FERNANDO";

    return (
        <section className="fd-hero--container" ref={heroRef}>
            {/* ─── SCENE BACKGROUND ─── */}
            <BlackHole />
            <div className="fd-scene--container">
            </div>

            {/* ─── DARK GRADIENT OVERLAY ─── */}
            <div className="fd-scene--overlay" />

            {/* ─── SPACETIME GRID ─── */}
            <motion.div
                initial={IS_MOBILE ? undefined : entrance.grid.initial}
                animate={IS_MOBILE ? undefined : entrance.grid.animate}
                transition={IS_MOBILE ? undefined : entrance.grid.transition}
            >
                <SpacetimeGrid />
            </motion.div>

            {/* ─── TEXT ─── */}
            <motion.div 
                className="fd-hero--content"
                initial={IS_MOBILE ? mobileEntrance.initial : entrance.title.initial}
                animate={IS_MOBILE ? mobileEntrance.animate : entrance.title.animate}
                transition={IS_MOBILE ? mobileEntrance.transition : entrance.title.transition}
            >
                
                {false && (
                    <motion.div 
                        className="fd-hero--top-badges"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={IS_MOBILE ? mobileEntrance.transition : { delay: BASE_DELAY + 0.5, duration: 1.0, ease: 'easeOut' }}
                    >
                        <div className="fd-hero--availability">
                            <span className="pulse-dot"></span>
                            {t("hero.badge_freelance", "Available for freelance")}
                        </div>
                        <span className="fd-hero--role-tag">{t("hero.badge_role", "Software Engineer & Creative Developer")}</span>
                    </motion.div>
                )}

                <h1 className="fd-hero--title">
                    <div className="fd-hero--title-line">
                        {textFirst.split("").map((char, i) => (
                            <span key={i} className="fd-hero--char">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                    <div className="fd-hero--title-line">
                        {textSecond.split("").map((char, i) => (
                            <span key={i} className="fd-hero--char">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                </h1>
            </motion.div>

            {/* MARQUEE */}
            <motion.div 
                className="fd-hero--marquee"
                initial={IS_MOBILE ? mobileEntrance.initial : entrance.marquee.initial}
                animate={IS_MOBILE ? mobileEntrance.animate : entrance.marquee.animate}
                transition={IS_MOBILE ? mobileEntrance.transition : entrance.marquee.transition}
            >
                <div className="fd-hero--marquee-track">
                    {[...Array(2)].map((_, groupIndex) => (
                        <div className="fd-hero--marquee-group" key={groupIndex}>
                            {["Web", "Mobile", "Backend", "APIs", "Fullstack", "Enfocado", "Web", "Mobile", "Backend", "APIs", "Fullstack", "Enfocado"].map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="fd-hero--marquee-item">
                                        <span>{item}</span>
                                    </div>
                                    <div className="fd-hero--marquee-separator"><Sparkle size={16} strokeWidth={1.5} /></div>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* BOTTOM LAYOUT */}
            <div className="fd-hero--bottom-layout">
                <div className="fd-hero--bottom-grid">
                    {/* Left: QRs — slides in from left */}
                    <motion.div 
                        className="fd-hero--qrs"
                        initial={IS_MOBILE ? mobileEntrance.initial : entrance.left.initial}
                        animate={IS_MOBILE ? mobileEntrance.animate : entrance.left.animate}
                        transition={IS_MOBILE ? mobileEntrance.transition : entrance.left.transition}
                    >
                        <div className="fd-hero--qr-item">
                            <QRCodeSVG 
                                value="https://www.linkedin.com/in/fernando-d-delvalle/" 
                                size={60} 
                                bgColor="transparent" 
                                fgColor="#bfa3ff" 
                                level="M" 
                            />
                            <div className="fd-hero--qr-icon">
                                <Linkedin size={16} color="#bfa3ff" strokeWidth={2} />
                            </div>
                        </div>
                        <div className="fd-hero--qr-item">
                            <QRCodeSVG 
                                value="https://github.com/Ferchoch0" 
                                size={60} 
                                bgColor="transparent" 
                                fgColor="#bfa3ff" 
                                level="M" 
                            />
                            <div className="fd-hero--qr-icon">
                                <Github size={16} color="#bfa3ff" strokeWidth={2} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Center: Mage + Text — slides up */}
                    <motion.div 
                        className="fd-hero--mage-container"
                        initial={IS_MOBILE ? mobileEntrance.initial : entrance.center.initial}
                        animate={IS_MOBILE ? mobileEntrance.animate : entrance.center.animate}
                        transition={IS_MOBILE ? mobileEntrance.transition : entrance.center.transition}
                    >
                        <div className="fd-hero--mage-text">
                            <p className="fd-desc-text">
                                Desarrollo soluciones tecnológicas sólidas con un enfoque verdaderamente integral. Construyo ecosistemas digitales donde la arquitectura, el diseño y la experiencia de usuario convergen.
                            </p>
                            <p className="fd-desc-text">
                                Lidero un equipo independiente donde la excelencia técnica y la visión estratégica de negocio son el pilar fundamental para llevar cada producto hacia el siguiente nivel de escalabilidad.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Buttons — slides in from right */}
                    <motion.div 
                        className="fd-hero--side-actions"
                        initial={IS_MOBILE ? mobileEntrance.initial : entrance.right.initial}
                        animate={IS_MOBILE ? mobileEntrance.animate : entrance.right.animate}
                        transition={IS_MOBILE ? mobileEntrance.transition : entrance.right.transition}
                    >
                        <BtnSpace 
                            text={t("hero.utterlyButton", "Utterly")} 
                            href="https://otter-ly.netlify.app/" 
                            target="_blank" 
                            rel="noreferrer" 
                        />
                        <BtnSpace 
                            text={t("hero.contactButton", "Contacto")} 
                            to="/contact" 
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

export default HeroScreen;