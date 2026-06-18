/* ============================================
   StacklyHub — Login Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initPasswordToggle();
});

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const existingError = form.querySelector('.form-error');
    if (existingError) existingError.remove();

    if (email.length < 3 || password.length < 6) {
      const error = document.createElement('p');
      error.className = 'form-error';
      error.textContent = 'Please enter a valid email/username and password (min 6 characters).';
      form.appendChild(error);
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1500);
  });
}

function initPasswordToggle() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye', !isPassword);
      icon.classList.toggle('fa-eye-slash', isPassword);
    });
  });
}
