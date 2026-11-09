# Siberuna - Interactive Cybersecurity Learning Platform

> **"Think Smart. Stay Secure."**  
> Dikembangkan untuk **Kompetisi Programming ISCOMFEST 2026**

---

## 📌 1. Tentang Platform

**Siberuna** adalah platform pembelajaran keamanan digital interaktif yang dirancang untuk membantu pelajar SMA/SMK, mahasiswa, dan masyarakat umum memahami ancaman siber dunia nyata melalui pendekatan **gamifikasi**, **simulasi forensik**, **evaluasi password defensif**, dan **tantangan skenario interaktif**.

Platform ini dibangun dengan memprioritaskan:

1. **Kebermanfaatan Edukasi Nyata**: Materi komprehensif dari pilar CIA Triad hingga mitigasi phishing WhatsApp APK trojan.
2. **Kreativitas & Interaktivitas**: Simulasi pesan email, SMS, dan WhatsApp nyata dengan inspeksi header dan deteksi link tersembunyi.
3. **Pengalaman Pengguna (UI/UX)**: Desain modern dark mode (dark navy, electric blue, cyan), animasi halus, responsive di desktop, tablet, dan smartphone, serta efek suara sintetis (Web Audio API) tanpa file audio eksternal.
4. **Keamanan & Privasi Mutlak**: 100% Client-Side. Tidak ada database atau server backend, input kata sandi tidak pernah disimpan atau dikirim ke jaringan, dan data progres belajar disimpan secara terstruktur di `LocalStorage` browser.

---

## 🚀 2. Teknologi yang Digunakan

- **HTML5**: Struktur semantik modern yang aksesibel dan ramah pembaca layar.
- **Tailwind CSS (via CDN)**: Styling antarmuka dark mode futuristik, minimalis, dan responsif.
- **Vanilla JavaScript (ES6+)**: Seluruh logika aplikasi, routing SPA (Single Page Application) berbasis hash, sound synthesizer, evaluasi kuis, analisis entropi kata sandi, dan manajemen state.
- **Lucide Icons (via CDN)**: Ikon vektor modern yang konsisten.
- **LocalStorage API**: Penyimpanan progres belajar, riwayat skor kuis, perolehan XP, level pengguna, dan status trofi achievement.

---

## 📂 3. Struktur Proyek

```
siberuna/
│
├── index.html                  # Halaman utama aplikasi (SPA Router & Semua View)
│
├── assets/                     # Aset gambar dan ikon
│   ├── images/
│   └── icons/
│
├── css/
│   └── style.css               # Styling kustom, scrollbar, glowing border, glassmorphism
│
├── js/
│   ├── app.js                  # Master controller, router navigasi hash, audio & toast
│   ├── storage.js              # State manager LocalStorage, XP, level, achievement
│   ├── dashboard.js            # Logika dashboard, statistik dinamis, daily challenge
│   ├── learning.js             # Kurikulum 8 modul, reader modal, kuis checkpoint
│   ├── phishing.js             # Simulator email/SMS/WhatsApp & alat inspeksi forensik
│   ├── password.js             # Password strength meter, entropi, generator passphrase
│   ├── quiz.js                 # Engine kuis interaktif (5 kategori, 50 soal, timer)
│   ├── challenge.js            # Skenario studi kasus dilema siber (+40 XP)
│   └── achievement.js          # Galeri 9 trofi pencapaian, filter status & reward
│
└── data/
    ├── modules.js              # Bank data 8 modul pembelajaran & kasus nyata
    ├── questions.js            # Bank data 50 soal kuis pilihan ganda terstruktur
    └── challenges.js           # Bank data 8 kasus phishing & 5 skenario tantangan
```

---

## ✨ 4. Fitur Utama & Panduan Penggunaaan

### A. Landing Page (Home)

- **Hero Showcase**: Headline inspiratif, statistik dinamis langsung dari LocalStorage, dan tombol ajakan belajar (_Call-to-Action_).
- **Preview Fitur Utama**: Kartu interaktif ringkasan fitur platform.
- **Edukasi & Urgensi**: Penjelasan pentingnya kesadaran siber di era digital (mencegah pencurian identitas, kejahatan finansial, dan pemerasan data).

### B. Dashboard Pengguna

- **Statistik Riil**: Sapaan personal, level pengguna, total XP, persentase modul tuntas, skor rata-rata kuis, dan kasus phishing teridentifikasi.
- **Dynamic Daily Challenge**: Misi harian yang berotasi otomatis setiap hari untuk menguji naluri keamanan.
- **Learning Path Resume**: Rekomendasi modul lanjutan berikutnya yang belum diselesaikan dengan satu klik.

### C. Learning Center (8 Modul Lengkap)

1. **Cybersecurity Fundamentals**: Dasar keamanan informasi, segitiga CIA Triad, dan strategi Defense in Depth.
2. **Phishing Awareness**: Variasi email phishing, spear phishing, whaling, typosquatting, dan homoglyph attack.
3. **Password Security**: Bahaya credential stuffing, brute force GPU modern, dan keunggulan passphrase.
4. **Social Engineering**: Pretexting, baiting, tailgating, dan eksploitasi psikologi rasa panik.
5. **Malware Awareness**: Virus, worm, trojan horse, ransomware, spyware, keylogger, dan infeksi macro.
6. **Safe Browsing**: Enkripsi HTTPS vs HTTP, mitos ikon gembok, dan jebakan Wi-Fi kafe Evil Twin.
7. **Digital Privacy**: Jejak digital aktif vs pasif, bisnis broker data, dan enkripsi DoH (DNS-over-HTTPS).
8. **Two-Factor Authentication (2FA)**: Hierarki keamanan SMS OTP vs Authenticator App (TOTP) vs Hardware Key FIDO2.
   _Setiap modul dilengkapi materi terstruktur, studi kasus insiden dunia nyata, tips pencegahan defensif, dan kuis evaluasi 3 soal untuk membuka status selesai (+50 XP)._

### D. Phishing Simulator (8 Kasus Simulasi)

- Menyajikan simulasi pesan nyata: **Bank BCA Alert**, **Google Security Alert (Legitimate)**, **WhatsApp Kurir Paket J&T APK**, **HRD Bonus Spear Phishing**, **SMS Hadiah Tokopedia**, **GitHub Reset Password (Legitimate)**, **Netflix Billing Scam**, dan **Telkomsel Poin (Legitimate)**.
- **Fitur Inspeksi Forensik**:
  - Pemeriksaan alamat domain pengirim asli.
  - Hover / sentuh tautan untuk melihat URL tujuan sebenarnya di bilah status browser.
  - Analisis indikator urgensi palsu dan permintaan data pribadi rahasia.
- Keputusan **"Aman (Resmi)"** vs **"Waspada! Phishing"** dengan ulasan edukatif dan deteksi Red Flags (+15 XP per kasus).

### E. Password Security Checker & Passphrase Generator

- **Audit Kekuatan Real-time**: Indikator kekuatan (Sangat Lemah hingga Sangat Kuat) dan nilai skor 0-100.
- **Analisis Entropi Matematis (Shannon Entropy)** & Estimasi Waktu Retas Brute-Force.
- **Deteksi Pola Lemah**: Memeriksa keberadaan kata sandi bocor (leaked passwords), karakter berulang (`aaa`), dan karakter berurutan (`123`, `qwerty`).
- **Passphrase Generator**: Membuat kata sandi 4 kata acak berbahasa Indonesia + angka berdaya tahan triliunan tahun terhadap brute force.
- **Jaminan Privasi Mutlak**: Password diproses hanya dalam memori browser, tidak pernah disimpan ke LocalStorage atau dikirim ke internet.

### F. Cyber Quiz (5 Kategori, 50 Soal)

- 5 Kategori: **Phishing**, **Password Security**, **Malware**, **Social Engineering**, dan **Digital Privacy** (masing-masing 10 pertanyaan mendalam).
- **Timer Hitung Mundur** 30 detik per soal.
- Ulasan pembahasan edukatif lengkap untuk setiap jawaban benar maupun salah.
- Perhitungan XP otomatis: **+20 XP** saat menyelesaikan kuis, bonus **+30 XP** jika skor ≥ 80%.

### G. Cyber Challenge (5 Skenario Studi Kasus)

1. **Situs E-Commerce Flash Sale Murah**: Menyingkap jebakan typo domain dan mitos gembok SSL.
2. **Membuat Password Tangguh Brute-Force**: Memilih kombinasi tahan serangan GPU 8x RTX 4090.
3. **Undangan Pernikahan .APK WhatsApp**: Menggagalkan infeksi trojan penyadap SMS OTP perbankan.
4. **Respon Akun Medsos Dibajak**: Protokol Incident Response darurat memutus sesi peretas.
5. **Dilema Wi-Fi Kafe Publik**: Mempertahankan privasi perbankan dari serangan Evil Twin hotspot.

### H. Sistem Gamifikasi Terpadu

- **Tingkatan Level**:
  - Level 1: **Beginner** (0 - 199 XP) 🛡️
  - Level 2: **Explorer** (200 - 449 XP) 🔍
  - Level 3: **Defender** (450 - 799 XP) ⚔️
  - Level 4: **Specialist** (800 - 1249 XP) ⚡
  - Level 5: **Cyber Expert** (1250+ XP) 👑
- **9 Trofi Pencapaian (Achievements)**:
  - _First Step_, _Phishing Hunter_, _Password Guardian_, _Quiz Aspirant_, _Quiz Master_, _The Perfectionist_, _Security Strategist_, _Cyber Defender_, dan _Cyber Expert_.
- Animasi perayaan kenaikan level (_Level Up Modal_) dan notifikasi toast saat trofi baru terbuka.

### I. Profil & Pengaturan Pengguna

- Kustomisasi nama tampilan agen siber.
- Pengalih tema antarmuka (**Dark Mode** & **Light Mode**) dengan persistensi di LocalStorage.
- Ringkasan komprehensif performa pembelajaran.
- Tombol **Reset Seluruh Progres** dengan modal konfirmasi keamanan.

---

## 💻 5. Cara Menjalankan Aplikasi

Aplikasi ini 100% berbasis berkas statis (_offline-ready_), tanpa memerlukan instalasi Node.js, PHP, maupun database.

1. **Buka Langsung di Browser**:
   - Cukup klik dua kali (double click) berkas `index.html` pada peramban web modern apa pun (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera).
2. **Atau Melalui Web Server Lokal Sederhana**:
   - Jika menggunakan ekstensi VS Code _Live Server_, klik kanan pada `index.html` lalu pilih **"Open with Live Server"**.

---

## 🛡️ 6. Standar Keamanan & Etika Pengujian

- **Sanitasi DOM**: Menghindari rendering input pengguna tanpa sanitasi (`escapeHTML`).
- **Defensive Security**: Seluruh konten berorientasi pada edukasi pertahanan diri (_defensive security awareness_).
- **Fictitious Simulation**: Semua nomor telepon, email, dan nama institusi pada simulasi adalah data rekaan fiktif untuk tujuan pedagogis.

---

**Siberuna - Think Smart. Stay Secure.**  
_ISCOMFEST 2026 Programming Competition_
