import { Link } from "react-router-dom";
import logoGoFight from "../../assets/GF Boxing Pulse Logo.png";
import { DOWNLOAD_URL } from "../Buttons/DownloadButton";
import "./Footer.css";

const social = [
  {
    href: "https://github.com/Ayoubito04/GoFight",
    label: "GitHub",
    path: "M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.56 0-.28-.01-1.03-.02-2.03-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.53-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.38-5.24 5.66.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.2.67.79.56A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z",
  },
  {
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7462997629589671936/",
    label: "LinkedIn",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V23h-4V8Z",
  },
];

const Footer = () => {
  return (
    <footer className="site_footer">
      <div className="footer_inner">
        <div className="footer_brand">
          <img src={logoGoFight} alt="Logo de GoFight" className="footer_logo" />
          <div>
            <p className="footer_name">GoFight</p>
            <p className="footer_claim">
              Tu entrenador de boxeo en el bolsillo. Rutinas guiadas, progreso medido y
              ranking global.
            </p>
          </div>
        </div>

        <nav className="footer_nav" aria-label="Enlaces del pie de página">
          <div className="footer_col">
            <p className="footer_col_title">Portal</p>
            <Link to="/">Inicio</Link>
            <Link to="/faq">Preguntas frecuentes</Link>
            <Link to="/contacto">Contacto</Link>
          </div>

          <div className="footer_col">
            <p className="footer_col_title">Proyecto</p>
            <a href="/#funcionalidades">Funcionalidades</a>
            <a href="/#arquitectura">Arquitectura</a>
            <a href="/#screenshots">Capturas</a>
          </div>

          <div className="footer_col">
            <p className="footer_col_title">App</p>
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer">
              Descargar APK
            </a>
            <a
              href="https://github.com/Ayoubito04/GoFight"
              target="_blank"
              rel="noreferrer"
            >
              Código fuente
            </a>
          </div>
        </nav>

        <div className="footer_social">
          <p className="footer_col_title">Dónde puedes ver nuestro trabajo</p>
          <ul className="social_list">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar ${item.label}`}
                  title={`Visitar ${item.label}`}
                  className="social_link"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer_bottom">
        <p>© {new Date().getFullYear()} GoFight · Proyecto de fin de ciclo</p>
        <p>Ayoub Arramdani · Mario Hernández · Agustín Linares</p>
      </div>
    </footer>
  );
};

export default Footer;
