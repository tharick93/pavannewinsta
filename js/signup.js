/* ============================================
   StacklyHub — Signup Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSignupForm();
  initPasswordToggle();
  initPasswordStrength();
  initAccordion('.faq-item');
});

function initSignupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    const existingError = form.querySelector('.form-error');
    if (existingError) existingError.remove();

    if (!name || username.length < 3 || !email.includes('@') || password.length < 8) {
      const error = document.createElement('p');
      error.className = 'form-error';
      error.textContent = 'Please fill all fields correctly. Password must be at least 8 characters.';
      form.insertBefore(error, form.querySelector('button[type="submit"]'));
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 2000);
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

function initPasswordStrength() {
  const input = document.getElementById('signupPassword');
  const strengthBar = document.getElementById('passwordStrength');
  if (!input || !strengthBar) return;

  input.addEventListener('input', () => {
    const val = input.value;
    let strength = 0;
    if (val.length >= 8) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val)) strength += 25;
    if (/[^A-Za-z0-9]/.test(val)) strength += 25;

    strengthBar.style.setProperty('--strength', strength + '%');

    const colors = ['#f87171', '#fbbf24', '#4ade80', '#4ade80'];
    const colorIndex = Math.min(Math.floor(strength / 25), 3);
    strengthBar.style.setProperty('--strength-color', colors[colorIndex] || '#f87171');
  });
}
