
class PasswordCheckerController {
  constructor() {
    this.isVisible = false;
    this.commonPasswords = [
      "password", "123456", "12345678", "qwerty", "123456789", "12345", "1234", "111111",
      "1234567", "dragon", "welcome", "admin", "master", "football", "monkey", "secret",
      "pass123", "bismillah", "rahasia", "indonesia", "semangat", "sayang", "iloveyou"
    ];
    this.initListeners();
  }

  initListeners() {
    const input = document.getElementById("pwd-input");
    const toggleBtn = document.getElementById("pwd-toggle-visibility");
    const generateBtn = document.getElementById("pwd-generate-btn");
    const copyBtn = document.getElementById("pwd-copy-btn");

    if (input) {
      input.addEventListener("input", (e) => {
        this.analyzePassword(e.target.value);
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this.toggleVisibility();
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", () => {
        this.generateSecurePassword();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        this.copyGeneratedPassword();
      });
    }
  }

  render() {
    const input = document.getElementById("pwd-input");
    if (input) {
      this.analyzePassword(input.value || "");
    }
  }

  toggleVisibility() {
    const input = document.getElementById("pwd-input");
    const toggleIcon = document.getElementById("pwd-toggle-icon");
    if (!input || !toggleIcon) return;

    this.isVisible = !this.isVisible;
    input.type = this.isVisible ? "text" : "password";
    toggleIcon.setAttribute("data-lucide", this.isVisible ? "eye-off" : "eye");

    if (window.lucide) window.lucide.createIcons();
  }

  analyzePassword(password) {
    const meterEl = document.getElementById("pwd-strength-meter");
    const crackTimeEl = document.getElementById("pwd-crack-time");
    const scoreBadgeEl = document.getElementById("pwd-score-badge");
    const criteriaEl = document.getElementById("pwd-criteria-list");
    const tipsEl = document.getElementById("pwd-recommendations");

    // Pastikan wadah meter & teks responsif walau HTML belum menambahkan class-nya
    if (meterEl) meterEl.classList.add("flex", "w-full", "gap-1", "sm:gap-1.5");
    if (crackTimeEl) crackTimeEl.classList.add("break-words", "min-w-0");
    if (criteriaEl) criteriaEl.classList.add("min-w-0");
    if (tipsEl) tipsEl.classList.add("min-w-0");

    if (!password) {
      if (meterEl) meterEl.innerHTML = this.renderBars(0, "bg-slate-800");
      if (crackTimeEl) crackTimeEl.textContent = "Masukkan kata sandi untuk menganalisis";
      if (scoreBadgeEl) scoreBadgeEl.innerHTML = `<span class="text-slate-500 font-normal text-xs">Belum diisi</span>`;
      if (criteriaEl) this.renderCriteriaList({}, "");
      if (tipsEl) tipsEl.innerHTML = `<p class="text-xs text-slate-500 break-words">Ketik kata sandi untuk mendapatkan tips penguatan.</p>`;
      return;
    }

    // Analisis Kriteria Karakter
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const length = password.length;

    // Deteksi Pola Mudah Ditebak
    const isCommon = this.commonPasswords.includes(password.toLowerCase());
    const hasRepeated = /(.)\1{2,}/.test(password); // 3 atau lebih karakter berulang seperti 'aaa'
    const hasSequence = /(012|123|234|345|456|567|678|789|abc|bcd|cde|def|qwe|asd)/i.test(password);

    // Hitung Pool Karakter untuk Entropi
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 32;

    // Perhitungan Entropi (Shannon Entropy): E = L * log2(R)
    let entropy = 0;
    if (poolSize > 0) {
      entropy = Math.round(length * (Math.log(poolSize) / Math.log(2)));
    }

    // Skor 0 - 100
    let score = 0;
    if (length >= 8) score += 20;
    if (length >= 12) score += 15;
    if (length >= 16) score += 15;
    if (hasLower) score += 10;
    if (hasUpper) score += 10;
    if (hasNumber) score += 15;
    if (hasSymbol) score += 15;

    // Penalti Pola Buruk
    if (isCommon) score = Math.min(score, 10);
    if (hasRepeated) score -= 15;
    if (hasSequence) score -= 10;
    score = Math.max(5, Math.min(100, score));

    // Kategori Kekuatan
    let label = "Sangat Lemah";
    let colorClass = "bg-rose-500";
    let textClass = "text-rose-400";
    let crackTime = "Hitungan milidetik (Instan)";
    let barsFilled = 1;

    if (score < 30 || isCommon) {
      label = "Sangat Lemah";
      colorClass = "bg-rose-500";
      textClass = "text-rose-400";
      crackTime = "Instan (< 1 detik)";
      barsFilled = 1;
    } else if (score < 50) {
      label = "Lemah";
      colorClass = "bg-orange-500";
      textClass = "text-orange-400";
      crackTime = "Beberapa menit hingga jam";
      barsFilled = 2;
    } else if (score < 70) {
      label = "Sedang";
      colorClass = "bg-yellow-500";
      textClass = "text-yellow-400";
      crackTime = "Beberapa hari hingga bulan";
      barsFilled = 3;
    } else if (score < 90) {
      label = "Kuat";
      colorClass = "bg-blue-500";
      textClass = "text-blue-400";
      crackTime = "Puluhan hingga ratusan tahun";
      barsFilled = 4;
    } else {
      label = "Sangat Kuat";
      colorClass = "bg-emerald-500";
      textClass = "text-emerald-400";
      crackTime = "Jutaan hingga miliaran tahun";
      barsFilled = 5;

      // Catat pencapaian password sangat kuat ke storage
      if (window.cyberStorage) window.cyberStorage.recordPasswordCheck(true);
    }

    // Render Bars
    if (meterEl) meterEl.innerHTML = this.renderBars(barsFilled, colorClass);

    // Badge: boleh turun baris (wrap) di layar sempit agar tidak meluber
    if (scoreBadgeEl) {
      scoreBadgeEl.innerHTML = `
        <span class="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 max-w-full font-bold ${textClass} text-[11px] sm:text-xs px-2.5 py-1 rounded-2xl sm:rounded-full bg-slate-800 border border-slate-700 text-center leading-snug">
          <span>${label}</span>
          <span class="font-semibold">(${score}/100)</span>
          <span class="hidden min-[360px]:inline text-slate-500">•</span>
          <span class="font-semibold">${entropy} bits</span>
        </span>
      `;
    }

    if (crackTimeEl) {
      crackTimeEl.innerHTML = `
        <span class="flex flex-col sm:flex-row sm:items-baseline sm:flex-wrap gap-0.5 sm:gap-1.5 text-xs sm:text-sm leading-snug">
          <span class="text-slate-400">Estimasi Brute-Force:</span>
          <strong class="${textClass} break-words">${crackTime}</strong>
        </span>
      `;
    }

    // Render Checklist
    this.renderCriteriaList({
      length8: length >= 8,
      length12: length >= 12,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      noCommon: !isCommon,
      noRepeated: !hasRepeated && !hasSequence
    }, password);

    // Render Rekomendasi
    this.renderRecommendations({
      length,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      isCommon,
      hasRepeated,
      hasSequence,
      score
    });
  }

  renderBars(filledCount, colorClass) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= filledCount;
      html += `
        <div class="flex-1 min-w-0 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isFilled ? colorClass : 'bg-slate-800'}"></div>
      `;
    }
    return html;
  }

  renderCriteriaList(checks, pwd) {
    const container = document.getElementById("pwd-criteria-list");
    if (!container) return;

    const items = [
      { label: "Panjang minimal 12 karakter (disarankan 16+)", pass: checks.length12 },
      { label: "Mengandung huruf besar (A-Z)", pass: checks.hasUpper },
      { label: "Mengandung huruf kecil (a-z)", pass: checks.hasLower },
      { label: "Mengandung angka (0-9)", pass: checks.hasNumber },
      { label: "Mengandung simbol khusus (@, #, $, dll)", pass: checks.hasSymbol },
      { label: "Bukan kata kamus umum / leaked password", pass: checks.noCommon },
      { label: "Bebas pola berulang atau berurutan (123, abc, aaa)", pass: checks.noRepeated }
    ];

    container.innerHTML = items.map(item => `
      <div class="flex items-start gap-2 text-[11px] sm:text-xs leading-snug min-w-0">
        <div class="w-4 h-4 mt-px rounded-full flex items-center justify-center shrink-0 text-[10px] ${
          pwd ? (item.pass ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'bg-rose-500/20 text-rose-400') : 'bg-slate-800 text-slate-600'
        }">
          ${pwd ? (item.pass ? '✓' : '✗') : '•'}
        </div>
        <span class="min-w-0 break-words ${pwd ? (item.pass ? 'text-slate-200' : 'text-slate-400') : 'text-slate-500'}">
          ${item.label}
        </span>
      </div>
    `).join("");
  }

  renderRecommendations(c) {
    const tipsContainer = document.getElementById("pwd-recommendations");
    if (!tipsContainer) return;

    const tips = [];
    if (c.isCommon) {
      tips.push("Kata sandi ini terdapat dalam daftar kebocoran publik teratas! Jangan pernah menggunakannya untuk akun apa pun.");
    }
    if (c.length < 12) {
      tips.push(`Tambahkan minimal ${12 - c.length} karakter lagi. Panjang karakter adalah faktor terpenting menahan serangan brute force.`);
    }
    if (!c.hasSymbol || !c.hasNumber) {
      tips.push("Kombinasikan angka dan simbol untuk memperluas ruang kemungkinan matematis (entropi).");
    }
    if (c.hasRepeated || c.hasSequence) {
      tips.push("Hindari urutan berdekatan di keyboard (seperti qwerty atau 12345) karena mudah dipecahkan oleh program pemilah kamus.");
    }
    if (c.score >= 90) {
      tips.push("Bagus sekali! Kata sandi ini memiliki tingkat keamanan yang sangat tinggi. Pertimbangkan untuk menyimpannya di Password Manager.");
    }

    tipsContainer.innerHTML = tips.map(tip => `
      <div class="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] sm:text-xs text-slate-300 leading-snug flex items-start gap-2 min-w-0">
        <span class="text-cyan-400 shrink-0">💡</span>
        <span class="min-w-0 break-words">${tip}</span>
      </div>
    `).join("");
  }

  // Generator Password Aman Otomatis (Passphrase atau Random Symbol)
  generateSecurePassword() {
    const mode = document.querySelector('input[name="pwd-gen-mode"]:checked')?.value || "passphrase";
    let generated = "";

    if (mode === "passphrase") {
      const words = [
        "Garuda", "Kopi", "Samudra", "Lentera", "Kastil", "Awan", "Melompat",
        "Kompas", "Cahaya", "Rembulan", "Harimau", "Gunung", "Bintang", "Pintar",
        "Kilat", "Zamrud", "Ksatria", "Gelombang", "Pesona", "Cakrawala"
      ];
      // Ambil 4 kata acak + 2 digit angka
      const chosen = [];
      for (let i = 0; i < 4; i++) {
        const randIndex = Math.floor(Math.random() * words.length);
        chosen.push(words[randIndex]);
      }
      const randNum = Math.floor(Math.random() * 90) + 10;
      generated = `${chosen.join("-")}-${randNum}`;
    } else {
      // Alphanumeric + Symbols (16 karakter)
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+~=";
      for (let i = 0; i < 16; i++) {
        generated += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    const genOutput = document.getElementById("pwd-generated-output");
    if (genOutput) {
      genOutput.value = generated;
    }

    // Juga salin ke input checker untuk langsung dianalisis
    const input = document.getElementById("pwd-input");
    if (input) {
      input.value = generated;
      this.analyzePassword(generated);
    }

    if (window.cyberApp) {
      window.cyberApp.showToast("Password Dibuat", "Kata sandi berkekuatan tinggi berhasil di-generate!", "info");
    }
  }

  copyGeneratedPassword() {
    const genOutput = document.getElementById("pwd-generated-output");
    if (!genOutput || !genOutput.value) {
      this.generateSecurePassword();
      return;
    }

    navigator.clipboard.writeText(genOutput.value).then(() => {
      if (window.cyberApp) {
        window.cyberApp.showToast("Berhasil Disalin", "Password telah disalin ke clipboard Anda.", "success");
      }
    }).catch(() => {
      // Fallback seleksi teks
      genOutput.select();
      document.execCommand("copy");
      if (window.cyberApp) {
        window.cyberApp.showToast("Berhasil Disalin", "Password telah disalin ke clipboard.", "success");
      }
    });
  }
}

window.passwordCheckerController = new PasswordCheckerController();