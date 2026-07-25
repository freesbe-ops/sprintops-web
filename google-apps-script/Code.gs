function doGet(e) {
  return HtmlService.createHtmlOutput('<p>Apps Script OK</p>');
}

function doPost(e) {
  if (!e || !e.parameter) {
    return ContentService.createTextOutput('Sin datos').setMimeType(ContentService.MimeType.TEXT);
  }

  const nombre = e.parameter.nombre || e.parameter.nom || '';
  const email = e.parameter.email || '';
  const telefono = e.parameter.telefono || e.parameter.tel || '';
  const negoci = e.parameter.negoci || '';
  const vendes = e.parameter.vendes || '';
  const mensaje = e.parameter.mensaje || [negoci, vendes].filter(Boolean).join(' | ');
  const now = new Date();

  const sheet = SpreadsheetApp.openById('1Kxn1iSsmR1Q6k-sY_B2jhGvFCXTADnTLJeEc8kRvJCk').getActiveSheet();
  const data = [nombre, email, telefono, mensaje, now.toLocaleString('es-ES')];
  sheet.appendRow(data);

  MailApp.sendEmail({
    to: 'oriolmartinezpa@gmail.com',
    subject: 'Nou contacte desde sprintops.es',
    body: 'Nom: ' + nombre + '\nEmail: ' + email + '\nTelèfon: ' + telefono + '\nMissatge: ' + mensaje + '\nData: ' + now.toLocaleString('es-ES')
  });

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}
