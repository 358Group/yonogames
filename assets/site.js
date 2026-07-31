const navItems = [
  { href: "index.html", label: "Home" },
  { href: "slots.html", label: "Slots" },
  { href: "live-casino.html", label: "Live Casino" },
  { href: "apk.html", label: "APK Download" },
  { href: "promotion.html", label: "Promotion" },
  { href: "login.html", label: "Login" },
  { href: "games.html", label: "Games" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
}

function renderNav() {
  const page = currentPage();
  const links = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="${item.href === page ? "active" : ""}">${item.label}</a>`
    )
    .join("");

  const header = document.querySelector("[data-header]");
  if (!header) return;

  header.innerHTML = `
    <div class="container">
      <div class="nav">
        <a class="brand" href="index.html">
          <span class="brand-mark">YG</span>
          <span>Yono Games</span>
        </a>
        <nav class="nav-links">${links}</nav>
        <a class="btn btn-primary" href="apk.html">Download APK</a>
      </div>
      <div class="mobile-nav nav-links">${links}</div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector("[data-footer]");
  if (!footer) return;
  footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <strong style="color:#eef7f2">Yono Games</strong>
        <p>Play skill games, slots, live tables and more on India’s favourite gaming app.</p>
      </div>
      <div>
        <a href="promotion.html">Promotions</a> ·
        <a href="apk.html">APK</a> ·
        <a href="login.html">Login</a>
      </div>
    </div>
    <div class="container disclaimer">
      Demo marketing website for portfolio use. 18+ only. Play responsibly. Gaming laws vary by state in India.
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
