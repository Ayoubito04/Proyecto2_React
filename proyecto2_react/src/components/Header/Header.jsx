//Aquí vamos a meter la estructura del header

import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    //Vamos a incluir un menu hamburrgesa dentro del header
    const [isOpen, setisOpen] = useState(false);//Principalmente usamos useState,para definir el estado,que después se renderizará o se cargará,este estado puede cargarse en un componente,eliminando la necedsidad de operacxiones CRUD complejas

    //UseState poir lo general se usa para definir el estado de un componente,que después se renderizará
    const handleMenu = () => {
        setisOpen(!isOpen);
        //Aquí vamos a incluir la lógica para abrir y cerrar el menu hamburrgesa
    }

    const closeMenu = () => {
        setisOpen(false);
    }

    return (
        <header>
            <div className="header-brand">
                <h1>Portafolio de GoFight</h1>
                <p>Hecho por Ayoub y Mario</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/faq" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                            FAQ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacto" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                            Contacto
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="menu-hamburguesa" onClick={handleMenu}>
                <div className={`linea ${isOpen ? "open" : ""}`}></div>
                <div className={`linea ${isOpen ? "open" : ""}`}></div>
                <div className={`linea ${isOpen ? "open" : ""}`}></div>
            </div>
        </header>
    )
}
export default Header;
