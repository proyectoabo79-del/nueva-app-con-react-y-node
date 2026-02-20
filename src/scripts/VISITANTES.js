/**
 * VISITANTES.JS
 * Sistema de Inspecciones Preoperativas - Parque del Café
 * Dashboard de Atracciones - Versión Mejorada
 */

// Función para navegar a cada atracción específica
function navigateToAttraction(attractionId) {
    console.log(`Navegando a la atracción: ${attractionId}`);
    
    // Aquí puedes definir diferentes acciones según la atracción
    switch(attractionId) {
        case 'montana-rusa':
            window.location.href = `inspection-montana-rusa.html`;
            break;
        case 'rueda-fortuna':
            window.location.href = `inspection-rueda-fortuna.html`;
            break;
        case 'carrusel':
            window.location.href = `inspection-carrusel.html`;
            break;
        case 'casa-terror':
            window.location.href = `inspection-casa-terror.html`;
            break;
        case 'bumper-cars':
            window.location.href = `inspection-bumper-cars.html`;
            break;
        case 'barcos-piratas':
            window.location.href = `inspection-barcos-piratas.html`;
            break;
        case 'tobogan-gigante':
            window.location.href = `inspection-tobogan-gigante.html`;
            break;
        case 'tren-fantasma':
            window.location.href = `inspection-tren-fantasma.html`;
            break;
        case 'laberinto':
            window.location.href = `inspection-laberinto.html`;
            break;
        case 'sillas-voladoras':
            window.location.href = `inspection-sillas-voladoras.html`;
            break;
        case 'rio-rapidos':
            window.location.href = `inspection-rio-rapidos.html`;
            break;
        case 'torre-caida':
            window.location.href = `inspection-torre-caida.html`;
            break;
        case 'simulador-4d':
            window.location.href = `inspection-simulador-4d.html`;
            break;
        case 'tirolesa':
            window.location.href = `inspection-tirolesa.html`;
            break;
        case 'piscina-pelotas':
            window.location.href = `inspection-piscina-pelotas.html`;
            break;
        default:
            // Página genérica de inspección
            window.location.href = `inspection-generic.html?attraction=${attractionId}`;
            break;
    }
}

// Función para regresar a la página anterior
function goBack() {
    console.log('Regresando a la página anterior');
    
    // Verificar si hay historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Si no hay historial, ir a la página principal
        window.location.href = 'index.html';
    }
}

// Función para crear nueva solicitud
function newRequest() {
    console.log('Creando nueva solicitud');
    
    // Redirigir a la página de nueva solicitud
    window.location.href = 'nueva-solicitud.html';
    
    // Alternativa: Mostrar modal de confirmación
    // showNewRequestModal();
}

// Función para mostrar modal de nueva solicitud (opcional)
function showNewRequestModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Nueva Solicitud</h2>
            <p>¿Desea crear una nueva solicitud de inspección?</p>
            <div class="modal-buttons">
                <button onclick="confirmNewRequest()" class="btn-confirm">Sí, crear</button>
                <button onclick="closeModal()" class="btn-cancel">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Función para confirmar nueva solicitud
function confirmNewRequest() {
    closeModal();
    window.location.href = 'nueva-solicitud.html';
}

// Función para cerrar modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Función para actualizar el estado de una atracción
function updateAttractionStatus(attractionId, newStatus) {
    const attraction = document.querySelector(`[onclick*="'${attractionId}'"]`);
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
        
        // Guardar el estado
        saveAttractionStatus(attractionId, newStatus);
    }
}

// Función para cargar estados desde localStorage
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
    localStorage.setItem(`last-update-${attractionId}`, new Date().toISOString());
}

// Animación de entrada para las tarjetas mejorada
function animateCards() {
    const cards = document.querySelectorAll('.attraction-card');
    const navButtons = document.querySelectorAll('.nav-button');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('animate');
        }, index * 100);
    });
    
    // Animar botones de navegación
    navButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
            button.classList.add('animate');
        }, (cards.length * 100) + (index * 200));
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

// Función para mostrar estadísticas en consola
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
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
    
    return timeString;
}

// Función para exportar datos del dashboard
function exportDashboardData() {
    const attractions = [];
    const cards = document.querySelectorAll('.attraction-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.attraction-name a').textContent;
        const icon = card.querySelector('.attraction-icon').textContent;
        const statusElement = card.querySelector('.attraction-status');
        let status = 'pendiente';
        
        if (statusElement.classList.contains('status-completado')) {
            status = 'completado';
        } else if (statusElement.classList.contains('status-error')) {
            status = 'error';
        }
        
        const onclickAttr = card.getAttribute('onclick');
        const attractionId = onclickAttr.match(/'([^']+)'/)[1];
        
        attractions.push({
            id: attractionId,
            name: name.trim(),
            icon: icon,
            status: status,
            lastUpdate: localStorage.getItem(`last-update-${attractionId}`) || new Date().toISOString()
        });
    });
    
    return {
        timestamp: new Date().toISOString(),
        attractions: attractions,
        stats: getDashboardStats()
    };
}

// Función para búsqueda de atracciones
function searchAttractions(query) {
    const cards = document.querySelectorAll('.attraction-card');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const name = card.querySelector('.attraction-name a').textContent.toLowerCase();
        const isMatch = name.includes(searchTerm);
        card.style.display = isMatch ? 'block' : 'none';
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estados guardados
    loadAttractionStates();
    
    // Ejecutar animación de entrada
    setTimeout(animateCards, 100);
    
    // Mostrar estadísticas iniciales
    showStats();
    
    // Actualizar hora cada segundo
    setInterval(updateCurrentTime, 1000);
    
    // Agregar eventos de teclado para navegación
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goBack();
        }
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            newRequest();
        }
    });
    
    console.log('🎢 Dashboard de Atracciones cargado correctamente');
    console.log('📱 Funciones disponibles:');
    console.log('  - showStats(): Ver estadísticas');
    console.log('  - filterAttractions("status"): Filtrar por estado');
    console.log('  - searchAttractions("término"): Buscar atracciones');
    console.log('  - exportDashboardData(): Exportar datos');
    console.log('⌨️ Atajos de teclado:');
    console.log('  - Escape: Regresar');
    console.log('  - Ctrl+N: Nueva solicitud');
});

// Hacer funciones disponibles globalmente
window.navigateToAttraction = navigateToAttraction;
window.goBack = goBack;
window.newRequest = newRequest;
window.showStats = showStats;
window.filterAttractions = filterAttractions;
window.exportDashboardData = exportDashboardData;
window.updateAttractionStatus = updateAttractionStatus;
window.searchAttractions = searchAttractions;