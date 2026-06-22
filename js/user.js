/* ==========================================
   StacklyHub User Dashboard JS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* Loader */
  const loader = document.querySelector(".page-loader");

  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    });
  }

  /* Animated Counters */
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    let current = 0;

    const increment = Math.max(1, target / 100);

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.floor(current) + suffix;

        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent =
          target + suffix;
      }
    };

    updateCounter();
  });

  /* Dashboard Card Hover Effect */
  const cards = document.querySelectorAll(
    ".stat-card, .analytics-card, .action-card, .notification"
  );

  cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

  });

  /* Notification Click */
  const notifications =
    document.querySelectorAll(".notification");

  notifications.forEach(item => {

    item.addEventListener("click", () => {

      item.style.opacity = "0.6";

      setTimeout(() => {
        item.style.opacity = "1";
      }, 300);

    });

  });

  /* Progress Bar Animation */
  const progressBars =
    document.querySelectorAll(".fill");

  const animateBars = () => {

    progressBars.forEach(bar => {

      const width =
        window.getComputedStyle(bar).width;

      bar.style.width = "0";

      setTimeout(() => {
        bar.style.width = width;
      }, 300);

    });

  };

  animateBars();

  /* Scroll Reveal Animation */
  const revealElements =
    document.querySelectorAll(
      ".stat-card, .analytics-card, .post-card, .notification, .reel-card, .action-card"
    );

  const revealOnScroll = () => {

    revealElements.forEach(element => {

      const top =
        element.getBoundingClientRect().top;

      const windowHeight =
        window.innerHeight;

      if (top < windowHeight - 100) {
        element.classList.add("show");
      }

    });

  };

  revealOnScroll();

  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  /* Create Post Button */
  const createPostBtn =
    document.querySelector(".btn-primary");

  if (createPostBtn) {

    createPostBtn.addEventListener("click", () => {
      window.location.href = "404.html";
    });

  }

  /* Upload Reel Button */
  const uploadBtn =
    document.querySelector(".btn-secondary");

  if (uploadBtn) {

    uploadBtn.addEventListener("click", () => {
      window.location.href = "404.html";
    });

  }

  /* Active Sidebar Link */
  const currentPage =
    window.location.pathname.split("/").pop();

  document
    .querySelectorAll(".nav-link")
    .forEach(link => {

      const href = link.getAttribute("href");

      if (href === currentPage) {
        link.classList.add("active");
      }

    });

});