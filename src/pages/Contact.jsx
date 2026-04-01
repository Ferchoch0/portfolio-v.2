import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '@styles/contact-page.css';

export default function ContactScreen() {
    const { t } = useTranslation();
    const [formType, setFormType] = useState(null);

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
                        dangerouslySetInnerHTML={{ __html: t('contact.title') }}
                    />
                    <motion.p 
                        className="fd-contact-subtitle"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    >
                        {t('contact.subtitle')} <a href="mailto:delvalle.fernando.d@gmail.com">delvalle.fernando.d@gmail.com</a>
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
                                <h3>{t('contact.location')}</h3>
                                <p>{t('contact.locationDesc')}</p>
                            </div>
                            <div className="contact-item">
                                <h3>{t('contact.socials')}</h3>
                                <ul>
                                    <li><a href="https://github.com/Ferchoch0" target="_blank" rel="noreferrer">GitHub</a></li>
                                    <li><a href="https://linkedin.com/in/fernando-delvalle-375490226" target="_blank" rel="noreferrer">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Dynamic Selection / Form */}
                    <motion.div 
                        className="fd-contact-form-wrapper"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait">
                            {!formType ? (
                                <motion.div 
                                    key="selection"
                                    className="fd-contact-selection"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="fd-contact-selection-title">{t('contact.selectTitle')}</h2>
                                    <div className="fd-contact-selection-options">
                                        <button className="fd-contact-choice-btn" onClick={() => setFormType('recruiter')}>
                                            {t('contact.btnRecruiter')}
                                        </button>
                                        <button className="fd-contact-choice-btn" onClick={() => setFormType('client')}>
                                            {t('contact.btnClient')}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    className="fd-contact-form-container"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <button className="fd-contact-goback" onClick={() => setFormType(null)}>
                                        &larr; {t('contact.goBack')}
                                    </button>
                                    
                                    <form className="fd-contact-form" onSubmit={(e) => { e.preventDefault(); alert(t(`contact.${formType}.sent`)); }}>
                                        <div className="form-group">
                                            <label htmlFor="name">{t(`contact.${formType}.name`)}</label>
                                            <input type="text" id="name" required placeholder={t(`contact.${formType}.namePlh`)} />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="email">{t(`contact.${formType}.email`)}</label>
                                            <input type="email" id="email" required placeholder={t(`contact.${formType}.emailPlh`)} />
                                        </div>

                                        {formType === 'recruiter' && (
                                            <>
                                                <div className="form-group fd-contact-row">
                                                    <div className="fd-contact-col">
                                                        <label htmlFor="company">{t('contact.recruiter.company')}</label>
                                                        <input type="text" id="company" required placeholder={t('contact.recruiter.companyPlh')} />
                                                    </div>
                                                    <div className="fd-contact-col">
                                                        <label htmlFor="role">{t('contact.recruiter.role')}</label>
                                                        <input type="text" id="role" required placeholder={t('contact.recruiter.rolePlh')} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="message">{t(`contact.${formType}.message`)}</label>
                                            <textarea id="message" required placeholder={t(`contact.${formType}.messagePlh`)} rows="4"></textarea>
                                        </div>

                                        <button type="submit" className="fd-contact-submit">
                                            {t(`contact.${formType}.submit`)}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.main>
    );
}
