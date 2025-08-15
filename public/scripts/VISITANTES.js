/**
 * VISITANTES.JS
 * Sistema de Inspecciones Preoperativas - Parque del Café
 * Dashboard de Atracciones
 */

// Función para abrir el login de cada atracción
function openLogin(attractionId) {
    // Redirigir a la página de login específica para cada atracción
    window.location.href = `login-${attractionId}.html`;
}

// Función para actualizar el estado de una atracción
function updateAttractionStatus(attractionId, newStatus) {
    const attraction = document.querySelector(`[onclick="openLogin('${attractionId}')"]`);
    if (attraction) {
        const statusElement = attraction.querySelector('.attraction-status');
        
        // Remover clases de estado previas
        statusElement.classList.remove('status-pendiente', 'status-completado', 'status-error');
        
        // Agregar nueva clase y texto según el estado
        switch (newStatus) {
            case 'completado':
                statusElement.classList.add('status-completado');
                statusElement.textContent = 'Completado';
                break;
            case 'error':
                statusElement.classList.add('status-error');
                statusElement.textContent = 'Error';
                break;
            case 'pendiente':
            default:
                statusElement.classList.add('status-pendiente');
                statusElement.textContent = 'Pendiente';
                break;
        }
    }
}

// Función para cargar estados desde localStorage (si existen)
function loadAttractionStates() {
    const attractions = [
        'montana-rusa', 'rueda-fortuna', 'carrusel', 'casa-terror', 'bumper-cars',
        'barcos-piratas', 'tobogan-gigante', 'tren-fantasma', 'laberinto',
        'sillas-voladoras', 'rio-rapidos', 'torre-caida', 'simulador-4d',
        'tirolesa', 'piscina-pelotas'
    ];

    attractions.forEach(attractionId => {
        const savedStatus = localStorage.getItem(`status-${attractionId}`);
        if (savedStatus) {
            updateAttractionStatus(attractionId, savedStatus);
        }
    });
}

// Función para guardar estado en localStorage
function saveAttractionStatus(attractionId, status) {
    localStorage.setItem(`status-${attractionId}`, status);
}

// Animación de entrada para las tarjetas
function animateCards() {
    const cards = document.querySelectorAll('.attraction-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para obtener estadísticas del dashboard
function getDashboardStats() {
    const cards = document.querySelectorAll('.attraction-card');
    let stats = {
        total: cards.length,
        completado: 0,
        pendiente: 0,
        error: 0
    };

    cards.forEach(card => {
        const status = card.querySelector('.attraction-status');
        if (status.classList.contains('status-completado')) {
            stats.completado++;
        } else if (status.classList.contains('status-error')) {
            stats.error++;
        } else {
            stats.pendiente++;
        }
    });

    return stats;
}

// Función para mostrar estadísticas en consola (para debug)
function showStats() {
    const stats = getDashboardStats();
    console.log('📊 Estadísticas del Dashboard:');
    console.log(`Total de atracciones: ${stats.total}`);
    console.log(`✅ Completadas: ${stats.completado}`);
    console.log(`⏳ Pendientes: ${stats.pendiente}`);
    console.log(`❌ Con errores: ${stats.error}`);
    
    return stats;
}

// Función para filtrar atracciones por estado
function filterAttractions(status = 'all') {
    const cards = document.querySelectorAll('.attraction-card');
    
    cards.forEach(card => {
        const cardStatus = card.querySelector('.attraction-status');
        let showCard = false;
        
        switch (status) {
            case 'completado':
                showCard = cardStatus.classList.contains('status-completado');
                break;
            case 'pendiente':
                showCard = cardStatus.classList.contains('status-pendiente');
                break;
            case 'error':
                showCard = cardStatus.classList.contains('status-error');
                break;
            case 'all':
            default:
                showCard = true;
                break;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Función para actualizar la hora actual
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Si existe un elemento para mostrar la hora, lo actualiza
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
    
    return timeString;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estados guardados
    loadAttractionStates();
    
    // Ejecutar animación de entrada
    animateCards();
    
    // Mostrar estadísticas iniciales
    showStats();
    
    // Actualizar hora cada segundo (si existe el elemento)
    setInterval(updateCurrentTime, 1000);
    
    console.log('🎢 Dashboard de Atracciones cargado correctamente');
    console.log('📱 Para ver estadísticas, usa: showStats()');
    console.log('🔍 Para filtrar atracciones, usa: filterAttractions("completado"|"pendiente"|"error"|"all")');
});

// Función para exportar datos (para uso futuro con APIs)
function exportDashboardData() {
    const attractions = [];
    const cards = document.querySelectorAll('.attraction-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.attraction-name').textContent;
        const icon = card.querySelector('.attraction-icon').textContent;
        const statusElement = card.querySelector('.attraction-status');
        let status = 'pendiente';
        
        if (statusElement.classList.contains('status-completado')) {
            status = 'completado';
        } else if (statusElement.classList.contains('status-error')) {
            status = 'error';
        }
        
        const attractionId = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        attractions.push({
            id: attractionId,
            name: name,
            icon: icon,
            status: status,
            lastUpdate: new Date().toISOString()
        });
    });
    
    return {
        timestamp: new Date().toISOString(),
        attractions: attractions,
        stats: getDashboardStats()
    };
}

// Hacer funciones disponibles globalmente para debug
window.showStats = showStats;
window.filterAttractions = filterAttractions;
window.exportDashboardData = exportDashboardData;
window.updateAttractionStatus = updateAttractionStatus;