import { useEffect, useState } from "react";

// Devuelve el id de la seccion que se esta viendo ahora mismo.
// Lo usa el Aside para marcar el enlace activo mientras se navega.
const useScrollSpy = (ids, offset = 140) => {
    const [activeId, setActiveId] = useState(ids[0] ?? "");

    useEffect(() => {
        const handleScroll = () => {
            // Al llegar al final de la pagina damos por activa la ultima seccion,
            // porque puede no llegar nunca a la linea de deteccion
            const scrollBottom = window.scrollY + window.innerHeight;
            if (scrollBottom >= document.body.scrollHeight - 8) {
                setActiveId(ids[ids.length - 1]);
                return;
            }

            let current = ids[0];

            ids.forEach((id) => {
                const section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= offset) {
                    current = id;
                }
            });

            setActiveId(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [ids, offset]);

    return activeId;
};

export default useScrollSpy;
