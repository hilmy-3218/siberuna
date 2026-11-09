/**
 * Siberuna - Challenges & Phishing Simulation Data
 * Berisi:
 * 1. PHISHING_CASES: Simulasi kasus pesan nyata (Email, SMS, WhatsApp) dengan indikator inspeksi
 * 2. SCENARIO_CHALLENGES: Tantangan skenario studi kasus interaktif berbasis pilihan keputusan
 */

const PHISHING_CASES = [
  {
    id: "phish-case-1",
    type: "email",
    title: "Pemberitahuan Penutupan Akun Bank BCA",
    senderName: "BCA Security Alert Center",
    senderAddress: "alert-verification@klikbca-security-update2026.com",
    recipient: "nasabah-terhormat@gmail.com",
    date: "Hari ini, 09:24 AM",
    subject: "URGENT: Akun KlikBCA Anda Dibekukan Sementara Karena Aktivitas Mencurigakan",
    body: `
      <p>Yth. Nasabah BCA,</p>
      <p>Sistem keamanan kami mendeteksi adanya <strong>3 kali percobaan login gagal</strong> dari perangkat tidak dikenal di luar negeri (IP: 185.220.101.5).</p>
      <p>Demi keamanan dana Anda, akses transaksi perbankan Anda kami <strong>nonaktifkan sementara</strong>. Segera lakukan verifikasi identitas dan perbarui PIN Anda dalam waktu <strong>1x24 jam</strong> atau rekening Anda akan ditutup permanen.</p>
      <div style="text-align: center; margin: 20px 0;">
        <span class="mock-link" data-url="http://klikbca-security-update2026.com/id/verify?token=92837482" style="background: #0066cc; color: #fff; padding: 12px 24px; border-radius: 6px; display: inline-block; font-weight: bold;">Verifikasi Akun Saya Sekarang</span>
      </div>
      <p style="font-size: 12px; color: #888;">PT Bank Central Asia Tbk berizin dan diawasi oleh OJK.</p>
    `,
    isPhishing: true,
    inspectionData: {
      domainReal: "klikbca-security-update2026.com (Bukan domain resmi bca.co.id atau klikbca.com)",
      targetUrl: "http://klikbca-security-update2026.com/id/verify?token=92837482",
      urgency: "Tinggi ('Dibekukan sementara', '1x24 jam atau ditutup permanen')",
      requestData: "Meminta verifikasi identitas dan input PIN melalui tautan eksternal HTTP tanpa enkripsi resmi",
      attachment: "Tidak ada"
    },
    redFlags: [
      "Domain email pengirim menggunakan domain palsu bukan bca.co.id",
      "URL tujuan mengarah ke domain tiruan http://klikbca-security-update2026.com",
      "Ancaman pemblokiran rekening dalam 24 jam untuk memicu kepanikan",
      "Bank BCA tidak pernah meminta nasabah memperbarui PIN melalui tautan email"
    ],
    safeExplanation: "Pesan ini adalah PHISHING klasik yang memanfaatkan logo bank ternama dan ancaman rekening dibekukan. Domain pengirim sama sekali bukan milik Bank BCA resmi."
  },

  {
    id: "phish-case-2",
    type: "email",
    title: "Peringatan Keamanan Akun Google Resmi",
    senderName: "Google",
    senderAddress: "no-reply@accounts.google.com",
    recipient: "user.learning@gmail.com",
    date: "Kemarin, 14:15 PM",
    subject: "Peringatan keamanan: Login baru di Windows",
    body: `
      <p>Halo Cyber Explorer,</p>
      <p>Akun Google Anda baru saja digunakan untuk login dari perangkat <strong>Windows (Chrome)</strong> di Jakarta, Indonesia.</p>
      <p>Jika ini adalah Anda, Anda tidak perlu melakukan apa pun. Jika bukan Anda, segera periksa aktivitas perangkat Anda melalui konsol keamanan resmi Google Akun.</p>
      <div style="margin: 20px 0;">
        <span class="mock-link" data-url="https://myaccount.google.com/notifications" style="border: 1px solid #dadce0; color: #1a73e8; padding: 10px 20px; border-radius: 4px; display: inline-block; font-weight: 500;">Periksa Aktivitas</span>
      </div>
      <p style="font-size: 12px; color: #5f6368;">Anda menerima email ini untuk memberi tahu Anda tentang perubahan penting pada Akun Google dan layanan Anda.</p>
    `,
    isPhishing: false,
    inspectionData: {
      domainReal: "accounts.google.com (Domain resmi terverifikasi Google)",
      targetUrl: "https://myaccount.google.com/notifications",
      urgency: "Wajar/Netral ('Jika ini Anda, tidak perlu melakukan apa pun')",
      requestData: "Tidak meminta password atau kode OTP di email",
      attachment: "Tidak ada"
    },
    redFlags: [],
    safeExplanation: "Pesan ini adalah EMAIL RESMI (LEGITIMATE). Domain pengirim asli 'no-reply@accounts.google.com', tautan mengarah langsung ke HTTPS 'myaccount.google.com', dan pesan tidak menuntut informasi sensitif secara tergesa-gesa."
  },

  {
    id: "phish-case-3",
    type: "whatsapp",
    title: "Chat WhatsApp: Kurir Paket Ekspedisi J&T Express",
    senderName: "+62 821-9988-3341 (Kurir J&T Budi)",
    senderAddress: "WhatsApp Chat (+62 821-9988-3341)",
    recipient: "Nomor WhatsApp Anda",
    date: "Hari ini, 11:02 AM",
    subject: "Paket Anda tertahan di gudang sortir karena alamat kurang jelas",
    body: `
      <div style="background: #0f172a; padding: 14px; border-radius: 8px; border-left: 4px solid #22c55e;">
        <p><strong>Kurir J&T Budi:</strong></p>
        <p>Siang kak, saya kurir ekspedisi J&T. Paket atas nama kakak tertahan di gudang sortir karena nomor rumah tidak terbaca. Mohon segera dicek resi dan foto paketnya di aplikasi resi ini ya kak biar bisa saya kirim sore ini.</p>
        <div style="background: #1e293b; padding: 10px; border-radius: 6px; margin: 10px 0; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">📦</span>
          <div>
            <div style="font-weight: bold; color: #38bdf8;">LIHAT_FOTO_PAKET_JNT.apk</div>
            <div style="font-size: 11px; color: #94a3b8;">Ukuran: 6.8 MB • Dokumen Android</div>
          </div>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">Tolong diinstal dan dibuka ya kak biar alamatnya bisa saya update.</p>
      </div>
    `,
    isPhishing: true,
    inspectionData: {
      domainReal: "Nomor pribadi seluler biasa (+62 821-9988-3341), bukan akun bisnis resmi centang hijau J&T",
      targetUrl: "File lampiran .APK (Android Package Kit) yang dikirim lewat chat",
      urgency: "Mendesak kurir ('biar bisa dikirim sore ini')",
      requestData: "Meminta menginstal file aplikasi APK tak dikenal di perangkat ponsel",
      attachment: "LIHAT_FOTO_PAKET_JNT.apk"
    },
    redFlags: [
      "Mengirimkan file berekstensi .APK (aplikasi Android) alih-alih file foto asli (.jpg / .png)",
      "Nomor pengirim adalah nomor ponsel biasa tanpa centang verifikasi bisnis",
      "Modus sniffing SMS / RAT (Remote Access Trojan) yang sangat populer di Indonesia untuk mencuri OTP perbankan",
      "Ekspedisi resmi memeriksa paket melalui nomor resi di situs resmi, bukan mewajibkan pelanggan menginstal file APK"
    ],
    safeExplanation: "Pesan ini adalah SMISHING / MALWARE DELIVERY BERBAHAYA. File .APK tersebut adalah malware infostealer yang akan menyadap SMS OTP m-banking Anda begitu diinstal."
  },

  {
    id: "phish-case-4",
    type: "email",
    title: "Email Internal: Penyesuaian Bonus Kinerja HRD",
    senderName: "HRD Management System",
    senderAddress: "hr-payroll@company-portal-evaluations.co",
    recipient: "karyawan@siberuna.org",
    date: "Kemarin, 16:45 PM",
    subject: "PENTING: Tinjau Alokasi Bonus Tahunan Karyawan 2026",
    body: `
      <p>Rekan Kerja,</p>
      <p>Manajemen telah menyelesaikan evaluasi kinerja kuartal ini. Kami dengan senang hati melampirkan lembar penyesuaian bonus Anda.</p>
      <p>Untuk melihat rincian besaran bonus dan nomor rekening transfer, silakan masuk ke portal internal menggunakan akun email perusahaan Anda:</p>
      <div style="margin: 18px 0;">
        <span class="mock-link" data-url="https://company-portal-evaluations.co/auth/login?sso=corp" style="background: #4f46e5; color: #fff; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">Masuk ke Portal HRD</span>
      </div>
      <p style="font-size: 12px; color: #888;">Divisi Human Capital Resources.</p>
    `,
    isPhishing: true,
    inspectionData: {
      domainReal: "company-portal-evaluations.co (Bukan domain resmi siberuna.org)",
      targetUrl: "https://company-portal-evaluations.co/auth/login?sso=corp",
      urgency: "Eksploitasi emosi rasa penasaran dan imbalan uang (Bonus)",
      requestData: "Meminta login kredensial SSO perusahaan di domain asing",
      attachment: "Tidak ada"
    },
    redFlags: [
      "Alamat domain pengirim menggunakan .co eksternal yang tidak sama dengan domain resmi kantor",
      "Tautan login mengarah ke form phishing pemanen kredensial (credential harvesting)",
      "Memanfaatkan rasa penasaran karyawan seputar bonus gaji untuk menurunkan kewaspadaan",
      "Nama penerima tidak spesifik ('Rekan Kerja')"
    ],
    safeExplanation: "Pesan ini adalah SPEAR PHISHING INTERNAL (Business Email Compromise). Penyerang meniru HRD untuk mencuri kata sandi akun korporat Anda."
  },

  {
    id: "phish-case-5",
    type: "sms",
    title: "SMS Hadiah: Gebyar Undian Tokopedia 2026",
    senderName: "INFO-TOKO",
    senderAddress: "SMS Masking (INFO-TOKO)",
    recipient: "Nomor Ponsel Anda",
    date: "Hari ini, 08:12 AM",
    subject: "Selamat! Nomor Anda terpilih pemenang Rp 50.000.000",
    body: `
      <div style="background: #022c22; padding: 14px; border-radius: 8px; border-left: 4px solid #10b981;">
        <p><strong>SMS dari: INFO-TOKO</strong></p>
        <p>Selamat! Nomor Anda resmi meraih Cek Tunai Rp 50.000.000 dari Gebyar Promo Tokopedia 2026 PIN Pemenang: (7729GB). Klaim hadiah Anda segera di situs resmi panitia:</p>
        <p style="color: #34d399; font-weight: bold; word-break: break-all;">
          <span class="mock-link" data-url="http://tokopedia-klaim-hadiah50jt.weebly.com">tokopedia-klaim-hadiah50jt.weebly.com</span>
        </p>
        <p style="font-size: 11px; color: #6ee7b7;">Pajak pemenang ditanggung penyelenggara. Batas klaim pukul 23:59 WIB.</p>
      </div>
    `,
    isPhishing: true,
    inspectionData: {
      domainReal: "weebly.com (Subdomain gratisan weebly, bukan tokopedia.com)",
      targetUrl: "http://tokopedia-klaim-hadiah50jt.weebly.com",
      urgency: "Sangat Tinggi ('Batas klaim pukul 23:59 WIB')",
      requestData: "Akan meminta transfer biaya administrasi atau data rekening",
      attachment: "Tidak ada"
    },
    redFlags: [
      "Menggunakan hosting gratisan 'weebly.com' alih-alih domain resmi tokopedia.com",
      "Mengaku membagikan hadiah puluhan juta tanpa pernah mengikuti undian resmi",
      "Batas waktu mendesak untuk memaksa korban bertindak tanpa berpikir",
      "Nama pengirim SMS Masking dapat dipalsukan menggunakan layanan SMS gateway luar negeri"
    ],
    safeExplanation: "Pesan ini adalah SMISHING PENIPUAN UNDIAN PALSU. Perusahaan resmi tidak pernah mengumumkan pemenang undian menggunakan situs hosting gratisan Weebly atau Blogspot."
  },

  {
    id: "phish-case-6",
    type: "email",
    title: "Konfirmasi Reset Password Akun GitHub",
    senderName: "GitHub",
    senderAddress: "support@github.com",
    recipient: "developer@siberuna.org",
    date: "Kemarin, 20:10 PM",
    subject: "[GitHub] Harap konfirmasi permintaan reset kata sandi Anda",
    body: `
      <p>Halo,</p>
      <p>Kami menerima permintaan untuk mereset kata sandi akun GitHub Anda untuk nama pengguna <strong>cyberdev2026</strong>.</p>
      <p>Jika Anda memang mengajukan permintaan ini, silakan klik tombol di bawah untuk memilih kata sandi baru:</p>
      <div style="margin: 18px 0;">
        <span class="mock-link" data-url="https://github.com/password_reset/8a92d83f98c19" style="background: #238636; color: #fff; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">Reset Kata Sandi</span>
      </div>
      <p style="font-size: 12px; color: #8b949e;">Jika Anda TIDAK meminta perubahan kata sandi ini, abaikan email ini dengan aman. Kata sandi Anda tidak akan diubah.</p>
    `,
    isPhishing: false,
    inspectionData: {
      domainReal: "github.com (Domain resmi terverifikasi GitHub Inc.)",
      targetUrl: "https://github.com/password_reset/8a92d83f98c19",
      urgency: "Tenang/Informatif ('Jika bukan Anda, abaikan email ini')",
      requestData: "Tautan reset resmi dengan token aman satu kali pakai",
      attachment: "Tidak ada"
    },
    redFlags: [],
    safeExplanation: "Pesan ini adalah EMAIL TRANSAKSIONAL ASLI (LEGITIMATE). Pengirim berasal dari domain resmi 'github.com', tautan berprotokol HTTPS 'github.com', dan terdapat penegasan bahwa jika bukan Anda yang meminta, Anda cukup mengabaikannya."
  },

  {
    id: "phish-case-7",
    type: "email",
    title: "Notifikasi Pembayaran Langganan Netflix Gagal",
    senderName: "Netflix Customer Support",
    senderAddress: "billing-service@netflix-account-verify-update.info",
    recipient: "movie.fan@gmail.com",
    date: "Hari ini, 06:40 AM",
    subject: "Pemberitahuan Terakhir: Penangguhan Keanggotaan Netflix Anda",
    body: `
      <p>Pelanggan yang Terhormat,</p>
      <p>Kami mengalami kendala saat memproses tagihan bulanan langganan Netflix Anda untuk periode bulan ini.</p>
      <p>Layanan streaming Anda akan dihentikan sementara sampai Anda memperbarui rincian kartu kredit atau metode pembayaran Anda.</p>
      <div style="margin: 18px 0;">
        <span class="mock-link" data-url="http://netflix-account-verify-update.info/login/payment-card" style="background: #E50914; color: #fff; padding: 12px 24px; border-radius: 4px; display: inline-block; font-weight: bold;">Perbarui Pembayaran Sekarang</span>
      </div>
      <p style="font-size: 12px; color: #737373;">Butuh bantuan? Kunjungi Pusat Bantuan Netflix.</p>
    `,
    isPhishing: true,
    inspectionData: {
      domainReal: "netflix-account-verify-update.info (Bukan domain resmi netflix.com)",
      targetUrl: "http://netflix-account-verify-update.info/login/payment-card",
      urgency: "Tinggi ('Pemberitahuan Terakhir', 'Penangguhan Keanggotaan')",
      requestData: "Meminta rincian nomor kartu kredit, tanggal kadaluarsa, dan CVV",
      attachment: "Tidak ada"
    },
    redFlags: [
      "Domain pengirim menggunakan ekstensi .info tiruan 'netflix-account-verify-update.info'",
      "Tautan pembayaran menggunakan HTTP biasa yang tidak terenkripsi",
      "Panggilan generik 'Pelanggan yang Terhormat' tanpa menyebutkan nama asli profil",
      "Halaman target berniat mencuri data kartu kredit nasabah"
    ],
    safeExplanation: "Pesan ini adalah PHISHING PENCURIAN KARTU KREDIT (Carding Scam). Domain situs sama sekali bukan milik netflix.com. Netflix resmi tidak menggunakan domain aneh berekstensi .info."
  },

  {
    id: "phish-case-8",
    type: "sms",
    title: "Notifikasi Poin Telkomsel Resmi",
    senderName: "TELKOMSEL",
    senderAddress: "SMS Resmi (TELKOMSEL)",
    recipient: "Nomor Ponsel Anda",
    date: "Kemarin, 12:00 PM",
    subject: "Info Poin Telkomsel Anda",
    body: `
      <div style="background: #1e1b4b; padding: 14px; border-radius: 8px; border-left: 4px solid #ef4444;">
        <p><strong>SMS Resmi dari: TELKOMSEL</strong></p>
        <p>Kamu memiliki 450 Telkomsel Poin. Tukarkan poinmu dengan kuota internet, voucher diskon belanja, atau undian berkala sebelum 31 Desember melalui aplikasi resmi MyTelkomsel atau hubungi *700#.</p>
        <p style="color: #93c5fd; font-weight: 500;">
          <span class="mock-link" data-url="https://www.telkomsel.com/mytelkomsel">Info lengkap: www.telkomsel.com/mytelkomsel</span>
        </p>
        <p style="font-size: 11px; color: #cbd5e1;">Skb. Waspada penipuan mengatasnamakan Telkomsel.</p>
      </div>
    `,
    isPhishing: false,
    inspectionData: {
      domainReal: "telkomsel.com (Domain resmi milik PT Telekomunikasi Selular)",
      targetUrl: "https://www.telkomsel.com/mytelkomsel",
      urgency: "Wajar/Informatif (Pemberitahuan masa berlaku poin akhir tahun)",
      requestData: "Tidak meminta transfer dana atau password, menyarankan akses ke aplikasi resmi atau dial *700#",
      attachment: "Tidak ada"
    },
    redFlags: [],
    safeExplanation: "Pesan ini adalah SMS INFORMATIF RESMI (LEGITIMATE). Pengirim adalah operator resmi, tautan mengarah langsung ke domain resmi www.telkomsel.com, dan terdapat anjuran akses mandiri melalui dial number *700# atau aplikasi MyTelkomsel."
  }
];

const SCENARIO_CHALLENGES = [
  {
    id: "scen-1",
    title: "Situs E-Commerce Flash Sale Super Murah",
    category: "Web Security",
    difficulty: "Menengah",
    badge: "Mendeteksi Website Palsu",
    icon: "shopping-bag",
    scenario: "Saat menjelajahi media sosial, Anda melihat iklan bersponsor: 'Diskon Cuci Gudang Laptop Gaming ROG hanya Rp 3.500.000 (Harga asli Rp 25.000.000)! Sisa 2 unit!'. Anda mengklik iklan tersebut dan diarahkan ke sebuah halaman toko online yang desainnya sangat mirip dengan marketplace ternama.",
    clues: [
      "Di address bar browser tertulis: 'https://tokopedia-promo-kilat2026.shop/checkout'",
      "Ada ikon gembok hijau HTTPS yang aktif di sebelah kiri URL",
      "Situs menampilkan timer hitung mundur 15 menit dengan suara detik jam yang berisik",
      "Metode pembayaran HANYA menerima transfer langsung ke nomor rekening bank pribadi (atas nama perorangan), pembayaran melalui VA/Escrow resmi dinonaktifkan dengan dalih 'sedang maintenance'"
    ],
    question: "Apa evaluasi paling tepat dan tindakan yang harus Anda lakukan?",
    options: [
      {
        id: "opt-1",
        text: "Segera lakukan transfer sebelum waktu hitung mundur habis, karena situs sudah memiliki gembok HTTPS sehingga transaksi dijamin aman oleh perbankan.",
        isCorrect: false,
        feedback: "Salah dan berbahaya! Gembok HTTPS hanya menjamin koneksi terenkripsi antara browser Anda dan server pembuat web. Siapa pun (termasuk penipu) dapat memasang sertifikat SSL gratis. Transfer rekening pribadi tanpa sistem rekber (escrow) adalah jaminan uang Anda lenyap."
      },
      {
        id: "opt-2",
        text: "Tutup halaman tersebut segera dan laporkan iklan palsu tersebut. Domain 'tokopedia-promo-kilat2026.shop' adalah situs kloning tiruan (typosquatting) dan metode transfer pribadi adalah ciri pasti penipuan e-commerce.",
        isCorrect: true,
        feedback: "Tepat sekali! Domain resmi adalah tokopedia.com, bukan .shop abal-abal. Diskon 85% yang tidak masuk akal, timer panik, dan kewajiban transfer ke rekening pribadi adalah trik penipuan toko online palsu yang sangat sering memakan korban."
      },
      {
        id: "opt-3",
        text: "Ketikkan nomor kartu kredit saja alih-alih transfer bank, agar jika terjadi penipuan bank bisa membatalkan transaksi.",
        isCorrect: false,
        feedback: "Sangat berbahaya! Memasukkan nomor kartu kredit ke situs palsu ini akan menyebabkan data kartu kredit Anda dicuri (carding) dan digunakan berbelanja secara ilegal."
      }
    ],
    xpReward: 40
  },

  {
    id: "scen-2",
    title: "Memilih Kata Sandi yang Tangguh Terhadap Brute Force",
    category: "Password Security",
    difficulty: "Mudah",
    badge: "Password Hardening",
    icon: "key-round",
    scenario: "Anda baru saja diterima bekerja sebagai Administrator Sistem di sebuah perusahaan finansial. Kebijakan keamanan perusahaan mengharuskan Anda membuat Master Password baru untuk brankas akun server perusahaan.",
    clues: [
      "Server penyerang menggunakan cluster 8 GPU RTX 4090 yang mampu mencoba 100 miliar kombinasi per detik",
      "Kamus penyerang sudah memuat seluruh leetspeak (seperti 0 pengganti o, @ pengganti a)",
      "Kata sandi harus dapat Anda ketikkan tanpa melihat contekan kertas setiap hari"
    ],
    question: "Di antara opsi kata sandi berikut, manakah pilihan TERBAIK yang paling kebal terhadap serangan brute-force dan paling mudah diingat secara jangka panjang?",
    options: [
      {
        id: "opt-1",
        text: "P@ssw0rd2026! (12 Karakter)",
        isCorrect: false,
        feedback: "Kurang kuat! Pola 'Password + tahun + simbol' adalah pola nomor 1 yang diuji oleh kamus peretas (rule-based attack). Dengan GPU modern, kombinasi ini dapat dipecahkan dalam hitungan menit."
      },
      {
        id: "opt-2",
        text: "xK#9$m (6 Karakter acak rumit)",
        isCorrect: false,
        feedback: "Sangat lemah! Meskipun menggunakan simbol dan huruf acak, panjangnya yang hanya 6 karakter memiliki ruang kombinasi sangat kecil yang dapat di-crack hanya dalam hitungan milidetik."
      },
      {
        id: "opt-3",
        text: "Merpati-Terbang-Di-Atas-Gunung-Kopi-99 (36 Karakter Passphrase)",
        isCorrect: true,
        feedback: "Pilihan Sempurna! Passphrase panjang yang menggabungkan beberapa kata acak tak berhubungan memiliki tingkat entropi lebih dari 90 bit. Komputer tercepat di dunia saat ini membutuhkan waktu triliunan tahun untuk menebaknya, namun otak manusia sangat mudah mengingatnya sebagai visual cerita."
      }
    ],
    xpReward: 40
  },

  {
    id: "scen-3",
    title: "Surat Undangan Pernikahan (.APK) di WhatsApp",
    category: "Malware & Mobile",
    difficulty: "Menengah",
    badge: "Deteksi APK Trojan",
    icon: "smartphone-nfc",
    scenario: "Ibu Anda memanggil Anda dengan cemas. Beliau baru saja menerima pesan WhatsApp dari nomor tak dikenal yang mengaku kerabat jauh. Pesan tersebut melampirkan file bernama 'Surat_Undangan_Pernikahan_Keluarga.apk' dan meminta Ibu Anda membukanya untuk memastikan nama yang tertera di undangan.",
    clues: [
      "File berekstensi .apk (bukan .pdf atau link dokumen)",
      "Ibu Anda sempat mengklik file tersebut dan muncul pop-up izin Android: 'Izinkan aplikasi membaca dan meneruskan pesan SMS?'",
      "Ibu Anda belum menekan tombol 'Izinkan'"
    ],
    question: "Sebagai anak yang paham keamanan siber, apa langkah intervensi segera yang paling tepat?",
    options: [
      {
        id: "opt-1",
        text: "Tekan 'Izinkan' agar bisa melihat siapa kerabat yang menikah, lalu jika tidak kenal baru hapus aplikasinya.",
        isCorrect: false,
        feedback: "Sangat fatal! Sekali izin SMS diberikan, malware akan langsung membaca pesan SMS masuk di latar belakang secara instan, menyedot kode OTP perbankan, dan menguras rekening dalam hitungan detik sebelum Anda sempat menghapusnya."
      },
      {
        id: "opt-2",
        text: "Segera tekan 'Tolak / Batalkan', batalkan instalasi, hapus file APK dari folder Download WhatsApp, blokir nomor pengirim, dan jelaskan kepada Ibu bahwa dokumen undangan asli tidak pernah berupa file aplikasi .APK.",
        isCorrect: true,
        feedback: "Langkah Penyelamatan Sempurna! Menolak izin SMS menggagalkan infeksi RAT/infostealer. Menghapus APK dan mengedukasi keluarga memutus rantai serangan malware APK yang marak memakan korban jutaan rupiah."
      },
      {
        id: "opt-3",
        text: "Biarkan saja terinstal tetapi matikan layar HP selama 2 jam.",
        isCorrect: false,
        feedback: "Keliru! Layar mati tidak menghentikan layanan latar belakang (background service) Android. Begitu aplikasi terinstal, malware tetap aktif."
      }
    ],
    xpReward: 40
  },

  {
    id: "scen-4",
    title: "Insiden Respon: Akun Instagram Tiba-Tiba Logout & Mengirim DM Pinjaman",
    category: "Incident Response",
    difficulty: "Lanjutan",
    badge: "Penanganan Peretasan",
    icon: "alert-triangle",
    scenario: "Saat Anda sedang santai, teman-teman Anda menelepon dan menanyakan mengapa Anda mengirim pesan DM Instagram meminta pinjaman uang mendesak Rp 2 juta dengan nomor rekening asing. Ketika Anda membuka aplikasi Instagram, Anda mendapati akun Anda telah ter-logout secara otomatis.",
    clues: [
      "Akun Anda telah diakses penyerang dari sesi lain",
      "Penyerang sedang aktif mengirim DM ke follower Anda",
      "Email utama Anda masih bisa diakses dan belum diganti"
    ],
    question: "Urutkan tindakan respon insiden darurat yang paling efektif dan tepat:",
    options: [
      {
        id: "opt-1",
        text: "Segera gunakan fitur 'Lupa Kata Sandi' via email resmi untuk mereset password, centang 'Keluarkan semua perangkat lain' (Log out of all sessions), aktifkan Two-Factor Authentication (2FA) via Authenticator App, dan buat pengumuman klarifikasi di status/platform lain bahwa akun Anda sempat dibajak.",
        isCorrect: true,
        feedback: "Langkah Incident Response yang Sangat Profesional! Memutus akses sesi peretas seketika, mengamankan pintu masuk dengan 2FA baru, dan memberikan klarifikasi publik untuk melindungi kontak Anda dari kerugian finansial."
      },
      {
        id: "opt-2",
        text: "Mengirim DM ke penyerang dari akun teman dan memohon agar akun dikembalikan secara baik-baik.",
        isCorrect: false,
        feedback: "Tidak efektif! Penyerang adalah kriminal siber terorganisir yang tidak peduli pada permohonan korban, dan tindakan ini hanya membuang-buang waktu emas penyelamatan akun."
      },
      {
        id: "opt-3",
        text: "Menghapus aplikasi Instagram dari smartphone Anda dan membuat akun baru.",
        isCorrect: false,
        feedback: "Keliru! Menghapus aplikasi di ponsel Anda tidak menghapus akun Anda di cloud Instagram. Penyerang akan tetap bebas menggunakan akun Anda untuk menipu orang lain."
      }
    ],
    xpReward: 40
  },

  {
    id: "scen-5",
    title: "Bekerja di Kedai Kopi: Jebakan Wi-Fi Publik 'Gratis_Cafe_5G'",
    category: "Network Security",
    difficulty: "Menengah",
    badge: "Wi-Fi Defense",
    icon: "wifi",
    scenario: "Anda sedang mengerjakan tugas akhir di sebuah kedai kopi ternama. Saat membuka daftar Wi-Fi di laptop, Anda melihat dua SSID yang sangat mirip: 'KedaiKopi_Official' (meminta password di struk kasir) dan 'KedaiKopi_Gratis_Terbuka_5G' (tanpa password, sinyal penuh). Anda perlu segera mengakses portal kampus dan rekening bank untuk membayar biaya semester.",
    clues: [
      "Jaringan kedua tidak menggunakan enkripsi WPA2/WPA3 (Open Network)",
      "Ada pengunjung lain di pojok kafe yang menggunakan antena Wi-Fi eksternal bertenaga tinggi",
      "Anda membawa smartphone dengan kuota internet 4G/5G melimpah"
    ],
    question: "Tindakan apa yang PALING AMAN untuk menyelesaikan transaksi pembayaran kuliah Anda?",
    options: [
      {
        id: "opt-1",
        text: "Hubungkan ke 'KedaiKopi_Gratis_Terbuka_5G' karena sinyalnya lebih kuat dan tidak perlu repot mencari struk pembelian.",
        isCorrect: false,
        feedback: "Sangat berbahaya! Ini adalah perangkap 'Evil Twin'. Penyerang sengaja memancarkan hotspot palsu untuk melakukan serangan Man-in-the-Middle (MitM) dan menyadap seluruh lalu lintas data Anda."
      },
      {
        id: "opt-2",
        text: "Buka mode penyamaran (Incognito Mode) di browser, lalu login ke akun bank menggunakan Wi-Fi terbuka tersebut.",
        isCorrect: false,
        feedback: "Mitos yang salah kaprah! Mode Incognito TIDAK mengenkripsi lalu lintas jaringan Wi-Fi Anda. Data yang dikirim tetap meluncur tanpa pelindung di udara dan dapat disadap oleh penyerang."
      },
      {
        id: "opt-3",
        text: "Hindari Wi-Fi terbuka tersebut. Gunakan hotspot pribadi (tethering) dari smartphone Anda sendiri atau aktifkan VPN terpercaya sebelum melakukan transaksi sensitif.",
        isCorrect: true,
        feedback: "Keputusan Sempurna! Paket data seluler pribadi memiliki isolasi jaringan yang jauh lebih aman daripada Wi-Fi publik, dan VPN menjamin lalu lintas data Anda terbungkus enkripsi anti-penyadapan."
      }
    ],
    xpReward: 40
  }
];

if (typeof window !== "undefined") {
  window.PHISHING_CASES = PHISHING_CASES;
  window.SCENARIO_CHALLENGES = SCENARIO_CHALLENGES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PHISHING_CASES, SCENARIO_CHALLENGES };
}

