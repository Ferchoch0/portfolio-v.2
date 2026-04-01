import { useTranslation } from "react-i18next";
import "@styles/aboutme-mobile.css";

/**
 * AboutMeMobile — Pure static layout, zero GSAP.
 * All three panels stacked vertically.
 */
export default function AboutMeMobile() {
    const { t } = useTranslation();

    return (
        <section className="fd-about-m" id="about">
            <div className="fd-about-m--f-watermark">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="fd-about-m--svg">
                    <path
                        d="M 50 30 L 150 30 L 150 60 L 80 60 L 80 90 L 130 90 L 130 120 L 80 120 L 80 170 L 50 170 Z"
                        fill="rgba(255,255,255,0.06)"
                    />
                </svg>
            </div>

            <article className="fd-about-m--panel">
                <h2 className="fd-about-m--title" dangerouslySetInnerHTML={{ __html: t("about.title_1", "About me") }} />
                <p className="fd-about-m--text">
                    {t("about.text_1")}
                </p>
            </article>

            <article className="fd-about-m--panel">
                <h2 className="fd-about-m--title" dangerouslySetInnerHTML={{ __html: t("about.title_2", "My approach") }} />
                <p className="fd-about-m--text">
                    {t("about.text_2")}
                </p>
            </article>

            <article className="fd-about-m--panel">
                <h2 className="fd-about-m--title" dangerouslySetInnerHTML={{ __html: t("about.title_3", "The vision") }} />
                <p className="fd-about-m--text">
                    {t("about.text_3")}
                </p>
            </article>
        </section>
    );
}
