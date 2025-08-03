// Guardar la información en localStorage y mostrar mensaje
document.getElementById('inspeccionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    fecha: form.fecha.value,
    hora_apertura: form.hora_apertura.value,
    hora_cierre: form.hora_cierre.value,
    reg_inicial: form.reg_inicial.value,
    reg_final: form.reg_final.value,
    num_botes: form.num_botes.value,
    operarios: form.operarios.value,
    firma_mantenedor: form.firma_mantenedor.value,
    insp_visual: form.insp_visual.checked,
    insp_funcional: form.insp_funcional.checked,
    realizar_aseo: form.realizar_aseo.checked,
    insp_botes: form.insp_botes.checked,
    observaciones: form.observaciones.value,
    encendido_prueba: form.encendido_prueba.value
  };

  let registros = JSON.parse(localStorage.getItem('inspecciones')) || [];
  registros.push(datos);
  localStorage.setItem('inspecciones', JSON.stringify(registros));

  document.getElementById('mensaje').innerHTML = '<span style="color:green;font-weight:600;">Información guardada correctamente.</span>';
  setTimeout(() => {
    document.getElementById('mensaje').innerHTML = '';
    form.reset();
  }, 2000);
});