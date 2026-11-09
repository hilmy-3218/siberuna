/**
 * Siberuna - Learning Center Controller
 * Menangani daftar modul, filter kategori, pencarian,
 * pembaca materi interaktif, dan kuis evaluasi kelulusan modul (+50 XP).
 */

class LearningController {
  constructor() {
    this.currentCategory = "all";
    this.searchQuery = "";
    this.activeModule = null;
    this.activeTab = "materi"; // materi | kasus | tips | kuis
    this.quizAnswers = {};     // questionIndex -> selectedOptionIndex
    this.quizSubmitted = false;

    this.initListeners();
  }

  initListeners() {
    // Listener perubahan state untuk update status centang modul selesai
    const handleState = () => this.renderModuleGrid();
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  // Render daftar modul di Learning Center
  render() {
    this.renderCategoryPills();
    this.renderModuleGrid();
  }

  renderCategoryPills() {
    const container = document.getElementById("learning-categories");
    if (!container) return;

    const categories = [
      { id: "all", label: "Semua Kategori" },
      { id: "Dasar", label: "Dasar" },
      { id: "Ancaman", label: "Ancaman" },
      { id: "Proteksi", label: "Proteksi" },
      { id: "Praktik", label: "Praktik" },
      { id: "Privasi", label: "Privasi" }
    ];

    container.innerHTML = categories.map(cat => `
      <button onclick="window.learningController.setCategory('${cat.id}')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                this.currentCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }">
        ${cat.label}
      </button>
    `).join("");
  }

  setCategory(catId) {
    this.currentCategory = catId;
    this.renderCategoryPills();
    this.renderModuleGrid();
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.renderModuleGrid();
  }

  renderModuleGrid() {
    const grid = document.getElementById("learning-module-grid");
    if (!grid || typeof CYBER_MODULES === "undefined") return;

    const state = window.cyberStorage.getState();
    const completedIds = state.stats.completedModules || [];

    // Filter modul berdasarkan kategori dan pencarian
    const filtered = CYBER_MODULES.filter(mod => {
      const matchCat = (this.currentCategory === "all") || (mod.category === this.currentCategory);
      const matchSearch = !this.searchQuery ||
        mod.title.toLowerCase().includes(this.searchQuery) ||
        mod.summary.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-500 text-sm">
          <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
          Tidak ada modul yang cocok dengan pencarian Anda.
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(mod => {
      const isCompleted = completedIds.includes(mod.id);

      return `
        <div class="cyber-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
             onclick="window.learningController.openModule('${mod.id}')">

          <!-- Top row -->
          <div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${mod.badgeColor}">
                  ${mod.category}
                </span>
                <span class="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60">
                  ${mod.level}
                </span>
              </div>

              ${isCompleted ? `
                <span class="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Selesai
                </span>
              ` : `
                <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${mod.duration}
                </span>
              `}
            </div>

            <!-- Icon & Title -->
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
                <i data-lucide="${mod.icon}" class="w-6 h-6"></i>
              </div>
              <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                ${mod.title}
              </h3>
            </div>

            <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
              ${mod.summary}
            </p>
          </div>

          <!-- Bottom Button -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
            <span class="text-cyan-400 flex items-center gap-1">
              <span>+50 XP Modul</span>
            </span>
            <div class="flex items-center gap-1 text-slate-300 group-hover:text-cyan-400 transition-colors">
              <span>${isCompleted ? 'Pelajari Ulang' : 'Buka Modul'}</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  // Buka Pembaca Modul Interaktif Modal
  openModule(moduleId) {
    if (typeof CYBER_MODULES === "undefined") return;
    const mod = CYBER_MODULES.find(m => m.id === moduleId);
    if (!mod) return;

    this.activeModule = mod;
    this.activeTab = "materi";
    this.quizAnswers = {};
    this.quizSubmitted = false;

    // Tampilkan modal lebih dulu agar ukuran elemen (tab) terhitung dengan benar
    const modalEl = document.getElementById("module-reader-modal");
    if (modalEl) {
      modalEl.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }

    this.renderModuleModal();
  }

  closeModuleModal() {
    const modalEl = document.getElementById("module-reader-modal");
    if (modalEl) {
      modalEl.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // PERBAIKAN: render ulang tombol tab agar class "active" ikut berpindah
  setModalTab(tab) {
    this.activeTab = tab;
    this.renderModalTabs();     // perbarui class aktif pada tombol tab
    this.renderModalContent();  // perbarui isi tab

    // Kembali ke atas saat pindah tab
    const contentEl = document.getElementById("modal-module-content");
    if (contentEl) contentEl.scrollTop = 0;
  }

  renderModuleModal() {
    const mod = this.activeModule;
    if (!mod) return;

    const modalTitleEl = document.getElementById("modal-module-title");
    const modalMetaEl = document.getElementById("modal-module-meta");

    if (modalTitleEl) modalTitleEl.textContent = mod.title;
    if (modalMetaEl) {
      modalMetaEl.innerHTML = `
        <span class="px-2 py-0.5 rounded text-[11px] font-bold ${mod.badgeColor}">${mod.category}</span>
        <span class="text-xs text-slate-400">• Level: ${mod.level}</span>
        <span class="text-xs text-slate-400">• Durasi: ${mod.duration}</span>
      `;
    }

    this.renderModalTabs();
    this.renderModalContent();
  }

  renderModalTabs() {
    const tabsContainer = document.getElementById("modal-module-tabs");
    if (!tabsContainer) return;

    const tabs = [
      { id: "materi", label: "Materi Belajar", short: "Materi", icon: "book-open" },
      { id: "kasus", label: "Studi Kasus Nyata", short: "Kasus", icon: "alert-triangle" },
      { id: "tips", label: "Tips Pencegahan", short: "Tips", icon: "shield-check" },
      { id: "kuis", label: "Kuis Evaluasi (3 Soal)", short: "Kuis", icon: "help-circle" }
    ];

    // Container tab: selalu satu baris, tidak ikut menyusut, dan bisa digeser horizontal di HP
    tabsContainer.className = "flex flex-nowrap items-stretch w-full shrink-0 overflow-x-auto overflow-y-hidden border-b border-slate-800 bg-slate-950/40";
    tabsContainer.style.scrollbarWidth = "none";
    tabsContainer.style.webkitOverflowScrolling = "touch";

    tabsContainer.innerHTML = tabs.map(t => `
      <button onclick="window.learningController.setModalTab('${t.id}')"
              data-tab="${t.id}"
              aria-selected="${this.activeTab === t.id}"
              class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 shrink-0 py-3 px-3.5 sm:px-4 border-b-2 font-semibold text-xs transition-all whitespace-nowrap ${
                this.activeTab === t.id
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }">
        <i data-lucide="${t.icon}" class="w-4 h-4 shrink-0"></i>
        <span class="sm:hidden">${t.short}</span>
        <span class="hidden sm:inline">${t.label}</span>
      </button>
    `).join("");

    if (window.lucide) window.lucide.createIcons();

    // Geser bar tab agar tab aktif terlihat (hanya menggeser container tab,
    // tidak menggulir halaman/modal seperti scrollIntoView)
    const activeBtn = tabsContainer.querySelector(`[data-tab="${this.activeTab}"]`);
    if (activeBtn) {
      const target = activeBtn.offsetLeft - (tabsContainer.clientWidth - activeBtn.offsetWidth) / 2;
      tabsContainer.scrollLeft = Math.max(0, target);
    }
  }

  renderModalContent() {
    const contentEl = document.getElementById("modal-module-content");
    if (!contentEl || !this.activeModule) return;

    const mod = this.activeModule;
    const state = window.cyberStorage.getState();
    const isCompleted = state.stats.completedModules.includes(mod.id);

    if (this.activeTab === "materi") {
      contentEl.innerHTML = `
        <div class="space-y-6 animate-slide-up">
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            ${mod.description}
          </div>

          <div class="space-y-4">
            ${mod.sections.map((sec, idx) => `
              <div class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <span class="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono">${idx + 1}</span>
                  ${sec.heading}
                </h4>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-8">
                  ${sec.content}
                </p>
              </div>
            `).join("")}
          </div>

          <div class="pt-4 flex justify-end">
            <button onclick="window.learningController.setModalTab('kasus')"
                    class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition">
              <span>Lanjut ke Studi Kasus</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    } else if (this.activeTab === "kasus") {
      contentEl.innerHTML = `
        <div class="space-y-6 animate-slide-up">
          <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
            <div class="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase mb-2">
              <i data-lucide="alert-circle" class="w-4 h-4"></i> Investigasi Insiden Riil
            </div>
            <h3 class="text-lg font-bold text-white mb-2">${mod.caseStudy.title}</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              ${mod.caseStudy.description}
            </p>

            <div class="space-y-3 pt-3 border-t border-slate-800">
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 text-xs">
                  <i data-lucide="x-circle" class="w-4 h-4"></i>
                </div>
                <div>
                  <h5 class="text-xs font-bold text-red-300">Penyebab / Celah:</h5>
                  <p class="text-xs text-slate-300 mt-0.5">${mod.caseStudy.cause}</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                </div>
                <div>
                  <h5 class="text-xs font-bold text-emerald-300">Pelajaran Kunci:</h5>
                  <p class="text-xs text-slate-300 mt-0.5">${mod.caseStudy.lesson}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 flex justify-between">
            <button onclick="window.learningController.setModalTab('materi')"
                    class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition">
              Kembali ke Materi
            </button>
            <button onclick="window.learningController.setModalTab('tips')"
                    class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition">
              <span>Lanjut ke Tips Pencegahan</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    } else if (this.activeTab === "tips") {
      contentEl.innerHTML = `
        <div class="space-y-6 animate-slide-up">
          <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
            💡 Terapkan langkah-langkah praktis defensif berikut dalam kehidupan sehari-hari untuk menjaga keamanan akun dan perangkat Anda.
          </div>

          <div class="grid gap-3">
            ${mod.tips.map((tip, idx) => `
              <div class="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ✓
                </div>
                <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${tip}</p>
              </div>
            `).join("")}
          </div>

          <div class="pt-4 flex justify-between">
            <button onclick="window.learningController.setModalTab('kasus')"
                    class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition">
              Kembali ke Kasus
            </button>
            <button onclick="window.learningController.setModalTab('kuis')"
                    class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold flex items-center gap-2 hover:opacity-95 transition shadow-lg shadow-cyan-500/20">
              <span>Mulai Kuis Evaluasi (+50 XP)</span>
              <i data-lucide="check" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    } else if (this.activeTab === "kuis") {
      this.renderCheckpointQuiz(contentEl, mod, isCompleted);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Checkpoint Quiz di dalam modal
  renderCheckpointQuiz(contentEl, mod, isCompleted) {
    const questions = mod.quiz;

    contentEl.innerHTML = `
      <div class="space-y-6 animate-slide-up">
        <div class="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div>
            <h4 class="text-sm font-bold text-white">Evaluasi Pemahaman Modul</h4>
            <p class="text-xs text-slate-400 mt-0.5">Jawab 3 pertanyaan berikut dengan benar untuk menyelesaikan modul dan mengklaim +50 XP.</p>
          </div>
          ${isCompleted ? `
            <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1 shrink-0">
              <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Modul Sudah Tuntas
            </span>
          ` : ''}
        </div>

        <div class="space-y-5">
          ${questions.map((q, qIdx) => {
            const selectedOpt = this.quizAnswers[qIdx];
            const isCorrect = selectedOpt === q.correct;

            return `
              <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div class="flex items-start gap-2.5 mb-3">
                  <span class="w-6 h-6 rounded bg-slate-800 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                    Q${qIdx + 1}
                  </span>
                  <p class="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    ${q.question}
                  </p>
                </div>

                <div class="grid gap-2 pl-8">
                  ${q.options.map((opt, optIdx) => {
                    let optClass = "border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700";

                    if (this.quizSubmitted) {
                      if (optIdx === q.correct) {
                        optClass = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
                      } else if (selectedOpt === optIdx && !isCorrect) {
                        optClass = "border-rose-500 bg-rose-500/20 text-rose-200";
                      } else {
                        optClass = "border-slate-800/50 bg-slate-900/20 text-slate-500 opacity-60";
                      }
                    } else if (selectedOpt === optIdx) {
                      optClass = "border-cyan-400 bg-cyan-500/20 text-cyan-200 font-semibold shadow-sm";
                    }

                    return `
                      <button onclick="window.learningController.selectOption(${qIdx}, ${optIdx})"
                              ${this.quizSubmitted ? 'disabled' : ''}
                              class="text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optClass}">
                        <span>${opt}</span>
                        ${this.quizSubmitted && optIdx === q.correct ? '<span class="text-emerald-400 font-bold ml-2">✓ Benar</span>' : ''}
                        ${this.quizSubmitted && selectedOpt === optIdx && !isCorrect ? '<span class="text-rose-400 font-bold ml-2">✗ Salah</span>' : ''}
                      </button>
                    `;
                  }).join("")}
                </div>

                ${this.quizSubmitted ? `
                  <div class="mt-3 ml-8 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300">
                    <span class="font-bold text-cyan-400">Penjelasan:</span> ${q.explanation}
                  </div>
                ` : ''}
              </div>
            `;
          }).join("")}
        </div>

        <!-- Tombol Aksi Kuis -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <button onclick="window.learningController.setModalTab('tips')"
                  class="text-xs text-slate-400 hover:text-slate-200">
            ← Kembali ke Tips Pencegahan
          </button>

          <div class="flex items-center gap-3">
            ${this.quizSubmitted ? `
              <button onclick="window.learningController.resetQuiz()"
                      class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition">
                Coba Ulang Kuis
              </button>
            ` : `
              <button onclick="window.learningController.submitQuiz()"
                      class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-400 transition shadow-lg shadow-cyan-500/20">
                Kirim Evaluasi & Tandai Selesai
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  selectOption(qIdx, optIdx) {
    if (this.quizSubmitted) return;
    this.quizAnswers[qIdx] = optIdx;
    this.renderModalContent();
  }

  resetQuiz() {
    this.quizAnswers = {};
    this.quizSubmitted = false;
    this.renderModalContent();
  }

  submitQuiz() {
    const mod = this.activeModule;
    if (!mod) return;

    // Periksa apakah semua pertanyaan sudah dijawab
    const answeredCount = Object.keys(this.quizAnswers).length;
    if (answeredCount < mod.quiz.length) {
      if (window.cyberApp) {
        window.cyberApp.showToast("Peringatan", "Harap jawab seluruh pertanyaan kuis terlebih dahulu.", "warning");
      }
      return;
    }

    this.quizSubmitted = true;

    // Hitung skor benar
    let correctCount = 0;
    mod.quiz.forEach((q, idx) => {
      if (this.quizAnswers[idx] === q.correct) correctCount++;
    });

    const isAllCorrect = (correctCount === mod.quiz.length);
    this.renderModalContent();

    if (isAllCorrect) {
      const result = window.cyberStorage.completeModule(mod.id);
      if (window.cyberApp) {
        if (result.firstTime) {
          window.cyberApp.showToast("Modul Tuntas!", `Selamat! Anda menyelesaikan '${mod.title}' (+50 XP)`, "success");
        } else {
          window.cyberApp.showToast("Evaluasi Berhasil", `Luar biasa! Seluruh jawaban Anda benar (Modul sudah tuntas sebelumnya).`, "info");
        }
      }
    } else {
      if (window.cyberApp) {
        window.cyberApp.showToast("Evaluasi Belum Tuntas", `Anda menjawab ${correctCount} dari ${mod.quiz.length} soal dengan benar. Pelajari kembali materi dan coba ulang!`, "warning");
      }
    }
  }
}

window.learningController = new LearningController();