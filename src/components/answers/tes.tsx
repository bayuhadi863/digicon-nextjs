const nav = document.querySelector("nav");
const dropdowns = document.querySelectorAll("nav ul li .dropdown");

nav.addEventListener("mouseover", (event) => {
  const target = event.target.closest("li");
  if (target) {
    const dropdown = target.querySelector(".dropdown");
    if (dropdown) {
      dropdowns.forEach((dd) => {
        if (dd !== dropdown) {
          dd.style.display = "none";
        }
      });
      dropdown.style.display = "block";
    } else {
      dropdowns.forEach((dd) => {
        dd.style.display = "none";
      });
    }
  }
});

nav.addEventListener("mouseout", (event) => {
  if (!event.relatedTarget || !nav.contains(event.relatedTarget)) {
    dropdowns.forEach((dd) => {
      dd.style.display = "none";
    });
  }
});