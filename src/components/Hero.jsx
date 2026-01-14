import '../assets/styles/hero.css';
import Name from './NameBanner';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

export default function HeroScreen() {
  const { t } = useTranslation();

  return (
    <section id='home' className='fd-hero--container cinematic'>
      <div className="fd-hero--overlay"></div>

      <motion.div
        className='fd-hero--content'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="fd-hero--title">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t("hero.welcome")}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t("hero.toMy")} <span>{t("hero.portfolio")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {t("hero.name")}
          </motion.p>
        </div>
        <motion.div
          className='fd-hero--buttons'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <a href="/cv.pdf" download className="hero-btn primary">
            <FaFileDownload /> {t("hero.downloadCV")}
          </a>
          <a href="https://github.com/Ferchoch0" target="_blank" rel="noreferrer" className="hero-btn secondary">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/fernando-d-delvalle/" target="_blank" rel="noreferrer" className="hero-btn secondary">
            <FaLinkedin /> LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className='fd-hero--sculture lighted'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <img src="/sculture-banner.png" alt="sculture banner" />
      </motion.div>

      <Name />
    </section>
  );
}
