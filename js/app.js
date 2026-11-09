/**
 * Siberuna - Master Application Controller & Router
 * Mengatur navigasi Single Page Application (SPA),
 * sistem toast, modal level up, pengaturan profil, dan interaksi UI global.
 */

class SiberunaApp {
  constructor() {
    this.currentView = "home";
    this.audioCtx = null;
    this.init();
  }

  init() {
    this.initTheme();
    this.initRouter();
    this.initSidebar();
    this.initAudioContext();
    this.initGlobalListeners();
    this.updateHeaderStats();

    // Export helper global
    window.showAchievementToast = (ach) => this.showAchievementToast(ach);
    window.showLevelUpModal = (levelInfo) => this.showLevelUpModal(levelInfo);

    // Initial render based on hash
    const initialHash = window.location.hash.replace("#", "") || "home";
    this.navigateTo(initialHash);
  }

  // Sistem Dark Mode & Light Mode
  initTheme() {
    const theme = window.cyberStorage ? window.cyberStorage.getTheme() : "dark";
    this.applyTheme(theme);
  }

  setTheme(theme) {
    if (theme !== "dark" && theme !== "light") return;
    if (window.cyberStorage) {
      window.cyberStorage.setTheme(theme);
    }
    this.applyTheme(theme);
    this.updateThemeButtons(theme);
    this.showToast(
      "Tema Diperbarui",
      theme === "light" ? "Mode Terang (Light Mode) aktif." : "Mode Gelap (Dark Mode) aktif.",
      "info"
    );
  }

  applyTheme(theme) {
    const htmlEl = document.documentElement;
    if (theme === "light") {
      htmlEl.classList.remove("dark");
      htmlEl.classList.add("light");
    } else {
      htmlEl.classList.remove("light");
      htmlEl.classList.add("dark");
    }
  }

  updateThemeButtons(theme) {
    const btnDark = document.getElementById("theme-btn-dark");
    const btnLight = document.getElementById("theme-btn-light");
    if (!btnDark || !btnLight) return;

    if (theme === "light") {
      btnLight.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30";
      btnDark.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-500 hover:text-slate-900";
    } else {
      btnDark.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30";
      btnLight.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-400 hover:text-white";
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Router SPA berbasis URL Hash
  initRouter() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "") || "home";
      this.switchView(hash);
    });
  }

  navigateTo(viewId, param = null) {
    window.location.hash = `#${viewId}`;
    if (param && viewId === "learning" && window.learningController) {
      setTimeout(() => {
        window.learningController.openModule(param);
      }, 50);
    }
  }

  switchView(viewId) {
    const validViews = [
      "home", "dashboard", "learning", "phishing",
      "password", "quiz", "challenge", "achievement", "profile"
    ];

    if (!validViews.includes(viewId)) {
      viewId = "home";
    }

    this.currentView = viewId;

    // Sembunyikan semua view section
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
      sec.style.display = "none";
    });

    // Tampilkan view yang aktif
    const targetEl = document.getElementById(`${viewId}-view`);
    if (targetEl) {
      targetEl.classList.add("active");
      targetEl.style.display = "block";
    }

    // Perbarui status aktif pada link navigasi desktop & mobile
    document.querySelectorAll(".nav-link").forEach(link => {
      const targetHash = link.getAttribute("data-view");
      if (targetHash === viewId) {
        link.classList.add("active", "text-cyan-400", "font-bold");
        link.classList.remove("text-slate-400");
      } else {
        link.classList.remove("active", "text-cyan-400", "font-bold");
        link.classList.add("text-slate-400");
      }
    });

    // Indikator aktif pada kartu user sidebar jika sedang di profile
    const userCard = document.getElementById("sidebar-user-card");
    if (userCard) {
      if (viewId === "profile") {
        userCard.classList.add("border-cyan-500/60", "bg-cyan-500/10");
      } else {
        userCard.classList.remove("border-cyan-500/60", "bg-cyan-500/10");
      }
    }

    // Scroll ke atas dengan halus
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Trigger controller render masing-masing view
    this.dispatchViewRender(viewId);

    // Perbarui indikator breadcrumb view aktif di top header
    const viewTitles = {
      home: "Home",
      dashboard: "Dashboard",
      learning: "Learning Center",
      phishing: "Phishing Simulator",
      password: "Password Checker",
      quiz: "Cyber Quiz",
      challenge: "Cyber Challenge",
      achievement: "Achievement",
      profile: "Profil & Setelan"
    };
    const viewTitleEl = document.getElementById("top-header-view-title");
    if (viewTitleEl) {
      viewTitleEl.textContent = viewTitles[viewId] || viewId;
    }

    // Tutup drawer jika di layar mobile (< 1024px)
    if (window.innerWidth < 1024) {
      this.closeMobileMenu();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  dispatchViewRender(viewId) {
    switch (viewId) {
      case "dashboard":
        if (window.dashboardController) window.dashboardController.render();
        break;
      case "learning":
        if (window.learningController) window.learningController.render();
        break;
      case "phishing":
        if (window.phishingController) window.phishingController.render();
        break;
      case "password":
        if (window.passwordCheckerController) window.passwordCheckerController.render();
        break;
      case "quiz":
        if (window.quizController) window.quizController.render();
        break;
      case "challenge":
        if (window.challengeController) window.challengeController.render();
        break;
      case "achievement":
        if (window.achievementController) window.achievementController.render();
        break;
      case "profile":
        this.renderProfileView();
        break;
      case "home":
        this.updateHomeStats();
        break;
    }
  }

  // Update statistik pada Sidebar & Mobile Header
  updateHeaderStats() {
    const state = window.cyberStorage.getState();
    const stats = state.stats;
    const levelInfo = window.cyberStorage.calculateLevel(stats.totalXP);

    const xpBadgeEl = document.getElementById("header-xp-badge");
    const levelBadgeEl = document.getElementById("header-level-badge");
    const userNameEl = document.getElementById("header-user-name");

    const mobXpBadgeEl = document.getElementById("mobile-header-xp-badge");
    const mobLevelBadgeEl = document.getElementById("mobile-header-level-badge");

    if (xpBadgeEl) xpBadgeEl.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (levelBadgeEl) levelBadgeEl.innerHTML = `<span>${levelInfo.badge} Lv.${levelInfo.level}</span>`;
    if (userNameEl) userNameEl.textContent = state.user.name || "Cyber Explorer";

    if (mobXpBadgeEl) mobXpBadgeEl.textContent = `${stats.totalXP.toLocaleString()} XP`;
    if (mobLevelBadgeEl) mobLevelBadgeEl.innerHTML = `<span>${levelInfo.badge} Lv.${levelInfo.level}</span>`;
  }

  // Update statistik di Landing Page Hero
  updateHomeStats() {
    const state = window.cyberStorage.getState();
    const stats = state.stats;

    const heroModCount = document.getElementById("hero-mod-count");
    const heroXpCount = document.getElementById("hero-xp-count");
    const heroChalCount = document.getElementById("hero-chal-count");

    if (heroModCount) heroModCount.textContent = `${stats.completedModules.length}/8`;
    if (heroXpCount) heroXpCount.textContent = `${stats.totalXP.toLocaleString()}`;
    if (heroChalCount) heroChalCount.textContent = `${stats.completedChallenges.length}/5`;
  }

  initGlobalListeners() {
    const handleStateChange = () => {
      this.updateHeaderStats();
      if (this.currentView === "home") this.updateHomeStats();
    };
    window.addEventListener("siberuna:stateChanged", handleStateChange);
    window.addEventListener("cyberquest:stateChanged", handleStateChange);
  }

  // Sistem Buka / Tutup Sidebar (Desktop & Mobile)
  initSidebar() {
    // Muat preferensi status sidebar desktop dari localStorage
    try {
      const savedCollapsed = localStorage.getItem("siberuna_sidebar_collapsed");
      if (savedCollapsed === "true" && window.innerWidth >= 1024) {
        document.body.classList.add("sidebar-collapsed");
      }
    } catch (e) {
      console.warn("Akses localStorage dibatasi:", e);
    }

    // Tombol Toggle di Header Atas (Desktop & Mobile)
    const toggleBtn = document.getElementById("sidebar-toggle-btn") || document.getElementById("mobile-menu-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleSidebar());
    }

    // Tombol Tutup di dalam Sidebar (Desktop chevron & Mobile close)
    const closeBtn = document.getElementById("sidebar-close-btn") || document.getElementById("mobile-menu-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeSidebar());
    }

    // Backdrop di Mobile
    const backdrop = document.getElementById("mobile-menu-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => this.closeMobileMenu());
    }

    // Keyboard Shortcut Ctrl+B / Cmd+B untuk Buka/Tutup Sidebar di Desktop
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag !== "input" && activeTag !== "textarea") {
          e.preventDefault();
          this.toggleSidebar();
        }
      }
    });

    // Listener Resize Window untuk membersihkan lock scroll jika beralih ke desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        document.body.classList.remove("overflow-hidden");
        const backdropEl = document.getElementById("mobile-menu-backdrop");
        if (backdropEl) backdropEl.classList.add("hidden");
      }
    });
  }

  // Alias kompatibilitas
  initMobileMenu() {
    this.initSidebar();
  }

  // Toggle Buka / Tutup Sidebar
  toggleSidebar() {
    const isDesktop = window.innerWidth >= 1024;
    const sidebar = document.getElementById("app-sidebar") || document.getElementById("mobile-menu-drawer");
    const backdrop = document.getElementById("mobile-menu-backdrop");

    if (isDesktop) {
      // Toggle di Layar Desktop / Laptop
      const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
      try {
        localStorage.setItem("siberuna_sidebar_collapsed", isCollapsed ? "true" : "false");
      } catch (e) {}
    } else {
      // Toggle di Layar Mobile
      if (sidebar) {
        const isClosed = sidebar.classList.contains("-translate-x-full");
        if (isClosed) {
          sidebar.classList.remove("-translate-x-full", "translate-x-full");
          if (backdrop) backdrop.classList.remove("hidden");
          document.body.classList.add("overflow-hidden");
        } else {
          this.closeMobileMenu();
        }
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Tutup Sidebar (baik di Desktop maupun Mobile)
  closeSidebar() {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      document.body.classList.add("sidebar-collapsed");
      try {
        localStorage.setItem("siberuna_sidebar_collapsed", "true");
      } catch (e) {}
    } else {
      this.closeMobileMenu();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Buka Sidebar (baik di Desktop maupun Mobile)
  openSidebar() {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      document.body.classList.remove("sidebar-collapsed");
      try {
        localStorage.setItem("siberuna_sidebar_collapsed", "false");
      } catch (e) {}
    } else {
      const sidebar = document.getElementById("app-sidebar") || document.getElementById("mobile-menu-drawer");
      const backdrop = document.getElementById("mobile-menu-backdrop");
      if (sidebar) sidebar.classList.remove("-translate-x-full", "translate-x-full");
      if (backdrop) backdrop.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Khusus penutupan drawer mobile
  closeMobileMenu() {
    const sidebar = document.getElementById("app-sidebar") || document.getElementById("mobile-menu-drawer");
    const backdrop = document.getElementById("mobile-menu-backdrop");
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-full");
    }
    if (backdrop) backdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  // Audio Context
  initAudioContext() {
    // Dinonaktifkan sesuai permintaan pengguna
  }

  playSound(type = "click") {
    // Dinonaktifkan: tidak ada suara atau musik ketika diklik
    return;
  }

  // Toast Notification System
  showToast(title, message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item p-4 rounded-2xl border text-xs max-w-sm flex items-start gap-3 backdrop-blur-md ${
      type === 'success' 
        ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-200' 
        : type === 'warning'
        ? 'bg-slate-900/90 border-amber-500/40 text-amber-200'
        : type === 'error'
        ? 'bg-slate-900/90 border-rose-500/40 text-rose-200'
        : 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'
    }`;

    let icon = "info";
    if (type === "success") icon = "check-circle";
    if (type === "warning") icon = "alert-triangle";
    if (type === "error") icon = "alert-octagon";

    toast.innerHTML = `
      <div class="shrink-0 mt-0.5">
        <i data-lucide="${icon}" class="w-4 h-4"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h5 class="font-bold text-white mb-0.5">${this.escapeHTML(title)}</h5>
        <p class="text-slate-300 leading-snug">${this.escapeHTML(message)}</p>
      </div>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Achievement Unlock Toast Khusus
  showAchievementToast(ach) {
    this.showToast(`Achievement Terbuka: ${ach.title}`, `${ach.description} (+${ach.xpReward} XP)`, "success");
  }

  // Level Up Celebration Modal
  showLevelUpModal(levelInfo) {
    let modal = document.getElementById("level-up-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "level-up-modal";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="cyber-card rounded-3xl p-8 max-w-sm w-full border border-cyan-500/50 text-center relative overflow-hidden animate-slide-up shadow-2xl shadow-cyan-500/20">
        <div class="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="text-6xl mb-4 animate-bounce">${levelInfo.badge}</div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-widest">
          LEVEL UP!
        </span>
        <h3 class="text-2xl font-black text-white mt-3 mb-1">
          Level ${levelInfo.level}: ${levelInfo.title}
        </h3>
        <p class="text-xs text-slate-300 mb-6 leading-relaxed">
          Selamat! Reputasi dan kecakapan keamanan siber Anda telah meningkat ke tingkatan baru.
        </p>

        <button onclick="document.getElementById('level-up-modal').remove()"
                class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm transition shadow-lg shadow-cyan-500/30">
          Lanjutkan Perjuangan
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Halaman Profil & Settings
  renderProfileView() {
    const state = window.cyberStorage.getState();
    const user = state.user;
    const stats = state.stats;
    const levelInfo = window.cyberStorage.calculateLevel(stats.totalXP);

    const nameInput = document.getElementById("profile-name-input");
    const soundToggle = document.getElementById("profile-sound-toggle");
    const levelBadge = document.getElementById("profile-level-badge");
    const totalXpDisplay = document.getElementById("profile-total-xp");
    const detailStatsEl = document.getElementById("profile-detailed-stats");

    if (nameInput) nameInput.value = user.name || "Cyber Explorer";
    if (soundToggle) soundToggle.checked = false;

    // Sinkronkan status tombol tema
    const currentTheme = user.theme || (window.cyberStorage ? window.cyberStorage.getTheme() : "dark");
    this.updateThemeButtons(currentTheme);

    if (levelBadge) {
      levelBadge.innerHTML = `
        <span class="text-2xl">${levelInfo.badge}</span>
        <div>
          <h4 class="text-base font-bold text-white">Level ${levelInfo.level}: ${levelInfo.title}</h4>
          <span class="text-xs text-cyan-400 font-medium">${stats.totalXP.toLocaleString()} Total XP</span>
        </div>
      `;
    }
    if (totalXpDisplay) totalXpDisplay.textContent = stats.totalXP.toLocaleString();

    if (detailStatsEl) {
      detailStatsEl.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-[11px] text-slate-500 block uppercase font-semibold">Modul Selesai</span>
            <span class="text-xl font-bold text-white mt-1 block">${stats.completedModules.length} / 8</span>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-[11px] text-slate-500 block uppercase font-semibold">Tantangan Lulus</span>
            <span class="text-xl font-bold text-white mt-1 block">${stats.completedChallenges.length} / 5</span>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-[11px] text-slate-500 block uppercase font-semibold">Phishing Terdeteksi</span>
            <span class="text-xl font-bold text-white mt-1 block">${stats.identifiedPhishing.length} / 8</span>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span class="text-[11px] text-slate-500 block uppercase font-semibold">Skor Kuis Terbaik</span>
            <span class="text-xl font-bold text-white mt-1 block">${stats.highestQuizScore || 0}%</span>
          </div>
        </div>
      `;
    }
  }

  // Simpan Perubahan Profil
  saveProfileSettings() {
    const nameInput = document.getElementById("profile-name-input");
    const newName = nameInput ? nameInput.value : "Cyber Explorer";
    const currentTheme = window.cyberStorage ? window.cyberStorage.getTheme() : "dark";

    window.cyberStorage.updateProfile(newName, null, false, currentTheme);
    this.showToast("Profil Diperbarui", "Pengaturan profil berhasil disimpan.", "success");
    this.updateHeaderStats();
  }

  // Konfirmasi Reset Progres Belajar
  confirmResetProgress() {
    let modal = document.getElementById("reset-confirm-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "reset-confirm-modal";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="cyber-card rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-rose-500/40 text-center animate-slide-up shadow-2xl">
        <div class="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mx-auto mb-4 border border-rose-500/30">
          ⚠️
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Reset Seluruh Progres?</h3>
        <p class="text-xs text-slate-300 leading-relaxed mb-6">
          Tindakan ini akan menghapus seluruh perolehan XP, level, modul yang diselesaikan, dan achievement yang telah terbuka. Data yang direset tidak dapat dipulihkan.
        </p>

        <div class="flex items-center gap-3">
          <button onclick="document.getElementById('reset-confirm-modal').remove()"
                  class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition">
            Batal
          </button>
          <button onclick="window.cyberApp.executeResetProgress()"
                  class="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-lg shadow-rose-600/30"
                  style="color: #ffffff !important;">
            Ya, Reset Sekarang
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  executeResetProgress() {
    const modal = document.getElementById("reset-confirm-modal");
    if (modal) modal.remove();

    window.cyberStorage.resetProgress();
    this.showToast("Progres Direset", "Seluruh data progres pembelajaran telah dikembalikan ke awal.", "info");
    this.navigateTo("dashboard");
  }

  escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
  window.siberunaApp = new SiberunaApp();
  window.cyberApp = window.siberunaApp;
  window.CyberQuestApp = SiberunaApp;
});

