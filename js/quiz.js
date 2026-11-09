/**
 * Siberuna - Cyber Quiz Interactive Engine
 * Menangani pemilihan kategori kuis, timer hitung mundur per soal,
 * navigasi pilihan ganda, penilaian instan, feedback edukasi, dan kalkulasi XP.
 */

class QuizController {
  constructor() {
    this.activeCategory = null;
    this.questions = [];
    this.currentIndex = 0;
    this.userAnswers = {}; // questionIndex -> selectedOptionIndex
    this.timer = null;
    this.timeLeft = 30; // 30 detik per soal
    this.quizState = "idle"; // idle | running | review | result

    this.initListeners();
  }

  initListeners() {
    const handleState = () => this.updateCategoryCards();
    window.addEventListener("siberuna:stateChanged", handleState);
    window.addEventListener("cyberquest:stateChanged", handleState);
  }

  render() {
    if (this.quizState === "running") {
      this.renderQuestion();
    } else if (this.quizState === "result") {
      this.renderResult();
    } else {
      this.renderCategorySelection();
    }
  }

  // Tampilkan kartu pemilihan kategori
  renderCategorySelection() {
    this.quizState = "idle";
    this.clearInterval();

    const container = document.getElementById("quiz-main-container");
    if (!container || typeof QUIZ_QUESTIONS === "undefined") return;

    const categories = [
      {
        id: "phishing",
        title: "Phishing & Rekayasa Tipuan",
        desc: "Uji kejelian Anda membongkar typosquatting, spoofing, smishing, dan whaling.",
        icon: "mail-warning",
        color: "from-amber-500 to-red-500",
        badge: "10 Soal Berbobot"
      },
      {
        id: "password",
        title: "Password & Kriptografi",
        desc: "Pahami serangan brute force, entropi, credential stuffing, dan standar NIST.",
        icon: "key",
        color: "from-emerald-500 to-teal-500",
        badge: "10 Soal Berbobot"
      },
      {
        id: "malware",
        title: "Malware & Ransomware",
        desc: "Bedakan virus, worm, trojan, rootkit, infostealer, dan rantai infeksi macro.",
        icon: "bug",
        color: "from-rose-500 to-pink-500",
        badge: "10 Soal Berbobot"
      },
      {
        id: "social",
        title: "Social Engineering",
        desc: "Kupas trik pretexting, baiting, tailgating, dan psikologi manipulasi manusia.",
        icon: "users",
        color: "from-purple-500 to-indigo-500",
        badge: "10 Soal Berbobot"
      },
      {
        id: "privacy",
        title: "Digital Privacy & Jejak Online",
        desc: "Kuasai jejak digital pasif, broker data, browser fingerprinting, DoH, dan enkripsi.",
        icon: "eye-off",
        color: "from-cyan-500 to-blue-600",
        badge: "10 Soal Berbobot"
      }
    ];

    const state = window.cyberStorage.getState();
    const history = state.stats.quizHistory || [];

    container.innerHTML = `
      <div class="space-y-6 animate-slide-up">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 class="text-xl font-bold text-white">Pilih Kategori Kuis Interaktif</h3>
            <p class="text-xs text-slate-400 mt-1">Setiap kategori memiliki 10 pertanyaan berbobot. Selesaikan kuis untuk +20 XP (Bonus +30 XP jika skor ≥ 80%).</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-cyan-400 font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              Total 50 Soal Tersedia
            </span>
          </div>
        </div>

        <!-- Grid Kategori -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${categories.map(cat => {
            const catHistory = history.filter(h => h.category === cat.id);
            const highestCatScore = catHistory.length > 0 
              ? Math.max(...catHistory.map(h => h.percentage)) 
              : null;

            return `
              <div class="cyber-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-105 transition-transform">
                      <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
                    </div>
                    ${highestCatScore !== null ? `
                      <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        highestCatScore >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                      }">
                        Terbaik: ${highestCatScore}%
                      </span>
                    ` : `
                      <span class="text-xs text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
                        Belum Dikerjakan
                      </span>
                    `}
                  </div>

                  <h4 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">${cat.title}</h4>
                  <p class="text-xs text-slate-400 mt-2 leading-relaxed">${cat.desc}</p>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span class="text-[11px] font-semibold text-slate-400">${cat.badge}</span>
                  <button onclick="window.quizController.startQuiz('${cat.id}')"
                          class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition shadow-md shadow-cyan-500/20 flex items-center gap-1.5">
                    <span>Mulai Kuis</span>
                    <i data-lucide="play" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  updateCategoryCards() {
    if (this.quizState === "idle") {
      this.renderCategorySelection();
    }
  }

  startQuiz(categoryId) {
    if (typeof QUIZ_QUESTIONS === "undefined" || !QUIZ_QUESTIONS[categoryId]) return;

    this.activeCategory = categoryId;
    this.questions = QUIZ_QUESTIONS[categoryId];
    this.currentIndex = 0;
    this.userAnswers = {};
    this.quizState = "running";

    this.renderQuestion();
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  startQuestionTimer() {
    this.clearInterval();
    this.timeLeft = 30; // 30 detik
    this.updateTimerDisplay();

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.clearInterval();
        this.handleTimeUp();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const timerEl = document.getElementById("quiz-timer-text");
    const timerBarEl = document.getElementById("quiz-timer-bar");

    if (timerEl) {
      timerEl.textContent = `${this.timeLeft}s`;
      if (this.timeLeft <= 5) {
        timerEl.classList.add("text-rose-400", "animate-pulse");
      } else {
        timerEl.classList.remove("text-rose-400", "animate-pulse");
      }
    }

    if (timerBarEl) {
      const percent = (this.timeLeft / 30) * 100;
      timerBarEl.style.width = `${percent}%`;
      if (this.timeLeft <= 5) {
        timerBarEl.classList.remove("from-cyan-400", "to-blue-500");
        timerBarEl.classList.add("bg-rose-500");
      } else {
        timerBarEl.classList.add("from-cyan-400", "to-blue-500");
        timerBarEl.classList.remove("bg-rose-500");
      }
    }
  }

  handleTimeUp() {
    // Jika waktu habis dan belum jawab, set answer sebagai -1
    if (this.userAnswers[this.currentIndex] === undefined) {
      this.userAnswers[this.currentIndex] = -1;
    }

    if (window.cyberApp) {
      window.cyberApp.showToast("Waktu Habis", "Waktu menjawab soal ini telah selesai.", "warning");
    }

    this.renderQuestion(true); // render dengan review penjelasan
  }

  renderQuestion(showExplanation = false) {
    const container = document.getElementById("quiz-main-container");
    if (!container) return;

    const currentQ = this.questions[this.currentIndex];
    const totalQ = this.questions.length;
    const progressPercent = Math.round(((this.currentIndex + 1) / totalQ) * 100);
    const selectedAnswer = this.userAnswers[this.currentIndex];
    const isAnswered = selectedAnswer !== undefined;

    // Mulai timer jika belum dijawab
    if (!isAnswered && !showExplanation) {
      this.startQuestionTimer();
    } else {
      this.clearInterval();
    }

    container.innerHTML = `
      <div class="space-y-6 max-w-3xl mx-auto animate-slide-up">
        
        <!-- Header Kuis: Kategori, Progress, Timer -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <button onclick="window.quizController.renderCategorySelection()"
                    class="text-xs text-slate-400 hover:text-white transition flex items-center gap-1">
              <i data-lucide="chevron-left" class="w-4 h-4"></i> Kembali
            </button>
            <span class="text-xs text-slate-600">•</span>
            <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Kuis: ${this.activeCategory}
            </span>
          </div>

          <!-- Timer Badge -->
          <div class="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-cyan-400"></i>
            <span id="quiz-timer-text" class="font-mono text-xs font-bold text-slate-200">
              ${this.timeLeft}s
            </span>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div>
          <div class="flex justify-between items-center text-xs text-slate-400 font-medium mb-1.5">
            <span>Pertanyaan ${this.currentIndex + 1} dari ${totalQ}</span>
            <span>${progressPercent}% Selesai</span>
          </div>
          <div class="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/60">
            <div id="quiz-timer-bar" class="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
                 style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <!-- Card Soal Pertanyaan -->
        <div class="cyber-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 class="text-base sm:text-lg font-bold text-white leading-relaxed">
            ${currentQ.question}
          </h3>

          <!-- Opsi Jawaban Pilihan Ganda -->
          <div class="grid gap-3">
            ${currentQ.options.map((option, optIdx) => {
              let optClass = "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700";

              if (isAnswered || showExplanation) {
                if (optIdx === currentQ.correctAnswer) {
                  optClass = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold shadow-sm";
                } else if (selectedAnswer === optIdx) {
                  optClass = "border-rose-500 bg-rose-500/20 text-rose-200";
                } else {
                  optClass = "border-slate-800/50 bg-slate-900/20 text-slate-600 opacity-60";
                }
              }

              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

              return `
                <button onclick="window.quizController.selectAnswer(${optIdx})"
                        ${isAnswered || showExplanation ? 'disabled' : ''}
                        class="text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}">
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                      ${letter}
                    </span>
                    <span class="mt-0.5">${option}</span>
                  </div>
                  ${(isAnswered || showExplanation) && optIdx === currentQ.correctAnswer ? '<span class="text-emerald-400 font-bold ml-2 shrink-0">✓ Benar</span>' : ''}
                  ${(isAnswered || showExplanation) && selectedAnswer === optIdx && optIdx !== currentQ.correctAnswer ? '<span class="text-rose-400 font-bold ml-2 shrink-0">✗ Jawaban Anda</span>' : ''}
                </button>
              `;
            }).join("")}
          </div>

          <!-- Penjelasan Edukasi (Muncul setelah dijawab) -->
          ${(isAnswered || showExplanation) ? `
            <div class="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs sm:text-sm text-slate-300 animate-slide-up">
              <span class="font-bold text-cyan-400 block mb-1">Penjelasan Edukatif:</span>
              <p class="leading-relaxed">${currentQ.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- Tombol Aksi Bawah -->
        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-slate-500">Soal #${this.currentIndex + 1}</span>

          ${(isAnswered || showExplanation) ? `
            ${this.currentIndex < totalQ - 1 ? `
              <button onclick="window.quizController.nextQuestion()"
                      class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                <span>Soal Berikutnya</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            ` : `
              <button onclick="window.quizController.finishQuiz()"
                      class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                <span>Lihat Hasil Evaluasi</span>
                <i data-lucide="award" class="w-4 h-4"></i>
              </button>
            `}
          ` : `
            <span class="text-xs text-slate-500">Pilih salah satu jawaban di atas</span>
          `}
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  selectAnswer(optIdx) {
    if (this.userAnswers[this.currentIndex] !== undefined) return;

    this.userAnswers[this.currentIndex] = optIdx;
    this.clearInterval();

    this.renderQuestion();
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  finishQuiz() {
    this.clearInterval();
    this.quizState = "result";

    // Hitung total skor
    let correctCount = 0;
    this.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = this.questions.length;
    const result = window.cyberStorage.recordQuizResult(this.activeCategory, correctCount, totalQuestions);

    if (window.cyberApp) {
      window.cyberApp.showToast("Kuis Selesai!", `Skor Anda: ${result.percentage}% (+${result.xpEarned} XP)`, "success");
    }

    this.renderResult(correctCount, totalQuestions, result);
  }

  renderResult(correctCount, totalQuestions, resultData) {
    const container = document.getElementById("quiz-main-container");
    if (!container) return;

    const percentage = resultData ? resultData.percentage : Math.round((correctCount / totalQuestions) * 100);
    const xpEarned = resultData ? resultData.xpEarned : 20;
    const hasBonus = resultData ? resultData.hasBonus : (percentage >= 80);

    let trophyEmoji = "🥉";
    let remarkTitle = "Usaha yang Baik!";
    let remarkColor = "text-yellow-400";

    if (percentage === 100) {
      trophyEmoji = "🏆";
      remarkTitle = "Sempurna! Nilai 100 Tanpa Celah!";
      remarkColor = "text-amber-400";
    } else if (percentage >= 80) {
      trophyEmoji = "🥇";
      remarkTitle = "Luar Biasa! Skor di Atas Target!";
      remarkColor = "text-emerald-400";
    } else if (percentage >= 60) {
      trophyEmoji = "🥈";
      remarkTitle = "Cukup Bagus, Terus Asah Pemahaman Anda!";
      remarkColor = "text-cyan-400";
    }

    container.innerHTML = `
      <div class="space-y-6 max-w-2xl mx-auto animate-slide-up">
        
        <!-- Result Summary Card -->
        <div class="cyber-card rounded-3xl p-8 border border-slate-800 text-center relative overflow-hidden">
          <div class="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="text-6xl mb-3 animate-pulse-subtle">${trophyEmoji}</div>
          <h3 class="text-2xl font-extrabold text-white mb-1">${remarkTitle}</h3>
          <p class="text-xs text-slate-400">Evaluasi Kategori: <strong class="text-cyan-400 uppercase">${this.activeCategory}</strong></p>

          <!-- Score Circle / Badge -->
          <div class="my-6 inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-900/90 border-2 border-cyan-500/40 shadow-inner">
            <span class="text-4xl font-black text-white">${percentage}%</span>
            <span class="text-xs font-semibold text-slate-400 mt-0.5">${correctCount} / ${totalQuestions} Benar</span>
          </div>

          <!-- XP Rewards Breakdown -->
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-around gap-2 max-w-md mx-auto text-xs">
            <div>
              <span class="text-slate-500 block">Selesai Kuis</span>
              <strong class="text-cyan-400 font-bold">+20 XP</strong>
            </div>
            <div class="w-px h-8 bg-slate-800"></div>
            <div>
              <span class="text-slate-500 block">Bonus Skor 80%+</span>
              <strong class="${hasBonus ? 'text-emerald-400' : 'text-slate-600'} font-bold">
                ${hasBonus ? '+30 XP' : 'Tidak Tercapai'}
              </strong>
            </div>
            <div class="w-px h-8 bg-slate-800"></div>
            <div>
              <span class="text-slate-500 block">Total XP Diraih</span>
              <strong class="text-amber-400 font-black">+${xpEarned} XP</strong>
            </div>
          </div>

          <!-- Tombol Navigasi Pasca Kuis -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onclick="window.quizController.startQuiz('${this.activeCategory}')"
                    class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              <span>Coba Ulang Kategori Ini</span>
            </button>

            <button onclick="window.quizController.renderCategorySelection()"
                    class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <i data-lucide="grid" class="w-4 h-4"></i>
              <span>Pilih Kategori Kuis Lain</span>
            </button>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }
}

window.quizController = new QuizController();

