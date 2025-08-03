// Datos de ejemplo para el gráfico
const datosReporte = {
  labels: ["2024 Febrero", "2025 Enero", "2025 Febrero"],
  solicitudes: [60, 120, 95],
  inspecciones: [50, 80, 100]
};

const ctx = document.getElementById('graficoReporte').getContext('2d');
const graficoReporte = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: datosReporte.labels,
    datasets: [
      {
        label: 'Solicitudes',
        data: datosReporte.solicitudes,
        backgroundColor: '#42a5f5'
      },
      {
        label: 'Inspecciones',
        data: datosReporte.inspecciones,
        backgroundColor: '#66bb6a'
      }
    ]
  },
  options: {
    responsive: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Comparativa de Solicitudes e Inspecciones' }
    }
  }
});

// Descargar PDF de la zona de reportes
function descargarPDF() {
  import('jspdf').then(jsPDF => {
    const doc = new jsPDF.jsPDF();
    doc.text('Zona de Reportes', 10, 10);
    // Puedes mejorar el renderizado de la tabla o usar html2canvas para capturar el área
    doc.text('Clasificación de Registros:', 10, 20);
    // Recorrer tabla y agregar al PDF
    let startY = 30;
    const tabla = document.getElementById('tabla-clasificacion');
    for (let row of tabla.rows) {
      let rowText = Array.from(row.cells).map(cell => cell.innerText).join(' | ');
      doc.text(rowText, 10, startY);
      startY += 8;
    }
    doc.save('reporte.pdf');
  });
}