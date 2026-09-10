import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DownloadButton from "../../components/Buttons/DownloadButton";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./FAQ.css";

// Las preguntas viven en un array: así el JSX no repite la misma estructura
// siete veces y añadir una nueva es solo añadir un objeto.
const preguntas = [
    {
        pregunta: "¿Por qué usar GoFight antes que otras opciones y qué es lo que destacarías de Go?",
        respuesta:
            "Por qué GoFight se enfoca en un nicho en especifico como el boxeo y también logra atraer al público más joven.",
    },
    {
        pregunta: "¿De cuantas tablas consta la BD de GoFight?",
        respuesta:
            "La base de datos de GoFight consta de 6 tablas: usuarios, ejercicios, rutinas, sesiones_historial, gamificaciones y la tabla intermedia N:M rutinas_ejercicios, donde se registra el orden, el tiempo de duración y el descanso de cada uno de los ejercicios dentro de la rutina.",
    },
    {
        pregunta: "¿Cual es vuestro plan a futuro?",
        respuesta:
            "Ampliar nuestro nicho a más artes marciales, ya sea Teakwondo, Judo o Karate, y seguir mejorando nuestra plataforma para ofrecer la mejor experiencia a nuestros usuarios.",
    },
    {
        pregunta: "¿Qué es lo que más destaca de vuestro proyecto?",
        respuesta:
            "Lo que más destaca de nuestro proyecto es nuestra dedicación a ofrecer una experiencia única a la hora de aprender a boxear, ya que por el momento no existe como tal una app que cuente con varias rutinas y ejercicios de distintas categorías.",
    },
    {
        pregunta: "¿Cómo funciona el sistema de puntos y rangos?",
        respuesta:
            "Cada sesión completada suma puntos de ranking, con un bonus extra según las calorías quemadas. Además se lleva una racha de días consecutivos entrenando, y perderla penaliza la puntuación. Con esos puntos el usuario va subiendo de rango entre bronce, plata y oro, y compite con el resto de la comunidad en un ranking global.",
    },
    {
        pregunta: "¿Cómo se inicia sesión en la app?",
        respuesta:
            "Hay dos vías: registro clásico con email y contraseña, que se guarda hasheada con bcrypt y nunca en texto plano, o inicio de sesión con Google. En ambos casos el backend emite un token JWT que la app envía en cada petición, y un middleware lo verifica antes de dar acceso a cualquier ruta privada.",
    },
    {
        pregunta: "¿De qué se ha encargado cada uno?",
        respuesta:
            "Cada uno se ha encargado de diferentes partes cruciales de la app. Ayoub se ha encargado del backend y las consultas API, Agustín se ha encargado de la documentación y de varias pantallas de frontend, como la de perfil de usuario y la de progreso. Mario se ha encargado del diseño de la app, dándole ese toque de rojo neón con una tonalidad oscura.",
    },
];

const FAQ = () => {
    //Definimos un estado que guarda qué respuesta está abierta ahora mismo
    const [isOpen, setIsOpen] = useState(null);

    useScrollReveal();

    const handleFAQ = (index) => {
        //Si se vuelve a pulsar la pregunta abierta, se cierra
        setIsOpen(isOpen === index ? null : index);
    };

    return (
        <>
            <Header />
            <main className="faq-main">
                <header className="faq-hero">
                    <span className="eyebrow">Dudas frecuentes</span>
                    <h1 className="page_title">Preguntas frecuentes</h1>
                    <p className="page_lede">
                        Lo que más nos preguntan sobre GoFight: el producto, la base de datos, el
                        sistema de rangos y cómo nos hemos repartido el trabajo.
                    </p>
                </header>

                <div className="faq-container">
                    {preguntas.map((item, index) => {
                        const abierta = isOpen === index;

                        return (
                            <div
                                className={`faq-item${abierta ? " faq-item--open" : ""}`}
                                key={item.pregunta}
                                data-reveal
                            >
                                <h2>
                                    <button
                                        type="button"
                                        className="faq-question"
                                        onClick={() => handleFAQ(index)}
                                        aria-expanded={abierta}
                                    >
                                        <span className="faq-index">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="faq-text">{item.pregunta}</span>
                                        <span className="faq-chevron" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" focusable="false">
                                                <path
                                                    d="m6 9 6 6 6-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </h2>

                                {/* El contenedor siempre está en el DOM: se anima su altura */}
                                <div className="faq-answer">
                                    <div className="faq-answer-inner">
                                        <p>{item.respuesta}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <section className="faq-cta" data-reveal>
                    <div>
                        <h2>¿Te queda alguna duda?</h2>
                        <p>Escríbenos y te contestamos, o prueba la app directamente.</p>
                    </div>
                    <div className="faq-cta-actions">
                        <DownloadButton>Descarga</DownloadButton>
                        <Link className="faq-cta-link" to="/contacto">
                            Ir a contacto
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default FAQ;
