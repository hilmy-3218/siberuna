
class DashboardController {
  constructor() {
    this.container = document.getElementById("dashboard-view");
    this.initListeners();
  }

  initListeners() {
    const handleState = () => {
      if (window.location.hash === "#dashboard" || (!window.location.hash && this.container?.classList.contains("active"))) {
        this.render();
      }
    };
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  render() {
    const state = window.cyberStorage.getState();
    const user = state.user;
    const stats = state.stats;
    const levelInfo = window.cyberStorage.calculateLevel(stats.totalXP);

    // 1. Sapaan pengguna
    const greetingEl = document.getElementById("dash-greeting");
    if (greetingEl) {
      const hours = new Date().getHours();
      let timeGreeting = "Selamat Datang";
      if (hours < 11) timeGreeting = "Selamat Pagi";
      else if (hours < 15) timeGreeting = "Selamat Siang";
      else if (hours < 18) timeGreeting = "Selamat Sore";
      else timeGreeting = "Selamat Malam";

      greetingEl.innerHTML = `
        <span class="text-slate-400 text-xs sm:text-sm font-medium tracking-wide uppercase block">${timeGreeting}, Agen Siber</span>
        <h1 class="text-xl sm:text-3xl font-extrabold text-white mt-1 break-words leading-tight">
          ${this.escapeHTML(user.name)}! <span class="inline-block animate-pulse-subtle">${levelInfo.badge}</span>
        </h1>
      `;
    }

    // 2. Level Badge & XP Progress
    const levelCardEl = document.getElementById("dash-level-card");
    if (levelCardEl) {
      const isMaxLevel = levelInfo.maxXp === Infinity;
      levelCardEl.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
              ${levelInfo.badge}
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span class="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider whitespace-nowrap">
                  Level ${levelInfo.level}
                </span>
                <span class="text-sm font-semibold text-slate-200 truncate">${levelInfo.title}</span>
              </div>
              <div class="text-xs text-slate-400 mt-0.5">
                ${stats.totalXP.toLocaleString()} XP Terkumpul
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between sm:block sm:text-right pt-3 sm:pt-0 border-t border-slate-800/70 sm:border-0">
            <div class="text-xs text-slate-400">Target Level ${isMaxLevel ? 'MAX' : levelInfo.level + 1}</div>
            <div class="text-sm font-bold text-cyan-400">
              ${isMaxLevel ? 'Maksimal' : `${levelInfo.xpToNext} XP lagi`}
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-slate-800/80 rounded-full h-2.5 sm:h-3 p-0.5 border border-slate-700/60 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 h-full rounded-full transition-all duration-700 ease-out"
               style="width: ${levelInfo.progressPercent}%;"></div>
        </div>
        <div class="flex justify-between items-center gap-2 text-[10px] sm:text-[11px] text-slate-500 mt-1.5 font-medium">
          <span class="whitespace-nowrap">${levelInfo.minXp} XP</span>
          <span class="text-center truncate">
            ${isMaxLevel ? 'Level Maksimal Tercapai' : `${levelInfo.progressPercent}% Menuju Level ${levelInfo.level + 1}`}
          </span>
          <span class="whitespace-nowrap">${isMaxLevel ? '∞' : `${levelInfo.maxXp} XP`}</span>
        </div>
      `;
    }

    // 3. Stat Cards
    const completedModCount = stats.completedModules.length;
    const totalModules = (typeof CYBER_MODULES !== "undefined") ? CYBER_MODULES.length : 8;
    const modPercent = Math.round((completedModCount / totalModules) * 100);

    const completedChalCount = stats.completedChallenges.length;
    const totalChallenges = (typeof SCENARIO_CHALLENGES !== "undefined") ? SCENARIO_CHALLENGES.length : 5;

    const identifiedPhishCount = stats.identifiedPhishing.length;
    const totalPhish = (typeof PHISHING_CASES !== "undefined") ? PHISHING_CASES.length : 8;

    const quizCount = stats.quizHistory.length;
    const avgScore = quizCount > 0
      ? Math.round(stats.quizHistory.reduce((acc, q) => acc + q.percentage, 0) / quizCount)
      : 0;

    const statsGridEl = document.getElementById("dash-stats-grid");
    if (statsGridEl) {
      // Grid responsif: 2 kolom di HP, 4 kolom di desktop
      statsGridEl.className = "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4";

      statsGridEl.innerHTML = `
        <!-- Modul Belajar Card -->
        <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between min-w-0">
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">Modul Tuntas</span>
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <i data-lucide="book-open" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </div>
          </div>
          <div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span class="text-2xl sm:text-3xl font-extrabold text-white">${completedModCount}</span>
              <span class="text-[11px] sm:text-xs text-slate-500">/ ${totalModules} Modul</span>
            </div>
            <div class="mt-2 text-[11px] sm:text-xs text-blue-400 font-medium leading-snug">
              ${modPercent}% Kurikulum Selesai
            </div>
          </div>
        </div>

        <!-- Tantangan Kasus Card -->
        <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between min-w-0">
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">Tantangan Siber</span>
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </div>
          </div>
          <div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span class="text-2xl sm:text-3xl font-extrabold text-white">${completedChalCount}</span>
              <span class="text-[11px] sm:text-xs text-slate-500">/ ${totalChallenges} Skenario</span>
            </div>
            <div class="mt-2 text-[11px] sm:text-xs text-amber-400 font-medium leading-snug">
              +${completedChalCount * 40} XP Diperoleh
            </div>
          </div>
        </div>

        <!-- Phishing Detection Card -->
        <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between min-w-0">
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">Phishing Terdeteksi</span>
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <i data-lucide="mail-warning" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </div>
          </div>
          <div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span class="text-2xl sm:text-3xl font-extrabold text-white">${identifiedPhishCount}</span>
              <span class="text-[11px] sm:text-xs text-slate-500">/ ${totalPhish} Kasus</span>
            </div>
            <div class="mt-2 text-[11px] sm:text-xs text-rose-400 font-medium leading-snug">
              Akurasi Investigasi
            </div>
          </div>
        </div>

        <!-- Rata-rata Kuis Card -->
        <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between min-w-0">
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">Rata-rata Kuis</span>
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </div>
          </div>
          <div>
            <div class="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span class="text-2xl sm:text-3xl font-extrabold text-white">${avgScore}%</span>
              <span class="text-[11px] sm:text-xs text-slate-500">${quizCount}x Kuis</span>
            </div>
            <div class="mt-2 text-[11px] sm:text-xs text-emerald-400 font-medium leading-snug">
              Skor Tertinggi: ${stats.highestQuizScore || 0}%
            </div>
          </div>
        </div>
      `;
    }

    // 4. Learning Path (Modul berikutnya yang belum tuntas)
    const learningPathEl = document.getElementById("dash-learning-path");
    if (learningPathEl && typeof CYBER_MODULES !== "undefined") {
      const nextModule = CYBER_MODULES.find(m => !stats.completedModules.includes(m.id)) || CYBER_MODULES[0];
      const isAllDone = stats.completedModules.length >= CYBER_MODULES.length;

      learningPathEl.innerHTML = `
        <div class="cyber-card rounded-2xl p-4 sm:p-6 border border-slate-800 relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
            <div class="flex items-start gap-3 sm:gap-4 min-w-0">
              <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${nextModule.color} flex items-center justify-center text-white text-xl shadow-lg shrink-0">
                <i data-lucide="${nextModule.icon}" class="w-5 h-5 sm:w-6 sm:h-6"></i>
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span class="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${nextModule.badgeColor}">
                    ${isAllDone ? 'Semua Tuntas 🎉' : 'Rekomendasi Lanjutan'}
                  </span>
                  <span class="text-[11px] sm:text-xs text-slate-400">• ${nextModule.duration}</span>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-white mt-1.5 leading-snug break-words">${nextModule.title}</h3>
                <p class="text-xs text-slate-400 mt-1 line-clamp-2 lg:max-w-xl">
                  ${nextModule.summary}
                </p>
              </div>
            </div>

            <button onclick="window.cyberApp.navigateTo('learning', '${nextModule.id}')"
                    class="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0">
              <span>${isAllDone ? 'Tinjau Materi' : 'Lanjutkan Belajar'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }

    // 5. Daily Challenge Card
    const dailyChallengeEl = document.getElementById("dash-daily-challenge");
    if (dailyChallengeEl) {
      // Rotasi daily challenge berbasis hari
      const dayIndex = new Date().getDay();
      const dailyTasks = [
        { title: "Evaluasi Password Master", desc: "Uji kombinasi kata sandi di Password Checker hingga mencapai peringkat Sangat Kuat.", targetHash: "password", icon: "key" },
        { title: "Deteksi 2 Kasus Phishing", desc: "Analisis email atau pesan chat di Phishing Simulator dan temukan indikator mencurigakan.", targetHash: "phishing", icon: "shield-alert" },
        { title: "Selesaikan 1 Kuis Malware", desc: "Uji pemahaman Anda tentang virus, trojan, dan ransomware di Cyber Quiz kategori Malware.", targetHash: "quiz", icon: "bug" },
        { title: "Skenario Public Wi-Fi", desc: "Tuntaskan tantangan skenario Wi-Fi publik di Cyber Challenge untuk menguji naluri keamanan Anda.", targetHash: "challenge", icon: "wifi" },
        { title: "Pelajari Modul 2FA", desc: "Pelajari pentingnya Multi-Factor Authentication dan perbedaan Authenticator App vs SMS OTP.", targetHash: "learning", icon: "smartphone" },
        { title: "Raih Nilai Kuis 80%+", desc: "Ambil salah satu kuis pilihan dan dapatkan bonus +30 XP dengan mencetak nilai di atas 80%.", targetHash: "quiz", icon: "target" },
        { title: "Audit Privasi Jejak Digital", desc: "Selesaikan modul Digital Privacy untuk memahami cara melindungi jejak online Anda.", targetHash: "learning", icon: "eye-off" }
      ];
      const todayTask = dailyTasks[dayIndex % dailyTasks.length];

      dailyChallengeEl.innerHTML = `
        <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div class="flex items-start sm:items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <i data-lucide="${todayTask.icon}" class="w-5 h-5"></i>
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider">
                  Misi Harian
                </span>
                <span class="text-xs text-amber-400 font-semibold">+25 XP Bonus</span>
              </div>
              <h4 class="text-sm font-bold text-white mt-1 break-words">${todayTask.title}</h4>
              <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">${todayTask.desc}</p>
            </div>
          </div>
          <button onclick="window.cyberApp.navigateTo('${todayTask.targetHash}')"
                  class="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition shrink-0">
            Jalankan
          </button>
        </div>
      `;
    }

    // 6. Recent Achievements Preview
    const recentAchEl = document.getElementById("dash-recent-achievements");
    if (recentAchEl && typeof ACHIEVEMENTS_LIST !== "undefined") {
      const unlockedIds = Object.keys(state.achievements).filter(k => state.achievements[k]);
      const unlockedList = ACHIEVEMENTS_LIST.filter(a => unlockedIds.includes(a.id));

      if (unlockedList.length === 0) {
        recentAchEl.innerHTML = `
          <div class="text-center py-6 px-2 text-slate-500 text-xs leading-relaxed">
            <i data-lucide="award" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
            Belum ada achievement yang terbuka. Selesaikan modul pertama Anda untuk membuka badge 'First Step'!
          </div>
        `;
      } else {
        recentAchEl.innerHTML = unlockedList.slice(0, 3).map(ach => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 min-w-0">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-br ${ach.badgeColor} flex items-center justify-center text-white shrink-0 shadow-sm">
              <i data-lucide="${ach.icon}" class="w-4 h-4"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="text-xs font-bold text-slate-200 truncate">${ach.title}</h5>
              <p class="text-[11px] text-slate-400 truncate">${ach.description}</p>
            </div>
            <span class="text-[11px] sm:text-xs font-bold text-cyan-400 shrink-0 whitespace-nowrap">+${ach.xpReward} XP</span>
          </div>
        `).join("");
      }
    }

    // Refresh Lucide Icons
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
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

window.dashboardController = new DashboardController();