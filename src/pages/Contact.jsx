import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '@styles/contact-page.css';

export default function ContactScreen() {
    const { t } = useTranslation();

    return (
        <motion.main 
            className="fd-contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="fd-contact-container">
                <header className="fd-contact-header">
                    <motion.h1 
                        className="fd-contact-title"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Let's start <br/>a project.
                    </motion.h1>
                    <motion.p 
                        className="fd-contact-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    >
                        Fill out the form below or email me directly at <a href="mailto:delvalle.fernando.d@gmail.com">delvalle.fernando.d@gmail.com</a>
                    </motion.p>
                </header>

                <div className="fd-contact-split">
                    {/* Left: Contact Info */}
                    <motion.div 
                        className="fd-contact-info"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <div className="contact-list">
                            <div className="contact-item">
                                <h3>Location</h3>
                                <p>Argentina, available worldwide.</p>
                            </div>
                            <div className="contact-item">
                                <h3>Socials</h3>
                                <ul>
                                    <li><a href="https://github.com/Ferchoch0" target="_blank" rel="noreferrer">GitHub</a></li>
                                    <li><a href="https://linkedin.com/in/fernando-delvalle-375490226" target="_blank" rel="noreferrer">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Minimalist Form */}
                    <motion.div 
                        className="fd-contact-form-wrapper"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <form className="fd-contact-form" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado. Me pondré en contacto pronto.'); }}>
                            <div className="form-group">
                                <label htmlFor="name">Hi, my name is</label>
                                <input type="text" id="name" required placeholder="Enter your name" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">and I can be reached at</label>
                                <input type="email" id="email" required placeholder="Enter your email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">I want to talk about my project...</label>
                                <textarea id="message" required placeholder="Tell me about your idea" rows="4"></textarea>
                            </div>

                            <button type="submit" className="fd-contact-submit">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.main>
    );
}
