/* ============================================
   StacklyHub — Profile Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs('.tab-btn', '.content-panel');
  initAvatarHover();
});

function initAvatarHover() {
  const avatar = document.querySelector('.profile-avatar');
  if (!avatar) return;
  avatar.addEventListener('click', () => {
    avatar.style.boxShadow = '0 0 30px rgba(225, 48, 108, 0.5)';
    setTimeout(() => avatar.style.removeProperty('box-shadow'), 500);
  });
}
