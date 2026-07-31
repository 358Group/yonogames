const navItems = [
  { href: "index.html", label: "Laman Utama" },
  { href: "game.html?game=release-the-kraken", label: "Release the Kraken" },
  { href: "game.html?game=madame-destiny", label: "Madame Destiny" },
  { href: "game.html?game=thai-river-wonders", label: "Thai River Wonders" },
  { href: "game.html?game=gates-of-olympus", label: "Gates of Olympus" },
  { href: "game.html?game=fortune-ox", label: "Fortune Ox" },
  { href: "game.html?game=rise-of-apollo", label: "Rise of Apollo" },
  { href: "login.html", label: "Buka Akaun", cta: true },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const page = path === "" ? "index.html" : path;
  const q = window.location.search || "";
  return page + q;
}

function isActive(href) {
  const path = window.location.pathname.split("/").pop() || "index.html";
  if (href === "index.html") return path === "index.html" || path === "";
  if (href.includes("game=")) {
    const want = new URLSearchParams(href.split("?")[1] || "").get("game");
    const have = new URLSearchParams(window.location.search).get("game");
    return path === "game.html" && want === have;
  }
  return path === href || currentPage().startsWith(href);
}

function renderNav() {
  const links = navItems
    .map((item) => {
      const cls = [isActive(item.href) ? "active" : "", item.cta ? "nav-cta" : ""].filter(Boolean).join(" ");
      return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  const header = document.querySelector("[data-header]");
  if (!header) return;
  header.innerHTML = `
    <div class="container">
      <div class="nav">
        <a class="brand" href="index.html">
          <span class="brand-mark">YG</span>
          <span class="brand-text">Yono Games</span>
        </a>
        <nav class="nav-links" aria-label="Primary">${links}</nav>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-nav" data-mobile-nav hidden>${links}</div>
    </div>
  `;

  const toggle = header.querySelector("[data-menu-toggle]");
  const mobile = header.querySelector("[data-mobile-nav]");
  toggle?.addEventListener("click", () => {
    const open = mobile.hasAttribute("hidden");
    if (open) {
      mobile.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    } else {
      mobile.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  mobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobile.setAttribute("hidden", "");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1100 && mobile && !mobile.hasAttribute("hidden")) {
      mobile.setAttribute("hidden", "");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

function renderFooter() {
  const footer = document.querySelector("[data-footer]");
  if (!footer) return;
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand-col">
        <strong class="footer-brand">Yono Games</strong>
        <p>Yono Games ialah hab kasino dan sukan untuk wilayah yang disokong, dengan halaman permainan, konteks pembayaran, bantuan akaun dan nota undang-undang tempatan.</p>
        <div class="footer-meta">
          <span class="meta-age">21+</span>
          <span>SSL</span>
          <span>Mengutamakan mudah alih</span>
        </div>
      </div>
      <div>
        <h3 class="footer-title">Permainan</h3>
        <nav class="footer-links" aria-label="Permainan">
          <a href="game.html?game=release-the-kraken">Release the Kraken</a>
          <a href="game.html?game=madame-destiny">Madame Destiny</a>
          <a href="game.html?game=thai-river-wonders">Thai River Wonders</a>
          <a href="game.html?game=gates-of-olympus">Gates of Olympus</a>
          <a href="game.html?game=fortune-ox">Fortune Ox</a>
          <a href="game.html?game=rise-of-apollo">Rise of Apollo</a>
        </nav>
      </div>
      <div>
        <h3 class="footer-title">Akaun</h3>
        <nav class="footer-links" aria-label="Akaun">
          <a href="login.html">Daftar</a>
          <a href="login.html">Log Masuk</a>
          <a href="index.html#faq">Soalan Lazim</a>
          <a href="apk.html">App</a>
        </nav>
      </div>
      <div>
        <h3 class="footer-title">Maklumat</h3>
        <nav class="footer-links" aria-label="Maklumat">
          <a href="index.html#trust">Tentang Kami</a>
          <a href="index.html#area">Terma & Syarat</a>
          <a href="index.html#area">Dasar Privasi</a>
          <a href="index.html#area">Undang-undang</a>
          <a href="index.html#lobby">Live Casino</a>
          <a href="index.html#games">Slots</a>
          <a href="index.html#areas">Sportsbook</a>
        </nav>
      </div>
      <div>
        <h3 class="footer-title">Hubungi</h3>
        <nav class="footer-links" aria-label="Hubungi">
          <a href="mailto:gajendra.loma@gmail.com">gajendra.loma@gmail.com</a>
          <a href="https://t.me/lomasdollars" target="_blank" rel="noopener">Telegram @lomasdollars</a>
        </nav>
        <p class="footer-note">Perkhidmatan hanya tersedia di wilayah yang dibenarkan undang-undang tempatan.</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 Yono Games. Hak cipta terpelihara.</p>
      <a href="sitemap.html">Sitemap</a>
    </div>
  `;

  if (!document.querySelector(".back-top")) {
    const top = document.createElement("a");
    top.className = "back-top";
    top.href = "#top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = "<span>↑</span>";
    document.body.appendChild(top);
    if (!document.getElementById("top")) {
      document.body.id = "top";
    }
  }
}

function renderBottomBar() {
  if (document.querySelector(".bottom-bar")) return;
  const bar = document.createElement("div");
  bar.className = "bottom-bar";
  bar.setAttribute("aria-label", "register / login");
  bar.innerHTML = `
    <div class="inner">
      <a class="btn btn-primary" href="login.html">Daftar</a>
      <a class="btn btn-ghost" href="login.html">Log Masuk</a>
    </div>
  `;
  document.body.appendChild(bar);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  renderBottomBar();
});
