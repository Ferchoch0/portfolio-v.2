import { useState, useEffect } from 'react';
import { FaTimes, FaBars, FaChevronDown, FaGithub, FaLinkedin, FaArrowRight, FaTerminal } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import '../assets/styles/navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        closeMenu();
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        // Forzamos la recarga real del navegador para que App.jsx vuelva a montar SmoothLoader
        const isGithubPages = window.location.pathname.includes('/fern-portfolio/');
        window.location.href = isGithubPages ? '/fern-portfolio/' : '/';
    };

    return (
        <nav className={`nav-letta ${isScrolled ? 'scrolled' : 'glass-panel'}`}>
            <div className='nav-letta-container'>
                <a href="/" onClick={handleLogoClick} className="nav-letta-logo" style={{ textDecoration: 'none' }}>
                    <span className="nav-logo-1">{'<'}</span>
                    <span className="nav-logo-2"> FD </span>
                    <span className="nav-logo-1">/{'>'}</span>
                </a>
                <div className={`nav-letta-center ${isOpen ? 'open' : ''}`}>
                    <ul className="nav-letta-links">
                        <li className="nav-letta-item">
                            <CustomLink to="home" closeMenu={closeMenu}>{t("navbar.home", "Home")}</CustomLink>
                        </li>
                        
                        <li className="nav-letta-item has-dropdown">
                            <span className="nav-dropdown-trigger">
                                {t("navbar.works", "Works")} <FaChevronDown className="chevron" />
                            </span>
                            
                            <div className="nav-letta-dropdown">
                                <ScrollLink to="works" smooth={true} duration={600} offset={-70} onClick={closeMenu} className="dropdown-panel-item">
                                    <div className="dp-item-icon"><FaTerminal /></div>
                                    <div className="dp-item-text">
                                        <h4>{t("navbar.dropdown.web_architecture_title", "Web Architecture")}</h4>
                                        <p>{t("navbar.dropdown.web_architecture_desc", "React/Next.js frontend applications")}</p>
                                    </div>
                                    <FaArrowRight className="dp-item-arrow" />
                                </ScrollLink>
                                <ScrollLink to="works" smooth={true} duration={600} offset={-70} onClick={closeMenu} className="dropdown-panel-item">
                                    <div className="dp-item-icon"><FaTerminal /></div>
                                    <div className="dp-item-text">
                                        <h4>{t("navbar.dropdown.mobile_engineering_title", "Mobile Engineering")}</h4>
                                        <p>{t("navbar.dropdown.mobile_engineering_desc", "Cross-platform React Native apps")}</p>
                                    </div>
                                    <FaArrowRight className="dp-item-arrow" />
                                </ScrollLink>
                                <ScrollLink to="works" smooth={true} duration={600} offset={-70} onClick={closeMenu} className="dropdown-panel-item">
                                    <div className="dp-item-icon"><FaTerminal /></div>
                                    <div className="dp-item-text">
                                        <h4>{t("navbar.dropdown.backend_systems_title", "Backend Systems")}</h4>
                                        <p>{t("navbar.dropdown.backend_systems_desc", "Scalable APIs and architectures")}</p>
                                    </div>
                                    <FaArrowRight className="dp-item-arrow" />
                                </ScrollLink>
                            </div>
                        </li>

                        <li className="nav-letta-item">
                            <CustomLink to="about" closeMenu={closeMenu}>{t("navbar.about", "About")}</CustomLink>
                        </li>
                        <li className="nav-letta-item">
                            <CustomLink to="skills" closeMenu={closeMenu}>{t("navbar.skills", "Skills")}</CustomLink>
                        </li>
                    </ul>
                </div>

                <div className="nav-letta-actions">
                    <a href="https://github.com/Ferchoch0" target="_blank" rel="noreferrer" className="action-link-icon">
                        <FaGithub /> <span className="action-link-text">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/fernando-d-delvalle/" target="_blank" rel="noreferrer" className="action-link-icon">
                        <FaLinkedin /> <span className="action-link-text">LinkedIn</span>
                    </a>
                    
                    <div className="nav-letta-item has-dropdown nav-lang-letta">
                        <span className="nav-dropdown-trigger">
                            {i18n.language.toUpperCase()} <FaChevronDown className="chevron" />
                        </span>
                        
                        <div className="nav-letta-dropdown lang-dropdown">
                            <div onClick={() => changeLanguage('es')} className="dropdown-panel-item">
                                <div className="dp-item-text"><h4>ES - Español</h4></div>
                            </div>
                            <div onClick={() => changeLanguage('en')} className="dropdown-panel-item">
                                <div className="dp-item-text"><h4>EN - English</h4></div>
                            </div>
                            <div onClick={() => changeLanguage('it')} className="dropdown-panel-item">
                                <div className="dp-item-text"><h4>IT - Italiano</h4></div>
                            </div>
                        </div>
                    </div>

                    <a href="mailto:delvalle.fernando.dddaniel@gmail.com" className="btn-letta outline">{t("navbar.contact", "Contact")}</a>
                    <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn-letta solid">{t("navbar.resume", "Resume")}</a>

                    <div className="menu-toggle" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function CustomLink({ to, children, closeMenu, ...props }) {
    return (
        <ScrollLink
            to={to}
            smooth={true}
            duration={600}
            offset={-70}
            spy={true}
            activeClass="active"
            onClick={closeMenu}
            className="letta-scroll-link"
            {...props}
        >
            {children}
        </ScrollLink>
    );
}
