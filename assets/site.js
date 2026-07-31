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

function renderShell() {
  const page = currentPage();
  const links = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="${item.href === page ? "active" : ""}"${
          item.href === page ? ' aria-current="page"' : ""
        }>${item.label}</a>`
    )
    .join("");

  const header = document.querySelector("[data-header]");
  if (header) {
    header.innerHTML = `
      <div class="container">
        <div class="nav">
          <a class="brand" href="index.html" aria-label="Yono Games home">
            <span class="brand-mark" aria-hidden="true">YG</span>
            <span>Yono Games</span>
          </a>
          <nav class="nav-links" aria-label="Primary">${links}</nav>
          <a class="btn btn-primary header-cta" href="apk.html">Download APK</a>
        </div>
        <nav class="mobile-nav" aria-label="Mobile">${links}</nav>
      </div>`;
  }

  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <strong style="color:#eef7f2">Yono Games</strong>
          <p>Play skill games, slots, live tables and more on India’s favourite gaming app.</p>
        </div>
        <nav aria-label="Footer">
          <a href="promotion.html">Promotions</a> ·
          <a href="apk.html">APK</a> ·
          <a href="login.html">Login</a> ·
          <a href="games.html">Games</a>
        </nav>
      </div>
      <div class="container disclaimer">
        Demo marketing website for portfolio / hiring assessment. 18+ only. Play responsibly. Gaming laws vary by state in India.
      </div>`;
  }
}

function bindApkDownload() {
  const btn = document.getElementById("apk-download");
  const status = document.getElementById("download-status");
  if (!btn || !status) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.dataset.busy === "1") return;
    btn.dataset.busy = "1";
    btn.setAttribute("aria-busy", "true");
    status.textContent = "Preparing yono-games-latest.apk...";
    let p = 0;
    const timer = setInterval(() => {
      p += 10;
      status.textContent = `Downloading... ${Math.min(p, 100)}%`;
      if (p >= 100) {
        clearInterval(timer);
        status.textContent = "APK ready (demo). In production this downloads the real Android file.";
        btn.dataset.busy = "0";
        btn.setAttribute("aria-busy", "false");
      }
    }, 120);
  });
}

function bindLoginForm() {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("login-msg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const phone = String(data.get("phone") || "").replace(/\s+/g, "");
    const otp = String(data.get("otp") || "").trim();

    if (!/^\+?\d{10,13}$/.test(phone)) {
      msg.className = "error";
      msg.textContent = "Enter a valid mobile number (10–13 digits).";
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      msg.className = "error";
      msg.textContent = "OTP must be a 6-digit code.";
      return;
    }

    msg.className = "hint";
    msg.textContent = "Demo login validated locally. Connect OTP API for production auth.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  bindApkDownload();
  bindLoginForm();
});
