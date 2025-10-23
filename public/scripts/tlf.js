// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarHistorial();
    configurarFechaActual();
    
    // Event listener para cambio de atracción
    document.getElementById('atraccion-select').addEventListener('change', function() {
        mostrarFormulario(this.value);
    });
});

// Configurar fecha actual en los campos de fecha
function configurarFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    const camposFecha = ['fecha-teleferico', 'fecha-area', 'fecha-control', 'fecha-cabinas'];
    
    camposFecha.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.value = hoy;
        }
    });
}

// Mostrar formulario según la atracción seleccionada
function mostrarFormulario(atraccion) {
    // Ocultar todos los formularios
    const formularios = document.querySelectorAll('.inspection-form');
    formularios.forEach(form => {
        form.style.display = 'none';
    });
    
    // Mostrar el formulario correspondiente
    if (atraccion) {
        const formId = 'form-' + atraccion;
        const formulario = document.getElementById(formId);
        if (formulario) {
            formulario.style.display = 'block';
            formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Guardar inspección
function guardarInspeccion(tipoAtraccion) {
    const inspeccion = recopilarDatos(tipoAtraccion);
    
    if (!validarInspeccion(inspeccion)) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    // Obtener inspecciones guardadas
    let inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
    
    // Agregar nueva inspección
    inspeccion.id = Date.now();
    inspeccion.tipo = tipoAtraccion;
    inspeccion.fechaRegistro = new Date().toISOString();
    
    inspecciones.push(inspeccion);
    
    // Guardar en localStorage
    localStorage.setItem('inspecciones', JSON.stringify(inspecciones));
    
    // Mostrar mensaje de éxito
    mostrarMensajeExito();
    
    // Limpiar formulario
    limpiarFormulario(tipoAtraccion);
    
    // Actualizar historial
    cargarHistorial();
}

// Recopilar datos del formulario
function recopilarDatos(tipoAtraccion) {
    const datos = {
        tipo: tipoAtraccion
    };
    
    switch(tipoAtraccion) {
        case 'teleferico':
            datos.fecha = document.getElementById('fecha-teleferico').value;
            datos.dia = document.getElementById('dia-teleferico').value;
            
            const tablaTeleferico = document.querySelector('#form-teleferico .inspection-table tbody');
            datos.items = [];
            
            tablaTeleferico.querySelectorAll('tr').forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const item = {
                        descripcion: cells[0].textContent.trim(),
                        valor: '',
                        observacion: ''
                    };
                    
                    const input = cells[1].querySelector('input, textarea');
                    if (input) {
                        item.valor = input.value;
                    }
                    
                    if (cells.length > 2) {
                        const obsInput = cells[2].querySelector('input, textarea');
                        if (obsInput) {
                            item.observacion = obsInput.value;
                        }
                    }
                    
                    datos.items.push(item);
                }
            });
            
            // Recopilar firmas
            const firmasTeleferico = document.querySelectorAll('#form-teleferico .signature-item input');
            datos.firmas = [];
            firmasTeleferico.forEach(input => {
                if (input.value) {
                    datos.firmas.push({
                        rol: input.previousElementSibling.textContent,
                        nombre: input.value
                    });
                }
            });
            break;
            
        case 'area-trabajo':
            datos.fecha = document.getElementById('fecha-area').value;
            datos.inspeccionVisual = [];
            datos.inspeccionFuncional = [];
            datos.inspeccionAseo = [];
            
            // Recopilar datos de las tablas
            const tablasArea = document.querySelectorAll('#form-area-trabajo .inspection-table');
            tablasArea.forEach((tabla, index) => {
                const rows = tabla.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    const item = {
                        descripcion: cells[0].textContent.trim(),
                        diasMarcados: []
                    };
                    
                    for (let i = 1; i < cells.length; i++) {
                        const checkbox = cells[i].querySelector('input[type="checkbox"]');
                        if (checkbox && checkbox.checked) {
                            const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                            item.diasMarcados.push(dias[i-1]);
                        }
                    }
                    
                    if (index === 0) {
                        datos.inspeccionVisual.push(item);
                    } else if (index === 1) {
                        datos.inspeccionFuncional.push(item);
                    } else {
                        datos.inspeccionAseo.push(item);
                    }
                });
            });
            
            // Recopilar observaciones
            const observacionesArea = document.querySelectorAll('#form-area-trabajo .observations-section textarea');
            datos.observaciones = {};
            const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            observacionesArea.forEach((textarea, index) => {
                datos.observaciones[diasSemana[index]] = textarea.value;
            });
            break;
            
        case 'control-sistema':
            datos.fecha = document.getElementById('fecha-control').value;
            datos.items = [];
            
            const tablaControl = document.querySelector('#form-control-sistema .inspection-table tbody');
            tablaControl.querySelectorAll('tr').forEach(row => {
                const cells = row.querySelectorAll('td');
                const item = {
                    descripcion: cells[0].textContent.trim(),
                    diasMarcados: []
                };
                
                for (let i = 1; i < cells.length; i++) {
                    const checkbox = cells[i].querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox.checked) {
                        const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                        item.diasMarcados.push(dias[i-1]);
                    }
                }
                
                datos.items.push(item);
            });
            
            // Recopilar observaciones
            const observacionesControl = document.querySelectorAll('#form-control-sistema .observations-section textarea');
            datos.observaciones = {};
            const diasControl = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            observacionesControl.forEach((textarea, index) => {
                datos.observaciones[diasControl[index]] = textarea.value;
            });
            
            // Recopilar firmas
            const firmasControl = document.querySelectorAll('#form-control-sistema .signature-item input');
            datos.firmas = [];
            firmasControl.forEach(input => {
                if (input.value) {
                    datos.firmas.push({
                        rol: input.previousElementSibling.textContent,
                        nombre: input.value
                    });
                }
            });
            break;
            
        case 'cabinas':
            datos.fecha = document.getElementById('fecha-cabinas').value;
            datos.items = [];
            
            const tablaCabinas = document.querySelector('#form-cabinas .inspection-table tbody');
            tablaCabinas.querySelectorAll('tr').forEach(row => {
                const cells = row.querySelectorAll('td');
                const item = {
                    descripcion: cells[0].textContent.trim(),
                    valores: []
                };
                
                for (let i = 1; i < cells.length; i++) {
                    const input = cells[i].querySelector('input');
                    if (input) {
                        item.valores.push(input.value);
                    }
                }
                
                datos.items.push(item);
            });
            
            // Recopilar observaciones
            const observacionesCabinas = document.querySelectorAll('#form-cabinas .observations-section textarea');
            datos.observaciones = {};
            const diasCabinas = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            observacionesCabinas.forEach((textarea, index) => {
                datos.observaciones[diasCabinas[index]] = textarea.value;
            });
            break;
    }
    
    return datos;
}

// Validar inspección
function validarInspeccion(inspeccion) {
    if (!inspeccion.fecha) {
        return false;
    }
    return true;
}

// Mostrar mensaje de éxito
function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'success-message';
    mensaje.textContent = '✓ Inspección guardada exitosamente';
    
    const form = document.querySelector('.inspection-form[style*="display: block"]');
    if (form) {
        form.insertBefore(mensaje, form.firstChild);
        
        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }
}

// Limpiar formulario
function limpiarFormulario(tipoAtraccion) {
    const formId = 'form-' + tipoAtraccion;
    const formulario = document.getElementById(formId);
    
    if (formulario) {
        // Limpiar inputs de texto, número y time
        formulario.querySelectorAll('input[type="text"], input[type="number"], input[type="time"]').forEach(input => {
            input.value = '';
        });
        
        // Desmarcar checkboxes
        formulario.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Limpiar textareas
        formulario.querySelectorAll('textarea').forEach(textarea => {
            textarea.value = '';
        });
        
        // Restaurar fecha actual
        configurarFechaActual();
    }
}

// Cargar historial
function cargarHistorial() {
    const inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
    const historialLista = document.getElementById('historial-lista');
    
    if (historialLista) {
        historialLista.innerHTML = '';
        
        if (inspecciones.length === 0) {
            historialLista.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">No hay inspecciones registradas</p>';
            return;
        }
        
        // Ordenar por fecha más reciente
        inspecciones.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
        
        inspecciones.forEach(inspeccion => {
            const item = crearItemHistorial(inspeccion);
            historialLista.appendChild(item);
        });
    }
}

// Crear item de historial
function crearItemHistorial(inspeccion) {
    const div = document.createElement('div');
    div.className = 'historial-item';
    
    const nombreAtraccion = {
        'teleferico': 'Teleférico',
        'cabinas': 'Inspección de Cabinas',
        'area-trabajo': 'Área de Trabajo',
        'control-sistema': 'Sistema de Control'
    };
    
    const fecha = new Date(inspeccion.fechaRegistro);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    div.innerHTML = `
        <h4>${nombreAtraccion[inspeccion.tipo]}</h4>
        <p class="fecha">Fecha de inspección: ${inspeccion.fecha}</p>
        <p>Registrado: ${fechaFormateada}</p>
        <button onclick="verDetalle(${inspeccion.id})" style="margin-top: 10px; padding: 8px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Ver Detalle</button>
        <button onclick="eliminarInspeccion(${inspeccion.id})" style="margin-top: 10px; margin-left: 10px; padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Eliminar</button>
    `;
    
    return div;
}

// Ver detalle de inspección
function verDetalle(id) {
    const inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
    const inspeccion = inspecciones.find(i => i.id === id);
    
    if (inspeccion) {
        let detalle = `DETALLE DE INSPECCIÓN\n\n`;
        detalle += `Tipo: ${inspeccion.tipo}\n`;
        detalle += `Fecha: ${inspeccion.fecha}\n\n`;
        detalle += JSON.stringify(inspeccion, null, 2);
        
        alert(detalle);
    }
}

// Eliminar inspección
function eliminarInspeccion(id) {
    if (confirm('¿Está seguro de eliminar esta inspección?')) {
        let inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
        inspecciones = inspecciones.filter(i => i.id !== id);
        localStorage.setItem('inspecciones', JSON.stringify(inspecciones));
        cargarHistorial();
    }
}

// Filtrar historial
function filtrarHistorial() {
    const filtro = document.getElementById('filter-atraccion').value;
    const inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
    const historialLista = document.getElementById('historial-lista');
    
    historialLista.innerHTML = '';
    
    const inspeccionesFiltradas = filtro ? 
        inspecciones.filter(i => i.tipo === filtro) : 
        inspecciones;
    
    if (inspeccionesFiltradas.length === 0) {
        historialLista.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">No se encontraron inspecciones</p>';
        return;
    }
    
    inspeccionesFiltradas.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
    
    inspeccionesFiltradas.forEach(inspeccion => {
        const item = crearItemHistorial(inspeccion);
        historialLista.appendChild(item);
    });
}

// Exportar historial a PDF (función básica)
function exportarHistorial() {
    const inspecciones = JSON.parse(localStorage.getItem('inspecciones')) || [];
    
    if (inspecciones.length === 0) {
        alert('No hay inspecciones para exportar');
        return;
    }
    
    // Crear contenido para exportar
    let contenido = 'HISTORIAL DE INSPECCIONES PREOPERATIVAS\n\n';
    
    inspecciones.forEach((inspeccion, index) => {
        contenido += `${index + 1}. ${inspeccion.tipo.toUpperCase()}\n`;
        contenido += `   Fecha: ${inspeccion.fecha}\n`;
        contenido += `   Registrado: ${new Date(inspeccion.fechaRegistro).toLocaleString('es-ES')}\n\n`;
    });
    
    // Crear blob y descargar
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inspecciones_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Historial exportado exitosamente');
}