import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Formulario from "../../components/formulario/formulario";
import githubIcon from "../../assets/icons8-github-24.png";
import linkedinIcon from "../../assets/icons8-linkedin-50.png";
import emailIcon from "../../assets/icons8-nuevo-post-50.png";
import marioFace from "../../assets/mario.png";
import ayoubFace from "../../assets/ayoub.png";
import "./Contacto.css";

const contactos = [
    {
        nombre: "Ayoub",
        email: "mailto:ayoubarramdani091@gmail.com",
        github: "https://github.com/ayoubito04",
        linkedin: "https://www.linkedin.com/in/ayoub-arramdani-b49b64311/",
        image: ayoubFace,
    },
    {
        nombre: "Mario",
        email: "mailto:mario.hm.laboral@gmail.com",
        github: "https://github.com/raytugah",
        linkedin: "https://www.linkedin.com/in/rayhdev/",
        image: marioFace,
    },
];

const Contacto = () => {
    return (
        <>
            <Header />
            <main className="contacto-main">
                <h1 className="contacto-title">Contacto</h1>

                <div className="contacto-grid">
                    <section className="contacto-info">
                        <div className="contacto-info-text">
                            <h2>¿Hablamos?</h2>
                            <p>
                                Estamos abiertos a cualquier sugerencia, colaboración o
                                pregunta. No dudes en escribirnos.
                            </p>
                        </div>

                        <div className="contacto-personas">
                            {contactos.map((contacto) => {
                                const personaClass = contacto.nombre.toLowerCase();

                                return (
                                    <article
                                        className={`contacto-persona contacto-persona--${personaClass}`}
                                        key={contacto.nombre}
                                    >
                                        <div className="contacto-persona-content">
                                            <h3>{contacto.nombre}</h3>

                                            <ul className="contacto-links">
                                                <li>
                                                    <img
                                                        className="contacto-icon-img"
                                                        src={emailIcon}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                    <a
                                                        href={contacto.email}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Correo electrónico
                                                    </a>
                                                </li>
                                                <li>
                                                    <img
                                                        className="contacto-icon-img"
                                                        src={githubIcon}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                    <a
                                                        href={contacto.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        GitHub
                                                    </a>
                                                </li>
                                                <li>
                                                    <img
                                                        className="contacto-icon-img"
                                                        src={linkedinIcon}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                    <a
                                                        href={contacto.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        {contacto.image && (
                                            <img
                                                src={contacto.image}
                                                alt={`Imagen de ${contacto.nombre}`}
                                                className={`contacto-persona-img contacto-${personaClass}-img`}
                                            />
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section className="contacto-form-wrapper">
                        <Formulario />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Contacto;
