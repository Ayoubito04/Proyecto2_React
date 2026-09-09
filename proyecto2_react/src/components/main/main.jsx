//Aquí vamos a meter el contenido principal de nuestra pagina
import React from "react";
import "./main.css";
import navegacionVideo from "../../assets/navegacion.mp4";
import logoGoFight from "../../assets/GF Boxing Pulse Logo.png";
import aquitectura from "../../assets/aquitectura.png";
import DownloadButton from "../Buttons/DownloadButton.jsx";
import screenshotRegister from "../../assets/screenshots/register.png";
import screenshotLogin from "../../assets/screenshots/login.png";
import screenshotDashboard from "../../assets/screenshots/dashboard.png";
import screenshotRoutinesList from "../../assets/screenshots/routines-list.png";
import screenshotExerciseDetail from "../../assets/screenshots/exercise-detail.png";
import screenshotProgress from "../../assets/screenshots/progress.png";
import screenshotProfile from "../../assets/screenshots/profile.png";
import screenshotRanking from "../../assets/screenshots/ranking.png";
import screenshotAdminUsers from "../../assets/screenshots/admin-users.png";
import screenshotEditProfile from "../../assets/screenshots/edit-profile.png";
import screenshotMyRoutines from "../../assets/screenshots/my-routines.png";
import screenshotNewRoutine from "../../assets/screenshots/new-routine.png";
import { useState,useEffect } from "react";

const screenshots = [
    { image: screenshotRegister, title: "Registro", description: "Pantalla inicial para crear una cuenta en GoFight." },
    { image: screenshotLogin, title: "Inicio de sesión", description: "Acceso de usuario con diseño oscuro y estética deportiva." },
    { image: screenshotDashboard, title: "Panel principal", description: "Resumen rápido de racha, puntos, sesiones y rutinas." },
    { image: screenshotRoutinesList, title: "Rutinas", description: "Listado de entrenamientos con buscador y niveles de dificultad." },
    { image: screenshotExerciseDetail, title: "Entrenamiento", description: "Vista de ejercicios con vídeo, categoría y tiempo de ejecución." },
    { image: screenshotProgress, title: "Progreso", description: "Seguimiento de puntos, calorías y sesiones diarias." },
    { image: screenshotProfile, title: "Perfil", description: "Datos personales, estadísticas y acciones del usuario." },
    { image: screenshotRanking, title: "Ranking", description: "Clasificación de jugadores ordenada por puntuación." },
    { image: screenshotAdminUsers, title: "Gestión de usuarios", description: "Panel de administración para visualizar y gestionar usuarios." },
    { image: screenshotEditProfile, title: "Editar perfil", description: "Modal para actualizar nombre, email y contraseña." },
    { image: screenshotMyRoutines, title: "Mis rutinas", description: "Rutinas guardadas por el usuario con opción de eliminarlas." },
    { image: screenshotNewRoutine, title: "Nueva rutina", description: "Creación personalizada de rutinas seleccionando ejercicios." },
];
const Main=()=>{
    const screenshotsPerPage = 3;
    const screenshotPages = [];

    for (let i = 0; i < screenshots.length; i += screenshotsPerPage) {
        screenshotPages.push(screenshots.slice(i, i + screenshotsPerPage));
    }

    const [currentScreenshotPage, setCurrentScreenshotPage] = useState(0);
    //Definimos lo0 que queremos cargar dentro del main,que en todo caso van a ser las imagenes
     const [images,setImages] = useState([]);
     const [currentImageIndex,setCurrentImageIndex] = useState(0);//Indice de la imagen que se ve ahora mismo de fondo en el header
    //Vamos a usar el useEffect,para cargar la API de imagenes de unsplash
    useEffect(()=>{
        //En el contexto de los hooks,useEffect se usa para manejar efectos secuendarios de cada uno de los estados,que después se renderizan,sirve para implementar pantallas de carga,actualizaciones en los datos del usuario,también para cargar APIs,en este caso lo usamos para cargar la API de imagenes de nsplash,que van a ser de tematica de boxeo
        //Estas imagenes son las que se ven a pantalla completa detras del titulo,como en un launcher de juegos
        const CargarImagenes=async()=>{
             try{
                const apiKey = import.meta.env.VITE_UNSPLASH_KEY;//Llammamos a la variable de entorno que tenemos que en .env
                if (!apiKey) {
                console.error("Falta configurar VITE_UNSPLASH_KEY en el archivo .env");//En el caso de que no exista se lanzará un error
                 return;
                            }
              //Dentro de este fetch pedimos las imagenes a la API
              //El ACCES_KEY lo tenemos guardado dentro de una variable de entorno
            //Pedimos 6 imagenes:son las capas que se quedan cargadas de fondo,asi que no conviene pedir mas
            let url=`https://api.unsplash.com/search/photos?query=boxing&per_page=6&orientation=landscape&client_id=${apiKey}`;
              //Una vez que tengamos la url,vamos a hacer un fetch
              let response=await fetch(url);
              if(response.ok){
                let data=await response.json();
                //Una vez que tengamos los datos,lo que vamos a hacer es crear un contenedor para las imagenes
              const list=Array.isArray(data.results) ? data.results : [];
              //Hacemos una unica peticion y guardamos todas las imagenes.Luego vamos rotando entre
              //ellas, asi no gastamos la cuota de la API pidiendo una imagen nueva cada 5 segundos
              if(list.length>0){
                setImages(list);
                //Empezamos en una imagen aleatoria para que el header no se vea siempre igual al entrar
                setCurrentImageIndex(Math.floor(Math.random()*list.length));
               }
                }else{
                    console.error("Error al cargar las imagenes");
             }
        }catch(error){
            console.error("Error al cargar las imagenes",error);
        }
        };

        CargarImagenes();
    }, []);

    //Con las imagenes ya cargadas,vamos pasando de una a otra cada 5 segundos
    useEffect(()=>{
        if(images.length<2){
            return;
        }

        const intervaloImagenes=setInterval(()=>{
            setCurrentImageIndex((prevIndex)=>(prevIndex+1)%images.length);
        },5000);

        return ()=>clearInterval(intervaloImagenes);//Limpiamos el intervalo para no dejarlo corriendo
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

    const handleDocumntationClickReactNative=()=>{
        window.open("https://reactnative.dev/docs/getting-started","_blank");
        //Esta función nos conducirá a la documentación oficial de React Native
          
    }
     const handleDocumentationClickJavaScript=()=>{
        window.open("https://developer.mozilla.org/en-US/docs/Web/JavaScript","_blank");
        //Esta función nos conducirá a la documentación oficial de JavaScript
    }
    const handleDocumentationClickNode=()=>{
        window.open("https://nodejs.org/en/docs/","_blank");
        //Esta función nos conducirá a la documentación oficial de Node.js
    }
    const handleDocumentationClickExpo=()=>{
        window.open("https://docs.expo.dev/","_blank");
        //Esta función nos conducirá a la documentación oficial de Expo
    }
    const handleDocumentationClickJWT=()=>{
        window.open("https://jwt.io/introduction","_blank");
        //Esta función nos conducirá a la documentación oficial de JSON Web Tokens
    }
    const handleDocumentationClickCloudinary=()=>{
        window.open("https://cloudinary.com/documentation","_blank");
        //Esta función nos conducirá a la documentación oficial de Cloudinary
    }
    const handleDocumentationClickExpress=()=>{
        window.open("https://expressjs.com/en/starter/installing.html","_blank");
        //Esta función nos conducirá a la documentación oficial de Express
    }
    const handleDocumentationClickInsomnia=()=>{
        window.open("https://docs.insomnia.rest/","_blank");
        //Esta función nos conducirá a la documentación oficial de Insomnia
    }
    const handleDocumentationClickJSON=()=>{
        window.open("https://www.json.org/json-es.html","_blank");
        //Esta función nos conducirá a la documentación oficial de JSON
    }
    const handleDocumentationClickPostgreSQL=()=>{
        window.open("https://www.postgresql.org/docs/","_blank");
        //Esta función nos conducirá a la documentación oficial de PostgreSQL
    }
    const handleDocumentationClickPrisma=()=>{
        window.open("https://www.prisma.io/docs/","_blank");
        //Esta función nos conducirá a la documentación oficial de Prisma ORM
    }

    return(

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
                                        Ver que incluye
                                    </a>
                                </div>
                            </div>

                            {/* El vídeo de la app va justo al lado del botón de descarga */}
                            <div className="launcher_preview">
                                <div className="launcher_screen">
                                    <span className="launcher_screen_bar" aria-hidden="true">
                                        <i /><i /><i />
                                    </span>
                                    <video autoPlay muted loop playsInline>
                                        <source src={navegacionVideo} type="video/mp4" />
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
                    <section id="resumen" className="Quest_section content_block" >
                        <div className="block_header">
                            <span className="block_eyebrow">El proyecto</span>
                            <h2 className="block_title Question">¿Por qué hemos elegido GoFight?</h2>
                        </div>
                        <p className="p_quest">
                            GoFight nace con una idea clara: crear una propuesta diferente dentro del sector deportivo,
                            enfocada en el boxeo y los deportes de contacto. Detectamos un nicho con mucho potencial y
                            decidimos construir una experiencia moderna, visual y cercana para una nueva generación de usuarios.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Nuestro objetivo es conectar con un público joven que consume este tipo de contenido a diario,
                            ofreciendo una plataforma más atractiva, clara y adaptada a sus intereses.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Además de la parte visual, GoFight busca centralizar información relevante para la comunidad:
                            novedades, seguimiento de actividad y contenido que ayude a descubrir nuevos eventos y referentes
                            dentro de los deportes de contacto.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Con este enfoque, el proyecto no solo presenta una idea de marca, sino una base sólida para crecer
                            como producto digital, incorporando nuevas secciones y funcionalidades según las necesidades reales
                            de los usuarios.
                        </p>
                    </section>

                    {/* Primer grupo: que hace la app de cara al usuario */}
                    <div className="group_divider">
                        <span className="group_step">01</span>
                        <h2 className="group_title">La aplicación</h2>
                        <p className="group_desc">Qué hace GoFight y por qué engancha.</p>
                    </div>

                    <div className="funcionalidades_wrapper">
                        <section id="funcionalidades" className="funcionalidades content_block">
                            <div className="funcionalidades_header block_header">
                                <span className="block_eyebrow">Funcionalidades</span>
                                <h3 className="block_title funcionalidades_title">¿Qué puedes hacer en GoFight?</h3>
                                <p className="funcionalidades_intro">
                                    GoFight es una app de entrenamiento de boxeo pensada para quien entrena por su cuenta,
                                    sin un entrenador presencial. La app guía la sesión completa y deja registro de todo
                                    lo que el usuario va consiguiendo.
                                </p>
                            </div>
                            <div className="feature_grid">
                                <article className="feature_card">
                                    <h4 className="feature_name">Entrenamiento guiado</h4>
                                    <p className="p_funcionalidades">
                                        El usuario elige o crea una rutina y la app le guía ejercicio a ejercicio, con vídeo
                                        de demostración, temporizador de ejecución y descansos entre series.
                                    </p>
                                </article>
                                <article className="feature_card">
                                    <h4 className="feature_name">Resumen de sesión</h4>
                                    <p className="p_funcionalidades">
                                        Al terminar, la app calcula las calorías estimadas de la sesión y la guarda en el
                                        historial para poder comparar el rendimiento con días anteriores.
                                    </p>
                                </article>
                                <article className="feature_card">
                                    <h4 className="feature_name">Seguimiento del progreso</h4>
                                    <p className="p_funcionalidades">
                                        Gráficas de calorías y número de sesiones por semana, mes, trimestre y año, con
                                        comparativa entre periodos para ver si el usuario está mejorando o bajando el ritmo.
                                    </p>
                                </article>
                                <article className="feature_card">
                                    <h4 className="feature_name">Rutinas personalizadas</h4>
                                    <p className="p_funcionalidades">
                                        Además del catálogo por nivel de dificultad, cada usuario puede crear sus propias
                                        rutinas seleccionando ejercicios y guardarlas en "Mis rutinas".
                                    </p>
                                </article>
                                <article className="feature_card">
                                    <h4 className="feature_name">Perfil de usuario</h4>
                                    <p className="p_funcionalidades">
                                        Datos personales, estadísticas acumuladas y foto de perfil, que se sube y se sirve
                                        a través de Cloudinary para no cargar el servidor con archivos.
                                    </p>
                                </article>
                                <article className="feature_card">
                                    <h4 className="feature_name">Panel de administración</h4>
                                    <p className="p_funcionalidades">
                                        Los usuarios con rol de administrador acceden a un panel de gestión completo:
                                        consultar usuarios, promocionar roles y eliminar cuentas.
                                    </p>
                                </article>
                            </div>
                        </section>
                    </div>
                    <div className="gamificacion_wrapper">
                                                <section id="gamificacion" className="gamificacion content_block">
                            <div className="gamificacion_header block_header">
                                <span className="block_eyebrow">Motivación</span>
                                <h3 className="block_title gamificacion_title">Gamificación y ranking</h3>
                                <p className="gamificacion_intro">
                                    El mayor problema de entrenar solo es la constancia. Por eso GoFight convierte el
                                    entrenamiento en un sistema de rachas, puntos y rangos que premia entrenar a diario
                                    y penaliza abandonar.
                                </p>
                            </div>
                            <ul className="gamificacion_points">
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
                            <p className="p_gamificacion">
                                Todos esos puntos alimentan un <strong>ranking global</strong> donde los usuarios compiten
                                entre sí por posición. La competición social es lo que convierte una rutina individual en
                                un hábito sostenido: ya no entrenas solo contra ti, sino contra toda la comunidad.
                            </p>
                        </section>
                    </div>
                    {/* Segundo grupo: con que esta construida */}
                    <div className="group_divider">
                        <span className="group_step">02</span>
                        <h2 className="group_title">Cómo está construida</h2>
                        <p className="group_desc">El stack que hay detrás, de la app al servidor.</p>
                    </div>

                    <div className="lenguajes_wrapper">
                                                <section id="lenguajes" className="lenguajes content_block">
                            <div className="lenguajes_header block_header">
                                <span className="block_eyebrow">Lenguajes</span>
                                <h3 className="block_title lenguajes_title">¿Qué lenguajes usamos?</h3>
                                <p className="lenguajes_intro">
                                    JavaScript es la base tecnica del proyecto y, junto con Node.js como entorno de
                                    ejecución, nos permite mantener coherencia entre frontend y backend.
                                </p>
                            </div>
                            <article className="tech_item">
                                <div className="tech_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickJavaScript} style={{ cursor: "pointer" }} title="Ir a documentación de JavaScript">
                                        <rect width="128" height="128" rx="18" fill="#f7df1e" />
                                        <path d="M78.7 100.8c2.6 4.2 5.9 7.3 11.8 7.3 4.9 0 8.1-2.5 8.1-5.9 0-4.1-3.3-5.5-8.8-7.9l-3-1.3c-8.8-3.7-14.6-8.4-14.6-18.3 0-9.1 7-16 17.8-16 7.7 0 13.3 2.7 17.3 9.7l-9.5 6.1c-2.1-3.7-4.3-5.2-7.8-5.2-3.5 0-5.8 2.2-5.8 5.2 0 3.6 2.2 5 7.5 7.3l3 1.3c10.4 4.5 16.3 9 16.3 19.1 0 10.9-8.6 16.9-20.2 16.9-11.3 0-18.6-5.4-22.2-12.5ZM37.1 101.9c1.9 3.3 3.7 6.1 8 6.1 4.1 0 6.7-1.6 6.7-7.8V57.8h12.2v42.6c0 12.9-7.6 18.8-18.6 18.8-10 0-15.8-5.2-18.8-11.5Z" fill="#000" />
                                    </svg>
                                </div>
                                <div className="tech_copy">
                                    <h4 className="tech_title">JavaScript</h4>
                                    <div className="tech_scope" aria-label="Ambitos de uso">
                                        <span>Frontend</span>
                                        <span>Backend</span>
                                        <span>Runtime: Node.js</span>
                                    </div>
                                    <p className="p_lenguajes">
                                        JavaScript es el lenguaje principal de la arquitectura de GoFight. Lo usamos en frontend
                                        para construir una interfaz dinamica, y en backend lo ejecutamos con Node.js para
                                        mantener una misma base de desarrollo entre cliente y servidor.
                                    </p>
                                </div>
                            </article>
                            <ul className="lenguajes_points">
                                <li>Unifica la lógica entre cliente y servidor</li>
                                <li>Permite iterar rápido en nuevas funcionalidades</li>
                                <li>Reduce curva de aprendizaje para el equipo</li>
                            </ul>
                        </section>
                    </div>
                    <div className="frameworks_wrapper">
                                                <section id="frameworks" className="frameworks content_block">
                            <div className="frameworks_header block_header">
                                <span className="block_eyebrow">Frameworks</span>
                                <h3 className="block_title frameworks_title">¿Qué frameworks usamos?</h3>
                                <p className="frameworks_intro">
                                    La app móvil esta construida con React Native 0.81 y React 19 sobre Expo SDK 57, lo que
                                    nos permite desarrollar, probar y distribuir de forma rápida, modular y mantenible.
                                </p>
                            </div>
                            <article className="framework_item">
                                <div className="framework_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumntationClickReactNative} style={{ cursor: "pointer" }} title="Ir a documentación de React Native">
                                        <circle cx="64" cy="64" r="11" fill="#61dafb" />
                                        <g stroke="#61dafb" strokeWidth="6" fill="none">
                                            <ellipse cx="64" cy="64" rx="48" ry="19" />
                                            <ellipse cx="64" cy="64" rx="48" ry="19" transform="rotate(60 64 64)" />
                                            <ellipse cx="64" cy="64" rx="48" ry="19" transform="rotate(120 64 64)" />
                                        </g>
                                    </svg>
                                </div>
                                <div className="framework_copy">
                                    <h4 className="framework_title">React Native 0.81 + React 19</h4>
                                    <div className="framework_scope" aria-label="Uso de React Native">
                                        <span>App móvil</span>
                                        <span>Componentes reutilizables</span>
                                        <span>React Navigation</span>
                                    </div>
                                    <p className="p_frameworks">
                                        React Native nos permite desarrollar una experiencia móvil fluida con una arquitectura
                                        basada en componentes. La navegación entre pantallas la gestionamos con React Navigation,
                                        que organiza los flujos de rutinas, progreso, perfil y administración.
                                    </p>
                                </div>
                            </article>
                            <article className="framework_item">
                                <div className="framework_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickExpo} style={{ cursor: "pointer" }} title="Ir a documentación de Expo">
                                        <rect width="128" height="128" rx="18" fill="#0f172a" />
                                        <path d="M64 30c3 0 5.4 2.1 8.6 6.6l28 39.6c3.6 5.2 2.9 11-2 14.2-4.8 3.1-10.4 1.6-14-3.5L64 55.6 43.4 86.9c-3.6 5.1-9.2 6.6-14 3.5-4.9-3.2-5.6-9-2-14.2l28-39.6C58.6 32.1 61 30 64 30Z" fill="#fff" />
                                    </svg>
                                </div>
                                <div className="framework_copy">
                                    <h4 className="framework_title">Expo SDK 57</h4>
                                    <div className="framework_scope" aria-label="Uso de Expo">
                                        <span>Expo Go</span>
                                        <span>expo-auth-session</span>
                                        <span>Development build</span>
                                    </div>
                                    <p className="p_frameworks">
                                        Expo acelera el ciclo de desarrollo porque facilita pruebas e iteraciones en dispositivos
                                        reales con Expo Go. Además nos da acceso a módulos nativos ya integrados como
                                        expo-auth-session, que es la pieza con la que resolvemos el login con Google.
                                    </p>
                                </div>
                            </article>
                            <ul className="framework_points">
                                <li>Desarrollo móvil agil con recarga en tiempo real</li>
                                <li>Mejor mantenimiento por enfoque en componentes</li>
                                <li>Videos de ejercicios integrados con react-native-youtube-iframe</li>
                                <li>Gráficas de progreso dibujadas con react-native-svg</li>
                                <li>Integración directa con APIs del backend</li>
                            </ul>
                        </section>
                    </div>
                    <div className="apis_wrapper">
                                                <section id="apis" className="apis content_block">
                            <div className="apis_header block_header">
                                <span className="block_eyebrow">APIs</span>
                                <h3 className="block_title apis_title">APIs y formato de intercambio</h3>
                                <p className="apis_intro">
                                    En GoFight usamos JSON como formato principal para enviar y recibir información entre
                                    frontend y backend, manteniendo una estructura clara y consistente en cada endpoint.
                                </p>
                            </div>
                            <article className="api_item">
                                <div className="api_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#22c55e" onClick={handleDocumentationClickJSON} />
                                        <path d="M48 38c-8 5-13 13-13 26s5 21 13 26" stroke="#0b2417" strokeWidth="8" fill="none" strokeLinecap="round" />
                                        <path d="M80 38c8 5 13 13 13 26s-5 21-13 26" stroke="#0b2417" strokeWidth="8" fill="none" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="api_copy">
                                    <h4 className="api_name">JSON + Endpoints REST</h4>
                                    <div className="api_scope" aria-label="Uso de APIs">
                                        <span>Intercambio de datos</span>
                                        <span>Consultas a BD</span>
                                        <span
                                            className="scope_link"
                                            role="link"
                                            tabIndex={0}
                                            onClick={handleDocumentationClickInsomnia}
                                            onKeyDown={(event) => event.key === "Enter" && handleDocumentationClickInsomnia()}
                                            title="Ir a documentación de Insomnia"
                                        >
                                            Testing con Insomnia
                                        </span>
                                    </div>
                                    <p className="p_apis">
                                        JSON, aunque puede ser un formato más verboso, nos permite representar información
                                        de forma legible y estandarizada. Para probar peticiones y validar respuestas usamos
                                        herramientas como Insomnia, donde ejecutamos consultas, revisamos estados HTTP y
                                        verificamos el comportamiento de nuestra API antes de integrarla en frontend.
                                    </p>
                                </div>
                            </article>
                            <ul className="apis_points">
                                <li>Estructura clara de peticiones y respuestas</li>
                                <li>Validación rápida de endpoints con Insomnia</li>
                                <li>Facil integración entre cliente y servidor</li>
                            </ul>
                        </section>
                    </div>
                    <div className="servidores_wrapper">
                                                <section id="servidores" className="servidores content_block">
                            <div className="servidores_header block_header">
                                <span className="block_eyebrow">Servidor</span>
                                <h3 className="block_title servidores_title">¿Qué usamos en el servidor?</h3>
                                <p className="servidores_intro">
                                    En la capa de servidor usamos Node.js como entorno de ejecución y Express 5 como framework
                                    para construir endpoints, middlewares y la lógica de negocio de forma clara y escalable.
                                </p>
                            </div>
                            <article className="servidor_item">
                                <div className="servidor_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickNode} style={{ cursor: "pointer" }} title="Ir a documentación de Node.js">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#374151" />
                                        <path d="M64 26 92 42v44L64 102 36 86V42z" fill="#8cc84b" />
                                        <text x="64" y="73" textAnchor="middle" fontSize="26" fontFamily="Arial, sans-serif" fill="#1f2937">JS</text>
                                    </svg>
                                </div>
                                <div className="servidor_copy">
                                    <h4 className="servidor_name">Node.js como runtime</h4>
                                    <div className="servidor_scope" aria-label="Uso de Node.js">
                                        <span>Node.js 18+</span>
                                        <span>JavaScript en servidor</span>
                                        <span>Peticiones concurrentes</span>
                                    </div>
                                    <p className="p_servidores">
                                        Node.js nos permite ejecutar JavaScript en el servidor con buen rendimiento para
                                        peticiones concurrentes, manteniendo el mismo lenguaje que usamos en la app móvil
                                        y reduciendo el coste de cambiar de contexto entre cliente y servidor.
                                    </p>
                                </div>
                            </article>
                            <article className="servidor_item">
                                <div className="servidor_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickExpress} style={{ cursor: "pointer" }} title="Ir a documentación de Express">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#111827" />
                                        <text x="64" y="80" textAnchor="middle" fontSize="52" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#f3f4f6">ex</text>
                                    </svg>
                                </div>
                                <div className="servidor_copy">
                                    <h4 className="servidor_name">Backend con Express 5</h4>
                                    <div className="servidor_scope" aria-label="Uso de Express">
                                        <span>Rutas REST</span>
                                        <span>Controladores</span>
                                        <span>Middlewares</span>
                                    </div>
                                    <p className="p_servidores">
                                        Express 5 nos da una estructura ligera para organizar rutas, validaciones y respuestas
                                        de la API. El backend separa rutas, controladores y middlewares, de forma que la lógica
                                        de negocio queda aislada de la capa HTTP y es más fácil de mantener.
                                    </p>
                                </div>
                            </article>
                            <ul className="servidores_points">
                                <li>Arquitectura backend simple y escalable</li>
                                <li>Endpoints organizados por rutas, controladores y middlewares</li>
                                <li>Middleware de autenticación que protege las rutas privadas</li>
                                <li>Integración directa con base de datos y APIs</li>
                            </ul>
                        </section>
                    </div>
                    <div className="seguridad_wrapper">
                                                <section id="seguridad" className="seguridad content_block">
                            <div className="seguridad_header block_header">
                                <span className="block_eyebrow">Seguridad</span>
                                <h3 className="block_title seguridad_title">¿Cómo protegemos las cuentas?</h3>
                                <p className="seguridad_intro">
                                    GoFight guarda historial de entrenamiento, estadísticas y datos personales, así que la
                                    autenticación no es un trámite: es una parte central del backend.
                                </p>
                            </div>
                            <article className="seguridad_item">
                                <div className="seguridad_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickJWT} style={{ cursor: "pointer" }} title="Ir a documentación de JWT">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#1b1233" />
                                        <path d="M64 28v72M32 46l64 36M96 46l-64 36" stroke="#d63aff" strokeWidth="7" strokeLinecap="round" />
                                        <circle cx="64" cy="64" r="13" fill="#fff" />
                                    </svg>
                                </div>
                                <div className="seguridad_copy">
                                    <h4 className="seguridad_name">JWT + bcrypt</h4>
                                    <div className="seguridad_scope" aria-label="Uso de autenticacion">
                                        <span>Registro con email</span>
                                        <span>Hash de contraseñas</span>
                                        <span>Sesiones con token</span>
                                    </div>
                                    <p className="p_seguridad">
                                        Las contraseñas nunca se guardan en claro: se almacenan hasheadas con bcrypt. Una vez
                                        validado el acceso, el backend emite un JSON Web Token que la app envia en cada petición,
                                        y un middleware lo verifica antes de dejar entrar a cualquier ruta privada.
                                    </p>
                                </div>
                            </article>
                            <article className="seguridad_item">
                                <div className="seguridad_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#ffffff" />
                                        <path d="M64 34c8 0 15 3 20 8l-8 8c-3-3-7-5-12-5-10 0-18 8-18 19s8 19 18 19c9 0 15-5 16-12H64V60h32c1 3 1 5 1 8 0 18-12 30-33 30-17 0-31-14-31-31s14-31 31-31Z" fill="#1f2937" />
                                    </svg>
                                </div>
                                <div className="seguridad_copy">
                                    <h4 className="seguridad_name">Google OAuth</h4>
                                    <div className="seguridad_scope" aria-label="Uso de OAuth">
                                        <span>expo-auth-session</span>
                                        <span>google-auth-library</span>
                                        <span>Verificación en backend</span>
                                    </div>
                                    <p className="p_seguridad">
                                        Además del registro clásico, el usuario puede entrar con su cuenta de Google. La app
                                        obtiene el token con expo-auth-session y el backend lo verifica con google-auth-library
                                        antes de crear o recuperar la cuenta, de forma que nunca confiamos en el cliente.
                                    </p>
                                </div>
                            </article>
                            <article className="seguridad_item">
                                <div className="seguridad_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false" onClick={handleDocumentationClickCloudinary} style={{ cursor: "pointer" }} title="Ir a documentación de Cloudinary">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#3448c5" />
                                        <path d="M46 84c-9 0-16-7-16-16s7-16 16-16c2-11 11-19 22-19 10 0 19 6 22 15 10 1 18 9 18 20 0 9-7 16-16 16Z" fill="#fff" />
                                    </svg>
                                </div>
                                <div className="seguridad_copy">
                                    <h4 className="seguridad_name">Cloudinary + multer</h4>
                                    <div className="seguridad_scope" aria-label="Uso de multimedia">
                                        <span>Fotos de perfil</span>
                                        <span>Subida controlada</span>
                                        <span>CDN externo</span>
                                    </div>
                                    <p className="p_seguridad">
                                        Las imágenes de perfil se procesan con multer en el servidor y se almacenan en Cloudinary.
                                        Así el backend no guarda archivos pesados y las fotos se sirven optimizadas desde un CDN.
                                    </p>
                                </div>
                            </article>
                            <ul className="seguridad_points">
                                <li>Contraseñas hasheadas, nunca en texto plano</li>
                                <li>Rutas privadas protegidas por middleware de token</li>
                                <li>Doble via de acceso: email/contraseña y Google</li>
                                <li>Roles diferenciados entre usuario y administrador</li>
                            </ul>
                        </section>
                    </div>
                    <div className="arquitectura_wrapper">
                                                <section id="arquitectura" className="arquitectura content_block">
                            <div className="arquitectura_header block_header">
                                <span className="block_eyebrow">Arquitectura</span>
                                <h3 className="block_title arquitectura_title">¿Cuál es la arquitectura de GoFight?</h3>
                                <p className="arquitectura_intro">
                                    Un flujo modular entre frontend, backend y base de datos para mantener escalabilidad,
                                    orden y rapidez en el desarrollo.
                                </p>
                            </div>
                            <p className="p_arquitectura">
                                La arquitectura de GoFight se basa en una estructura modular y escalable, con una clara separación entre frontend y backend. En el frontend, usamos React Native para construir una experiencia móvil fluida, mientras que en el backend, Node.js con Express nos permite manejar la lógica de negocio y las peticiones de forma eficiente.
                            </p>
                            <p className="p_arquitectura p_arquitectura_secondary">
                                La comunicación entre cliente y servidor se realiza a través de endpoints REST que intercambian datos en formato JSON, lo que facilita la integración y el mantenimiento del proyecto a medida que crece.
                            </p>
                            <div className="arquitectura_image_frame">
                                <img src={aquitectura} alt="Diagrama de arquitectura de GoFight" className="arquitectura_image" />
                            </div>
                        </section>
                    </div>
                    <div className="database_wrapper">
                                                <section id="base-datos" className="database content_block">
                            <div className="database_header block_header">
                                <span className="block_eyebrow">Base de datos</span>
                                <h3 className="block_title database_title">¿Qué base de datos usamos?</h3>
                                <p className="database_intro">
                                    En GoFight usamos PostgreSQL como base de datos principal para gestionar información de forma relacional, segura y escalable.
                                </p>
                            </div>
                            <article className="database_item">
                                <div className="database_logo" aria-hidden="true">
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                                        alt=""
                                        onClick={handleDocumentationClickPostgreSQL}
                                    />
                                </div>
                                <div className="database_copy">
                                    <h4 className="database_name">PostgreSQL</h4>
                                    <p className="p_database">
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
                            <p className="p_database">
                                La base de datos se integra con nuestro backend a través de un ORM, lo que nos permite manejar la lógica de acceso a datos de forma más sencilla y mantenible. Esto nos ayuda a garantizar la integridad de los datos y a optimizar el rendimiento de las consultas, especialmente a medida que el proyecto crece y se añaden nuevas funcionalidades.
                            </p>
                            <p className="p_database p_database_secondary">
                                Además, la estructura relacional de la base de datos nos permite establecer conexiones claras entre diferentes tipos de información, como usuarios, gamificaciones, sesiones o rutinas  , lo que mejora la experiencia del usuario al ofrecer una navegación más fluida y personalizada dentro de la aplicación.
                            </p>
                            {/* --- Prisma ORM --- */}
                            <div className="orm_wrapper">
                                <div className="orm_logo_title">
                                    <span className="orm_logo" aria-hidden="true">
                                        {/* Prisma ORM official white logo (triangle) */}
                                        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleDocumentationClickPrisma} style={{ cursor: "pointer" }} title="Ir a documentación de Prisma ORM">
                                            <path d="M33.6 32.7L21.1 7.1C20.7 6.3 19.5 6.3 19.1 7.1L6.6 32.7C6.2 33.5 6.8 34.4 7.7 34.4H32.5C33.4 34.4 34 33.5 33.6 32.7Z" fill="#fff"/>
                                        </svg>
                                    </span>
                                    <h4 className="h2_orm">¿Por qué usamos Prisma 7 como ORM?</h4>
                                </div>
                                <p className="p_orm">
                                    Prisma 7 es una herramienta moderna que facilita la interacción entre nuestra aplicación y la base de datos PostgreSQL. Nos permite definir modelos de datos de forma sencilla y segura, generando automáticamente consultas eficientes y evitando errores comunes en el acceso a datos.
                                </p>
                                <ul className="orm_points">
                                    <li>Permite escribir consultas a la base de datos usando JavaScript/TypeScript, sin necesidad de SQL manual.</li>
                                    <li>Facilita la validación y consistencia de los datos gracias a su tipado fuerte.</li>
                                    <li>Automatiza migraciones y cambios en la estructura de la base de datos.</li>
                                    <li>Mejora la productividad del equipo y reduce errores en el desarrollo backend.</li>
                                    <li>Documentación clara y comunidad activa para resolver dudas rápidamente.</li>
                                </ul>
                                <p className="p_orm p_orm_secondary">
                                    Gracias a Prisma, el desarrollo de nuevas funcionalidades es más ágil y seguro, asegurando que los datos estén siempre bien estructurados y alineados con las necesidades del proyecto.
                                </p>
                            </div>
                        </section>
                        </div>

                    <section id="screenshots" className="screenshots content_block">
                        <div className="screenshots_header block_header">
                            <span className="screenshots_badge">App móvil</span>
                            <h3 className="block_title screenshots_title">Capturas de la aplicación</h3>
                            <p className="screenshots_intro">
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
                                ‹
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
                                                        <div className="screenshot_number">{String(screenshotNumber).padStart(2, "0")}</div>
                                                        <div className="screenshot_image_wrapper">
                                                            <img
                                                                src={screenshot.image}
                                                                alt={`Captura de pantalla de GoFight: ${screenshot.title}`}
                                                                className="screenshot_image"
                                                                loading="lazy"
                                                            />
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
                                ›
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
                    <section id="descarga" className="descarga content_block">
                        <div className="descarga_glow" aria-hidden="true" />
                        <div className="descarga_content">
                            <span className="descarga_badge">Descarga</span>
                            <h3 className="block_title descarga_title">Instala GoFight en tu móvil</h3>
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