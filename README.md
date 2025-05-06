# `F1046` Portfolio Personal

## Descripción

Este es mi portfolio personal, un sitio web creado para mostrar mis proyectos, habilidades y experiencia en el desarrollo web. Incluye secciones sobre mí, una galería de proyectos y un formulario de contacto funcional. El sitio está diseñado para ser responsive y visualmente agradable.

## Tecnologías Utilizadas

* **HTML5:** Para la estructura semántica del contenido.
* **CSS3:** Para el diseño, estilos y layout responsive.
  * **Flexbox:** Utilizado para la alineación en el header, navegación y otros componentes.
  * **Grid Layout:** Utilizado para la disposición de la galería de proyectos.
* **JavaScript (ES6+):** Para la interactividad, incluyendo:
  * Validación de formulario de contacto en tiempo real.
  * Deshabilitación del botón de envío si el formulario no es válido.
  * Efecto de aparición suave (fade-in) en elementos al hacer scroll (usando Intersection Observer API).
  * Actualización dinámica del año en el footer.

## Despliegue

Este sitio está listo para ser desplegado fácilmente en plataformas como:

* **GitHub Pages:**
    1. Crea un repositorio en GitHub (público).
    2. Sube los archivos (`index.html`, `style.css`, `script.js`, `README.md`).
    3. Ve a la pestaña "Settings" del repositorio.
    4. En la sección "Pages" (a la izquierda), selecciona la rama (`main` o `master`) como fuente y haz clic en "Save".
    5. Tu sitio estará disponible en `https://tu-usuario.github.io/nombre-repositorio/`.

* **Vercel:**
    1. Regístrate o inicia sesión en [Vercel](https://vercel.com/).
    2. Conecta tu cuenta de GitHub, GitLab o Bitbucket.
    3. Importa el repositorio de tu portfolio.
    4. Vercel detectará automáticamente que es un proyecto estático (HTML/CSS/JS).
    5. Haz clic en "Deploy". Vercel te proporcionará una URL pública.
