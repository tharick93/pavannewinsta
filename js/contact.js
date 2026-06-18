/* ============================================
   StacklyHub — Contact Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccordion('.faq-item');
  initContactForm();
  initNewsletterForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.createElement('p');
    msg.className = 'form-success';
    msg.textContent = 'Thank you for subscribing!';
    form.appendChild(msg);
    form.reset();
    setTimeout(() => msg.remove(), 4000);
  });
}
