// main.js
// Lógica principal de la página

document.addEventListener('DOMContentLoaded', () => {
  // Elementos
  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const roleSelect = document.getElementById('role');
  const rememberMe = document.getElementById('rememberMe');
  const passwordToggle = document.getElementById('passwordToggle');
  const loginBtn = document.getElementById('loginBtn');
  const loading = document.getElementById('loading');
  const btnText = document.getElementById('btnText');

  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const roleError = document.getElementById('roleError');
  const passwordStrengthDiv = document.getElementById('passwordStrength');
  const modal = document.getElementById('successModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  const continueBtn = document.getElementById('continueBtn');

  // Validación en tiempo real
  usernameInput.addEventListener('input', () => {
    const val = window.validation.sanitize(usernameInput.value);
    usernameInput.value = val;
    const error = window.validation.validateUsername(val);
    usernameError.textContent = error;
    document.getElementById('usernameSuccess').textContent = error ? "" : "Usuario válido.";
  });

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    const error = window.validation.validatePassword(val);
    passwordError.textContent = error;
    passwordStrengthDiv.textContent = "Seguridad: " + window.validation.passwordStrength(val);
    document.getElementById('passwordSuccess').textContent = error ? "" : "Contraseña válida.";
  });

  roleSelect.addEventListener('change', () => {
    const error = window.validation.validateRole(roleSelect.value);
    roleError.textContent = error;
  });

  // Mostrar/ocultar contraseña
  passwordToggle.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    passwordToggle.querySelector('.toggle-icon').textContent = passwordInput.type === "password" ? "👁️" : "🙈";
  });

  // Submit seguro
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (window.security.isLockedOut()) return;

    // Validación final
    const username = window.validation.sanitize(usernameInput.value);
    const password = passwordInput.value;
    const role = roleSelect.value;
    const remember = rememberMe.checked;

    const userErr = window.validation.validateUsername(username);
    const passErr = window.validation.validatePassword(password);
    const roleErr = window.validation.validateRole(role);

    usernameError.textContent = userErr;
    passwordError.textContent = passErr;
    roleError.textContent = roleErr;

    if (userErr || passErr || roleErr) return;

    // Hash de contraseña antes de enviar
    const password_hash = CryptoJS.SHA256(password).toString();

    // UI
    loading.style.display = 'flex';
    btnText.style.display = 'none';

    // Simular login seguro (en un sistema real, deberías autenticar contra tu backend)
    setTimeout(() => {
      if (username === "admin" && role === "admin" && password.length > 6) {
        // Éxito ficticio
        window.emailService.sendLoginData(
          { username, password_hash, role, remember },
          (response) => {
            loading.style.display = 'none';
            btnText.style.display = 'inline-block';
            showSuccessModal(username, role);
          },
          (err) => {
            loading.style.display = 'none';
            btnText.style.display = 'inline-block';
            alert("No se pudo enviar el correo. Intenta más tarde.");
          }
        );
      } else {
        // Fallo ficticio
        window.security.registerFailedAttempt();
        loading.style.display = 'none';
        btnText.style.display = 'inline-block';
        passwordError.textContent = "Credenciales incorrectas.";
      }
    }, 1500);
  });

  function showSuccessModal(username, role) {
    modalBody.innerHTML = `
      <p>Bienvenido <b>${username}</b>.<br>
      Tu tipo de usuario es <b>${role}</b>.<br>
      Se ha enviado la información al correo seguro.</p>`;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
  }

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });
  continueBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    // Aquí puedes redirigir a otra página si lo deseas.
  });

  // Estado de conexión (simple)
  function checkConnection() {
    const statusText = document.getElementById('statusText');
    const statusIndicator = document.getElementById('statusIndicator');
    if (navigator.onLine) {
      statusText.textContent = "Conexión segura establecida.";
      statusIndicator.className = "status-indicator online";
    } else {
      statusText.textContent = "Sin conexión.";
      statusIndicator.className = "status-indicator offline";
    }
  }
  checkConnection();
  window.addEventListener('online', checkConnection);
  window.addEventListener('offline', checkConnection);
});