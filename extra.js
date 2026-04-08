// extra.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".md-nav--primary");
  if (!nav) return;

  let activeSection = null;

  nav.addEventListener("click", (e) => {
    const toggle = e.target.closest(".md-nav__toggle");
    if (!toggle) return;

    const section = toggle.closest(".md-nav__item--section");
    const isOpening = !section.classList.contains("md-nav__item--active");

    // Close all sections first
    nav.querySelectorAll(".md-nav__item--active").forEach((active) => {
      if (active !== section) {
        active.classList.remove("md-nav__item--active");
        active.querySelector(".md-nav__toggle").checked = false;
      }
    });

    // Toggle current section
    section.classList.toggle("md-nav__item--active", isOpening);
    toggle.checked = isOpening;

    // Prevent default animation conflict
    e.stopPropagation();
  });

  // Initialize first section
  const firstSection = nav.querySelector(".md-nav__item--section");
  if (firstSection) {
    firstSection.classList.add("md-nav__item--active");
    firstSection.querySelector(".md-nav__toggle").checked = true;
  }
});
