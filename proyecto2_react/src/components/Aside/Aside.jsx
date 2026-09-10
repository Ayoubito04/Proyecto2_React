import { useMemo } from "react";
import useScrollSpy from "../../hooks/useScrollSpy";
import "./Aside.css";

const sections = [
  { id: "header_section", label: "Inicio" },
  { id: "resumen", label: "Resumen" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "gamificacion", label: "Gamificación" },
  { id: "lenguajes", label: "Lenguajes" },
  { id: "frameworks", label: "Frameworks" },
  { id: "apis", label: "APIs" },
  { id: "servidores", label: "Servidores" },
  { id: "seguridad", label: "Seguridad" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "base-datos", label: "Base de datos" },
  { id: "screenshots", label: "Capturas" },
  { id: "descarga", label: "Descarga" },
];

const Aside = () => {
  const ids = useMemo(() => sections.map((section) => section.id), []);
  const activeId = useScrollSpy(ids);
  const activeIndex = Math.max(ids.indexOf(activeId), 0);

  return (
    <aside className="home_aside" aria-label="Navegación de la página de inicio">
      <p className="aside_title">
        Índice
        <span className="aside_counter">
          {String(activeIndex + 1).padStart(2, "0")}/{sections.length}
        </span>
      </p>

      <nav className="aside_sections" aria-label="Secciones de la página inicio">
        {/* Raíl vertical que se rellena según se avanza por la página */}
        <span className="aside_rail" aria-hidden="true">
          <span
            className="aside_rail_fill"
            style={{ height: `${((activeIndex + 1) / sections.length) * 100}%` }}
          />
        </span>

        {sections.map((section) => {
          const isActive = section.id === activeId;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`aside_section_link ${isActive ? "is_active" : ""} ${
                section.id === "descarga" ? "aside_section_link_cta" : ""
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="aside_dot" aria-hidden="true" />
              {section.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
