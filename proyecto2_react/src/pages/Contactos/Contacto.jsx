import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Formulario from "../../components/formulario/formulario";
import Review from "../../components/review/review";
import useScrollReveal from "../../hooks/useScrollReveal";
import githubIcon from "../../assets/icons8-github-24.png";
import linkedinIcon from "../../assets/icons8-linkedin-50.png";
import emailIcon from "../../assets/icons8-nuevo-post-50.png";
import marioFace from "../../assets/mario.png";
import ayoubFace from "../../assets/ayoub.png";
import "./Contacto.css";

// Cada persona enseña solo los enlaces que tiene: Agustin de momento solo
// tiene LinkedIn, asi que su tarjeta no pinta correo ni GitHub.
const contactos = [
    {
        nombre: "Ayoub",
        slug: "ayoub",
        rol: "Backend y API",
        email: "mailto:ayoubarramdani091@gmail.com",
        github: "https://github.com/ayoubito04",
        linkedin: "https://www.linkedin.com/in/ayoub-arramdani-b49b64311/",
        image: ayoubFace,
    },
    {
        nombre: "Mario",
        slug: "mario",
        rol: "Diseño y frontend",
        email: "mailto:mario.hm.laboral@gmail.com",
        github: "https://github.com/raytugah",
        linkedin: "https://www.linkedin.com/in/rayhdev/",
        image: marioFace,
    },
    {
        nombre: "Agustín",
        slug: "agustin",
        rol: "Documentación y frontend",
        linkedin: "https://www.linkedin.com/in/agustin-linares-carrera/",
        // Sin foto todavía: la tarjeta cae en la silueta de marcador de posición
        image: null,
    },
];

// Silueta que se usa mientras no haya retrato de la persona
const Silueta = () => (
    <span className="contacto-persona-silueta" aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false">
            <circle cx="32" cy="20" r="12.5" />
            <path d="M32 37c-12.2 0-22 8.2-22 18.4V64h44v-8.6C54 45.2 44.2 37 32 37Z" />
        </svg>
    </span>
);

const Contacto = () => {
    useScrollReveal();

    return (
        <>
            <Header />
            <main className="contacto-main">
                <header className="contacto-hero">
                    <span className="eyebrow">Contacto</span>
                    <h1 className="page_title">¿Hablamos?</h1>
                    <p className="page_lede">
                        Estamos abiertos a cualquier sugerencia, colaboración o pregunta.
                        Escríbenos directamente o déjanos tu opinión en el formulario.
                    </p>
                </header>

                <div className="contacto-grid">
                    <section className="contacto-personas" data-reveal>
                        {contactos.map((contacto) => {
                            //Se descartan los que la persona no tenga todavía
                            const enlaces = [
                                { href: contacto.email, icono: emailIcon, texto: "Correo electrónico" },
                                { href: contacto.github, icono: githubIcon, texto: "GitHub" },
                                { href: contacto.linkedin, icono: linkedinIcon, texto: "LinkedIn" },
                            ].filter((enlace) => enlace.href);

                            return (
                                <article
                                    className={`contacto-persona contacto-persona--${contacto.slug}`}
                                    key={contacto.slug}
                                >
                                    <div className="contacto-persona-content">
                                        <p className="contacto-persona-rol">{contacto.rol}</p>
                                        <h2>{contacto.nombre}</h2>

                                        <ul className="contacto-links">
                                            {enlaces.map((enlace) => (
                                                <li key={enlace.texto}>
                                                    <img
                                                        className="contacto-icon-img"
                                                        src={enlace.icono}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                    <a
                                                        href={enlace.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {enlace.texto}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {contacto.image ? (
                                        <img
                                            src={contacto.image}
                                            alt={`Imagen de ${contacto.nombre}`}
                                            className={`contacto-persona-img contacto-${contacto.slug}-img`}
                                        />
                                    ) : (
                                        <Silueta />
                                    )}
                                </article>
                            );
                        })}
                    </section>

                    <section className="contacto-form-wrapper" data-reveal>
                        <Formulario />
                    </section>
                </div>

                <section className="contacto-reviews" data-reveal>
                    <Review />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Contacto;
