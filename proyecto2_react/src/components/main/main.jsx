//Aquí vamos a meter el contenido principal de nuestra pagina
import React from "react";
import "./main.css";
import navegacionVideo from "../../assets/navegacion.mp4";
import aquitectura from "../../assets/aquitectura.png";
import Formulario from "../formulario/formulario.jsx";
import { useState,useEffect } from "react";
const Main=()=>{
    //Definimos lo0 que queremos cargar dentro del main,que en todo caso van a ser las imagenes
     const [images,setImages] = useState([]);
    const currentImage = images.length > 0 ? images[images.length - 1] : null;//Vamos a usar esta constante para cargar las imagenes actuales,que se cargan cada 5 segundos,lo que hacemos es cargar la ultima imagen del array de imagenes,que es la que se acaba de cargar
    //Vamos a usar el useEffect,para cargar la API de imagenes de unsplash
    useEffect(()=>{
        //En el contexto de los hooks,useEffect se usa para manejar efectos secuendarios de cada uno de los estados,que después se renderizan,sirve para implementar pantallas de carga,actualizaciones en los datos del usuario,también para cargar APIs,en este caso lo usamos para cargar la API de imagenes de nsplash,que van a ser de tematica de boxeo
        //En este useEffect lo que vamos a hacer es añadir imagenes  que complementen con el protafolio
        const CargarImagenes=async()=>{
             try{
                const apiKey = import.meta.env.VITE_UNSPLASH_KEY;//Llammamos a la variable de entorno que tenemos que en .env
                if (!apiKey) {
                console.error("Falta configurar VITE_UNSPLASH_KEY en el archivo .env");//En el caso de que no exista se lanzará un error
                 return;
                            }
                //Vamos a definir un intervalo de tiempo el cual nos servirá para determinar cuanto tenemos que esperar para que puedan cargar las imagenes
              //Dentro de este setTimeout,vamos a hacer un fetch a una API de imagenes
              //El ACCES_KEY lo tenemos guardado dentro de una variable de entorno
            let url=`https://api.unsplash.com/search/photos?query=boxing&per_page=12&orientation=landscape&client_id=${apiKey}`;
              //Una vez que tengamos la url,vamos a hacer un fetch
              let response=await fetch(url);
              if(response.ok){
                let data=await response.json();
                //Una vez que tengamos los datos,lo que vamos a hacer es crear un contenedor para las imagenes
              const list=Array.isArray(data.results) ? data.results : [];
               //Lo que buscamos es cargar imagenes random en nuestro protafolio
               if(list.length>0){
                const randomIndex=Math.floor(Math.random()*list.length);
                const randomImage=list[randomIndex];
                setImages((prevImages)=>[...prevImages,randomImage]);//Nos basaremos en indices para poder cargar las imagenes
                //Esto nos sitrve para pasar de imagen a imagen basandose en un indice random
                //Vamos a cargar imagenes aleatorias cada 5 segundos
                setTimeout(CargarImagenes,5000);

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
                <h2 className="h1_main">Bienvenidos a la presentación de GoFight</h2>
                 <p className="p_main">Contribuitors: Ayoub Arramdani,Mario Hernandez,Agustin Linares</p>
                      <video controls autoPlay muted loop>
                          <source src={navegacionVideo} type="video/mp4" />
                          Tu navegador no soporta la reproducción de video.
                      </video>
            

            </section>
            <section id="main_section">
               <div className="contenedor">
                      <h1>Por hemos elegido GoFight</h1>
                    <section id="resumen" className="Quest_section content_block" >
                        
                        <h2 className="Question">Por que hemos elegido GoFight</h2>
                        <p className="p_quest">
                            GoFight nace con una idea clara: crear una propuesta diferente dentro del sector deportivo,
                            enfocada en el boxeo y los deportes de contacto. Detectamos un nicho con mucho potencial y
                            decidimos construir una experiencia moderna, visual y cercana para una nueva generacion de usuarios.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Nuestro objetivo es conectar con un publico joven que consume este tipo de contenido a diario,
                            ofreciendo una plataforma mas atractiva, clara y adaptada a sus intereses.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Ademas de la parte visual, GoFight busca centralizar informacion relevante para la comunidad:
                            novedades, seguimiento de actividad y contenido que ayude a descubrir nuevos eventos y referentes
                            dentro de los deportes de contacto.
                        </p>
                        <p className="p_quest p_quest_secondary">
                            Con este enfoque, el proyecto no solo presenta una idea de marca, sino una base solida para crecer
                            como producto digital, incorporando nuevas secciones y funcionalidades segun las necesidades reales
                            de los usuarios.
                        </p>
                        {currentImage && (
                            <div className="image_wrapper">
                                <img
                                    key={currentImage.id}
                                    src={currentImage.urls?.regular}
                                    alt={currentImage.alt_description || "Imagen de boxeo"}
                                    className="main_image"
                                />
                               
                            </div>
                        )}
                        
           
                    </section>
                    <div className="lenguajes_wrapper">
                        <h1 className="lenguajes_title">¿Que lenguajes usamos en GoFight?</h1>
                        <section id="lenguajes" className="lenguajes content_block">
                            <div className="lenguajes_header">
                                <h2 className="h2_lenguajes">Tecnologias usadas en GoFight</h2>
                                <p className="lenguajes_intro">
                                    JavaScript es la base tecnica del proyecto y, junto con Node.js como entorno de
                                    ejecucion, nos permite mantener coherencia entre frontend y backend.
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
                                    <h3 className="tech_title">JavaScript</h3>
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
                                <li>Unifica la logica entre cliente y servidor</li>
                                <li>Permite iterar rapido en nuevas funcionalidades</li>
                                <li>Reduce curva de aprendizaje para el equipo</li>
                            </ul>
                        </section>
                    </div>
                    <div className="frameworks_wrapper">
                        <h1 className="frameworks_title">¿Que frameworks usamos en GoFight?</h1>
                        <section id="frameworks" className="frameworks content_block">
                            <div className="frameworks_header">
                                <h2 className="h2_frameworks">Frameworks usados en GoFight</h2>
                                <p className="frameworks_intro">
                                    En GoFight usamos React Native junto con Expo Go para construir y probar la aplicacion
                                    movil de forma rapida, modular y mantenible.
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
                                    <h3 className="framework_title">React Native + Expo Go</h3>
                                    <div className="framework_scope" aria-label="Uso de React">
                                        <span>App movil</span>
                                        <span>Componentes reutilizables</span>
                                        <span>Testing rapido con Expo Go</span>
                                    </div>
                                    <p className="p_frameworks">
                                        React Native nos permite desarrollar una experiencia movil fluida con una arquitectura
                                        basada en componentes. Expo Go acelera el ciclo de desarrollo porque facilita pruebas,
                                        iteraciones y validaciones en dispositivos reales durante todo el proyecto.
                                    </p>
                                </div>
                            </article>
                            <ul className="framework_points">
                                <li>Desarrollo movil agil con recarga en tiempo real</li>
                                <li>Mejor mantenimiento por enfoque en componentes</li>
                                <li>Integracion directa con APIs del backend</li>
                            </ul>
                        </section>
                    </div>
                    <div className="apis_wrapper">
                        <h1 className="apis_title">¿Que usamos en la parte de APIs?</h1>
                        <section id="apis" className="apis content_block">
                            <div className="apis_header">
                                <h2 className="h2_apis">APIs y formato de intercambio</h2>
                                <p className="apis_intro">
                                    En GoFight usamos JSON como formato principal para enviar y recibir informacion entre
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
                                    <h3 className="api_name">JSON + Endpoints REST</h3>
                                    <div className="api_scope" aria-label="Uso de APIs">
                                        <span>Intercambio de datos</span>
                                        <span>Consultas a BD</span>
                                        <span>Testing con Insomnia</span>
                                    </div>
                                    <p className="p_apis">
                                        JSON, aunque puede ser un formato mas verboso, nos permite representar informacion
                                        de forma legible y estandarizada. Para probar peticiones y validar respuestas usamos
                                        herramientas como Insomnia, donde ejecutamos consultas, revisamos estados HTTP y
                                        verificamos el comportamiento de nuestra API antes de integrarla en frontend.
                                    </p>
                                </div>
                            </article>
                            <ul className="apis_points">
                                <li>Estructura clara de peticiones y respuestas</li>
                                <li>Validacion rapida de endpoints con Insomnia</li>
                                <li>Facil integracion entre cliente y servidor</li>
                            </ul>
                        </section>
                    </div>
                    <div className="servidores_wrapper">
                        <h1 className="servidores_title">¿Que usamos en servidores?</h1>
                        <section id="servidores" className="servidores content_block">
                            <div className="servidores_header">
                                <h2 className="h2_servidores">Node.js + Express</h2>
                                <p className="servidores_intro">
                                    En la capa de servidor usamos Node.js como entorno de ejecucion y Express como framework
                                    para construir endpoints, middlewares y la logica de negocio de forma clara y escalable.
                                </p>
                            </div>
                            <article className="servidor_item">
                                <div className="servidor_logo" aria-hidden="true">
                                    <svg viewBox="0 0 128 128" role="img" focusable="false">
                                        <rect x="10" y="10" width="108" height="108" rx="16" fill="#374151" onClick={handleDocumentationClickExpress} style={{ cursor: "pointer" }} title="Ir a documentación de Node.js" />
                                        <path d="M64 26 92 42v44L64 102 36 86V42z" fill="#8cc84b" />
                                        <text x="64" y="73" textAnchor="middle" fontSize="26" fontFamily="Arial, sans-serif" fill="#1f2937">JS</text>
                                    </svg>
                                </div>
                                <div className="servidor_copy">
                                    <h3 className="servidor_name">Backend con Express</h3>
                                    <div className="servidor_scope" aria-label="Uso de servidor">
                                        <span>Node.js runtime</span>
                                        <span>Express routes</span>
                                        <span>Middlewares</span>
                                    </div>
                                    <p className="p_servidores">
                                        Node.js nos permite ejecutar JavaScript en el servidor con buen rendimiento para
                                        peticiones concurrentes, y Express nos da una estructura ligera para organizar rutas,
                                        validaciones y respuestas de la API de forma mantenible.
                                    </p>
                                </div>
                            </article>
                            <ul className="servidores_points">
                                <li>Arquitectura backend simple y escalable</li>
                                <li>Endpoints organizados con Express</li>
                                <li>Integracion directa con base de datos y APIs</li>
                            </ul>
                        </section>
                    </div>
                    <div className="arquitectura_wrapper">
                        <h1 className="arquitectura_title">Arquitectura de GoFight</h1>
                        <section id="arquitectura" className="arquitectura content_block">
                            <div className="arquitectura_header">
                                <h2 className="h2_arquitectura">¿Cual es la arquitectura de GoFight?</h2>
                                <p className="arquitectura_intro">
                                    Un flujo modular entre frontend, backend y base de datos para mantener escalabilidad,
                                    orden y rapidez en el desarrollo.
                                </p>
                            </div>
                            <p className="p_arquitectura">
                                La arquitectura de GoFight se basa en una estructura modular y escalable, con una clara separacion entre frontend y backend. En el frontend, usamos React Native para construir una experiencia movil fluida, mientras que en el backend, Node.js con Express nos permite manejar la logica de negocio y las peticiones de forma eficiente.
                            </p>
                            <p className="p_arquitectura p_arquitectura_secondary">
                                La comunicacion entre cliente y servidor se realiza a traves de endpoints REST que intercambian datos en formato JSON, lo que facilita la integracion y el mantenimiento del proyecto a medida que crece.
                            </p>
                            <div className="arquitectura_image_frame">
                                <img src={aquitectura} alt="Diagrama de arquitectura de GoFight" className="arquitectura_image" />
                            </div>
                        </section>
                    </div>
                    <div className="database_wrapper">
                        <h1 className="database_title">¿Que base de datos usamos en GoFight?</h1>
                        <section id="base-datos" className="database content_block">
                            <div className="database_header">
                                <h2 className="h2_database">Base de datos en GoFight</h2>
                                <p className="database_intro">
                                    En GoFight usamos PostgreSQL como base de datos principal para gestionar informacion de forma relacional, segura y escalable.
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
                                    <h3 className="database_name">PostgreSQL</h3>
                                    <p className="p_database">
                                        PostgreSQL nos permite modelar relaciones entre entidades como usuarios, gamificaciones, sesiones o rutinas, ademas de ejecutar consultas complejas con buen rendimiento.
                                    </p>
                                </div>
                            </article>
                            <p className="p_database">
                                La base de datos se integra con nuestro backend a traves de un ORM, lo que nos permite manejar la logica de acceso a datos de forma mas sencilla y mantenible. Esto nos ayuda a garantizar la integridad de los datos y a optimizar el rendimiento de las consultas, especialmente a medida que el proyecto crece y se añaden nuevas funcionalidades.
                            </p>
                            <p className="p_database p_database_secondary">
                                Ademas, la estructura relacional de la base de datos nos permite establecer conexiones claras entre diferentes tipos de informacion, como usuarios, gamificaciones, sesiones o rutinas  , lo que mejora la experiencia del usuario al ofrecer una navegacion mas fluida y personalizada dentro de la aplicacion.
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
                                    <h2 className="h2_orm">¿Por qué usamos Prisma ORM?</h2>
                                </div>
                                <p className="p_orm">
                                    Prisma ORM es una herramienta moderna que facilita la interacción entre nuestra aplicación y la base de datos PostgreSQL. Nos permite definir modelos de datos de forma sencilla y segura, generando automáticamente consultas eficientes y evitando errores comunes en el acceso a datos.
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
                    <section id="feedback" className="content_block">
                        <Formulario />
                    </section>
               </div>
               
            </section>
        </main>
    )
}
export default Main;