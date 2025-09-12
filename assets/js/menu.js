export function initMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("sidebar");
  const closeNavBtn = document.getElementById("close-nav-btn");

  // Early return if elements don't exist
  if (!mobileMenuBtn || !sidebar || !closeNavBtn) {
    console.warn("Navigation elements not found");
    return;
  }

  function openNav() {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.remove("hidden");
  }

  function closeNav() {
    sidebar.classList.add("-translate-x-full");
  }

  mobileMenuBtn.addEventListener("click", openNav);
  closeNavBtn.addEventListener("click", closeNav);

  // Close navigation when window is resized to desktop size
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      closeNav();
    }
  });
}
