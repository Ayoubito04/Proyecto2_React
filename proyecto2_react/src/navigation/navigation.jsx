// Aquí vamos a definir la navegación de nuestro portafolio
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "../App";
import FAQ from "../pages/FAQ/FAQ";
import Contacto from "../pages/Contactos/Contacto";

function AnimatedRoutes() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname]);

    return (
        <div className="page-transition" key={location.pathname}>
            <Routes location={location}>
                <Route path="/" element={<App />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contacto" element={<Contacto />} />
            </Routes>
        </div>
    );
}

export default function Navigation() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}
