
class AchievementController {
  constructor() {
    this.currentFilter = "all"; // all | unlocked | locked
    this.initListeners();
  }

  initListeners() {
    const handleState = () => this.render();
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  render() {
    this.renderHeaderSummary();
    this.renderFilterTabs();
    this.renderAchievementGrid();
  }

  renderHeaderSummary() {
    const summaryEl = document.getElementById("achievement-summary-card");
    if (!summaryEl || typeof ACHIEVEMENTS_LIST === "undefined") return;

    const state = window.cyberStorage.getState();
    const achievements = state.achievements || {};
    const unlockedCount = Object.keys(achievements).filter(k => achievements[k]).length;
    const totalCount = ACHIEVEMENTS_LIST.length;
    const percent = Math.round((unlockedCount / totalCount) * 100);

    // Hitung total bonus XP yang didapat dari achievement
    let totalAchXP = 0;
    ACHIEVEMENTS_LIST.forEach(a => {
      if (achievements[a.id]) totalAchXP += a.xpReward;
    });

    summaryEl.innerHTML = `
      <div class="cyber-card rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white text-3xl shadow-xl shadow-amber-500/10">
            🏆
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Galeri Pencapaian & Trofi Siber</h3>
            <p class="text-xs text-slate-400 mt-1">Buka lencana kehormatan dengan menyelesaikan misi, kuis, simulasi, dan materi.</p>
            <div class="mt-2 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <span>+${totalAchXP} XP Telah Didapat Dari Pencapaian</span>
            </div>
          </div>
        </div>

        <div class="w-full sm:w-64">
          <div class="flex justify-between items-center text-xs text-slate-400 font-medium mb-1.5">
            <span>Progres Koleksi</span>
            <span class="text-white font-bold">${unlockedCount} / ${totalCount} (${percent}%)</span>
          </div>
          <div class="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/60">
            <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-700"
                 style="width: ${percent}%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderFilterTabs() {
    const container = document.getElementById("achievement-filter-tabs");
    if (!container || typeof ACHIEVEMENTS_LIST === "undefined") return;

    const state = window.cyberStorage.getState();
    const achievements = state.achievements || {};
    const unlockedCount = Object.keys(achievements).filter(k => achievements[k]).length;
    const totalCount = ACHIEVEMENTS_LIST.length;
    const lockedCount = totalCount - unlockedCount;

    const tabs = [
      { id: "all", label: `Semua (${totalCount})` },
      { id: "unlocked", label: `Terbuka (${unlockedCount})` },
      { id: "locked", label: `Terkunci (${lockedCount})` }
    ];

    container.innerHTML = tabs.map(t => `
      <button onclick="window.achievementController.setFilter('${t.id}')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                this.currentFilter === t.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }">
        ${t.label}
      </button>
    `).join("");
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.renderFilterTabs();
    this.renderAchievementGrid();
  }

  renderAchievementGrid() {
    const grid = document.getElementById("achievement-grid");
    if (!grid || typeof ACHIEVEMENTS_LIST === "undefined") return;

    const state = window.cyberStorage.getState();
    const achievements = state.achievements || {};
    const timestamps = state.achievementTimestamps || {};

    const filtered = ACHIEVEMENTS_LIST.filter(ach => {
      const isUnlocked = Boolean(achievements[ach.id]);
      if (this.currentFilter === "unlocked") return isUnlocked;
      if (this.currentFilter === "locked") return !isUnlocked;
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-500 text-xs">
          Tidak ada achievement pada kategori filter ini.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(ach => {
      const isUnlocked = Boolean(achievements[ach.id]);
      const unlockedDate = isUnlocked && timestamps[ach.id]
        ? new Date(timestamps[ach.id]).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
        : null;

      return `
        <div class="cyber-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 ${
          isUnlocked 
            ? 'border-slate-800 hover:border-cyan-500/40 bg-slate-900/70' 
            : 'border-slate-800/40 bg-slate-950/40 opacity-50 grayscale'
        }">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${isUnlocked ? ach.badgeColor : 'from-slate-800 to-slate-900'} flex items-center justify-center text-white text-xl shadow-lg">
                <i data-lucide="${ach.icon}" class="w-6 h-6"></i>
              </div>

              ${isUnlocked ? `
                <span class="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  <i data-lucide="check" class="w-3 h-3"></i> Terbuka
                </span>
              ` : `
                <span class="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-900 px-2.5 py-0.5 rounded-full">
                  <i data-lucide="lock" class="w-3 h-3"></i> Terkunci
                </span>
              `}
            </div>

            <h4 class="text-sm font-bold text-white mb-1">${ach.title}</h4>
            <p class="text-xs text-slate-400 leading-relaxed">${ach.description}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-cyan-400 font-bold">+${ach.xpReward} XP</span>
            <span class="text-[11px] text-slate-500">
              ${isUnlocked && unlockedDate ? `Didapat: ${unlockedDate}` : 'Syarat Aktivitas'}
            </span>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  }
}

window.achievementController = new AchievementController();

