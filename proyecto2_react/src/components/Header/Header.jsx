//Aquí vamos a meter la estructura del header
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DownloadButton from "../Buttons/DownloadButton";
import logoGoFight from "../../assets/GF Boxing Pulse Logo.png";
import "./Header.css";

const links = [
    { to: "/", label: "Inicio" },
    { to: "/faq", label: "FAQ" },
    { to: "/contacto", label: "Contacto" },
];

const Header = () => {
    //Vamos a incluir un menu hamburguesa dentro del header
    const [isOpen, setisOpen] = useState(false);
    //Cuando el usuario baja, compactamos el header y le damos fondo solido
    const [isScrolled, setIsScrolled] = useState(false);
    //Porcentaje de pagina leido, se pinta como una linea fina bajo el header
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const scrollable = document.body.scrollHeight - window.innerHeight;

            setIsScrolled(scrolled > 12);
            setProgress(scrollable > 0 ? Math.min(scrolled / scrollable, 1) * 100 : 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const handleMenu = () => {
        setisOpen(!isOpen);
    };

    const closeMenu = () => {
        setisOpen(false);
    };

    return (
        <header className={`site_header ${isScrolled ? "is_scrolled" : ""} ${isOpen ? "is_open" : ""}`}>
            <div className="header_inner">
                <NavLink to="/" className="header_brand" onClick={closeMenu}>
                    <img src={logoGoFight} alt="Logo de GoFight" className="header_logo" />
                    <span className="header_brand_text">
                        <span className="header_brand_name">GoFight</span>
                        <span className="header_brand_sub">Portafolio del proyecto</span>
                    </span>
                </NavLink>

                <nav className="header_nav" aria-label="Navegación principal">
                    <ul>
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    onClick={closeMenu}
                                    end={link.to === "/"}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header_actions">
                    <DownloadButton size="sm" className="header_download" />
                    <button
                        type="button"
                        className="menu-hamburguesa"
                        onClick={handleMenu}
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isOpen}
                    >
                        <span className={`linea ${isOpen ? "open" : ""}`} />
                        <span className={`linea ${isOpen ? "open" : ""}`} />
                        <span className={`linea ${isOpen ? "open" : ""}`} />
                    </button>
                </div>
            </div>

            <div className="header_progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
            </div>
        </header>
    );
};

export default Header;
