import "./Aside.css";

const Aside = () => {
  return (
    <aside className="home_aside" aria-label="Navegación de la página de inicio">
      <p className="aside_title">Navegación</p>
      <nav className="aside_sections" aria-label="Secciones de la página inicio">
        <a href="#header_section" className="aside_section_link">Inicio</a>
        <a href="#resumen" className="aside_section_link">Resumen</a>
        <a href="#funcionalidades" className="aside_section_link">Funcionalidades</a>
        <a href="#gamificacion" className="aside_section_link">Gamificación</a>
        <a href="#lenguajes" className="aside_section_link">Lenguajes</a>
        <a href="#frameworks" className="aside_section_link">Frameworks</a>
        <a href="#apis" className="aside_section_link">APIs</a>
        <a href="#servidores" className="aside_section_link">Servidores</a>
        <a href="#seguridad" className="aside_section_link">Seguridad</a>
        <a href="#arquitectura" className="aside_section_link">Arquitectura</a>
        <a href="#base-datos" className="aside_section_link">Base de datos</a>
        <a href="#screenshots" className="aside_section_link">Screenshots</a>
        <a href="#descarga" className="aside_section_link aside_section_link_cta">Descarga</a>
      </nav>
    </aside>
  );
};

export default Aside;
