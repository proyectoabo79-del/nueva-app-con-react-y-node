// security.js
// Protección contra fuerza bruta y bloqueo temporal

let failedAttempts = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;
let lockoutActive = false;
let lockoutTimeout = null;

function showLockout() {
  document.getElementById('attemptsWarning').style.display = 'flex';
  document.getElementById('loginForm').style.pointerEvents = 'none';
  document.getElementById('loginBtn').disabled = true;
}

function hideLockout() {
  document.getElementById('attemptsWarning').style.display = 'none';
  document.getElementById('loginForm').style.pointerEvents = 'auto';
  document.getElementById('loginBtn').disabled = false;
}

function startLockout() {
  lockoutActive = true;
  let seconds = LOCKOUT_SECONDS;
  showLockout();
  document.getElementById('lockoutTimer').textContent = seconds;
  lockoutTimeout = setInterval(() => {
    seconds--;
    document.getElementById('lockoutTimer').textContent = seconds;
    if (seconds <= 0) {
      clearInterval(lockoutTimeout);
      lockoutActive = false;
      failedAttempts = 0;
      hideLockout();
    }
  }, 1000);
}

function registerFailedAttempt() {
  failedAttempts++;
  if (failedAttempts >= MAX_ATTEMPTS) {
    startLockout();
  }
}

function isLockedOut() {
  return lockoutActive;
}

window.security = {
  registerFailedAttempt,
  isLockedOut,
  failedAttempts
};