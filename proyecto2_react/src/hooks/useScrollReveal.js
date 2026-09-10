import { useEffect } from "react";

// Hace aparecer con un fundido los elementos marcados con [data-reveal].
// Se observa una sola vez por elemento: cuando entra en pantalla se le marca
// y se deja de vigilar, asi el scroll no carga de trabajo al navegador.
//
// Importante: la marca es el atributo data-revealed y NO una clase. El
// className de estos elementos lo controla React, asi que al re-renderizar
// (por ejemplo al abrir una pregunta del FAQ) reescribe el atributo entero y
// se llevaria por delante cualquier clase que hubieramos anadido a mano,
// dejando el bloque en opacity: 0 para siempre. React no toca data-revealed
// porque no forma parte de sus props.
const useScrollReveal = () => {
    useEffect(() => {
        const elements = document.querySelectorAll("[data-reveal]:not([data-revealed])");

        if (elements.length === 0) {
            return;
        }

        const reveal = (element) => element.setAttribute("data-revealed", "");

        // Si el navegador no soporta IntersectionObserver, mostramos todo tal cual
        if (typeof IntersectionObserver === "undefined") {
            elements.forEach(reveal);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        reveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            // threshold 0: basta con que asome. Con un umbral por porcentaje un
            // bloque mucho mas alto que la ventana no llegaria a alcanzarlo nunca.
            { rootMargin: "0px 0px -12% 0px", threshold: 0 }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal;
