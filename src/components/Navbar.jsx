import { useState } from 'react';
import { FaTimes, FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import '../assets/styles/navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
        closeMenu();
    };

    return (
        <nav className="nav-glass">
            <div className='nav-container'>
                <div className="nav-logo">
                    <span className="nav-logo-1">&#123;</span>
                    <span className="nav-logo-2"> FD </span>
                    <span className="nav-logo-1">&#125;</span>
                </div>

                <div className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li className='nav-line'></li>
                    <CustomLink to="home" closeMenu={closeMenu} id="n1">{t("navbar.home")}</CustomLink>
                    <CustomLink to="about" closeMenu={closeMenu} id="n2">{t("navbar.about")}</CustomLink>
                    <CustomLink to="works" closeMenu={closeMenu} id="n3">{t("navbar.works")}</CustomLink>
                    <li className='nav-line'></li>

                    {/* 🔹 Select de idioma */}
                    <li className="nav-lang">
                        <select onChange={changeLanguage} value={i18n.language}>
                            <option value="es">ES</option>
                            <option value="en">EN</option>
                            <option value="it">IT</option>
                        </select>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function CustomLink({ to, children, closeMenu, ...props }) {
    return (
        <li onClick={closeMenu}>
            <ScrollLink
                to={to}
                smooth={true}
                duration={600}
                offset={-70}   // ajustá según altura del navbar
                spy={true}
                activeClass="active"
                {...props}
            >
                {children}
            </ScrollLink>
        </li>
    );
}
