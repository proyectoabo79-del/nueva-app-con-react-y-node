# Sistema de Inspección Preoperacional para el Parque del Café

## Descripción general

El sistema de inspección preoperacional está diseñado para facilitar y racionalizar los procesos de inspección en el Parque del Café. Esta aplicación web ofrece un tablero interactivo para gestionar inspecciones, visualizar estadísticas en tiempo real y administrar datos de visitantes. El objetivo principal es mejorar la eficiencia y trazabilidad de las inspecciones previas a la operación de los activos y áreas del parque.

## Proyectos del Sistema

Este sistema cuenta con dos implementaciones complementarias:

### 1. Versión HTML/CSS/JS (Proyecto Base)
- **Repositorio**: [proyecto-productivo](https://github.com/proyectoabo79-del/proyecto-productivo.git)
- **Tecnologías**: HTML5, CSS3, JavaScript vanilla
- **Enfoque**: Prototipo inicial y versión básica

### 2. Versión React + Node.js (Versión Avanzada)
- **Repositorio**: [nueva-app-con-react-y-node](https://github.com/proyectoabo79-del/nueva-app-con-react-y-node.git)
- **Tecnologías**: React.js, Node.js, Create React App
- **Enfoque**: Aplicación full-stack moderna

## Estructura del proyecto

### Versión HTML/CSS/JS
```
sistema-inspeccion-preoperacional/
├── src/
│   ├── index.html         # Documento HTML principal de la aplicación
│   ├── styles/
│   │   └── main.css       # Hojas de estilo CSS
│   ├── scripts/
│   │   └── app.js         # Código JavaScript para la funcionalidad de la aplicación
│   └── activos/
│       └── favicon.ico    # Icono de la aplicación
├── package.json           # Archivo de configuración de dependencias (npm)
└── README.md              # Documentación del proyecto
```

### Versión React + Node.js
```
nueva-app-con-react-y-node/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas principales de la aplicación
│   ├── styles/           # Archivos CSS y estilos
│   ├── assets/           # Recursos estáticos (imágenes, iconos)
│   ├── utils/            # Funciones de utilidad
│   ├── App.js            # Componente principal
│   └── index.js          # Punto de entrada de la aplicación
├── package.json
└── README.md
```

## Instalación

### Para la versión HTML/CSS/JS

1. Clona el repositorio:

   ```bash
   git clone https://github.com/proyectoabo79-del/proyecto-productivo.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd proyecto-productivo
   ```

3. Instala las dependencias necesarias (si se requiere Node.js/NPM):

   ```bash
   npm install
   ```

### Para la versión React + Node.js

1. Clona el repositorio:

   ```bash
   git clone https://github.com/proyectoabo79-del/nueva-app-con-react-y-node.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd nueva-app-con-react-y-node
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## Uso

### Versión HTML/CSS/JS
- Abre `src/index.html` en un navegador web para acceder a la aplicación.
- El tablero muestra estadísticas en tiempo real relacionadas con inspecciones y datos de visitantes.
- Utiliza los botones de acción para iniciar nuevas inspecciones o solicitudes.

### Versión React + Node.js

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

#### `npm start`
Ejecuta la aplicación en modo de desarrollo.

Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando hagas cambios y también podrás ver cualquier error de lint en la consola.

#### `npm test`
Inicia el ejecutor de pruebas en modo interactivo.

#### `npm run build`
Construye la aplicación para producción en la carpeta `build`.

Empaqueta correctamente React en modo de producción y optimiza la construcción para el mejor rendimiento.

#### `npm run eject`
**Nota**: esta es una operación de un solo sentido. Una vez que hagas `eject`, ¡no puedes volver atrás!

## Características

- **Tablero interactivo** con estadísticas en tiempo real
- **Diseño responsivo** para dispositivos móviles y escritorio
- **Visualización de números animados** para datos dinámicos
- **Alternancia de tema claro/oscuro** según preferencia del usuario
- **Gestión centralizada** de inspecciones y generación de reportes
- **Administración de datos** de visitantes
- **Navegación intuitiva** entre diferentes secciones

## Funcionalidades específicas

- Ejecuta `npm start` para iniciar el servidor de desarrollo
- El tablero muestra estadísticas en tiempo real relacionadas con inspecciones y datos de visitantes
- Utiliza los botones de acción para iniciar nuevas inspecciones o solicitudes
- Navega entre las diferentes secciones usando el menú de navegación

## Tecnologías utilizadas

### Versión básica
- HTML5
- CSS3
- JavaScript (Vanilla)

### Versión avanzada
- React.js
- Node.js
- Create React App
- CSS3/SCSS
- JavaScript ES6+

## Contribuciones

¡Las contribuciones son bienvenidas! Puedes:

- Hacer fork del proyecto
- Crear una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
- Commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
- Push a la rama (`git push origin feature/NuevaCaracteristica`)
- Abrir un Pull Request

También puedes abrir un issue para sugerir mejoras o reportar errores.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Autor

[@proyectoabo79-del](https://github.com/proyectoabo79-del) - Parque del Café

## Repositorios

- [Versión HTML/CSS/JS](https://github.com/proyectoabo79-del/proyecto-productivo.git)
- [Versión React + Node.js](https://github.com/proyectoabo79-del/nueva-app-con-react-y-node.git)