// Boton de descarga de la APK de GoFight.
// El enlace vive solo aqui, asi que si cambia la build de Expo se toca un unico sitio.
import "./Button.css";

export const DOWNLOAD_URL =
    "https://expo.dev/accounts/ayoubito04/projects/frontend/builds/a64b0784-6371-4574-854c-6dbde7a616ca";

const DownloadIcon = () => (
    <svg className="btn_icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
            d="M12 3v10m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// size: "sm" para la barra de navegacion, "lg" para las llamadas a la accion destacadas
const DownloadButton = ({ children = "Descarga", size = "md", className = "" }) => {
    return (
        <a
            className={`btn btn_download btn_${size} ${className}`.trim()}
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Descargar la APK de GoFight desde Expo"
        >
            <DownloadIcon />
            <span>{children}</span>
        </a>
    );
};

export default DownloadButton;
