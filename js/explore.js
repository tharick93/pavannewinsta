/* ============================================
   StacklyHub — Explore Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initFollowButtons();
});

function initSearch() {
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  if (!input || !btn) return;

  const handleSearch = () => {
    const query = input.value.trim();
    if (query) {
      input.style.borderColor = 'var(--accent-primary)';
      setTimeout(() => input.style.removeProperty('border-color'), 1000);
    }
  };

  btn.addEventListener('click', handleSearch);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

function initFollowButtons() {
  document.querySelectorAll('.creator-mini .btn, .suggested-card .btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const following = this.textContent === 'Following';
      this.textContent = following ? 'Follow' : 'Following';
      this.classList.toggle('btn-secondary', !following);
      this.classList.toggle('btn-primary', following);
    });
  });
}
