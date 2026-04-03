"use client";
import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import "./ComingSoon.css";

// ─── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#hero", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#marcas", label: "Marcas" },
  { href: "#mapa", label: "Ubicación" },
  { href: "#redes", label: "Contacto" },
];

const SERVICES = [
  {
    name: "Bumpers",
    desc: "Defensa frontal y trasera en acero inoxidable y cromado",
    icon: "bumpers",
  },
  {
    name: "Cajas de herramientas",
    desc: "Almacenamiento resistente a la medida de tu camión",
    icon: "toolbox",
  },
  {
    name: "Estribos",
    desc: "Acceso seguro con acabados pulidos o satinados",
    icon: "steps",
  },
  {
    name: "Tanques",
    desc: "Tanques de combustible y aire en acero inoxidable",
    icon: "tank",
  },
  {
    name: "Culatas",
    desc: "Piezas de alta resistencia para motor pesado",
    icon: "culatas",
  },
  {
    name: "Persianas",
    desc: "Persianas laterales con acabado espejo o mate",
    icon: "blinds",
  },
  {
    name: "Soldadura MIG/TIG",
    desc: "Soldadura especializada en acero inox y hierro",
    icon: "welding",
  },
  {
    name: "Carrocería general",
    desc: "Reparación y fabricación integral de carrocería",
    icon: "bodywork",
  },
];

const BRANDS = [
  "Kenworth",
  "Scania",
  "Volvo",
  "Mercedes-Benz",
  "Foton",
  "Wokstar",
  "Hino",
  "Isuzu",
  "Mack",
  "International",
  "Toyota",
  "Nissan",
  "Ford",
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(opts: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, ...opts },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, visible] as const;
}

// ─── ICON COMPONENT ─────────────────────────────────────────────────────────
interface IconProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

const Icon = memo(function Icon({
  name,
  size = 24,
  width,
  height,
  className = "",
}: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        WebkitMaskImage: `url('/icons/${name}.svg')`,
        maskImage: `url('/icons/${name}.svg')`,
      }}
    />
  );
});

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

/* ── Header ── */
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = memo(function Header({ darkMode, setDarkMode }: HeaderProps) {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 60;

  return (
    <>
      <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
        <a href="#hero" className="hdr__logo">
          <Image
            src="/logo.png"
            alt="Funtec Inoxidable JF"
            className="hdr__logo-img"
            width={140}
            height={40}
            priority
          />
        </a>
        <nav className="hdr__nav">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hdr__link">
              {l.label}
            </a>
          ))}
          <button
            className="dm-toggle"
            onClick={() => setDarkMode((p) => !p)}
            aria-label={
              darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            <Icon name={darkMode ? "sun" : "moon"} size={16} />
          </button>
        </nav>
        <button
          className={`burger ${menuOpen ? "burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú de navegación"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <div
        className={`mob-menu ${menuOpen ? "mob-menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="mob-menu__link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <button
          className="dm-toggle dm-toggle--mob"
          onClick={() => setDarkMode((p) => !p)}
          aria-label="Cambiar tema"
        >
          {darkMode ? "☀ Modo claro" : "☾ Modo oscuro"}
        </button>
      </div>
    </>
  );
});

/* ── Hero ── */
const Hero = memo(function Hero() {
  const scrollY = useScrollY();
  const parallax = Math.min(scrollY * 0.25, 150);

  return (
    <section className="hero" id="hero">
      <div
        className="hero__bg"
        style={{ transform: `translateY(${parallax}px)` }}
      />
      <div className="hero__overlay" />
      <div className="hero__noise" />
      <div className="hero__content">
        <span className="hero__badge">
          Sitio en construcción · Bogotá, Colombia
        </span>
        <h1 className="hero__title">
          Fabricamos lo que
          <br />
          tu camión <span className="hero__accent">necesita</span>
        </h1>
        <p className="hero__desc">
          Taller especializado en piezas de acero inoxidable y hierro para
          camiones de carga pesada. Bumpers, cajas de herramientas, estribos,
          tanques y más — a la medida de tu flota.
        </p>
        <a
          href="https://wa.me/573106480288?text=Hola%2C%20quiero%20cotizar%20una%20pieza"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__cta"
        >
          <span>Cotizar por WhatsApp</span>
          <Icon name="arrow-right" size={18} />
        </a>
      </div>
      {/* Scroll hint keeps inline SVG for animated child */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="1" y="1" width="18" height="28" rx="9" />
          <line x1="10" y1="7" x2="10" y2="12" className="hero__scroll-dot" />
        </svg>
      </div>
    </section>
  );
});

/* ── Services ── */
interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  index: number;
}

const ServiceCard = memo(function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`svc-card ${visible ? "svc-card--visible" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
      role="article"
      aria-label={service.name}
    >
      <div className="svc-card__icon" aria-hidden="true">
        <Icon name={service.icon} size={36} />
      </div>
      <h3 className="svc-card__name">{service.name}</h3>
      <p className="svc-card__desc">{service.desc}</p>
      <div className="svc-card__glow" />
    </div>
  );
});

const Services = memo(function Services() {
  const [ref, visible] = useInView();
  return (
    <section className="services" id="servicios">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`services__header ${visible ? "fade-in--visible" : ""}`}
      >
        <span className="label">Lo que hacemos</span>
        <h2 className="title">Servicios</h2>
      </div>
      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.name} service={s} index={i} />
        ))}
      </div>
    </section>
  );
});

/* ── Brands Marquee ── */
const BrandsMarquee = memo(function BrandsMarquee() {
  const [ref, visible] = useInView();
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <section
      className="marquee"
      id="marcas"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className={`marquee__inner ${visible ? "marquee__inner--running" : ""}`}
      >
        <div className="marquee__track">
          {doubled.map((b, i) => (
            <span key={`${b}-${i}`} className="marquee__chip">
              {b}
            </span>
          ))}
        </div>
        <div className="marquee__track" aria-hidden="true">
          {doubled.map((b, i) => (
            <span key={`dup-${b}-${i}`} className="marquee__chip">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ── Map (lazy) ── */
const MapSection = memo(function MapSection() {
  const [ref, visible] = useInView();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (visible) setLoaded(true);
  }, [visible]);

  return (
    <section
      className="map"
      id="mapa"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`map__header ${visible ? "fade-in--visible" : ""}`}>
        <span className="label">Encuéntranos</span>
        <h2 className="title">Ubicación</h2>
      </div>
      <div className="map__frame">
        {loaded ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.3!2d-74.1362213!3d4.5400659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3fa1faee2f95cb%3A0x47b920ca44010105!2sFuntec%20-%20Inoxidable%20JF!5e0!3m2!1ses!2sco!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Funtec Inoxidable JF en Bogotá"
          />
        ) : (
          <div className="map__placeholder">
            <Icon name="map-pin" size={40} />
            <span>Cargando mapa…</span>
          </div>
        )}
      </div>
    </section>
  );
});

/* ── Social / Contact ── */
const Social = memo(function Social() {
  const [ref, visible] = useInView();
  return (
    <section
      className="social"
      id="redes"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`social__inner ${visible ? "fade-in--visible" : ""}`}>
        <span className="label">Conéctate</span>
        <h2 className="title">Redes y contacto</h2>
        <div className="social__btns">
          <a
            href="https://instagram.com/inoxidablejf"
            target="_blank"
            rel="noopener noreferrer"
            className="social__btn"
            aria-label="Síguenos en Instagram"
          >
            <Icon name="instagram" size={20} />
            <span>Instagram</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social__btn"
            aria-label="Síguenos en Facebook"
          >
            <Icon name="facebook" size={20} />
            <span>Facebook</span>
          </a>
          <a
            href="https://wa.me/573106480288"
            target="_blank"
            rel="noopener noreferrer"
            className="social__btn social__btn--wa"
            aria-label="Escríbenos por WhatsApp"
          >
            <Icon name="whatsapp" size={20} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
});

/* ── Footer ── */
const Footer = memo(function Footer() {
  return (
    <footer className="ftr">
      <span className="ftr__copy">
        © {new Date().getFullYear()} Funtec — Inoxidable JF · Bogotá, Colombia
      </span>
      <span className="ftr__brand">inoxidablejf.com</span>
    </footer>
  );
});

/* ── WhatsApp FAB ── */
const WhatsappFAB = memo(function WhatsappFAB() {
  const scrollY = useScrollY();
  const show = scrollY > 400;

  return (
    <a
      href="https://wa.me/573106480288?text=Hola%2C%20quiero%20cotizar%20una%20pieza"
      target="_blank"
      rel="noopener noreferrer"
      className={`fab ${show ? "fab--visible" : ""}`}
      aria-label="Contactar por WhatsApp"
    >
      <Icon name="whatsapp" size={26} className="fab__icon" />
      <span className="fab__tooltip">¿Necesitas una cotización?</span>
    </a>
  );
});

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function FuntecLanding() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={darkMode ? "" : "theme--light"}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <div className="divider" />
      <Services />
      <BrandsMarquee />
      <MapSection />
      <Social />
      <Footer />
      <WhatsappFAB />
    </div>
  );
}
