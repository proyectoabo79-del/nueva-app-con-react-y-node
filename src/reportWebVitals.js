const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
// server/routes/report.js
const express = require('express');
const router = express.Router();
const generatePDF = require('../utils/pdfGenerator');
const path = require('path');

router.post('/generate-pdf', (req, res) => {
  const data = req.body;
  const outputPath = path.join(__dirname, '../pdfs/reporte.pdf');

  generatePDF(data, outputPath);

  res.download(outputPath, 'reporte.pdf');
});

module.exports = router;
