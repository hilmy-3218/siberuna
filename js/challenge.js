

class ChallengeController {
  constructor() {
    this.currentChallengeIndex = 0;
    this.userDecisions = {}; // challengeId -> { optionId, isCorrect, feedback }
    this.initListeners();
  }

  initListeners() {
    const handleState = () => this.updateBadges();
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  render() {
    this.renderChallengeList();
    this.renderActiveScenario();
    this.updateBadges();
  }

  updateBadges() {
    const badgeEl = document.getElementById("challenge-progress-badge");
    if (!badgeEl || typeof SCENARIO_CHALLENGES === "undefined") return;

    const state = window.cyberStorage.getState();
    const completed = state.stats.completedChallenges || [];
    badgeEl.textContent = `${completed.length} / ${SCENARIO_CHALLENGES.length} Skenario Tuntas`;
  }

  renderChallengeList() {
    const navEl = document.getElementById("challenge-nav-list");
    if (!navEl || typeof SCENARIO_CHALLENGES === "undefined") return;

    const state = window.cyberStorage.getState();
    const completed = state.stats.completedChallenges || [];

    navEl.innerHTML = SCENARIO_CHALLENGES.map((scen, idx) => {
      const isSelected = idx === this.currentChallengeIndex;
      const isDone = completed.includes(scen.id);

      return `
        <button onclick="window.challengeController.selectChallenge(${idx})"
                class="w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 shadow-sm'
                    : isDone
                    ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'} flex items-center justify-center text-xs shrink-0 font-bold">
              ${isDone ? '✓' : idx + 1}
            </div>
            <div class="truncate">
              <h5 class="text-xs font-bold text-white truncate">${scen.title}</h5>
              <span class="text-[10px] text-slate-500">${scen.category} • ${scen.difficulty}</span>
            </div>
          </div>
          ${isDone ? '<span class="text-[10px] font-bold text-emerald-400 shrink-0 ml-2">+40 XP</span>' : ''}
        </button>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  selectChallenge(idx) {
    this.currentChallengeIndex = idx;
    this.renderChallengeList();
    this.renderActiveScenario();
  }

  renderActiveScenario() {
    const container = document.getElementById("challenge-scenario-view");
    if (!container || typeof SCENARIO_CHALLENGES === "undefined") return;

    const scen = SCENARIO_CHALLENGES[this.currentChallengeIndex];
    if (!scen) return;

    const state = window.cyberStorage.getState();
    const isCompleted = state.stats.completedChallenges.includes(scen.id);
    const decision = this.userDecisions[scen.id];

    container.innerHTML = `
      <div class="space-y-6 animate-slide-up">
        
        <!-- Scenario Header -->
        <div class="cyber-card rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ${scen.badge}
              </span>
              <span class="text-xs text-slate-400">• Level: ${scen.difficulty}</span>
            </div>

            ${isCompleted ? `
              <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Skenario Berhasil Diselesaikan (+40 XP)
              </span>
            ` : `
              <span class="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Reward: +40 XP
              </span>
            `}
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-white mb-3">${scen.title}</h3>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ${scen.scenario}
          </p>

          <!-- Bukti & Temuan Investigasi (Clues) -->
          <div class="mt-5 pt-4 border-t border-slate-800">
            <h5 class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i data-lucide="search" class="w-3.5 h-3.5"></i> Petunjuk & Temuan di Lapangan:
            </h5>
            <ul class="space-y-1.5 text-xs text-slate-300">
              ${scen.clues.map(c => `
                <li class="flex items-start gap-2">
                  <span class="text-cyan-400 font-mono">•</span>
                  <span>${c}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>

        <!-- Pertanyaan & Pilihan Tindakan -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-cyan-400"></i>
            ${scen.question}
          </h4>

          <div class="grid gap-3">
            ${scen.options.map(opt => {
              let optClass = "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700";

              if (decision) {
                if (opt.isCorrect) {
                  optClass = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
                } else if (decision.optionId === opt.id) {
                  optClass = "border-rose-500 bg-rose-500/20 text-rose-200";
                } else {
                  optClass = "border-slate-800/40 bg-slate-900/20 text-slate-600 opacity-60";
                }
              }

              return `
                <button onclick="window.challengeController.submitDecision('${opt.id}')"
                        ${decision ? 'disabled' : ''}
                        class="text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${optClass}">
                  <span class="leading-relaxed">${opt.text}</span>
                  ${decision && opt.isCorrect ? '<span class="text-emerald-400 font-bold ml-2 shrink-0">✓ Keputusan Tepat</span>' : ''}
                  ${decision && decision.optionId === opt.id && !opt.isCorrect ? '<span class="text-rose-400 font-bold ml-2 shrink-0">✗ Berisiko Fatal</span>' : ''}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Feedback & Konsekuensi Analisis -->
        ${decision ? `
          <div class="p-6 rounded-2xl border ${
            decision.isCorrect 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          } animate-slide-up space-y-3">
            <div class="flex items-center gap-2 font-bold text-sm ${decision.isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
              <i data-lucide="${decision.isCorrect ? 'check-circle' : 'alert-octagon'}" class="w-5 h-5"></i>
              <span>${decision.isCorrect ? 'Keputusan Sempurna! Ancaman Berhasil Dilumpuhkan' : 'Konsekuensi Negatif Terjadi!'}</span>
            </div>

            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ${decision.feedback}
            </p>

            <div class="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button onclick="window.challengeController.resetDecision()"
                      class="text-xs text-slate-400 hover:text-slate-200">
                Coba Opsi Lain
              </button>
              ${this.currentChallengeIndex < SCENARIO_CHALLENGES.length - 1 ? `
                <button onclick="window.challengeController.selectChallenge(${this.currentChallengeIndex + 1})"
                        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>Skenario Berikutnya</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              ` : `
                <span class="text-xs font-bold text-cyan-400">Seluruh 5 Skenario Tantangan Telah Selesai! 🎉</span>
              `}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  submitDecision(optionId) {
    const scen = SCENARIO_CHALLENGES[this.currentChallengeIndex];
    if (!scen) return;

    const chosenOption = scen.options.find(o => o.id === optionId);
    if (!chosenOption) return;

    this.userDecisions[scen.id] = {
      optionId: optionId,
      isCorrect: chosenOption.isCorrect,
      feedback: chosenOption.feedback
    };

    if (chosenOption.isCorrect) {
      window.cyberStorage.completeChallenge(scen.id);
      if (window.cyberApp) {
        window.cyberApp.showToast("Tantangan Berhasil!", `Keputusan tepat! +40 XP berhasil diraih.`, "success");
      }
    } else {
      if (window.cyberApp) {
        window.cyberApp.showToast("Keputusan Berisiko", "Tindakan yang Anda pilih menimbulkan celah keamanan.", "warning");
      }
    }

    this.renderChallengeList();
    this.renderActiveScenario();
    this.updateBadges();
  }

  resetDecision() {
    const scen = SCENARIO_CHALLENGES[this.currentChallengeIndex];
    if (scen) {
      delete this.userDecisions[scen.id];
      this.renderActiveScenario();
    }
  }
}

window.challengeController = new ChallengeController();

