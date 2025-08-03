// Obtener elementos del DOM
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Función para alternar el menú
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Event listener para el botón hamburguesa
hamburger.addEventListener('click', toggleMenu);

// Cerrar menú cuando se hace click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Cerrar menú cuando se hace click fuera de él
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Cerrar menú con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});