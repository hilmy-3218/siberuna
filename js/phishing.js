/**
 * Siberuna - Phishing Simulator Controller
 * Mensimulasikan pesan email, SMS, dan WhatsApp nyata dengan fitur inspeksi header,
 * URL preview, evaluasi 'Aman vs Phishing', dan feedback edukasi menyeluruh.
 *
 * Versi responsif: mobile-first (320px ke atas), menyesuaikan di breakpoint sm (640px).
 */

class PhishingController {
  constructor() {
    this.currentCaseIndex = 0;
    this.userAnswers = {}; // caseId -> { decision: 'safe'|'phishing', isCorrect: bool }
    this.showInspector = false;
    this.inspectedUrl = null;

    this.initListeners();
  }

  initListeners() {
    const handleState = () => this.updateScoreBadge();
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  render() {
    this.renderCaseNavigation();
    this.renderCurrentCase();
    this.updateScoreBadge();
  }

  updateScoreBadge() {
    const badgeEl = document.getElementById("phishing-score-badge");
    if (!badgeEl || typeof PHISHING_CASES === "undefined") return;

    const state = window.cyberStorage.getState();
    const identified = state.stats.identifiedPhishing || [];
    badgeEl.textContent = `${identified.length} / ${PHISHING_CASES.length} Teridentifikasi`;
  }

  renderCaseNavigation() {
    const navEl = document.getElementById("phishing-case-nav");
    if (!navEl || typeof PHISHING_CASES === "undefined") return;

    const state = window.cyberStorage.getState();
    const identified = state.stats.identifiedPhishing || [];

    // Navigasi kasus: satu baris, bisa digeser horizontal di HP
    navEl.className = "flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1";
    navEl.style.scrollbarWidth = "none";
    navEl.style.webkitOverflowScrolling = "touch";

    navEl.innerHTML = PHISHING_CASES.map((item, idx) => {
      const isCurrent = idx === this.currentCaseIndex;
      const isDone = identified.includes(item.id);

      let iconType = "mail";
      if (item.type === "whatsapp") iconType = "message-square";
      if (item.type === "sms") iconType = "smartphone";

      return `
        <button onclick="window.phishingController.selectCase(${idx})"
                data-case-idx="${idx}"
                class="flex items-center gap-1.5 sm:gap-2 shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition border whitespace-nowrap ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : isDone
                    ? 'bg-slate-900/60 text-emerald-400 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }">
          <i data-lucide="${iconType}" class="w-3.5 h-3.5 shrink-0"></i>
          <span>Kasus #${idx + 1}</span>
          ${isDone ? '<span class="text-emerald-400 text-[10px]">✓</span>' : ''}
        </button>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();

    // Geser bar agar kasus aktif terlihat (hanya menggeser container navigasi)
    const activeBtn = navEl.querySelector(`[data-case-idx="${this.currentCaseIndex}"]`);
    if (activeBtn) {
      const target = activeBtn.offsetLeft - (navEl.clientWidth - activeBtn.offsetWidth) / 2;
      navEl.scrollLeft = Math.max(0, target);
    }
  }

  selectCase(index) {
    this.currentCaseIndex = index;
    this.showInspector = false;
    this.inspectedUrl = null;
    this.renderCaseNavigation();
    this.renderCurrentCase();

    // Di layar kecil, kembali ke awal kartu agar pesan baru terbaca dari atas
    if (window.innerWidth < 640) {
      const viewer = document.getElementById("phishing-viewer-card");
      if (viewer && typeof viewer.scrollIntoView === "function") {
        viewer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  toggleInspector() {
    this.showInspector = !this.showInspector;
    this.renderCurrentCase();
  }

  renderCurrentCase() {
    const container = document.getElementById("phishing-viewer-card");
    if (!container || typeof PHISHING_CASES === "undefined") return;

    const currentCase = PHISHING_CASES[this.currentCaseIndex];
    if (!currentCase) return;

    const answered = this.userAnswers[currentCase.id];
    const totalCases = PHISHING_CASES.length;

    let appIcon = "mail";
    let appLabel = "Email Client";
    if (currentCase.type === "whatsapp") {
      appIcon = "message-circle";
      appLabel = "WhatsApp Web Client";
    } else if (currentCase.type === "sms") {
      appIcon = "message-square";
      appLabel = "SMS Messenger";
    }

    container.innerHTML = `
      <div class="space-y-4 animate-slide-up min-w-0">

        <!-- Viewer Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div class="flex items-start sm:items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
              <i data-lucide="${appIcon}" class="w-5 h-5"></i>
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span class="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase tracking-wider">
                  ${appLabel}
                </span>
                <span class="text-[11px] sm:text-xs text-slate-400">Kasus ${this.currentCaseIndex + 1} dari ${totalCases}</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-white mt-1 leading-snug break-words">${currentCase.title}</h3>
            </div>
          </div>

          <!-- Tombol Inspeksi Header & URL -->
          <button onclick="window.phishingController.toggleInspector()"
                  class="w-full sm:w-auto shrink-0 px-3.5 py-2 sm:py-1.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                    this.showInspector
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }">
            <i data-lucide="scan" class="w-4 h-4 shrink-0"></i>
            <span>${this.showInspector ? 'Tutup Alat Inspeksi' : 'Buka Alat Inspeksi Keamanan'}</span>
          </button>
        </div>

        <!-- Panel Inspeksi (Jika Diaktifkan) -->
        ${this.showInspector ? `
          <div class="p-3 sm:p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs space-y-2 animate-slide-up">
            <div class="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] mb-1">
              <i data-lucide="shield-search" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Laporan Analisis Header & Forensik URL</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800 min-w-0">
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Domain Pengirim Asli:</span>
                <span class="font-mono text-cyan-300 font-semibold break-all">${currentCase.inspectionData.domainReal}</span>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800 min-w-0">
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Tujuan Link / Lampiran:</span>
                <span class="font-mono text-amber-300 font-semibold break-all">${currentCase.inspectionData.targetUrl}</span>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800 min-w-0">
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Indikator Tingkat Urgensi:</span>
                <span class="text-slate-200 break-words">${currentCase.inspectionData.urgency}</span>
              </div>
              <div class="p-2.5 rounded bg-slate-900 border border-slate-800 min-w-0">
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Data yang Ditargetkan:</span>
                <span class="text-slate-200 break-words">${currentCase.inspectionData.requestData}</span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Message Body Display Card -->
        <div class="mock-email-container p-4 sm:p-5 text-sm min-w-0 overflow-hidden">
          <div class="border-b border-slate-800 pb-3 mb-4 space-y-1.5">
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-3 text-xs">
              <span class="text-slate-400 min-w-0 break-words">
                Dari: <strong class="text-white">${this.escapeHTML(currentCase.senderName)}</strong>
                <span class="whitespace-normal">&lt;<span class="font-mono text-slate-300 break-all">${this.escapeHTML(currentCase.senderAddress)}</span>&gt;</span>
              </span>
              <span class="text-slate-500 text-[11px] shrink-0">${currentCase.date}</span>
            </div>
            <div class="text-xs text-slate-400 break-words">
              Kepada: <span class="text-slate-300 break-all">${this.escapeHTML(currentCase.recipient)}</span>
            </div>
            <div class="text-xs font-semibold text-slate-200 pt-1 break-words">
              Subjek: <span class="text-cyan-400">${this.escapeHTML(currentCase.subject)}</span>
            </div>
          </div>

          <!-- HTML Content of the simulated message -->
          <div id="phishing-message-content"
               class="text-slate-200 text-[13px] sm:text-sm leading-relaxed space-y-3 break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_table]:max-w-full [&_a]:break-all">
            ${currentCase.body}
          </div>

          <!-- Status Bar Hover Simulator -->
          <div id="url-status-bar" class="mt-4 pt-2 border-t border-slate-800/80 text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-start gap-1.5">
            <i data-lucide="link-2" class="w-3.5 h-3.5 shrink-0 mt-0.5"></i>
            <span id="url-status-text" class="min-w-0 break-all">Arahkan kursor atau sentuh tautan di atas untuk melihat URL tujuan</span>
          </div>
        </div>

        <!-- Tombol Keputusan Pengguna (Aman vs Phishing) -->
        <div class="pt-2">
          ${answered ? `
            <!-- Hasil Evaluasi Jawaban -->
            <div class="p-4 sm:p-5 rounded-2xl border ${
              answered.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-rose-500/10 border-rose-500/30'
            } animate-slide-up">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                <div class="flex items-start gap-2 font-bold text-sm ${answered.isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                  <i data-lucide="${answered.isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 shrink-0"></i>
                  <span class="leading-snug">${answered.isCorrect ? 'Analisis Tepat! Anda Mengidentifikasi Kasus Ini Dengan Benar (+15 XP)' : 'Analisis Kurang Tepat!'}</span>
                </div>
                <span class="self-start sm:self-auto shrink-0 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${currentCase.isPhishing ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}">
                  Sebenarnya: ${currentCase.isPhishing ? '🚨 Pesan Phishing' : '✅ Pesan Resmi (Aman)'}
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                ${currentCase.safeExplanation}
              </p>

              ${currentCase.redFlags && currentCase.redFlags.length > 0 ? `
                <div class="mt-3 pt-3 border-t border-slate-800">
                  <span class="text-xs font-bold text-amber-300 block mb-1.5">🚩 Indikator Bahaya (Red Flags) yang Terdeteksi:</span>
                  <ul class="list-disc pl-4 text-xs text-slate-300 space-y-1 leading-relaxed">
                    ${currentCase.redFlags.map(rf => `<li>${rf}</li>`).join("")}
                  </ul>
                </div>
              ` : ''}

              <!-- Navigasi Next Case -->
              <div class="mt-4 pt-3 border-t border-slate-800 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                <button onclick="window.phishingController.resetCurrentCase()"
                        class="text-xs text-slate-400 hover:text-slate-200 py-2 sm:py-0 text-center sm:text-left">
                  Coba Analisis Ulang Kasus Ini
                </button>
                ${this.currentCaseIndex < totalCases - 1 ? `
                  <button onclick="window.phishingController.selectCase(${this.currentCaseIndex + 1})"
                          class="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition">
                    <span>Kasus Berikutnya</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                  </button>
                ` : `
                  <span class="text-xs text-cyan-400 font-semibold text-center sm:text-right">Semua kasus telah Anda tinjau! 🎉</span>
                `}
              </div>
            </div>
          ` : `
            <!-- Decision Buttons -->
            <div class="cyber-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div class="min-w-0">
                <h4 class="text-sm font-bold text-white">Bagaimana Keputusan Anda?</h4>
                <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">Tentukan apakah pesan di atas aman atau merupakan upaya penipuan/phishing siber.</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
                <button onclick="window.phishingController.submitDecision('safe')"
                        class="px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20">
                  <i data-lucide="shield-check" class="w-4 h-4 shrink-0"></i>
                  <span>Ini Pesan Aman (Resmi)</span>
                </button>

                <button onclick="window.phishingController.submitDecision('phishing')"
                        class="px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20">
                  <i data-lucide="shield-alert" class="w-4 h-4 shrink-0"></i>
                  <span>Waspada! Ini Phishing</span>
                </button>
              </div>
            </div>
          `}
        </div>

      </div>
    `;

    // Pasang listener hover untuk tautan di dalam body pesan
    this.attachLinkHoverListeners();

    if (window.lucide) window.lucide.createIcons();
  }

  attachLinkHoverListeners() {
    const links = document.querySelectorAll("#phishing-message-content .mock-link");
    const statusText = document.getElementById("url-status-text");

    const showUrl = (url) => {
      if (!statusText) return;
      statusText.textContent = `Tujuan Asli Link: ${url}`;
      statusText.classList.remove("text-slate-500");
      statusText.classList.add("text-cyan-300", "font-bold");
    };

    const resetUrl = () => {
      if (!statusText) return;
      statusText.textContent = "Arahkan kursor atau sentuh tautan di atas untuk melihat URL tujuan";
      statusText.classList.add("text-slate-500");
      statusText.classList.remove("text-cyan-300", "font-bold");
    };

    links.forEach(link => {
      const url = link.getAttribute("data-url");

      link.addEventListener("mouseenter", () => showUrl(url));
      link.addEventListener("mouseleave", resetUrl);

      link.addEventListener("click", (e) => {
        e.preventDefault();
        // Di layar sentuh tidak ada hover, jadi URL ditampilkan juga saat tap
        showUrl(url);
        if (window.cyberApp) {
          window.cyberApp.showToast("Inspeksi Tautan", `URL tujuan tersembunyi: ${url}`, "info");
        }
      });
    });
  }

  submitDecision(decision) {
    const currentCase = PHISHING_CASES[this.currentCaseIndex];
    if (!currentCase) return;

    const isTargetPhishing = currentCase.isPhishing;
    const isCorrect = (decision === "phishing" && isTargetPhishing) || (decision === "safe" && !isTargetPhishing);

    this.userAnswers[currentCase.id] = {
      decision: decision,
      isCorrect: isCorrect
    };

    if (isCorrect) {
      window.cyberStorage.recordPhishingIdentification(currentCase.id);
      if (window.cyberApp) {
        window.cyberApp.showToast("Analisis Tepat!", "Keputusan Anda benar! +15 XP", "success");
      }
    } else {
      if (window.cyberApp) {
        window.cyberApp.showToast("Analisis Kurang Tepat", "Periksa indikator red flags untuk memahami celahnya.", "warning");
      }
    }

    this.renderCaseNavigation();
    this.renderCurrentCase();
    this.updateScoreBadge();
  }

  resetCurrentCase() {
    const currentCase = PHISHING_CASES[this.currentCaseIndex];
    if (currentCase) {
      delete this.userAnswers[currentCase.id];
      this.renderCurrentCase();
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

window.phishingController = new PhishingController();