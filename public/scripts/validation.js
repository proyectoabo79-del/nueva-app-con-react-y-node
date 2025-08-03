// validation.js
// Validación de campos del formulario

function sanitize(input) {
  return input.replace(/[<>"'`]/g, '');
}

function validateUsername(username) {
  if (!username) return "El usuario es requerido.";
  if (username.length < 3) return "El usuario es muy corto.";
  if (username.length > 50) return "El usuario es muy largo.";
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Solo letras, números y guiones bajos.";
  return "";
}

function validatePassword(password) {
  if (!password) return "La contraseña es requerida.";
  if (password.length < 6) return "La contraseña es muy corta.";
  if (password.length > 128) return "La contraseña es muy larga.";
  // Seguridad: debe tener mayúscula, minúscula, número y símbolo
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  if (strength < 3) return "La contraseña debe tener mayúscula, minúscula, número y símbolo.";
  return "";
}

function passwordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  switch (strength) {
    case 5: return "Fuerte";
    case 4: return "Media";
    case 3: return "Débil";
    default: return "Muy débil";
  }
}

function validateRole(role) {
  if (!role) return "Debes seleccionar el tipo de usuario.";
  return "";
}

window.validation = {
  sanitize,
  validateUsername,
  validatePassword,
  passwordStrength,
  validateRole
};