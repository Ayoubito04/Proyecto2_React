//Aquí vamos a meter el contenido principal de nuestra pagina
import React from "react";
import "./main.css";
import demoVideo from "../../assets/demo-gofight.mp4";
import logoGoFight from "../../assets/GF Boxing Pulse Logo.png";
import aquitectura from "../../assets/aquitectura.png";
import DownloadButton from "../Buttons/DownloadButton.jsx";
import screenshotRegister from "../../assets/screenshots/register.png";
import screenshotLogin from "../../assets/screenshots/login.png";
import screenshotDashboard from "../../assets/screenshots/dashboard.png";
import screenshotRoutinesList from "../../assets/screenshots/routines-list.png";
import screenshotExerciseDetail from "../../assets/screenshots/exercise-detail.png";
import screenshotProgress from "../../assets/screenshots/progress.png";
import screenshotMyRoutines from "../../assets/screenshots/my-routines.png";
import screenshotNewRoutine from "../../assets/screenshots/new-routine.png";
import screenshotSessionComplete from "../../assets/screenshots/session-complete.png";
import screenshotSessionSummary from "../../assets/screenshots/session-summary.png";
import screenshotRest from "../../assets/screenshots/rest.png";
import screenshotRanking from "../../assets/screenshots/ranking.png";
import { useState, useEffect } from "react";

// Capturas sacadas de la grabación de la APK actualizada, por eso todas comparten el mismo diseño.
// Van en el orden del recorrido real: darse de alta, entrenar y ver el resultado.
const screenshots = [
    { image: screenshotRegister, title: "Registro", description: "Alta de cuenta con email o directamente con Google." },
    { image: screenshotLogin, title: "Inicio de sesión", description: "Acceso del usuario con la misma doble vía de entrada." },
    { image: screenshotDashboard, title: "Panel principal", description: "Racha, puntos de ranking, sesiones y calorías del día." },
    { image: screenshotRoutinesList, title: "Rutinas", description: "Catálogo con buscador y filtros por nivel de dificultad." },
    { image: screenshotMyRoutines, title: "Mis rutinas", description: "Rutinas guardadas por el usuario, con opción de eliminarlas." },
    { image: screenshotNewRoutine, title: "Nueva rutina", description: "Creación personalizada eligiendo ejercicios del catálogo." },
    { image: screenshotExerciseDetail, title: "Entrenamiento", description: "Ejercicio guiado con vídeo y temporizador de ejecución." },
    { image: screenshotRest, title: "Descanso", description: "Descanso automático entre series antes del siguiente asalto." },
    { image: screenshotSessionComplete, title: "Rutina completada", description: "Resumen al terminar, con ejercicios y tiempo total." },
    { image: screenshotSessionSummary, title: "Sesión registrada", description: "Calorías quemadas, racha y puntos ganados en la sesión." },
    { image: screenshotProgress, title: "Progreso", description: "Calorías y sesiones por semana, mes, trimestre y año." },
    { image: screenshotRanking, title: "Ranking", description: "Clasificación global de luchadores ordenada por puntos." },
];

// Cifras del proyecto, todas salen de lo que se explica más abajo en la propia página.
// El número de pantallas sale del propio array para que no se quede desfasado
// cada vez que añadimos una captura nueva.
const projectStats = [
    { value: String(screenshots.length), label: "Pantallas", detail: "Del registro al ranking global" },
    { value: "6", label: "Tablas en BD", detail: "Modelo relacional en PostgreSQL" },
    { value: "3", label: "Rangos", detail: "Bronce, plata y oro en el ranking" },
    { value: "2", label: "Vías de acceso", detail: "Email con JWT o cuenta de Google" },
];

// Enlaces a la documentación oficial de cada tecnología
const docs = {
    javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    reactNative: "https://reactnative.dev/docs/getting-started",
    expo: "https://docs.expo.dev/",
    json: "https://www.json.org/json-es.html",
    insomnia: "https://docs.insomnia.rest/",
    node: "https://nodejs.org/en/docs/",
    express: "https://expressjs.com/en/starter/installing.html",
    jwt: "https://jwt.io/introduction",
    cloudinary: "https://cloudinary.com/documentation",
    postgresql: "https://www.postgresql.org/docs/",
    prisma: "https://www.prisma.io/docs/",
};

// Logo de una tecnología que además enlaza a su documentación oficial
const TechLogo = ({ href, name, children }) => (
    <a
        className="tech_logo"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Ir a la documentación de ${name}`}
        aria-label={`Documentación de ${name}`}
    >
        {children}
    </a>
);

const Main = () => {
    const screenshotsPerPage = 3;
    const screenshotPages = [];

    for (let i = 0; i < screenshots.length; i += screenshotsPerPage) {
        screenshotPages.push(screenshots.slice(i, i + screenshotsPerPage));
    }

    const [currentScreenshotPage, setCurrentScreenshotPage] = useState(0);
    //Definimos lo que queremos cargar dentro del main,que en todo caso van a ser las imagenes
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);//Indice de la imagen que se ve ahora mismo de fondo en el header
    //Vamos a usar el useEffect,para cargar la API de imagenes de unsplash
    useEffect(() => {
        //En el contexto de los hooks,useEffect se usa para manejar efectos secuendarios de cada uno de los estados,que después se renderizan,sirve para implementar pantallas de carga,actualizaciones en los datos del usuario,también para cargar APIs,en este caso lo usamos para cargar la API de imagenes de nsplash,que van a ser de tematica de boxeo
        //Estas imagenes son las que se ven a pantalla completa detras del titulo,como en un launcher de juegos
        const CargarImagenes = async () => {
            try {
                const apiKey = import.meta.env.VITE_UNSPLASH_KEY;//Llammamos a la variable de entorno que tenemos que en .env
                if (!apiKey) {
                    console.error("Falta configurar VITE_UNSPLASH_KEY en el archivo .env");//En el caso de que no exista se lanzará un error
                    return;
                }
                //Dentro de este fetch pedimos las imagenes a la API
                //El ACCES_KEY lo tenemos guardado dentro de una variable de entorno
                //Pedimos 6 imagenes:son las capas que se quedan cargadas de fondo,asi que no conviene pedir mas
                let url = `https://api.unsplash.com/search/photos?query=boxing&per_page=6&orientation=landscape&client_id=${apiKey}`;
                //Una vez que tengamos la url,vamos a hacer un fetch
                let response = await fetch(url);
                if (response.ok) {
                    let data = await response.json();
                    //Una vez que tengamos los datos,lo que vamos a hacer es crear un contenedor para las imagenes
                    const list = Array.isArray(data.results) ? data.results : [];
                    //Hacemos una unica peticion y guardamos todas las imagenes.Luego vamos rotando entre
                    //ellas, asi no gastamos la cuota de la API pidiendo una imagen nueva cada 5 segundos
                    if (list.length > 0) {
                        setImages(list);
                        //Empezamos en una imagen aleatoria para que el header no se vea siempre igual al entrar
                        setCurrentImageIndex(Math.floor(Math.random() * list.length));
                    }
                } else {
                    console.error("Error al cargar las imagenes");
                }
            } catch (error) {
                console.error("Error al cargar las imagenes", error);
            }
        };

        CargarImagenes();
    }, []);

    //Con las imagenes ya cargadas,vamos pasando de una a otra cada 5 segundos
    useEffect(() => {
        if (images.length < 2) {
            return;
        }

        const intervaloImagenes = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervaloImagenes);//Limpiamos el intervalo para no dejarlo corriendo
    }, [images.length]);

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentScreenshotPage((prevPage) =>
                prevPage === screenshotPages.length - 1 ? 0 : prevPage + 1
            );
        }, 4500);

        return () => clearInterval(sliderInterval);
    }, [screenshotPages.length]);

    const handlePreviousScreenshots = () => {
        setCurrentScreenshotPage((prevPage) =>
            prevPage === 0 ? screenshotPages.length - 1 : prevPage - 1
        );
    };

    const handleNextScreenshots = () => {
        setCurrentScreenshotPage((prevPage) =>
            prevPage === screenshotPages.length - 1 ? 0 : prevPage + 1
        );
    };

    return (

        <main>
            <section id="header_section">
                <div className="launcher">
                    {/* Capa de fondo: las imágenes de la API se van cruzando unas sobre otras */}
                    <div className="launcher_art" aria-hidden="true">
                        {images.map((image, index) => (
                            <img
                                key={image.id}
                                src={image.urls?.regular}
                                alt=""
                                className={`launcher_art_img ${index === currentImageIndex ? "is_active" : ""}`}
                            />
                        ))}
                    </div>
                    <div className="launcher_scrim" aria-hidden="true" />
                    <div className="launcher_grid" aria-hidden="true" />

                    <div className="launcher_content">
                        <div className="launcher_topbar">
                            <span className="launcher_brand">
                                <img src={logoGoFight} alt="Logo de GoFight" className="launcher_brand_logo" />
                                <span className="launcher_kicker">Entrenamiento de boxeo</span>
                            </span>
                            <span className="launcher_status">
                                <span className="launcher_badge_dot" aria-hidden="true" />
                                Build disponible · Android
                            </span>
                        </div>

                        <div className="launcher_body">
                            <div className="launcher_copy">
                                <h1 className="h1_main">
                                    Go<span className="h1_main_light">Fight</span>
                                </h1>
                                <p className="launcher_tagline">
                                    Tu entrenador de boxeo en el bolsillo. Rutinas guiadas con vídeo, control de tu
                                    progreso y un ranking global donde competir contra el resto de la comunidad.
                                </p>
                                <div className="launcher_actions">
                                    <DownloadButton size="lg">Descarga</DownloadButton>
                                    <a className="launcher_secondary" href="#funcionalidades">
                                        Ver qué incluye
                                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path
                                                d="M12 5v14m0 0 6-6m-6 6-6-6"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* El vídeo de la app va justo al lado del botón de descarga.
                                Al ser una grabación de móvil, lo enmarcamos como un teléfono */}
                            <div className="launcher_preview">
                                <div className="phone_frame launcher_phone">
                                    <span className="phone_notch" aria-hidden="true" />
                                    <video autoPlay muted loop playsInline preload="metadata">
                                        <source src={demoVideo} type="video/mp4" />
                                        Tu navegador no soporta la reproducción de vídeo.
                                    </video>
                                </div>
                                <p className="launcher_preview_caption">Así se ve la app por dentro</p>
                            </div>
                        </div>

                        <dl className="launcher_dock">
                            <div className="launcher_spec">
                                <dt>Plataforma</dt>
                                <dd>Android</dd>
                            </div>
                            <div className="launcher_spec">
                                <dt>Motor</dt>
                                <dd>Expo SDK 57</dd>
                            </div>
                            <div className="launcher_spec">
                                <dt>Formato</dt>
                                <dd>APK</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <p className="p_main">Colaboradores: Ayoub Arramdani, Mario Hernandez, Agustin Linares</p>
            </section>
            <section id="main_section">
                <div className="contenedor">
                    {/* Cifras rápidas del proyecto */}
                    <div className="stats_band" data-reveal>
                        {projectStats.map((stat) => (
                            <div className="stat_item" key={stat.label}>
                                <span className="stat_value">{stat.value}</span>
                                <span className="stat_label">{stat.label}</span>
                                <span className="stat_detail">{stat.detail}</span>
                            </div>
                        ))}
                    </div>

                    <section id="resumen" className="panel panel_feature" data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">El proyecto</span>
                            <h2 className="panel_title">¿Por qué hemos elegido GoFight?</h2>
                        </div>
                        <div className="prose_columns">
                            <p className="lead">
                                GoFight nace con una idea clara: crear una propuesta diferente dentro del sector deportivo,
                                enfocada en el boxeo y los deportes de contacto. Detectamos un nicho con mucho potencial y
                                decidimos construir una experiencia moderna, visual y cercana para una nueva generación de usuarios.
                            </p>
                            <div className="prose_rest">
                                <p>
                                    Nuestro objetivo es conectar con un público joven que consume este tipo de contenido a diario,
                                    ofreciendo una plataforma más atractiva, clara y adaptada a sus intereses.
                                </p>
                                <p>
                                    Además de la parte visual, GoFight busca centralizar información relevante para la comunidad:
                                    novedades, seguimiento de actividad y contenido que ayude a descubrir nuevos eventos y referentes
                                    dentro de los deportes de contacto.
                                </p>
                                <p>
                                    Con este enfoque, el proyecto no solo presenta una idea de marca, sino una base sólida para crecer
                                    como producto digital, incorporando nuevas secciones y funcionalidades según las necesidades reales
                                    de los usuarios.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Primer grupo: que hace la app de cara al usuario */}
                    <div className="group_divider" data-reveal>
                        <span className="group_step">01</span>
                        <div className="group_copy">
                            <h2 className="group_title">La aplicación</h2>
                            <p className="group_desc">Qué hace GoFight y por qué engancha.</p>
                        </div>
                    </div>

                    <section id="funcionalidades" className="panel" data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Funcionalidades</span>
                            <h3 className="panel_title">¿Qué puedes hacer en GoFight?</h3>
                            <p className="panel_intro">
                                GoFight es una app de entrenamiento de boxeo pensada para quien entrena por su cuenta,
                                sin un entrenador presencial. La app guía la sesión completa y deja registro de todo
                                lo que el usuario va consiguiendo.
                            </p>
                        </div>
                        <div className="feature_grid">
                            <article className="feature_card">
                                <h4 className="feature_name">Entrenamiento guiado</h4>
                                <p>
                                    El usuario elige o crea una rutina y la app le guía ejercicio a ejercicio, con vídeo
                                    de demostración, temporizador de ejecución y descansos entre series.
                                </p>
                            </article>
                            <article className="feature_card">
                                <h4 className="feature_name">Resumen de sesión</h4>
                                <p>
                                    Al terminar, la app calcula las calorías estimadas de la sesión y la guarda en el
                                    historial para poder comparar el rendimiento con días anteriores.
                                </p>
                            </article>
                            <article className="feature_card">
                                <h4 className="feature_name">Seguimiento del progreso</h4>
                                <p>
                                    Gráficas de calorías y número de sesiones por semana, mes, trimestre y año, con
                                    comparativa entre periodos para ver si el usuario está mejorando o bajando el ritmo.
                                </p>
                            </article>
                            <article className="feature_card">
                                <h4 className="feature_name">Rutinas personalizadas</h4>
                                <p>
                                    Además del catálogo por nivel de dificultad, cada usuario puede crear sus propias
                                    rutinas seleccionando ejercicios y guardarlas en "Mis rutinas".
                                </p>
                            </article>
                            <article className="feature_card">
                                <h4 className="feature_name">Perfil de usuario</h4>
                                <p>
                                    Datos personales, estadísticas acumuladas y foto de perfil, que se sube y se sirve
                                    a través de Cloudinary para no cargar el servidor con archivos.
                                </p>
                            </article>
                            <article className="feature_card">
                                <h4 className="feature_name">Panel de administración</h4>
                                <p>
                                    Los usuarios con rol de administrador acceden a un panel de gestión completo:
                                    consultar usuarios, promocionar roles y eliminar cuentas.
                                </p>
                            </article>
                        </div>
                    </section>

                    <section id="gamificacion" className="panel" style={{ "--sec": "#ffc247" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Motivación</span>
                            <h3 className="panel_title">Gamificación y ranking</h3>
                            <p className="panel_intro">
                                El mayor problema de entrenar solo es la constancia. Por eso GoFight convierte el
                                entrenamiento en un sistema de rachas, puntos y rangos que premia entrenar a diario
                                y penaliza abandonar.
                            </p>
                        </div>
                        <ul className="check_list">
                            <li>Racha de días consecutivos entrenando</li>
                            <li>Puntos de ranking por cada sesión completada</li>
                            <li>Bonus adicional según las calorías quemadas</li>
                            <li>Penalización al perder la racha</li>
                        </ul>
                        <div className="ranks_grid" aria-label="Rangos de GoFight">
                            <article className="rank_card rank_bronze">
                                <span className="rank_medal" aria-hidden="true">3</span>
                                <h4 className="rank_name">Bronce</h4>
                                <p className="rank_desc">Punto de partida de todo usuario nuevo.</p>
                            </article>
                            <article className="rank_card rank_silver">
                                <span className="rank_medal" aria-hidden="true">2</span>
                                <h4 className="rank_name">Plata</h4>
                                <p className="rank_desc">Se alcanza manteniendo constancia y acumulando puntos.</p>
                            </article>
                            <article className="rank_card rank_gold">
                                <span className="rank_medal" aria-hidden="true">1</span>
                                <h4 className="rank_name">Oro</h4>
                                <p className="rank_desc">Reservado a los usuarios más regulares y exigentes.</p>
                            </article>
                        </div>
                        <p className="panel_note">
                            Todos esos puntos alimentan un <strong>ranking global</strong> donde los usuarios compiten
                            entre sí por posición. La competición social es lo que convierte una rutina individual en
                            un hábito sostenido: ya no entrenas solo contra ti, sino contra toda la comunidad.
                        </p>
                    </section>

                    {/* Segundo grupo: con que esta construida */}
                    <div className="group_divider" data-reveal>
                        <span className="group_step">02</span>
                        <div className="group_copy">
                            <h2 className="group_title">Cómo está construida</h2>
                            <p className="group_desc">El stack que hay detrás, de la app al servidor.</p>
                        </div>
                    </div>

                    <section id="lenguajes" className="panel" style={{ "--sec": "#f7df1e" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Lenguajes</span>
                            <h3 className="panel_title">¿Qué lenguajes usamos?</h3>
                            <p className="panel_intro">
                                JavaScript es la base tecnica del proyecto y, junto con Node.js como entorno de
                                ejecución, nos permite mantener coherencia entre frontend y backend.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.javascript} name="JavaScript">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#f7df1e" />
                                    <path d="M78.7 100.8c2.6 4.2 5.9 7.3 11.8 7.3 4.9 0 8.1-2.5 8.1-5.9 0-4.1-3.3-5.5-8.8-7.9l-3-1.3c-8.8-3.7-14.6-8.4-14.6-18.3 0-9.1 7-16 17.8-16 7.7 0 13.3 2.7 17.3 9.7l-9.5 6.1c-2.1-3.7-4.3-5.2-7.8-5.2-3.5 0-5.8 2.2-5.8 5.2 0 3.6 2.2 5 7.5 7.3l3 1.3c10.4 4.5 16.3 9 16.3 19.1 0 10.9-8.6 16.9-20.2 16.9-11.3 0-18.6-5.4-22.2-12.5ZM37.1 101.9c1.9 3.3 3.7 6.1 8 6.1 4.1 0 6.7-1.6 6.7-7.8V57.8h12.2v42.6c0 12.9-7.6 18.8-18.6 18.8-10 0-15.8-5.2-18.8-11.5Z" fill="#000" />
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">JavaScript</h4>
                                <div className="chip_row" aria-label="Ámbitos de uso">
                                    <span>Frontend</span>
                                    <span>Backend</span>
                                    <span>Runtime: Node.js</span>
                                </div>
                                <p className="tech_text">
                                    JavaScript es el lenguaje principal de la arquitectura de GoFight. Lo usamos en frontend
                                    para construir una interfaz dinamica, y en backend lo ejecutamos con Node.js para
                                    mantener una misma base de desarrollo entre cliente y servidor.
                                </p>
                            </div>
                        </article>
                        <ul className="check_list">
                            <li>Unifica la lógica entre cliente y servidor</li>
                            <li>Permite iterar rápido en nuevas funcionalidades</li>
                            <li>Reduce curva de aprendizaje para el equipo</li>
                        </ul>
                    </section>

                    <section id="frameworks" className="panel" style={{ "--sec": "#61dafb" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Frameworks</span>
                            <h3 className="panel_title">¿Qué frameworks usamos?</h3>
                            <p className="panel_intro">
                                La app móvil esta construida con React Native 0.81 y React 19 sobre Expo SDK 57, lo que
                                nos permite desarrollar, probar y distribuir de forma rápida, modular y mantenible.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.reactNative} name="React Native">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#0f172a" />
                                    <circle cx="64" cy="64" r="11" fill="#61dafb" />
                                    <g stroke="#61dafb" strokeWidth="6" fill="none">
                                        <ellipse cx="64" cy="64" rx="44" ry="17" />
                                        <ellipse cx="64" cy="64" rx="44" ry="17" transform="rotate(60 64 64)" />
                                        <ellipse cx="64" cy="64" rx="44" ry="17" transform="rotate(120 64 64)" />
                                    </g>
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">React Native 0.81 + React 19</h4>
                                <div className="chip_row" aria-label="Uso de React Native">
                                    <span>App móvil</span>
                                    <span>Componentes reutilizables</span>
                                    <span>React Navigation</span>
                                </div>
                                <p className="tech_text">
                                    React Native nos permite desarrollar una experiencia móvil fluida con una arquitectura
                                    basada en componentes. La navegación entre pantallas la gestionamos con React Navigation,
                                    que organiza los flujos de rutinas, progreso, perfil y administración.
                                </p>
                            </div>
                        </article>
                        <article className="tech_card">
                            <TechLogo href={docs.expo} name="Expo">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#0f172a" />
                                    <path d="M64 30c3 0 5.4 2.1 8.6 6.6l28 39.6c3.6 5.2 2.9 11-2 14.2-4.8 3.1-10.4 1.6-14-3.5L64 55.6 43.4 86.9c-3.6 5.1-9.2 6.6-14 3.5-4.9-3.2-5.6-9-2-14.2l28-39.6C58.6 32.1 61 30 64 30Z" fill="#fff" />
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">Expo SDK 57</h4>
                                <div className="chip_row" aria-label="Uso de Expo">
                                    <span>Expo Go</span>
                                    <span>expo-auth-session</span>
                                    <span>Development build</span>
                                </div>
                                <p className="tech_text">
                                    Expo acelera el ciclo de desarrollo porque facilita pruebas e iteraciones en dispositivos
                                    reales con Expo Go. Además nos da acceso a módulos nativos ya integrados como
                                    expo-auth-session, que es la pieza con la que resolvemos el login con Google.
                                </p>
                            </div>
                        </article>
                        <ul className="check_list">
                            <li>Desarrollo móvil agil con recarga en tiempo real</li>
                            <li>Mejor mantenimiento por enfoque en componentes</li>
                            <li>Videos de ejercicios integrados con react-native-youtube-iframe</li>
                            <li>Gráficas de progreso dibujadas con react-native-svg</li>
                            <li>Integración directa con APIs del backend</li>
                        </ul>
                    </section>

                    <section id="apis" className="panel" style={{ "--sec": "#34d399" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">APIs</span>
                            <h3 className="panel_title">APIs y formato de intercambio</h3>
                            <p className="panel_intro">
                                En GoFight usamos JSON como formato principal para enviar y recibir información entre
                                frontend y backend, manteniendo una estructura clara y consistente en cada endpoint.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.json} name="JSON">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#22c55e" />
                                    <path d="M48 38c-8 5-13 13-13 26s5 21 13 26" stroke="#0b2417" strokeWidth="8" fill="none" strokeLinecap="round" />
                                    <path d="M80 38c8 5 13 13 13 26s-5 21-13 26" stroke="#0b2417" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">JSON + Endpoints REST</h4>
                                <div className="chip_row" aria-label="Uso de APIs">
                                    <span>Intercambio de datos</span>
                                    <span>Consultas a BD</span>
                                    <a
                                        className="chip_link"
                                        href={docs.insomnia}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Ir a la documentación de Insomnia"
                                    >
                                        Testing con Insomnia
                                    </a>
                                </div>
                                <p className="tech_text">
                                    JSON, aunque puede ser un formato más verboso, nos permite representar información
                                    de forma legible y estandarizada. Para probar peticiones y validar respuestas usamos
                                    herramientas como Insomnia, donde ejecutamos consultas, revisamos estados HTTP y
                                    verificamos el comportamiento de nuestra API antes de integrarla en frontend.
                                </p>
                            </div>
                        </article>
                        <ul className="check_list">
                            <li>Estructura clara de peticiones y respuestas</li>
                            <li>Validación rápida de endpoints con Insomnia</li>
                            <li>Facil integración entre cliente y servidor</li>
                        </ul>
                    </section>

                    <section id="servidores" className="panel" style={{ "--sec": "#818cf8" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Servidor</span>
                            <h3 className="panel_title">¿Qué usamos en el servidor?</h3>
                            <p className="panel_intro">
                                En la capa de servidor usamos Node.js como entorno de ejecución y Express 5 como framework
                                para construir endpoints, middlewares y la lógica de negocio de forma clara y escalable.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.node} name="Node.js">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#1f2937" />
                                    <path d="M64 26 92 42v44L64 102 36 86V42z" fill="#8cc84b" />
                                    <text x="64" y="73" textAnchor="middle" fontSize="26" fontFamily="Arial, sans-serif" fill="#1f2937">JS</text>
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">Node.js como runtime</h4>
                                <div className="chip_row" aria-label="Uso de Node.js">
                                    <span>Node.js 18+</span>
                                    <span>JavaScript en servidor</span>
                                    <span>Peticiones concurrentes</span>
                                </div>
                                <p className="tech_text">
                                    Node.js nos permite ejecutar JavaScript en el servidor con buen rendimiento para
                                    peticiones concurrentes, manteniendo el mismo lenguaje que usamos en la app móvil
                                    y reduciendo el coste de cambiar de contexto entre cliente y servidor.
                                </p>
                            </div>
                        </article>
                        <article className="tech_card">
                            <TechLogo href={docs.express} name="Express">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#111827" />
                                    <text x="64" y="80" textAnchor="middle" fontSize="52" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#f3f4f6">ex</text>
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">Backend con Express 5</h4>
                                <div className="chip_row" aria-label="Uso de Express">
                                    <span>Rutas REST</span>
                                    <span>Controladores</span>
                                    <span>Middlewares</span>
                                </div>
                                <p className="tech_text">
                                    Express 5 nos da una estructura ligera para organizar rutas, validaciones y respuestas
                                    de la API. El backend separa rutas, controladores y middlewares, de forma que la lógica
                                    de negocio queda aislada de la capa HTTP y es más fácil de mantener.
                                </p>
                            </div>
                        </article>
                        <ul className="check_list">
                            <li>Arquitectura backend simple y escalable</li>
                            <li>Endpoints organizados por rutas, controladores y middlewares</li>
                            <li>Middleware de autenticación que protege las rutas privadas</li>
                            <li>Integración directa con base de datos y APIs</li>
                        </ul>
                    </section>

                    <section id="seguridad" className="panel" style={{ "--sec": "#c084fc" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Seguridad</span>
                            <h3 className="panel_title">¿Cómo protegemos las cuentas?</h3>
                            <p className="panel_intro">
                                GoFight guarda historial de entrenamiento, estadísticas y datos personales, así que la
                                autenticación no es un trámite: es una parte central del backend.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.jwt} name="JSON Web Tokens">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#1b1233" />
                                    <path d="M64 28v72M32 46l64 36M96 46l-64 36" stroke="#d63aff" strokeWidth="7" strokeLinecap="round" />
                                    <circle cx="64" cy="64" r="13" fill="#fff" />
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">JWT + bcrypt</h4>
                                <div className="chip_row" aria-label="Uso de autenticación">
                                    <span>Registro con email</span>
                                    <span>Hash de contraseñas</span>
                                    <span>Sesiones con token</span>
                                </div>
                                <p className="tech_text">
                                    Las contraseñas nunca se guardan en claro: se almacenan hasheadas con bcrypt. Una vez
                                    validado el acceso, el backend emite un JSON Web Token que la app envia en cada petición,
                                    y un middleware lo verifica antes de dejar entrar a cualquier ruta privada.
                                </p>
                            </div>
                        </article>
                        <article className="tech_card">
                            <div className="tech_logo tech_logo_static" aria-hidden="true">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#ffffff" />
                                    <path d="M64 34c8 0 15 3 20 8l-8 8c-3-3-7-5-12-5-10 0-18 8-18 19s8 19 18 19c9 0 15-5 16-12H64V60h32c1 3 1 5 1 8 0 18-12 30-33 30-17 0-31-14-31-31s14-31 31-31Z" fill="#1f2937" />
                                </svg>
                            </div>
                            <div className="tech_copy">
                                <h4 className="tech_name">Google OAuth</h4>
                                <div className="chip_row" aria-label="Uso de OAuth">
                                    <span>expo-auth-session</span>
                                    <span>google-auth-library</span>
                                    <span>Verificación en backend</span>
                                </div>
                                <p className="tech_text">
                                    Además del registro clásico, el usuario puede entrar con su cuenta de Google. La app
                                    obtiene el token con expo-auth-session y el backend lo verifica con google-auth-library
                                    antes de crear o recuperar la cuenta, de forma que nunca confiamos en el cliente.
                                </p>
                            </div>
                        </article>
                        <article className="tech_card">
                            <TechLogo href={docs.cloudinary} name="Cloudinary">
                                <svg viewBox="0 0 128 128" role="img" focusable="false">
                                    <rect width="128" height="128" rx="18" fill="#3448c5" />
                                    <path d="M46 84c-9 0-16-7-16-16s7-16 16-16c2-11 11-19 22-19 10 0 19 6 22 15 10 1 18 9 18 20 0 9-7 16-16 16Z" fill="#fff" />
                                </svg>
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">Cloudinary + multer</h4>
                                <div className="chip_row" aria-label="Uso de multimedia">
                                    <span>Fotos de perfil</span>
                                    <span>Subida controlada</span>
                                    <span>CDN externo</span>
                                </div>
                                <p className="tech_text">
                                    Las imágenes de perfil se procesan con multer en el servidor y se almacenan en Cloudinary.
                                    Así el backend no guarda archivos pesados y las fotos se sirven optimizadas desde un CDN.
                                </p>
                            </div>
                        </article>
                        <ul className="check_list">
                            <li>Contraseñas hasheadas, nunca en texto plano</li>
                            <li>Rutas privadas protegidas por middleware de token</li>
                            <li>Doble via de acceso: email/contraseña y Google</li>
                            <li>Roles diferenciados entre usuario y administrador</li>
                        </ul>
                    </section>

                    <section id="arquitectura" className="panel" style={{ "--sec": "#fb923c" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Arquitectura</span>
                            <h3 className="panel_title">¿Cuál es la arquitectura de GoFight?</h3>
                            <p className="panel_intro">
                                Un flujo modular entre frontend, backend y base de datos para mantener escalabilidad,
                                orden y rapidez en el desarrollo.
                            </p>
                        </div>
                        <div className="prose_columns">
                            <p className="lead">
                                La arquitectura de GoFight se basa en una estructura modular y escalable, con una clara separación entre frontend y backend. En el frontend, usamos React Native para construir una experiencia móvil fluida, mientras que en el backend, Node.js con Express nos permite manejar la lógica de negocio y las peticiones de forma eficiente.
                            </p>
                            <div className="prose_rest">
                                <p>
                                    La comunicación entre cliente y servidor se realiza a través de endpoints REST que intercambian datos en formato JSON, lo que facilita la integración y el mantenimiento del proyecto a medida que crece.
                                </p>
                            </div>
                        </div>
                        <figure className="arquitectura_image_frame">
                            <img src={aquitectura} alt="Diagrama de arquitectura de GoFight" className="arquitectura_image" />
                            <figcaption>Flujo de datos entre la app, la API y la base de datos.</figcaption>
                        </figure>
                    </section>

                    <section id="base-datos" className="panel" style={{ "--sec": "#38bdf8" }} data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">Base de datos</span>
                            <h3 className="panel_title">¿Qué base de datos usamos?</h3>
                            <p className="panel_intro">
                                En GoFight usamos PostgreSQL como base de datos principal para gestionar información de forma relacional, segura y escalable.
                            </p>
                        </div>
                        <article className="tech_card">
                            <TechLogo href={docs.postgresql} name="PostgreSQL">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                    alt=""
                                />
                            </TechLogo>
                            <div className="tech_copy">
                                <h4 className="tech_name">PostgreSQL</h4>
                                <p className="tech_text">
                                    PostgreSQL nos permite modelar relaciones entre entidades como usuarios, gamificaciones, sesiones o rutinas, además de ejecutar consultas complejas con buen rendimiento.
                                </p>
                            </div>
                        </article>

                        <div className="schema_wrapper">
                            <h4 className="schema_title">Tablas del modelo relacional</h4>
                            <ul className="schema_list">
                                <li><code>usuarios</code><span>Cuentas, rol, foto de perfil y credenciales</span></li>
                                <li><code>ejercicios</code><span>Catálogo de ejercicios con vídeo, categoría y duración</span></li>
                                <li><code>rutinas</code><span>Entrenamientos por nivel de dificultad</span></li>
                                <li><code>rutinas_ejercicios</code><span>Tabla intermedia que ordena los ejercicios de cada rutina</span></li>
                                <li><code>sesiones_historial</code><span>Registro de sesiones completadas y calorías estimadas</span></li>
                                <li><code>gamificaciones</code><span>Racha, puntos y rango de cada usuario</span></li>
                            </ul>
                        </div>

                        <p className="tech_text">
                            La base de datos se integra con nuestro backend a través de un ORM, lo que nos permite manejar la lógica de acceso a datos de forma más sencilla y mantenible. Esto nos ayuda a garantizar la integridad de los datos y a optimizar el rendimiento de las consultas, especialmente a medida que el proyecto crece y se añaden nuevas funcionalidades.
                        </p>
                        <p className="tech_text tech_text_secondary">
                            Además, la estructura relacional de la base de datos nos permite establecer conexiones claras entre diferentes tipos de información, como usuarios, gamificaciones, sesiones o rutinas, lo que mejora la experiencia del usuario al ofrecer una navegación más fluida y personalizada dentro de la aplicación.
                        </p>

                        {/* --- Prisma ORM --- */}
                        <div className="orm_wrapper">
                            <div className="orm_head">
                                <TechLogo href={docs.prisma} name="Prisma ORM">
                                    {/* Prisma ORM official white logo (triangle) */}
                                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="6" fill="#0c344b" />
                                        <path d="M33.6 32.7L21.1 7.1C20.7 6.3 19.5 6.3 19.1 7.1L6.6 32.7C6.2 33.5 6.8 34.4 7.7 34.4H32.5C33.4 34.4 34 33.5 33.6 32.7Z" fill="#fff" />
                                    </svg>
                                </TechLogo>
                                <h4 className="tech_name">¿Por qué usamos Prisma 7 como ORM?</h4>
                            </div>
                            <p className="tech_text">
                                Prisma 7 es una herramienta moderna que facilita la interacción entre nuestra aplicación y la base de datos PostgreSQL. Nos permite definir modelos de datos de forma sencilla y segura, generando automáticamente consultas eficientes y evitando errores comunes en el acceso a datos.
                            </p>
                            <ul className="check_list">
                                <li>Permite escribir consultas a la base de datos usando JavaScript/TypeScript, sin necesidad de SQL manual.</li>
                                <li>Facilita la validación y consistencia de los datos gracias a su tipado fuerte.</li>
                                <li>Automatiza migraciones y cambios en la estructura de la base de datos.</li>
                                <li>Mejora la productividad del equipo y reduce errores en el desarrollo backend.</li>
                                <li>Documentación clara y comunidad activa para resolver dudas rápidamente.</li>
                            </ul>
                            <p className="tech_text tech_text_secondary">
                                Gracias a Prisma, el desarrollo de nuevas funcionalidades es más ágil y seguro, asegurando que los datos estén siempre bien estructurados y alineados con las necesidades del proyecto.
                            </p>
                        </div>
                    </section>

                    <section id="screenshots" className="panel panel_showcase" data-reveal>
                        <div className="panel_header">
                            <span className="eyebrow">App móvil</span>
                            <h3 className="panel_title">Capturas de la aplicación</h3>
                            <p className="panel_intro">
                                Estas capturas muestran el flujo principal de la aplicación: registro, inicio de sesión, panel del usuario, rutinas, progreso, perfil y herramientas de administración.
                            </p>
                        </div>

                        <div className="screenshots_slider" aria-label="Carrusel de capturas de GoFight">
                            <button
                                className="screenshots_arrow screenshots_arrow_left"
                                type="button"
                                onClick={handlePreviousScreenshots}
                                aria-label="Ver capturas anteriores"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div className="screenshots_viewport">
                                <div
                                    className="screenshots_track"
                                    style={{ transform: `translateX(-${currentScreenshotPage * 100}%)` }}
                                >
                                    {screenshotPages.map((page, pageIndex) => (
                                        <div className="screenshots_page" key={`screenshots-page-${pageIndex}`}>
                                            {page.map((screenshot, index) => {
                                                const screenshotNumber = pageIndex * screenshotsPerPage + index + 1;

                                                return (
                                                    <article className="screenshot_card" key={screenshot.title}>
                                                        <div className="screenshot_image_wrapper">
                                                            <span className="screenshot_number">
                                                                {String(screenshotNumber).padStart(2, "0")}
                                                            </span>
                                                            {/* Las capturas salen de la grabación sin marco: se lo ponemos aquí */}
                                                            <div className="phone_frame screenshot_phone">
                                                                <span className="phone_notch" aria-hidden="true" />
                                                                <img
                                                                    src={screenshot.image}
                                                                    alt={`Captura de pantalla de GoFight: ${screenshot.title}`}
                                                                    className="screenshot_image"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="screenshot_content">
                                                            <h4>{screenshot.title}</h4>
                                                            <p>{screenshot.description}</p>
                                                        </div>
                                                    </article>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="screenshots_arrow screenshots_arrow_right"
                                type="button"
                                onClick={handleNextScreenshots}
                                aria-label="Ver capturas siguientes"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="screenshots_dots" aria-label="Paginación de capturas">
                            {screenshotPages.map((_, index) => (
                                <button
                                    type="button"
                                    key={`screenshots-dot-${index}`}
                                    className={`screenshots_dot ${currentScreenshotPage === index ? "screenshots_dot_active" : ""}`}
                                    onClick={() => setCurrentScreenshotPage(index)}
                                    aria-label={`Ver grupo de capturas ${index + 1}`}
                                />
                            ))}
                        </div>
                    </section>

                    <section id="descarga" className="descarga" data-reveal>
                        <div className="descarga_glow" aria-hidden="true" />
                        <div className="descarga_content">
                            <span className="eyebrow">Descarga</span>
                            <h3 className="descarga_title">Instala GoFight en tu móvil</h3>
                            <p className="descarga_intro">
                                La build de Android esta publicada en Expo. Descarga el APK, instalalo y empieza
                                a entrenar: crear cuenta te lleva menos de un minuto.
                            </p>

                            <ol className="descarga_steps">
                                <li>
                                    <span className="descarga_step_num">1</span>
                                    <div>
                                        <h4>Descarga el APK</h4>
                                        <p>Pulsa el botón y abre la página de la build en Expo desde tu móvil.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="descarga_step_num">2</span>
                                    <div>
                                        <h4>Permite la instalación</h4>
                                        <p>Android pedira autorizar la instalación desde orígenes desconocidos.</p>
                                    </div>
                                </li>
                                <li>
                                    <span className="descarga_step_num">3</span>
                                    <div>
                                        <h4>Crea tu cuenta</h4>
                                        <p>Regístrate con email o entra directamente con tu cuenta de Google.</p>
                                    </div>
                                </li>
                            </ol>

                            <div className="descarga_cta">
                                <DownloadButton size="lg">Descarga</DownloadButton>
                                <p className="descarga_note">
                                    Requiere Android · Distribuido a través de Expo Build
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

            </section>
        </main>
    )
}
export default Main;
