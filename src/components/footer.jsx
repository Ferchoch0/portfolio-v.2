import '../assets/styles/footer.css';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function FooterScreen() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    return (
        <footer className="fd-footer">
            <div className="fd-footer--top">
                <h2 className="fd-footer--title">{t('footer.connectWithMe')}</h2>
                
                <div className="fd-footer--socials">
                    <a href="https://github.com/Ferchoch0" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/fernando-d-delvalle/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:delvalle.fernando.dddaniel@gmail.com">
                        <FaEnvelope />
                    </a>
                </div>

                <select
                    className="fd-footer--lang-select"
                    value={i18n.language}
                    onChange={(e) => changeLanguage(e.target.value)}
                >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                    <option value="it">IT</option>
                </select>
            </div>

            <div className="fd-footer--bottom">
                &copy; {new Date().getFullYear()} Delvalle Fernando. {t('footer.rightsReserved')}
            </div>
        </footer>
    );
}
