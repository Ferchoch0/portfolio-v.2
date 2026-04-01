import '../assets/styles/footer.css';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function FooterScreen() {
    const { t } = useTranslation();

    return (
        <footer className="fd-footer">
            <div className="fd-footer--container">
                <div className="fd-footer--left">
                    <span className="fd-footer--logo">FD</span>
                    <span className="fd-footer--separator">|</span>
                    <span className="fd-footer--copyright">
                        © {new Date().getFullYear()} Fernando Delvalle
                    </span>
                </div>
                
                <div className="fd-footer--right">
                    <a href="#works" className="fd-footer--link">{t("navbar.works", "Works")}</a>
                    <a href="#about" className="fd-footer--link">{t("navbar.about", "About")}</a>
                    <a href="https://www.linkedin.com/in/fernando-d-delvalle/" target="_blank" rel="noopener noreferrer" className="fd-footer--link">LinkedIn</a>
                    <a href="https://github.com/Ferchoch0" target="_blank" rel="noopener noreferrer" className="fd-footer--link">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
