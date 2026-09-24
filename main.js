const links = [...document.querySelectorAll(".sections a")];
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const nav = document.querySelector(".sections");

function syncOffset() {
  const height = nav.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--nav-offset", `${Math.ceil(height + 12)}px`);
}

function markCurrent() {
  const offset = nav.getBoundingClientRect().height + 24;
  const line = window.scrollY + offset;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= line) current = section;
  }
  for (const link of links) {
    const on = link.getAttribute("href") === `#${current.id}`;
    if (on) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
}

function onViewChange() {
  syncOffset();
  markCurrent();
}

syncOffset();
markCurrent();
document.addEventListener("scroll", markCurrent, { passive: true });
window.addEventListener("resize", onViewChange);
window.addEventListener("orientationchange", onViewChange);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", onViewChange);
}
