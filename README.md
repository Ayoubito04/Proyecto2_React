# Proyecto 2 - ReactJS

## GoFight

GoFight es una aplicación web desarrollada con ReactJS como proyecto de práctica para aplicar los conocimientos adquiridos sobre componentes, rutas, hooks, formularios, consumo de APIs, contexto global y diseño responsive.

El proyecto presenta una web informativa sobre una aplicación relacionada con entrenamiento, boxeo y seguimiento de actividad, incluyendo secciones descriptivas, capturas de pantalla, contacto, preguntas frecuentes y opiniones de usuarios.

---

## Tecnologías utilizadas

* ReactJS
* Vite
* JavaScript
* HTML5
* CSS3
* React Router DOM
* LocalStorage
* API externa
* Git y GitHub

---

## Objetivo del proyecto

El objetivo principal del proyecto es construir una aplicación web completa utilizando ReactJS, cumpliendo los requisitos obligatorios establecidos:

* Web full responsive.
* Arquitectura clara y fácil de comprender.
* Mínimo de 3 páginas accesibles mediante `react-router-dom`.
* Uso de estados con sentido dentro de la aplicación.
* Uso de `useEffect` para manejar peticiones de datos.
* Consumo de una API externa.
* Formulario funcional.
* Componentes reutilizables.
* Evitar renderizados innecesarios.
* Uso de al menos un custom hook.
* Uso de `useContext`.

---

## Páginas del proyecto

La aplicación cuenta con varias páginas principales:

### Inicio

Página principal del proyecto, donde se presenta la aplicación GoFight, sus funcionalidades, características principales, tecnologías utilizadas y capturas de pantalla del funcionamiento de la app.

Incluye una navegación lateral mediante `Aside`, que permite moverse entre las diferentes secciones internas de la página de inicio.

### FAQ

Página de preguntas frecuentes donde se resuelven dudas habituales sobre el uso, funcionamiento y características del proyecto.

### Contacto

Página de contacto con información de los integrantes del proyecto. Incluye enlaces a correo electrónico, GitHub y LinkedIn, utilizando iconos personalizados desde la carpeta `assets`.

También incluye un formulario para que los usuarios puedan dejar su opinión y valorar la satisfacción con el servicio del 1 al 5.

---

## Funcionalidades principales

* Navegación entre páginas con React Router DOM.
* Transiciones visuales al cambiar de página.
* Aside de navegación interna en la página de inicio.
* Footer ubicado al final de la página.
* Sección de capturas de pantalla de la aplicación.
* Página de contacto con columnas diferenciadas por integrante.
* Iconos personalizados para GitHub, LinkedIn y correo electrónico.
* Imagen personalizada en la sección de contacto.
* Formulario de opiniones.
* Selector de satisfacción del 1 al 5.
* Guardado de opiniones en `localStorage`.
* Visualización de opiniones enviadas.
* Diseño responsive adaptado a ordenador, tablet y móvil.
* Consumo de API externa mediante `useEffect`.

---

## Estructura del proyecto

```txt
src/
│
├── assets/
│   ├── imágenes
│   ├── iconos
│   └── capturas
│
├── components/
│   ├── Aside/
│   ├── Buttons/
│   ├── Footer/
│   ├── Header/
│   ├── Formulario/
│   └── Main/
│
├── pages/
│   ├── Contactos/
│   ├── FAQ/
│   └── Inicio/
│
├── context/
│   └── contexto global
│
├── hooks/
│   └── custom hooks
│
├── navigation/
│   └── rutas de la aplicación
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Instalación y ejecución

Para ejecutar el proyecto en local, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar en la carpeta del proyecto

```bash
cd proyecto2_react
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir en el navegador

Normalmente estará disponible en:

```txt
http://localhost:5173/
```

---

## Variables de entorno

El proyecto utiliza una API externa, por lo que puede ser necesario crear un archivo `.env` en la raíz del proyecto.

Hay un ejemplo de uso del .env en el `.env.example`

El archivo `.env` no debe subirse al repositorio. Para ello, debe estar incluido en el `.gitignore`.

---

## Scripts disponibles

### Ejecutar en desarrollo

```bash
npm run dev
```

### Generar build de producción

```bash
npm run build
```

### Previsualizar build

```bash
npm run preview
```

---

## Requisitos cumplidos

### Web full responsive

El diseño se adapta a diferentes tamaños de pantalla mediante CSS responsive y media queries.

### React Router DOM

Se utiliza `react-router-dom` para navegar entre diferentes páginas:

* Inicio
* FAQ
* Contacto

### Estados

La aplicación utiliza estados para manejar diferentes funcionalidades, como formularios, opiniones, valoraciones, datos obtenidos de la API y comportamiento visual de algunos componentes.

### useEffect

Se utiliza `useEffect` para gestionar peticiones de datos y otros comportamientos asociados al ciclo de vida de los componentes.

### API externa

El proyecto consume datos desde una API externa para mostrar contenido dinámico dentro de la aplicación.

### Formulario

La página de contacto incluye un formulario funcional para enviar opiniones.

### LocalStorage

Las opiniones enviadas por los usuarios se guardan en `localStorage`, permitiendo mantener los datos aunque se recargue la página.

### Componentes reutilizables

El proyecto está organizado en componentes reutilizables para mejorar la claridad, mantenimiento y escalabilidad del código.

### Custom hook

Se utiliza al menos un custom hook para separar lógica reutilizable de los componentes.

### useContext

El proyecto utiliza contexto global mediante `useContext` para compartir información entre componentes cuando es necesario.

---

## Diseño

La aplicación cuenta con una estética visual moderna basada en:

* Tonalidades oscuras.
* Colores rojos como acento principal.
* Tarjetas con bordes y efectos visuales.
* Botones interactivos.
* Transiciones suaves entre páginas.
* Diseño responsive.
* Imágenes y capturas integradas en la interfaz.

---

## Integrantes

* Ayoub
* Mario

---

## Autoría

Proyecto desarrollado como parte de la formación en ReactJS.
