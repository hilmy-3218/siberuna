/**
 * Siberuna - LocalStorage & Gamification State Management
 * Menangani penyimpanan lokal terstruktur, perhitungan XP, Level, Achievement,
 * serta mitigasi input data tanpa menyimpan password pengguna.
 */

const STORAGE_KEY = "siberuna_data_v1";

// Migrasi data dari key versi sebelumnya jika ada
try {
  if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem(STORAGE_KEY) && localStorage.getItem("cyberquest_data_v1")) {
      localStorage.setItem(STORAGE_KEY, localStorage.getItem("cyberquest_data_v1"));
    }
  }
} catch (e) {}

// Definisi Tingkatan Level Gamifikasi
const LEVEL_CONFIG = [
  { level: 1, title: "Beginner", minXp: 0, maxXp: 199, badge: "🛡️", color: "text-slate-400" },
  { level: 2, title: "Explorer", minXp: 200, maxXp: 449, badge: "🔍", color: "text-blue-400" },
  { level: 3, title: "Defender", minXp: 450, maxXp: 799, badge: "⚔️", color: "text-cyan-400" },
  { level: 4, title: "Specialist", minXp: 800, maxXp: 1249, badge: "⚡", color: "text-indigo-400" },
  { level: 5, title: "Cyber Expert", minXp: 1250, maxXp: Infinity, badge: "👑", color: "text-amber-400" }
];

// Definisi Master Achievement
const ACHIEVEMENTS_LIST = [
  {
    id: "first_step",
    title: "First Step",
    description: "Selesaikan modul pembelajaran pertamamu di Learning Center.",
    icon: "award",
    badgeColor: "from-blue-500 to-cyan-500",
    xpReward: 30
  },
  {
    id: "phishing_hunter",
    title: "Phishing Hunter",
    description: "Berhasil mengidentifikasi minimal 5 kasus pesan phishing dengan tepat.",
    icon: "crosshair",
    badgeColor: "from-amber-500 to-red-500",
    xpReward: 40
  },
  {
    id: "password_guardian",
    title: "Password Guardian",
    description: "Evaluasi dan rancang kata sandi berkekuatan 'Sangat Kuat' di Password Checker.",
    icon: "shield-check",
    badgeColor: "from-emerald-500 to-teal-500",
    xpReward: 30
  },
  {
    id: "quiz_starter",
    title: "Quiz Aspirant",
    description: "Selesaikan kuis interaktif pertamamu dalam salah satu kategori.",
    icon: "help-circle",
    badgeColor: "from-violet-500 to-indigo-500",
    xpReward: 25
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Raih skor minimal 90% pada evaluasi Cyber Quiz.",
    icon: "target",
    badgeColor: "from-yellow-400 to-amber-500",
    xpReward: 50
  },
  {
    id: "perfectionist",
    title: "The Perfectionist",
    description: "Raih skor 100% sempurna tanpa salah pada salah satu kategori Cyber Quiz.",
    icon: "sparkles",
    badgeColor: "from-purple-500 to-pink-500",
    xpReward: 60
  },
  {
    id: "security_strategist",
    title: "Security Strategist",
    description: "Selesaikan seluruh 5 skenario tantangan siber dengan sukses.",
    icon: "compass",
    badgeColor: "from-rose-500 to-orange-500",
    xpReward: 70
  },
  {
    id: "defender_rank",
    title: "Cyber Defender",
    description: "Capai reputasi Level 3 (Defender) dalam perjalanan belajar Anda.",
    icon: "zap",
    badgeColor: "from-cyan-400 to-blue-600",
    xpReward: 50
  },
  {
    id: "cyber_expert",
    title: "Cyber Expert",
    description: "Tuntaskan seluruh 8 modul materi pembelajaran keamanan siber.",
    icon: "crown",
    badgeColor: "from-amber-400 to-yellow-600",
    xpReward: 100
  }
];

// State Default Pengguna Baru
function getDefaultState() {
  return {
    user: {
      name: "Cyber Explorer",
      avatar: "shield",
      theme: "dark",
      soundEnabled: false,
      registeredAt: Date.now()
    },
    stats: {
      totalXP: 0,
      completedModules: [],        // array of module ids
      completedChallenges: [],     // array of challenge ids
      identifiedPhishing: [],      // array of phishing case ids correctly answered
      quizHistory: [],             // array of quiz attempt summaries
      passwordChecksCount: 0,
      highestQuizScore: 0
    },
    achievements: {
      first_step: false,
      phishing_hunter: false,
      password_guardian: false,
      quiz_starter: false,
      quiz_master: false,
      perfectionist: false,
      security_strategist: false,
      defender_rank: false,
      cyber_expert: false
    },
    achievementTimestamps: {}
  };
}

class StorageManager {
  constructor() {
    this.state = this.loadState();
  }

  // Membaca state dari LocalStorage dengan validasi aman
  loadState() {
    try {
      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (!dataStr) {
        const defaultState = getDefaultState();
        this.saveDirect(defaultState);
        return defaultState;
      }
      const parsed = JSON.parse(dataStr);
      // Validasi struktur esensial
      if (!parsed.user || !parsed.stats || !parsed.achievements) {
        console.warn("Struktur data LocalStorage tidak lengkap, merestorasi default.");
        const fallback = getDefaultState();
        this.saveDirect(fallback);
        return fallback;
      }
      return parsed;
    } catch (e) {
      console.error("Gagal memuat LocalStorage:", e);
      return getDefaultState();
    }
  }

  // Simpan langsung ke LocalStorage
  saveDirect(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Gagal menyimpan ke LocalStorage:", e);
    }
  }

  // Simpan state saat ini dan umumkan perubahan ke listener
  save() {
    this.saveDirect(this.state);
    this.notifyStateChanged();
  }

  // Reset total progres
  resetProgress() {
    const fresh = getDefaultState();
    // Pertahankan preferensi dasar pengguna jika ada
    fresh.user.name = this.state.user.name || "Cyber Explorer";
    fresh.user.theme = this.state.user.theme || "dark";
    fresh.user.soundEnabled = false;
    this.state = fresh;
    this.saveDirect(this.state);
    this.notifyStateChanged();
    return true;
  }

  // Notifikasi event ke seluruh antarmuka
  notifyStateChanged() {
    window.dispatchEvent(new CustomEvent("siberuna:stateChanged", { detail: this.getState() }));
    window.dispatchEvent(new CustomEvent("cyberquest:stateChanged", { detail: this.getState() }));
  }

  getState() {
    return this.state;
  }

  getUser() {
    return this.state.user;
  }

  getStats() {
    return this.state.stats;
  }

  // Perhitungan Level berdasarkan total XP
  calculateLevel(totalXP) {
    let currentLevel = LEVEL_CONFIG[0];
    for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
      if (totalXP >= LEVEL_CONFIG[i].minXp) {
        currentLevel = LEVEL_CONFIG[i];
        break;
      }
    }
    
    // Hitung progress bar ke level berikutnya
    let progressPercent = 100;
    let xpToNext = 0;
    if (currentLevel.maxXp !== Infinity) {
      const range = currentLevel.maxXp - currentLevel.minXp + 1;
      const currentProgress = totalXP - currentLevel.minXp;
      progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
      xpToNext = currentLevel.maxXp - totalXP + 1;
    }

    return {
      level: currentLevel.level,
      title: currentLevel.title,
      badge: currentLevel.badge,
      color: currentLevel.color,
      minXp: currentLevel.minXp,
      maxXp: currentLevel.maxXp,
      currentXp: totalXP,
      progressPercent: progressPercent,
      xpToNext: xpToNext
    };
  }

  // Tambah XP secara terkontrol dan periksa level up & achievement
  addXP(amount, reason = "Aktivitas") {
    if (amount <= 0) return { earned: 0, levelUp: false };

    const oldLevelInfo = this.calculateLevel(this.state.stats.totalXP);
    this.state.stats.totalXP += amount;
    const newLevelInfo = this.calculateLevel(this.state.stats.totalXP);

    this.save();

    let levelUp = false;
    if (newLevelInfo.level > oldLevelInfo.level) {
      levelUp = true;
      if (typeof window.showLevelUpModal === "function") {
        window.showLevelUpModal(newLevelInfo);
      }
    }

    this.checkAchievements();

    return {
      earned: amount,
      totalXP: this.state.stats.totalXP,
      levelUp: levelUp,
      newLevel: newLevelInfo
    };
  }

  // Tandai Modul Selesai (+50 XP)
  completeModule(moduleId) {
    if (!this.state.stats.completedModules.includes(moduleId)) {
      this.state.stats.completedModules.push(moduleId);
      const xpResult = this.addXP(50, `Selesai Modul ${moduleId}`);
      
      this.checkAchievements();
      this.save();
      return { success: true, firstTime: true, xpEarned: 50, ...xpResult };
    }
    return { success: true, firstTime: false, xpEarned: 0 };
  }

  // Tandai Skenario Challenge Selesai (+40 XP)
  completeChallenge(challengeId) {
    if (!this.state.stats.completedChallenges.includes(challengeId)) {
      this.state.stats.completedChallenges.push(challengeId);
      const xpResult = this.addXP(40, `Selesai Skenario ${challengeId}`);
      
      this.checkAchievements();
      this.save();
      return { success: true, firstTime: true, xpEarned: 40, ...xpResult };
    }
    return { success: true, firstTime: false, xpEarned: 0 };
  }

  // Catat identifikasi kasus phishing yang benar (+15 XP)
  recordPhishingIdentification(caseId) {
    if (!this.state.stats.identifiedPhishing.includes(caseId)) {
      this.state.stats.identifiedPhishing.push(caseId);
      const xpResult = this.addXP(15, `Identifikasi Phishing ${caseId}`);
      
      this.checkAchievements();
      this.save();
      return { success: true, firstTime: true, xpEarned: 15, ...xpResult };
    }
    return { success: true, firstTime: false, xpEarned: 0 };
  }

  // Catat hasil kuis: +20 XP selesai, +30 XP bonus jika score >= 80%
  recordQuizResult(category, score, totalQuestions) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let xpEarned = 20; // XP dasar selesai kuis
    let hasBonus = false;

    if (percentage >= 80) {
      xpEarned += 30; // Bonus skor tinggi
      hasBonus = true;
    }

    const record = {
      id: Date.now(),
      category: category,
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      xpEarned: xpEarned,
      timestamp: Date.now()
    };

    this.state.stats.quizHistory.unshift(record);
    if (this.state.stats.quizHistory.length > 20) {
      this.state.stats.quizHistory.pop(); // batasi 20 rekaman terakhir
    }

    if (percentage > (this.state.stats.highestQuizScore || 0)) {
      this.state.stats.highestQuizScore = percentage;
    }

    this.addXP(xpEarned, `Kuis Kategori ${category}`);
    this.checkAchievements();
    this.save();

    return {
      percentage: percentage,
      xpEarned: xpEarned,
      hasBonus: hasBonus
    };
  }

  // Catat pengecekan password
  recordPasswordCheck(isVeryStrong = false) {
    this.state.stats.passwordChecksCount = (this.state.stats.passwordChecksCount || 0) + 1;
    if (isVeryStrong && !this.state.achievements.password_guardian) {
      this.unlockAchievement("password_guardian");
    }
    this.save();
  }

  // Perbarui Profil Pengguna
  updateProfile(name, avatar, soundEnabled, theme) {
    if (typeof name === "string" && name.trim()) {
      // Sanitasi nama sederhana
      this.state.user.name = name.trim().slice(0, 30);
    }
    if (avatar) {
      this.state.user.avatar = avatar;
    }
    if (soundEnabled !== undefined) {
      this.state.user.soundEnabled = Boolean(soundEnabled);
    }
    if (theme && (theme === "dark" || theme === "light")) {
      this.state.user.theme = theme;
    }
    this.save();
    return this.state.user;
  }

  // Khusus set tema antarmuka (dark / light)
  setTheme(theme) {
    if (theme === "dark" || theme === "light") {
      this.state.user.theme = theme;
      this.save();
      return theme;
    }
    return this.state.user.theme || "dark";
  }

  getTheme() {
    return this.state.user.theme || "dark";
  }

  // Buka Achievement dan berikan reward XP
  unlockAchievement(achId) {
    if (!this.state.achievements[achId]) {
      this.state.achievements[achId] = true;
      if (!this.state.achievementTimestamps) {
        this.state.achievementTimestamps = {};
      }
      this.state.achievementTimestamps[achId] = Date.now();

      const achObj = ACHIEVEMENTS_LIST.find(a => a.id === achId);
      if (achObj) {
        this.state.stats.totalXP += achObj.xpReward;
        if (typeof window.showAchievementToast === "function") {
          window.showAchievementToast(achObj);
        }
      }
      this.save();
      return true;
    }
    return false;
  }

  // Evaluasi seluruh kondisi achievement otomatis
  checkAchievements() {
    const stats = this.state.stats;
    const levelInfo = this.calculateLevel(stats.totalXP);

    // 1. First Step: modul pertama selesai
    if (stats.completedModules.length >= 1) {
      this.unlockAchievement("first_step");
    }

    // 2. Phishing Hunter: minimal 5 kasus teridentifikasi
    if (stats.identifiedPhishing.length >= 5) {
      this.unlockAchievement("phishing_hunter");
    }

    // 3. Quiz Starter: minimal 1 kuis selesai
    if (stats.quizHistory.length >= 1) {
      this.unlockAchievement("quiz_starter");
    }

    // 4. Quiz Master: skor kuis minimal 90%
    if (stats.quizHistory.some(q => q.percentage >= 90)) {
      this.unlockAchievement("quiz_master");
    }

    // 5. Perfectionist: skor kuis 100%
    if (stats.quizHistory.some(q => q.percentage === 100)) {
      this.unlockAchievement("perfectionist");
    }

    // 6. Security Strategist: seluruh 5 skenario challenge tuntas
    if (stats.completedChallenges.length >= 5) {
      this.unlockAchievement("security_strategist");
    }

    // 7. Defender Rank: mencapai Level 3
    if (levelInfo.level >= 3) {
      this.unlockAchievement("defender_rank");
    }

    // 8. Cyber Expert: seluruh 8 modul materi tuntas
    if (stats.completedModules.length >= 8) {
      this.unlockAchievement("cyber_expert");
    }
  }
}

// Inisialisasi instance global tunggal
window.siberunaStorage = new StorageManager();
window.cyberStorage = window.siberunaStorage;

