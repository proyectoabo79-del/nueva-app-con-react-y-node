// Variables globales
let allRows = [];
let searchTimeout;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Obtener elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const tableFilter = document.getElementById('tableFilter');
    const downloadPDFBtn = document.getElementById('downloadPDF');
    const exportExcelBtn = document.getElementById('exportExcel');
    const refreshDataBtn = document.getElementById('refreshData');

    // Verificar que los elementos existen
    if (!searchInput || !downloadPDFBtn) {
        console.error('Elementos requeridos no encontrados');
        return;
    }

    // Recopilar todas las filas de las tablas
    collectAllRows();

    // Event listeners para búsqueda
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }

    if (tableFilter) {
        tableFilter.addEventListener('change', performSearch);
    }

    // Event listeners para botones
    downloadPDFBtn.addEventListener('click', generatePDF);

    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', exportToCSV);
    }

    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', refreshData);
    }

    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            clearSearch();
        }
    });
}

// Recopilar todas las filas de las tablas
function collectAllRows() {
    allRows = [];
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const tableId = table.id || 'unknown';
        const tbody = table.querySelector('tbody');
        
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
                allRows.push({
                    element: row,
                    tableId: tableId,
                    text: row.textContent.toLowerCase()
                });
            });
        }
    });
}

// Función principal de búsqueda
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const tableFilter = document.getElementById('tableFilter');
    const searchResults = document.getElementById('searchResults');
    const resultsText = document.getElementById('resultsText');
    const noResults = document.getElementById('noResults');
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedTable = tableFilter ? tableFilter.value : 'all';
    
    // Si no hay término de búsqueda, mostrar todo
    if (!searchTerm) {
        showAllRows();
        hideElement(searchResults);
        hideElement(noResults);
        return;
    }

    // Ocultar todas las filas
    hideAllRows();
    
    let matchCount = 0;
    
    // Buscar coincidencias
    allRows.forEach(row => {
        const matchesSearch = row.text.includes(searchTerm);
        const matchesTable = selectedTable === 'all' || row.tableId === selectedTable;
        
        if (matchesSearch && matchesTable) {
            row.element.classList.remove('hidden-row');
            highlightText(row.element, searchTerm);
            matchCount++;
        }
    });
    
    // Mostrar resultados
    if (matchCount > 0) {
        if (searchResults && resultsText) {
            resultsText.textContent = `Se encontraron ${matchCount} resultado${matchCount !== 1 ? 's' : ''} para "${searchInput.value}"`;
            showElement(searchResults);
        }
        hideElement(noResults);
    } else {
        showElement(noResults);
        hideElement(searchResults);
    }
}

// Ocultar todas las filas
function hideAllRows() {
    allRows.forEach(row => {
        row.element.classList.add('hidden-row');
        removeHighlights(row.element);
    });
}

// Mostrar todas las filas
function showAllRows() {
    allRows.forEach(row => {
        row.element.classList.remove('hidden-row');
        removeHighlights(row.element);
    });
}

// Resaltar texto de búsqueda
function highlightText(row, searchTerm) {
    const cells = row.querySelectorAll('td');
    cells.forEach(cell => {
        const originalText = cell.textContent;
        if (originalText.toLowerCase().includes(searchTerm)) {
            const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
            cell.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        }
    });
}

// Quitar resaltados
function removeHighlights(row) {
    const highlights = row.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Escapar caracteres especiales para regex
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Limpiar búsqueda
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const tableFilter = document.getElementById('tableFilter');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    
    searchInput.value = '';
    if (tableFilter) tableFilter.value = 'all';
    
    showAllRows();
    hideElement(searchResults);
    hideElement(noResults);
}

// Generar PDF
function generatePDF() {
    const downloadPDFBtn = document.getElementById('downloadPDF');
    
    // Verificar que jsPDF esté disponible
    if (typeof window.jspdf === 'undefined') {
        alert('Error: Librería jsPDF no está cargada');
        return;
    }
    
    try {
        // Cambiar estado del botón
        downloadPDFBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
        downloadPDFBtn.disabled = true;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuración
        const pageWidth = doc.internal.pageSize.width;
        let yPos = 20;
        
        // Título principal
        doc.setFontSize(18);
        doc.setTextColor(102, 126, 234);
        doc.text('Reporte del Sistema - Parque del Café', pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 15;
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        const fecha = new Date().toLocaleDateString('es-ES');
        const hora = new Date().toLocaleTimeString('es-ES');
        doc.text(`Generado el: ${fecha} a las ${hora}`, pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 25;
        
        // Agregar tablas
        addTableToPDF(doc, 'inspecciones', 'Inspecciones Realizadas', yPos);
        
        doc.addPage();
        addTableToPDF(doc, 'visitantes', 'Registro de Visitantes', 20);
        
        doc.addPage();
        addTableToPDF(doc, 'incidentes', 'Registro de Incidentes', 20);
        
        // Guardar PDF
        const fileName = `reporte_parque_cafe_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showNotification('PDF generado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        showNotification('Error al generar el PDF', 'error');
    } finally {
        // Restaurar botón
        downloadPDFBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Descargar PDF';
        downloadPDFBtn.disabled = false;
    }
}

// Agregar tabla al PDF
function addTableToPDF(doc, tableId, title, startY) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    // Título de la tabla
    doc.setFontSize(14);
    doc.setTextColor(51, 51, 51);
    doc.text(title, 20, startY);
    
    // Obtener datos de la tabla
    const headers = [];
    const data = [];
    
    // Headers
    const headerCells = table.querySelectorAll('thead th');
    headerCells.forEach(cell => {
        headers.push(cell.textContent.trim());
    });
    
    // Filas visibles
    const visibleRows = table.querySelectorAll('tbody tr:not(.hidden-row)');
    visibleRows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            rowData.push(cell.textContent.trim());
        });
        data.push(rowData);
    });
    
    // Crear tabla con autoTable si está disponible
    if (typeof doc.autoTable === 'function') {
        doc.autoTable({
            head: [headers],
            body: data,
            startY: startY + 10,
            styles: { fontSize: 9, cellPadding: 3 },
            headStyles: { fillColor: [102, 126, 234], textColor: 255 },
            alternateRowStyles: { fillColor: [248, 249, 255] }
        });
    } else {
        // Fallback sin autoTable
        let yPos = startY + 15;
        doc.setFontSize(10);
        
        // Headers
        doc.setTextColor(102, 126, 234);
        let xPos = 20;
        headers.forEach(header => {
            doc.text(header, xPos, yPos);
            xPos += 30;
        });
        
        // Data
        yPos += 10;
        doc.setTextColor(51, 51, 51);
        data.forEach(row => {
            xPos = 20;
            row.forEach(cell => {
                const text = cell.length > 20 ? cell.substring(0, 20) + '...' : cell;
                doc.text(text, xPos, yPos);
                xPos += 30;
            });
            yPos += 8;
        });
    }
}

// Exportar a CSV
function exportToCSV() {
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    
    try {
        if (exportExcelBtn) {
            exportExcelBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportando...';
            exportExcelBtn.disabled = true;
        }
        
        let csvContent = '';
        const tables = ['inspecciones', 'visitantes', 'incidentes'];
        const titles = ['INSPECCIONES REALIZADAS', 'REGISTRO DE VISITANTES', 'REGISTRO DE INCIDENTES'];
        
        tables.forEach((tableId, index) => {
            const table = document.getElementById(tableId);
            if (!table) return;
            
            csvContent += titles[index] + '\n';
            
            // Headers
            const headers = [];
            const headerCells = table.querySelectorAll('thead th');
            headerCells.forEach(cell => {
                headers.push(cell.textContent.trim());
            });
            csvContent += headers.join(',') + '\n';
            
            // Filas visibles
            const visibleRows = table.querySelectorAll('tbody tr:not(.hidden-row)');
            visibleRows.forEach(row => {
                const rowData = [];
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => {
                    const text = cell.textContent.trim();
                    rowData.push(`"${text.replace(/"/g, '""')}"`);
                });
                csvContent += rowData.join(',') + '\n';
            });
            
            csvContent += '\n';
        });
        
        // Descargar archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `reporte_parque_cafe_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showNotification('Archivo CSV exportado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al exportar CSV:', error);
        showNotification('Error al exportar archivo', 'error');
    } finally {
        if (exportExcelBtn) {
            exportExcelBtn.innerHTML = '<i class="fas fa-file-excel"></i> Exportar Excel';
            exportExcelBtn.disabled = false;
        }
    }
}

// Actualizar datos
function refreshData() {
    const refreshDataBtn = document.getElementById('refreshDataBtn');
    
    if (refreshDataBtn) {
        refreshDataBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualizando...';
        refreshDataBtn.disabled = true;
    }
    
    setTimeout(() => {
        collectAllRows();
        clearSearch();
        showNotification('Datos actualizados correctamente', 'success');
        
        if (refreshDataBtn) {
            refreshDataBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar Datos';
            refreshDataBtn.disabled = false;
        }
    }, 1500);
}

// Mostrar notificación
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Funciones auxiliares
function showElement(element) {
    if (element) element.style.display = 'block';
}

function hideElement(element) {
    if (element) element.style.display = 'none';
}