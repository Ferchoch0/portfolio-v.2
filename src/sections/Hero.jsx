import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

/* ── cloud infinite‑loop layer ── */
function CloudLoop({ src, duration = 60, direction = -1, parallaxY, initial, animate, transition }) {
    return (
        <motion.div
            className="fd-scene--layer-wrapper"
            initial={IS_MOBILE ? undefined : initial}
            animate={IS_MOBILE ? undefined : animate}
            transition={IS_MOBILE ? undefined : transition}
        >
            <motion.div
                className="fd-scene--layer-wrapper"
                style={{ y: IS_MOBILE ? 0 : parallaxY }}
            >
                <div className="fd-scene--cloud-track">
                    <motion.div
                        className="fd-scene--cloud-slide"
                        animate={{ x: direction === -1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                        transition={{
                            repeat: Infinity,
                            duration: IS_MOBILE ? duration * 1.5 : duration,
                            ease: 'linear',
                        }}
                    >
                        <div className="fd-scene--cloud-bg" style={{ backgroundImage: `url(${src})` }} />
                        <div className="fd-scene--cloud-bg" style={{ backgroundImage: `url(${src})` }} />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── parallax layer helper ── */
function ParallaxLayer({ src, parallaxY, className = '', initial, animate, transition }) {
    return (
        <motion.div
            className="fd-scene--layer-wrapper"
            initial={IS_MOBILE ? undefined : initial}
            animate={IS_MOBILE ? undefined : animate}
            transition={IS_MOBILE ? undefined : transition}
        >
            <motion.div
                className={`fd-scene--layer ${className}`}
                style={{
                    y: IS_MOBILE ? 0 : parallaxY,
                    backgroundImage: `url(${src})`
                }}
            />
        </motion.div>
    );
}

const HeroScreen = memo(function HeroScreen() {
    const heroRef = useRef(null);
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ['0px', '380px']);
    const yMountain = useTransform(scrollYProgress, [0, 1], ['0px', '320px']);
    const yClouds = useTransform(scrollYProgress, [0, 1], ['0px', '300px']);
    const yLake = useTransform(scrollYProgress, [0, 1], ['0px', '260px']);

    const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const text = "FERNANDO DELVALLE";
    const chars = text.split("");

    /* On mobile: show text immediately (delay 0). On desktop: staggered entrance. */
    const getTransition = (index, char) => {
        if (IS_MOBILE) {
            return { delay: 0.3 + index * 0.02, type: "spring", damping: 14, stiffness: 120 };
        }
        if (char === "O" && index === 7) {
            return { delay: 4.6, type: "spring", damping: 8, stiffness: 80 };
        }
        return {
            delay: 3.2 + (index * 0.08),
            type: "spring",
            damping: 14,
            stiffness: 100,
        };
    };

    const charVariants = {
        hidden: {
            y: "100%",
            rotateZ: IS_MOBILE ? 0 : 65,
            transformOrigin: "bottom left",
        },
        visible: (custom) => ({
            y: 0,
            rotateZ: 0,
            transition: getTransition(custom.index, custom.char),
        }),
    };

    const mobileQuickFade = IS_MOBILE
        ? { delay: 0.6, duration: 0.6, ease: "easeOut" }
        : undefined;

    return (
        <section className="fd-hero--container" ref={heroRef}>
            {/* ─── SCENE BACKGROUND ─── */}
            <div className="fd-scene--container">
                <ParallaxLayer 
                    src={SCENE_LAYERS.background} 
                    parallaxY={yBg} 
                />

                <ParallaxLayer 
                    src={SCENE_LAYERS.mountain} 
                    parallaxY={yMountain} 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 3.6 }}
                />

                <CloudLoop 
                    src={SCENE_LAYERS.cloud1} 
                    duration={80} direction={-1} parallaxY={yClouds} 
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 3.2 }}
                />
                <CloudLoop 
                    src={SCENE_LAYERS.cloud2} 
                    duration={100} direction={1} parallaxY={yClouds} 
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 3.3 }}
                />
                <CloudLoop 
                    src={SCENE_LAYERS.cloud3} 
                    duration={65} direction={-1} parallaxY={yClouds} 
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 3.4 }}
                />

                <ParallaxLayer 
                    src={SCENE_LAYERS.lake} 
                    parallaxY={yLake} 
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 3.2 }}
                />

                <motion.div
                    className="fd-scene--layer"
                    style={{ backgroundImage: `url(${SCENE_LAYERS.rock})` }}
                    initial={IS_MOBILE ? undefined : { opacity: 0, y: "40%" }}
                    animate={IS_MOBILE ? undefined : { opacity: 1, y: "0%" }}
                    transition={IS_MOBILE ? undefined : { duration: 1.5, ease: "easeOut", delay: 3.8 }}
                />
            </div>

            {/* ─── DARK GRADIENT OVERLAY ─── */}
            <div className="fd-scene--overlay" />

            {/* ─── TEXT ─── */}
            <motion.div layout className="fd-hero--content" style={{ opacity: IS_MOBILE ? 1 : opacityText }}>
                
                <motion.div 
                    className="fd-hero--top-badges"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={mobileQuickFade || { delay: 4.8, duration: 1.2, ease: "easeOut" }}
                >
                    <div className="fd-hero--availability">
                        <span className="pulse-dot"></span>
                        {t("hero.badge_freelance", "Available for freelance")}
                    </div>
                    <span className="fd-hero--role-tag">{t("hero.badge_role", "Software Engineer & Creative Developer")}</span>
                </motion.div>

                <motion.h1
                    layout
                    className="fd-hero--title"
                    initial="hidden"
                    animate="visible"
                >
                    {chars.map((char, index) => (
                        <motion.span
                            key={index}
                            className="fd-hero--char"
                            variants={charVariants}
                            custom={{ index, char }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.div
                    className="fd-hero--description"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={mobileQuickFade || {
                        delay: 5.0,
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                >
                    <p className="fd-desc-text">{t("hero.desc_1", "I build products with real depth.")}</p>
                    <p className="fd-desc-text" dangerouslySetInnerHTML={{ __html: t("hero.desc_2", "I lead a freelance team where technical criteria <br className=\"fd-hero--br\" /> matters as much as business vision.") }} />

                    <div className="fd-hero--services">
                        <div className="fd-service-item">
                            <span>{t("hero.services.web", "Web")}</span>
                            React, Next.js, Tailwind
                        </div>
                        <div className="fd-service-item">
                            <span>{t("hero.services.mobile", "Mobile")}</span>
                            React Native, Expo
                        </div>
                        <div className="fd-service-item">
                            <span>{t("hero.services.backend", "Backend")}</span>
                            Node.js, Laravel, PHP
                        </div>
                        <div className="fd-service-item">
                            <span>{t("hero.services.apis", "APIs")}</span>
                            n8n
                        </div>
                        <div className="fd-service-item">
                            <span>{t("hero.services.focus", "Focus")}</span>
                            Fullstack
                        </div>
                    </div>

                    <div className="fd-hero--actions">
                        <a href="https://utterly.com.ar" target="_blank" rel="noreferrer" className="fd-hero--btn fd-hero--btn-primary">
                            {t("hero.utterlyButton", "Visitar Utterly")}
                        </a>
                        <Link to="/contact" className="fd-hero--btn fd-hero--btn-outline">
                            {t("hero.contactButton", "Hablemos de tu proyecto")}
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
});

export default HeroScreen;