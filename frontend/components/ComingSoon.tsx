"use client";
import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import "./ComingSoon.css";

// ─── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#hero", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#contacto", label: "Contacto" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Bumpers en Acero Inoxidable",
    desc: "Bumpers fabricados en acero inoxidable 304 con acabado espejo para Kenworth, Freightliner y Scania. Resistencia y brillo de exportación.",
    img: "/products/bumper.jpg",
    size: "feature",
    alt: "Bumper en acero inoxidable acabado espejo para tractomula Kenworth fabricado por JF Inoxidable Bogotá",
  },
  {
    id: 2,
    name: "Cajas de Herramientas",
    desc: "Cajas de herramientas en acero inoxidable a la medida del chasis. Sellado hermético, cerradura reforzada y resistencia a la intemperie.",
    img: "/products/cajas.png",
    size: "wide",
    alt: "Caja de herramientas en acero inoxidable sobre medida para camión de carga pesada",
  },
  {
    id: 3,
    name: "Tanques de Combustible",
    desc: "Tanques en acero inoxidable para tractomulas de carga pesada. Capacidad personalizada y soldadura TIG certificada para largas travesías.",
    img: "/products/tanque.png",
    size: "wide",
    alt: "Tanque de combustible en acero inoxidable para tractomula con soldadura TIG",
  },
  {
    id: 4,
    name: "Viseras Frontales",
    desc: "Viseras aerodinámicas en acero inoxidable para Kenworth W900, T800 y modelos clásicos. Reduce reflejos y eleva el estilo.",
    img: "/products/visera.jpg",
    size: "small",
    alt: "Visera frontal en acero inoxidable para Kenworth W900 instalada en cabina",
  },
  {
    id: 5,
    name: "Estribos Antideslizantes",
    desc: "Estribos en acero inoxidable con superficie antideslizante. Acceso seguro a la cabina y diseño robusto para uso diario.",
    img: "/products/estribos.jpg",
    size: "small",
    alt: "Estribo antideslizante en acero inoxidable para camión de carga pesada",
  },
  {
    id: 6,
    name: "Guardapolvos",
    desc: "Guardapolvos en acero inoxidable que protegen el chasis contra barro, escombros y agua salina. Fabricación a la medida del modelo.",
    img: "/products/guardapolvo.png",
    size: "wide",
    alt: "Guardapolvo en acero inoxidable para tractomula Freightliner fabricado a la medida",
  },
];

const BRANDS = [
  "Kenworth",
  "Scania",
  "Volvo",
  "Mercedes-Benz",
  "Foton",
  "Mack",
  "International",
  "Hino",
  "Isuzu",
  "Freightliner",
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const Icon = memo(
  ({
    name,
    size = 24,
    className = "",
  }: {
    name: string;
    size?: number;
    className?: string;
  }) => (
    <span
      className={`icon ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url('/icons/${name}.svg')`,
        maskImage: `url('/icons/${name}.svg')`,
      }}
    />
  ),
);
Icon.displayName = "Icon";

const Header = memo(({ scrollY }: { scrollY: number }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 60;

  return (
    <>
      <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
        <a href="#hero" className="hdr__logo">
          <span className="hdr__logo-text">
            <span className="hdr__logo-jf">JF</span> INOXIDABLE
          </span>
        </a>
        <nav className="hdr__nav">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hdr__link">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className={`burger ${menuOpen ? "burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <div className={`mob-menu ${menuOpen ? "mob-menu--open" : ""}`}>
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
      </div>
    </>
  );
});
Header.displayName = "Header";

const Hero = ({ scrollY }: { scrollY: number }) => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const colVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g")
      return;

    bgVideoRef.current?.play().catch(() => {});
    colVideoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="hero" id="hero">
      <div
        className="hero__video-wrap"
        style={{ transform: `scale(${1 + scrollY * 0.0005})` }}
      >
        <video
          ref={bgVideoRef}
          className="hero__video hero__video--bg"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay" />

      <div className="hero__split">
        <div className="hero__content">
          <span className="hero__badge">
            Bogotá, Colombia • Calidad de Exportación
          </span>

          {/* Slogan visual decorativo */}
          <p className="hero__slogan">Acero que define la potencia</p>

          {/* H1 real con keywords */}
          <h1 className="hero__title">
            Bumpers y Lujos en{" "}
            <span className="hero__accent">Acero Inoxidable</span>
            <br />
            para Tractomulas
          </h1>

          <p className="hero__desc">
            Fabricamos bumpers, tanques, cajas de herramientas y estribos en
            acero inoxidable 304 a la medida para Kenworth, Freightliner,
            Scania, Volvo y más. Acabado espejo, durabilidad de exportación.
            Taller propio en Bogotá.
          </p>
          <div className="hero__actions">
            <a href="https://wa.me/573106480288" className="btn-primary">
              Cotizar Ahora
            </a>
            <a href="#productos" className="btn-secondary">
              Ver Catálogo
            </a>
          </div>
        </div>

        <div className="hero__video-col">
          <video
            ref={colVideoRef}
            className="hero__video hero__video--col"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

const ProductBento = () => {
  const [ref, visible] = useInView();
  return (
    <section
      className="products"
      id="productos"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`container ${visible ? "fade-in--visible" : ""}`}>
        <span className="label">Nuestra Línea</span>
        <h2 className="title">
          Fabricación de Accesorios en Acero Inoxidable para Camiones
        </h2>
        <div className="bento-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className={`bento-item bento-item--${p.size}`}>
              <Image
                src={p.img}
                alt={p.alt}
                className="bento-item__img"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="bento-item__content">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandMarquee = () => (
  <div className="brand-bar">
    <div className="marquee-track">
      {[...BRANDS, ...BRANDS].map((brand, i) => (
        <span key={i} className="brand-item">
          {brand}
        </span>
      ))}
    </div>
  </div>
);

const SocialSection = () => (
  <section className="social-cta">
    <span className="label">Redes Sociales</span>
    <h2 className="social-cta__title">Síguenos en Nuestras Redes</h2>
    <div className="social-cta__links">
      <a
        href="https://www.tiktok.com/@funtec.acero.inox"
        target="_blank"
        rel="noopener noreferrer"
        className="social-cta__link"
      >
        <Icon name="tiktok" size={28} />
        <span>TikTok</span>
      </a>
      <a
        href="https://www.instagram.com/funtecinoxidablejf/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-cta__link"
      >
        <Icon name="instagram" size={28} />
        <span>Instagram</span>
      </a>
      <a
        href="https://www.facebook.com/Inoxidablejf/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-cta__link"
      >
        <Icon name="facebook" size={28} />
        <span>Facebook</span>
      </a>
    </div>
  </section>
);

const MAPS_QUERY = "Industrias+Funtec+SAS,+Calle+42a+%2340e-08,+Bogotá,+Colombia";
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

const Footer = () => (
  <footer className="ftr" id="contacto">
    <div className="ftr__main">
      <div className="ftr__brand">
        <span className="hdr__logo-text">
          <span className="hdr__logo-jf">JF</span> INOXIDABLE
        </span>
        <p className="ftr__tagline">
          Fabricación de accesorios en acero inoxidable para tractomulas.
        </p>
      </div>

      <div className="ftr__col">
        <span className="ftr__label">Contacto</span>
        <a href="https://wa.me/573106480288">+57 310 648 0288</a>
        <a href="mailto:ventas@inoxidablejf.com">ventas@inoxidablejf.com</a>
      </div>

      <div className="ftr__col">
        <span className="ftr__label">Taller</span>
        <span>Calle 42a #40e-08</span>
        <span>Bogotá, Colombia</span>
        <span>Lun – Sáb · 8:00 – 18:00</span>
      </div>
    </div>

    <div className="ftr__map">
      <iframe
        title="Ubicación JF Inoxidable"
        src="https://www.google.com/maps?q=Industrias+Funtec+SAS+Calle+42a+40e-08+Bogotá+Colombia&output=embed"
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: 8, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    <div className="ftr__base">
      <span>© {new Date().getFullYear()} Inoxidable JF</span>
    </div>
  </footer>
);

export default function FuntecLanding() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="theme--dark">
      <Header scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <BrandMarquee />
      <ProductBento />
      <SocialSection />
      <Footer />
      <div className="fab-group">
        <a
          href={MAPS_DIRECTIONS}
          target="_blank"
          rel="noopener noreferrer"
          className="fab-dir"
          aria-label="Cómo llegar"
        >
          <Icon name="directions" size={24} />
          <span className="fab-dir__label">Cómo llegar</span>
        </a>
        <a
          href="https://wa.me/573106480288"
          className="fab-wa"
          aria-label="WhatsApp"
        >
          <Icon name="whatsapp" size={28} />
        </a>
      </div>
    </div>
  );
}
