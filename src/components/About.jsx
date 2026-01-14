import '../assets/styles/about.css';
import Name from './NameBanner';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutScreen() {
    const { t } = useTranslation();

    return (
        <section id='about' className='fd-about-container'>
            <motion.article
                className='fd-about-box'
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }} // se ejecuta solo una vez cuando entra un 30% en viewport
            >
                <div className='fd-about--info'>
                    <div>
                        <h6 dangerouslySetInnerHTML={{ __html: t("about.titleSmall") }} />
                        <h3 dangerouslySetInnerHTML={{ __html: t("about.titleBig") }} />
                        <p className='fd-about--p1' dangerouslySetInnerHTML={{ __html: t("about.quote") }} />
                    </div>
                    <p className='fd-about--p2' dangerouslySetInnerHTML={{ __html: t("about.description") }} />
                </div>

                <motion.div
                    className='fd-about--img'
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <img src="/sculture-about.png" alt="sculture about" />
                </motion.div>
            </motion.article>

            <motion.span
                className='fd-about--year'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
            >
                22
            </motion.span>
            <Name />
        </section>
    );
}
