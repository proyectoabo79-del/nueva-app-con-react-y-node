// Datos de las atracciones (simula datos de la base de datos)
const attractions = [
    { id: 1, name: 'Montaña Rusa', status: 'Pendiente' },
    { id: 2, name: 'Rueda de la Fortuna', status: 'Pendiente' },
    { id: 3, name: 'Carrusel Mágico', status: 'Completado' },
    { id: 4, name: 'Casa del Terror', status: 'Pendiente' },
    { id: 5, name: 'Carros Chocones', status: 'Error' },
    { id: 6, name: 'Barcos Piratas', status: 'Pendiente' },
    { id: 7, name: 'Tobogán Gigante', status: 'Completado' },
    { id: 8, name: 'Tren Fantasma', status: 'Pendiente' },
    { id: 9, name: 'Laberinto de Maíz', status: 'Pendiente' },
    { id: 10, name: 'Sillas Voladoras', status: 'Completado' },
    { id: 11, name: 'Río de Rápidos', status: 'Pendiente' },
    { id: 12, name: 'Torre de Caída', status: 'Error' },
    { id: 13, name: 'Simulador 4D', status: 'Pendiente' },
    { id: 14, name: 'Tirolesa Extrema', status: 'Completado' },
    { id: 15, name: 'Piscina de Pelotas', status: 'Pendiente' }
];

let selectedAttraction = null;

// Elementos del DOM
const searchInput = document.getElementById('attractionSearch');
const searchResults = document.getElementById('attractionResults');
const inspectionForm = document.getElementById('inspectionForm');
const formTitle = document.getElementById('selectedAttractionTitle');
const inspectionFormData = document.getElementById('inspectionFormData');
const loading = document.getElementById('loading');
const messageDiv = document.getElementById('message');

// Event listeners
searchInput.addEventListener('input', handleSearch);
inspectionFormData.addEventListener('submit', handleFormSubmit);

// Establecer fecha actual por defecto
document.getElementById('inspectionDate').value = new Date().toISOString().split('T')[0];

// Función para manejar la búsqueda
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const filteredAttractions = attractions.filter(attraction =>
        attraction.name.toLowerCase().includes(query)
    );
    
    displaySearchResults(filteredAttractions);
}

// Función para mostrar los resultados de búsqueda
function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: #666;">No se encontraron atracciones</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    results.forEach(attraction => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <div style="flex: 1;">
                <strong>${attraction.name}</strong>
            </div>
            <div class="search-result-status status-${attraction.status.toLowerCase()}">
                ${attraction.status}
            </div>
        `;
        
        item.addEventListener('click', () => selectAttraction(attraction));
        searchResults.appendChild(item);
    });
    
    searchResults.style.display = 'block';
}

// Función para seleccionar una atracción
function selectAttraction(attraction) {
    selectedAttraction = attraction;
    searchInput.value = attraction.name;
    searchResults.style.display = 'none';
    
    formTitle.textContent = `Formulario de Inspección - ${attraction.name}`;
    inspectionForm.style.display = 'block';
    
    // Scroll to form
    inspectionForm.scrollIntoView({ behavior: 'smooth' });
}

// Función para manejar el envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!selectedAttraction) {
        showMessage('Por favor selecciona una atracción', 'error');
        return;
    }
    
    const formData = new FormData(inspectionFormData);
    
    // Recopilar datos de checkboxes
    const safetyChecks = Array.from(document.querySelectorAll('input[name="safetyChecks"]:checked'))
        .map(cb => cb.value);
    const mechanicalChecks = Array.from(document.querySelectorAll('input[name="mechanicalChecks"]:checked'))
        .map(cb => cb.value);
    
    // Crear objeto de datos para enviar
    const inspectionData = {
        attractionId: selectedAttraction.id,
        attractionName: selectedAttraction.name,
        inspectionDate: formData.get('inspectionDate'),
        inspector: formData.get('inspector'),
        shift: formData.get('shift'),
        generalCondition: formData.get('generalCondition'),
        safetyChecks: safetyChecks,
        mechanicalChecks: mechanicalChecks,
        observations: formData.get('observations'),
        finalStatus: formData.get('finalStatus'),
        createdAt: new Date().toISOString()
    };
    
    try {
        loading.style.display = 'block';
        messageDiv.style.display = 'none';
        
        // Simular envío a la base de datos
        await saveInspection(inspectionData);
        
        showMessage('Inspección guardada exitosamente', 'success');
        resetForm();
        
    } catch (error) {
        console.error('Error al guardar la inspección:', error);
        showMessage('Error al guardar la inspección. Por favor intenta de nuevo.', 'error');
    } finally {
        loading.style.display = 'none';
    }
}

// Función para simular el guardado en la base de datos
async function saveInspection(data) {
    // En un entorno real, aquí harías la llamada a tu API
    // Para React y Vercel, usarías algo como:
    
    /*
    const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Error en el servidor');
    }
    
    return await response.json();
    */
    
    // Simulación de guardado
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Datos que se enviarían a la base de datos:', data);
            
            // Simular éxito o error aleatoriamente
            if (Math.random() > 0.1) {
                resolve({ success: true, id: Date.now() });
            } else {
                reject(new Error('Error simulado de base de datos'));
            }
        }, 2000);
    });
}

// Función para mostrar mensajes
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Scroll al mensaje
    messageDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Auto ocultar después de 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Función para cancelar el formulario
function cancelForm() {
    if (confirm('¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados.')) {
        resetForm();
    }
}

// Función para resetear el formulario
function resetForm() {
    inspectionFormData.reset();
    inspectionForm.style.display = 'none';
    searchInput.value = '';
    selectedAttraction = null;
    document.getElementById('inspectionDate').value = new Date().toISOString().split('T')[0];
}

// Cerrar resultados de búsqueda al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Configuración para React/Vercel - API Route
// Crear archivo: /pages/api/inspections.js

/*
// pages/api/inspections.js
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        const {
            attractionId,
            attractionName,
            inspectionDate,
            inspector,
            shift,
            generalCondition,
            safetyChecks,
            mechanicalChecks,
            observations,
            finalStatus
        } = req.body;

        const query = `
            INSERT INTO inspections (
                attraction_id,
                attraction_name,
                inspection_date,
                inspector,
                shift,
                general_condition,
                safety_checks,
                mechanical_checks,
                observations,
                final_status,
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const values = [
            attractionId,
            attractionName,
            inspectionDate,
            inspector,
            shift,
            generalCondition,
            JSON.stringify(safetyChecks),
            JSON.stringify(mechanicalChecks),
            observations,
            finalStatus
        ];

        const [result] = await connection.execute(query, values);
        await connection.end();

        res.status(200).json({ 
            success: true, 
            id: result.insertId,
            message: 'Inspección guardada exitosamente'
        });

    } catch (error) {
        console.error('Error de base de datos:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor' 
        });
    }
}
*/

// Esquema SQL para crear la tabla en MySQL
/*
CREATE TABLE inspections (
    i