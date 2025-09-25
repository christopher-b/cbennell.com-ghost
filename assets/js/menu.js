export function initMenu() {
  let isOpen = false;
  const windowBreakpoint = 1280;
  const { nav, navBtn, openIcon, closeIcon } = {
    nav: document.getElementById("navigation"),
    navBtn: document.getElementById("nav-btn"),
    openIcon: document.getElementById("open-icon"),
    closeIcon: document.getElementById("close-icon"),
  };

  // Early return if elements don't exist
  if (!nav || !navBtn || !openIcon || !closeIcon) {
    console.warn("nav elements not found");
    console.warn({ navBtn, nav, openIcon, closeIcon });
    return;
  }

  // Without JS, the menu is visible in all states. Here we add the responsive defaults
  nav.classList.add("opacity-0", "xl:opacity-100"); // Invisible in mobile
  nav.classList.add(
    "bg-neutral-light/90",
    "dark:bg-neutral-dark/90",
    "backdrop-blur-xs",
    "xl:backdrop-blur-none",
    "xl:bg-transparent",
  ); // Blurred overlay
  nav.classList.add("fixed", "top-0", "left-0", "xl:static"); // Positioning
  nav.classList.remove("md:text-left"); // Keep menu text centered
  // nav.classList.add("transition-[opacity,transform]", "duration-300", "ease-in-out"); // Transitions
  nav.classList.add("transition-opacity", "duration-300", "ease-in-out"); // Transitions
  nav.classList.add("hidden"); // Remove the element so it doesn't interfere with mouse
  navBtn.classList.remove("hidden"); // Reveal button

  function toggleNavVisibility() {
    console.log("seeting hiddne to ", isOpen);
    nav.classList.toggle("hidden", !isOpen);
    nav.removeEventListener("animationend", toggleNavVisibility);
  }

  function setNavState(open) {
    isOpen = open;
    // Set ARIA properties
    navBtn.setAttribute("aria-expanded", open);
    navBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");

    // Set nav and icon visibility
    // nav.classList.toggle("hidden", !open);
    openIcon.classList.toggle("hidden", open);
    closeIcon.classList.toggle("hidden", !open);

    if (open) {
      toggleNavVisibility();
      nav.classList.remove("opacity-0");
    } else {
      nav.classList.add("opacity-0");
      nav.addEventListener("transitionend", toggleNavVisibility);
    }

    // Fade in
    // requestAnimationFrame(() => {
    // nav.classList.toggle("opacity-0", !open);
    // nav.classList.toggle("opacity-100", open);
    // nav.classList.toggle("-translate-y-40", !open);
    // nav.classList.toggle("translate-y-none", open);
    // });

    // setTimeout(() => navBtn.focus(), 100);
    console.log(nav.classList);
  }

  function handleFocusTrap(e) {
    if (!isOpen) return;

    const focusableElements = nav.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  navBtn.addEventListener("click", () => {
    setNavState(!isOpen);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= windowBreakpoint) setNavState(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavState(false);
  });

  nav.addEventListener("keydown", (e) => handleFocusTrap(e));
}
