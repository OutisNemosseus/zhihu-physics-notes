"use strict";
const menu = document.querySelector(".sidebar-menu");
const mobile = window.matchMedia("(max-width: 820px)");
menu.open = !mobile.matches;
mobile.addEventListener("change", (event) => { menu.open = !event.matches; });
const links = [...document.querySelectorAll("[data-question-link]")];
function highlight(id) {
  for (const link of links) {
    if (link.hash === "#" + id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}
menu.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (link && mobile.matches) menu.open = false;
});
window.addEventListener("hashchange", () => highlight(location.hash.slice(1)));
highlight(location.hash.slice(1));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) highlight(entry.target.id);
  }, { rootMargin: "-5% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll(".question").forEach((question) => observer.observe(question));
}
document.querySelector("#print").addEventListener("click", () => window.print());
