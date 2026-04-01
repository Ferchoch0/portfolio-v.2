import { useMemo } from 'react';
import { FaReact, FaNodeJs, FaGitAlt, FaFigma, FaPhp, FaMobileAlt, FaCss3Alt, FaServer, FaVectorSquare } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiMysql, SiCplusplus, SiLaravel, SiThreedotjs, SiTauri, SiDocker, SiGreensock, SiFramer } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import '@styles/services-mobile.css';

/**
 * ServicesMobile — Pure static layout, zero animations.
 * Renders all service categories stacked vertically with tech badges.
 */
export default function ServicesMobile() {
    const { t } = useTranslation();

    const servicesData = useMemo(() => [
        {
            num: "01",
            title: t("services.p1_title", "Frontend Engineering"),
            description: t("services.p1_desc"),
            techs: [
                { name: "React", icon: <FaReact /> },
                { name: "Tailwind", icon: <SiTailwindcss /> },
                { name: "CSS", icon: <FaCss3Alt /> }
            ]
        },
        {
            num: "02",
            title: t("services.p2_title", "Backend & Architecture"),
            description: t("services.p2_desc"),
            techs: [
                { name: "PHP", icon: <FaPhp /> },
                { name: "Node.js", icon: <FaNodeJs /> },
                { name: "REST API", icon: <FaServer /> },
                { name: "MySQL", icon: <SiMysql /> },
                { name: "Git", icon: <FaGitAlt /> }
            ]
        },
        {
            num: "03",
            title: t("services.p3_title", "Creative Development"),
            description: t("services.p3_desc"),
            techs: [
                { name: "GSAP", icon: <SiGreensock /> },
                { name: "Framer Motion", icon: <SiFramer /> },
                { name: "Three.js", icon: <SiThreedotjs /> },
                { name: "SVG Animation", icon: <FaVectorSquare /> },
                { name: "Figma", icon: <FaFigma /> }
            ]
        },
        {
            num: "04",
            title: t("services.p4_title", "Desktop & Mobile"),
            description: t("services.p4_desc"),
            techs: [
                { name: "React Native", icon: <FaMobileAlt /> },
                { name: "Tauri", icon: <SiTauri /> },
                { name: "C++", icon: <SiCplusplus /> },
                { name: "C#", icon: <TbBrandCSharp /> }
            ]
        },
        {
            num: "05",
            title: t("services.p5_title", "Learning"),
            description: t("services.p5_desc"),
            techs: [
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Laravel", icon: <SiLaravel /> },
                { name: "Docker", icon: <SiDocker /> }
            ]
        }
    ], [t]);

    return (
        <section className="fd-services-m" id="services">
            <h2 className="fd-services-m--title">
                {t("services.header_title", "Services & Expertise")}
            </h2>

            <div className="fd-services-m--list">
                {servicesData.map((service) => (
                    <article key={service.num} className="fd-services-m--card">
                        <span className="fd-services-m--num">{service.num}</span>
                        <h3 className="fd-services-m--card-title">{service.title}</h3>
                        <p className="fd-services-m--card-desc">{service.description}</p>
                        <div className="fd-services-m--techs">
                            {service.techs.map(tech => (
                                <div key={tech.name} className="fd-services-m--badge">
                                    <span className="fd-services-m--badge-icon">{tech.icon}</span>
                                    <span className="fd-services-m--badge-name">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
