/* StacklyHub — Feed JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  initCreatePost();
  initPostLikes();
  initFollowButtons();
  initNavDropdown();
});

function initCreatePost() {
  const btn = document.getElementById('post-button');
  const textarea = document.getElementById('post-textarea');
  const feed = document.querySelector('.main-content');
  if (!btn || !textarea || !feed) return;

  btn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) return;

    const article = document.createElement('article');
    article.className = 'neu-card post-card animate-card visible';
    article.innerHTML = `
      <div class="d-flex justify-between align-center" style="margin-bottom:var(--spacing-sm)">
        <div class="d-flex gap-md align-center">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=88&h=88&fit=crop" alt="You" class="avatar">
          <div>
            <h4 style="font-family:var(--font-main);font-size:1rem">You</h4>
            <span class="text-secondary" style="font-size:0.8rem">Just now</span>
          </div>
        </div>
      </div>
      <p style="margin-bottom:var(--spacing-md)">${escapeHtml(text)}</p>
      <div class="post-actions">
        <button class="like-btn"><i class="far fa-heart"></i> 0</button>
        <button><i class="far fa-comment"></i> 0</button>
        <button><i class="fas fa-share-alt"></i> Share</button>
      </div>`;

    const createArea = feed.querySelector('.create-post-area');
    createArea.after(article);
    textarea.value = '';
    initPostLikes();
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function initPostLikes() {
  document.querySelectorAll('.like-btn').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      const liked = btn.classList.toggle('liked');
      icon.classList.toggle('far', !liked);
      icon.classList.toggle('fas', liked);
    });
  });
}

function initFollowButtons() {
  document.querySelectorAll('.follow-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const following = this.textContent.trim() === 'Following';
      this.textContent = following ? 'Follow' : 'Following';
      this.classList.toggle('primary', !following);
    });
  });
}

function initNavDropdown() {
  const dropdown = document.querySelector('.nav-dropdown');
  const toggle = dropdown?.querySelector('.nav-dropdown-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => dropdown.classList.toggle('active'));
}
