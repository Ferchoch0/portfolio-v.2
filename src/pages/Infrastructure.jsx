import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaServer, FaNodeJs, FaPhp, FaPython, FaDocker, FaDiscord, FaShieldAlt, FaUsers, FaMapMarkerAlt, FaCalculator, FaChartBar, FaUserShield, FaPowerOff, FaTerminal, FaSyncAlt, FaBell, FaWifi, FaCloudDownloadAlt } from 'react-icons/fa';
import { SiNginx, SiCloudflare, SiUbuntu, SiN8N } from 'react-icons/si';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/styles/infrastructure.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Infrastructure() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    const wrapRef = useRef(null);
    const [activeTermLine, setActiveTermLine] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTermLine(prev => (prev + 1) % 6);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        /* Hero entrance */
        const heroTl = gsap.timeline({ delay: 0.3 });
        heroTl
            .from('.fd-infra--hero-label', { y: 40, opacity: 0, duration: 0.6 })
            .from('.fd-infra--hero-heading span', { y: 120, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=0.3')
            .from('.fd-infra--hero-desc', { y: 30, opacity: 0, duration: 0.5 }, '-=0.4')
            .from('.fd-infra--hero-tech', { scale: 0, opacity: 0, stagger: 0.05, duration: 0.35, ease: 'back.out(1.7)' }, '-=0.3')
            .from('.fd-infra--scroll-cue', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');

        /* Horizontal scroll */
        const scrollAmount = wrap.scrollWidth - window.innerWidth;
        const scrollTween = gsap.to(wrap, {
            x: -scrollAmount,
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                start: 'top top',
                end: `+=${scrollAmount}`,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        /* Animate sections in */
        gsap.utils.toArray('.fd-infra--section').forEach((section, i) => {
            if (i === 0) return;
            const els = section.querySelectorAll('[data-anim]');
            gsap.fromTo(els,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: scrollTween,
                        start: 'left 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });

    }, { scope: containerRef });

    const TERM_LINES = [
        { cmd: '$ systemctl status utterly-stack.service', color: '' },
        { cmd: '● utterly-stack.service — Active (running)', color: 'green' },
        { cmd: '$ cloudflared tunnel run production', color: '' },
        { cmd: 'INF Connection f9a2… registered connIndex=0', color: 'blue' },
        { cmd: '$ tail -f /var/log/nginx/access.log', color: '' },
        { cmd: '192.168.1.5 — "GET /api/health" 200 OK', color: 'dimmed' },
    ];

    return (
        <div className="fd-infra" ref={containerRef}>
            <button onClick={() => navigate('/')} className="fd-infra--back">
                <FaArrowLeft /> <span>{t('works.goBack', 'Volver')}</span>
            </button>

            {/* ═══ HERO ═══ */}
            <section className="fd-infra--hero">
                <div className="fd-infra--hero-inner">
                    <span className="fd-infra--hero-label">Proyecto Personal · DevOps</span>
                    <h1 className="fd-infra--hero-heading">
                        <span>Monté mi propia</span>
                        <span>Infraestructura</span>
                    </h1>
                    <p className="fd-infra--hero-desc">
                        Diseñé y configuré un servidor dedicado con Ubuntu para mi equipo de desarrollo. 
                        APIs, automatizaciones, portal interno y demos a clientes — todo bajo mi gestión.
                    </p>
                    <div className="fd-infra--hero-techs">
                        <span className="fd-infra--hero-tech"><SiUbuntu /> Ubuntu</span>
                        <span className="fd-infra--hero-tech"><FaNodeJs /> Node.js</span>
                        <span className="fd-infra--hero-tech"><FaPhp /> PHP</span>
                        <span className="fd-infra--hero-tech"><FaPython /> Python</span>
                        <span className="fd-infra--hero-tech"><SiN8N /> n8n</span>
                        <span className="fd-infra--hero-tech"><SiNginx /> Nginx</span>
                        <span className="fd-infra--hero-tech"><SiCloudflare /> Cloudflare</span>
                        <span className="fd-infra--hero-tech"><FaDiscord /> Discord</span>
                    </div>
                    <div className="fd-infra--scroll-cue">
                        <span>Scroll</span>
                        <div className="fd-infra--scroll-line" />
                    </div>
                </div>
            </section>

            {/* ═══ HORIZONTAL ═══ */}
            <div className="fd-infra--horizontal" ref={horizontalRef}>
                <div className="fd-infra--wrap" ref={wrapRef}>

                    {/* ── S1: El Núcleo — full-width asymmetric with orbital ── */}
                    <div className="fd-infra--section fd-infra--section-dark">
                        <div className="fd-infra--s1-layout">
                            <div className="fd-infra--s1-left" data-anim>
                                <span className="fd-infra--section-num">01</span>
                                <h2 className="fd-infra--section-heading">El Núcleo</h2>
                                <p className="fd-infra--section-text">
                                    Armé un ecosistema donde conviven múltiples servicios. Configuré cada API, 
                                    conecté todo con Nginx como reverse proxy y lo expuse al mundo vía Cloudflare Tunnels.
                                </p>
                                <div className="fd-infra--s1-services">
                                    <div className="fd-infra--s1-svc" data-anim><FaNodeJs className="ico node" /><div><strong>Node.js APIs</strong><small>Backend que desarrollé</small></div></div>
                                    <div className="fd-infra--s1-svc" data-anim><FaPhp className="ico php" /><div><strong>PHP APIs</strong><small>Servicios que integré</small></div></div>
                                    <div className="fd-infra--s1-svc" data-anim><FaPython className="ico python" /><div><strong>Python Scripts</strong><small>Automatizaciones propias</small></div></div>
                                    <div className="fd-infra--s1-svc" data-anim><SiN8N className="ico n8n" /><div><strong>n8n Flows</strong><small>Workflows que diseñé</small></div></div>
                                </div>
                            </div>
                            <div className="fd-infra--s1-right" data-anim>
                                <div className="fd-infra--orbit">
                                    <div className="fd-infra--orbit-core"><FaServer /><span>Ubuntu<br/>Server</span></div>
                                    <div className="fd-infra--orbit-ring">
                                        <div className="fd-infra--orbit-node" style={{'--i':0}}><SiNginx /></div>
                                        <div className="fd-infra--orbit-node" style={{'--i':1}}><SiCloudflare /></div>
                                        <div className="fd-infra--orbit-node" style={{'--i':2}}><FaShieldAlt /></div>
                                        <div className="fd-infra--orbit-node" style={{'--i':3}}><FaCloudDownloadAlt /></div>
                                    </div>
                                    <div className="fd-infra--orbit-ring fd-infra--orbit-ring-outer">
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':0}}><FaNodeJs /></div>
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':1}}><FaPhp /></div>
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':2}}><FaPython /></div>
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':3}}><SiN8N /></div>
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':4}}><FaDiscord /></div>
                                        <div className="fd-infra--orbit-node-sm" style={{'--i':5}}><FaWifi /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── S2: Portal — Cinematic overlapping images ── */}
                    <div className="fd-infra--section fd-infra--section-light">
                        <div className="fd-infra--s2-layout">
                            <div className="fd-infra--s2-scene" data-anim>
                                <img src="/works/infraestructure/portal-1.png" alt="Otterly Portal" className="fd-infra--s2-img" />
                            </div>
                            {/* Text overlays bottom-right */}
                            <div className="fd-infra--s2-text" data-anim>
                                <span className="fd-infra--section-num">02</span>
                                <h2 className="fd-infra--section-heading">Otterly<br/>Portal</h2>
                                <p className="fd-infra--section-text">
                                    Desarrollé un portal web completo con sistema de permisos por rol. 
                                    Desde ahí mi equipo monitorea servicios, accede a bases de datos y gestiona Nginx en tiempo real.
                                </p>
                                <div className="fd-infra--s2-features">
                                    <span><FaTerminal /> Logs en tiempo real</span>
                                    <span><FaSyncAlt /> Estado de servicios</span>
                                    <span><FaServer /> Gestión Nginx</span>
                                    <span><FaUsers /> Team online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── S3: Herramientas — Wide staggered grid ── */}
                    <div className="fd-infra--section fd-infra--section-dark">
                        <div className="fd-infra--s3-layout">
                            <div className="fd-infra--s3-header" data-anim>
                                <span className="fd-infra--section-num">03</span>
                                <h2 className="fd-infra--section-heading">Herramientas de Negocio</h2>
                                <p className="fd-infra--section-text">
                                    Además de lo técnico, integré herramientas de negocio para que el equipo 
                                    de ventas trabaje desde el mismo portal sin depender de software externo.
                                </p>
                            </div>
                            <div className="fd-infra--s3-grid">
                                <div className="fd-infra--s3-cards-col">
                                    <div className="fd-infra--s3-card" data-anim>
                                        <FaMapMarkerAlt className="fd-infra--s3-ico" />
                                        <h4>Lead Scraper</h4>
                                        <p>Construí un scraper que conecta con Google Maps para prospección automática, guardando leads en la BD con seguimiento.</p>
                                    </div>
                                    <div className="fd-infra--s3-card" data-anim>
                                        <FaCalculator className="fd-infra--s3-ico" />
                                        <h4>Calculadora</h4>
                                        <p>Implementé una calculadora rápida para armar presupuestos según las referencias del cliente.</p>
                                    </div>
                                    <div className="fd-infra--s3-card" data-anim>
                                        <FaChartBar className="fd-infra--s3-ico" />
                                        <h4>CRM Interno</h4>
                                        <p>Diseñé un flujo de estados para cada prospecto: contactado, interesado, cliente o descartado.</p>
                                    </div>
                                    <div className="fd-infra--s3-card" data-anim>
                                        <FaUserShield className="fd-infra--s3-ico" />
                                        <h4>Roles y Permisos</h4>
                                        <p>Configuré permisos granulares: los devs acceden a servers y logs, ventas solo ve el CRM y la calculadora.</p>
                                    </div>
                                </div>
                                <div className="fd-infra--s3-showcase" data-anim>
                                    <img src="/works/infraestructure/marketing.png" alt="Marketing Dashboard" className="fd-infra--s3-showcase-img" />
                                    <div className="fd-infra--s3-showcase-caption">
                                        <span>Marketing & Leads Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── S4: Auto-Recovery — Terminal takes center stage ── */}
                    <div className="fd-infra--section fd-infra--section-light">
                        <div className="fd-infra--s4-layout">
                            <div className="fd-infra--s4-left" data-anim>
                                <span className="fd-infra--section-num">04</span>
                                <h2 className="fd-infra--section-heading">Auto-Recovery<br/>& Control</h2>
                                <div className="fd-infra--s4-features">
                                    <div className="fd-infra--s4-feat" data-anim>
                                        <FaPowerOff className="fd-infra--s4-feat-ico" />
                                        <div><strong>Wake-on-LAN</strong><p>Configuré encendido remoto desde cualquier lugar</p></div>
                                    </div>
                                    <div className="fd-infra--s4-feat" data-anim>
                                        <FaSyncAlt className="fd-infra--s4-feat-ico" />
                                        <div><strong>Auto-start</strong><p>Escribí scripts que levantan todo al arrancar</p></div>
                                    </div>
                                    <div className="fd-infra--s4-feat" data-anim>
                                        <FaTerminal className="fd-infra--s4-feat-ico" />
                                        <div><strong>Sin SSH</strong><p>Mi equipo reinicia y lee logs desde el portal</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="fd-infra--s4-right" data-anim>
                                <div className="fd-infra--terminal">
                                    <div className="fd-infra--term-bar">
                                        <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                                        <span className="fd-infra--term-title">utterly@server ~</span>
                                    </div>
                                    <div className="fd-infra--term-body">
                                        {TERM_LINES.map((line, i) => (
                                            <p key={i} className={`fd-infra--term-line ${line.color} ${i <= activeTermLine ? 'visible' : ''}`}>
                                                {line.cmd}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                {/* Floating status badges around terminal */}
                                <div className="fd-infra--s4-float fd-infra--s4-f2"><FaBell /> 0 alerts</div>
                            </div>
                        </div>
                    </div>

                    {/* ── S5: Discord — Layered depth composition ── */}
                    <div className="fd-infra--section fd-infra--section-dark fd-infra--section-final">
                        <div className="fd-infra--s5-layout">
                            <div className="fd-infra--s5-left" data-anim>
                                <span className="fd-infra--section-num">05</span>
                                <h2 className="fd-infra--section-heading">Sincronía<br/>Discord</h2>
                                <p className="fd-infra--section-text">
                                    Conecté el servidor con Discord mediante bots propios. Cada deploy, alerta 
                                    o lead nuevo dispara una notificación instantánea. Mi equipo se entera de todo sin salir del voice chat.
                                </p>
                                <div className="fd-infra--s5-alerts">
                                    <div className="fd-infra--s5-alert" data-anim><FaBell className="ico-alert" /> Nuevo prospecto guardado</div>
                                    <div className="fd-infra--s5-alert" data-anim><FaSyncAlt className="ico-alert" /> Deploy completado</div>
                                    <div className="fd-infra--s5-alert" data-anim><FaPowerOff className="ico-alert" /> Server encendido</div>
                                </div>
                            </div>
                            <div className="fd-infra--s5-right" data-anim>
                                <div className="fd-infra--s5-scene">
                                    <img src="/works/infraestructure/discord.png" alt="Otterly Discord" className="fd-infra--s5-card" />
                                    <img src="/works/infraestructure/mensaje_ds.png" alt="Bot Notification" className="fd-infra--s5-notif" />
                                    <div className="fd-infra--s5-glow"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
