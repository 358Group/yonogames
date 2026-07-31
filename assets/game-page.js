function param(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function img(n) {
  return (window.YONO_IMG || ((x) => `https://lucky555slot.net/img/lucky555slot-home-casino-brand-${String(x).padStart(2, "0")}.jpg`))(n);
}

function renderGamePage() {
  const slug = param("game");
  const game = window.YONO_GAMES?.[slug];
  const root = document.querySelector("[data-game-root]");
  if (!root) return;

  if (!game) {
    root.innerHTML = `
      <section class="page-hero">
        <p class="eyebrow">Ruang permainan</p>
        <h1>Permainan tidak dijumpai</h1>
        <p class="muted">Pilih tajuk dari lobi utama.</p>
        <a class="btn btn-primary" style="margin-top:1rem" href="index.html#games">Kembali ke lobi</a>
      </section>`;
    return;
  }

  document.title = `${game.name} | Yono Games Slot Malaysia`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", game.lead.slice(0, 160));

  const heroSrc = img(game.images?.hero || 18);
  const articleSrc = img(game.images?.article || 19);
  const mobileSrc = img(game.images?.mobile || 20);

  const others = window.YONO_GAME_LIST.filter((s) => s !== slug)
    .map((s) => {
      const g = window.YONO_GAMES[s];
      return `
        <a class="game-tile" href="game.html?game=${g.slug}">
          <img src="${img(g.images?.hero || 1)}" alt="${g.name}" loading="lazy" width="576" height="288" />
          <span>${g.name}</span>
        </a>`;
    })
    .join("");

  root.innerHTML = `
    <nav class="crumb" aria-label="breadcrumb">
      <a href="index.html">Laman Utama</a>
      <span>/</span>
      <span>${game.name}</span>
    </nav>

    <section class="page-hero game-hero">
      <div class="inner-hero-visual">
        <img class="inner-hero-img" src="${heroSrc}" alt="${game.title}" width="1152" height="576" />
      </div>
      <p class="eyebrow">${game.eyebrow}</p>
      <div class="pay-row">${game.highlights.map((h) => `<span class="pay-chip">${h}</span>`).join("")}</div>
      <h1>${game.title}</h1>
      <p class="lead">${game.lead}</p>
      <div class="hero-actions">
        <a class="btn btn-ghost" href="index.html#games">Teroka Lobi</a>
        <a class="btn btn-primary" href="#faq">Baca Soalan Lazim</a>
      </div>
    </section>

    <section class="section">
      <h2>Apa yang Anda Dapat di ${game.name}</h2>
      <div class="article-media">
        <img class="article-header-img" src="${articleSrc}" alt="${game.name}" width="1152" height="576" loading="lazy" />
      </div>
      <p class="section-intro">${game.different}</p>
    </section>

    <section class="section">
      <p class="section-kicker">Sorotan permainan</p>
      <h2>Ruang Unggulan ${game.name}</h2>
      <div class="grid-3">
        ${game.features.map((f) => `
          <article class="card">
            <span class="badge">${f.tag}</span>
            <h3>${f.title}</h3>
            <p>${f.text}</p>
          </article>`).join("")}
      </div>
    </section>

    <section class="section">
      <p class="section-kicker">Permainan bergerak</p>
      <h2>${game.name} di Perangkat Anda</h2>
      <div class="mobile-split">
        <div class="phone-showcase">
          <img src="${mobileSrc}" alt="${game.name} mudah alih" width="1152" height="576" loading="lazy" />
        </div>
        <div>
          <p class="section-intro">Buka akaun Yono Games dan akses ${game.name} terus dari telefon Android atau iOS. Kawalan skrin sentuh menjadikan putaran intuitif; gulungan menyesuaikan orientasi potret.</p>
          <ul class="chip-grid">${game.mobile.map((m) => `<li>${m}</li>`).join("")}</ul>
          <div class="hero-actions" style="margin-top:1.2rem">
            <a class="btn btn-primary" href="login.html">Buka Akaun</a>
            <a class="btn btn-ghost" href="index.html#games">Teroka Lobi</a>
          </div>
          <div class="store-row">
            <a class="store-btn" href="apk.html">Google Play</a>
            <a class="store-btn" href="apk.html">App Store</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <p class="section-kicker">Dukungan pemain</p>
      <h2>Bantuan Saat Bermain ${game.name}</h2>
      <div class="support-banner">
        <div class="support-visual">
          <img src="${img(25)}" alt="Team online" width="800" height="500" loading="lazy" />
        </div>
        <div class="support-copy">
          <span class="badge">Team online</span>
          <div style="display:grid;gap:.8rem;margin-top:.8rem">
            ${game.support.map((s) => `
              <article class="info-block" style="background:rgba(0,0,0,.18)">
                <h3>${s.title}</h3>
                <p>${s.text}</p>
              </article>`).join("")}
            <article class="info-block" style="background:rgba(0,0,0,.18)">
              <h3>Kontak Tim Dukungan</h3>
              <p>E-mel <a class="text-link" href="mailto:gajendra.loma@gmail.com">gajendra.loma@gmail.com</a> atau Telegram <a class="text-link" href="https://t.me/lomasdollars" target="_blank" rel="noopener">@lomasdollars</a> untuk soalan akaun, hasil putaran atau isu teknikal.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <p class="section-kicker">Kepercayaan & keadilan</p>
      <h2>Standar Keadilan ${game.name}</h2>
      <div class="grid-2">
        ${game.trust.map((t) => `
          <article class="card"><h3>${t.title}</h3><p>${t.text}</p></article>`).join("")}
      </div>
    </section>

    <section class="section">
      <h2>Mengapa ${game.name} di Yono Games</h2>
      <div class="grid-3">
        ${game.why.map((w) => `
          <article class="card"><h3>${w.title}</h3><p>${w.text}</p></article>`).join("")}
      </div>
    </section>

    <section class="section">
      <h2>Fitur Tanda Tangan ${game.name}</h2>
      <div class="grid-3">
        ${game.defines.map((d) => `
          <article class="card"><h3>${d.title}</h3><p>${d.text}</p></article>`).join("")}
      </div>
    </section>

    <section class="section faq" id="faq">
      <h2>FAQ ${game.name}</h2>
      ${game.faqs.map((f, i) => `
        <details ${i === 0 ? "open" : ""}>
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`).join("")}
    </section>

    <section class="section">
      <p class="section-kicker">Permainan lain</p>
      <h2>Tajuk rujukan dalam lobi yang sama</h2>
      <div class="game-tile-grid">${others}</div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", renderGamePage);
