// server/utils/pdfGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(data, outputPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(20).text('Reporte de Inspección', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Atracción: ${data.attraction}`);
  doc.text(`Fecha: ${data.date}`);
  doc.text(`Inspector: ${data.inspector}`);
  doc.text(`Observaciones: ${data.notes}`);

  doc.end();
}

module.exports = generatePDF;
