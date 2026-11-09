/**
 * Siberuna - Learning Modules Data
 * Berisi 8 modul pembelajaran keamanan digital interaktif lengkap
 */

const CYBER_MODULES = [
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "Dasar",
    level: "Mudah",
    duration: "10 menit",
    icon: "shield",
    color: "from-blue-500 to-cyan-500",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    summary: "Pahami pilar dasar keamanan siber, segitiga CIA (Confidentiality, Integrity, Availability), dan lanskap ancaman modern.",
    description: "Keamanan siber bukan sekadar memasang antivirus, melainkan praktik perlindungan sistem, jaringan, dan data dari serangan digital berbahaya. Pelajari bagaimana hacker bekerja dan bagaimana membangun pertahanan digital yang kokoh.",
    sections: [
      {
        heading: "Apa Itu Cybersecurity?",
        content: "Cybersecurity (keamanan siber) adalah kombinasi teknologi, proses, dan kontrol operasional yang dirancang untuk melindungi sistem komputer, jaringan, program, dan data dari serangan siber, kerusakan, atau akses tidak sah. Di era digital saat ini, setiap perangkat yang terhubung ke internet berpotensi menjadi target ancaman jika tidak diamankan dengan benar."
      },
      {
        heading: "Segitiga CIA (The CIA Triad)",
        content: "Pondasi utama dalam dunia keamanan informasi bertumpu pada 3 pilar: \n\n• Confidentiality (Kerahasiaan): Memastikan data hanya dapat diakses oleh pihak yang berwenang melalui enkripsi dan kontrol akses.\n• Integrity (Integritas): Menjamin keaslian data tidak dimanipulasi atau diubah oleh pihak yang tidak sah di tengah jalan.\n• Availability (Ketersediaan): Menjamin sistem dan data selalu siap diakses oleh pengguna resmi saat dibutuhkan, mencegah downtime akibat serangan seperti DDoS."
      },
      {
        heading: "Prinsip Defense in Depth",
        content: "Jangan pernah mengandalkan satu lapis pertahanan saja. Defense in Depth adalah strategi pertahanan berlapis (layered defense) yang mencakup keamanan fisik, firewall jaringan, kontrol autentikasi ganda, edukasi pengguna, hingga pencadangan data berkala. Jika satu lapis jebol, lapis berikutnya tetap melindungi aset penting Anda."
      }
    ],
    caseStudy: {
      title: "Insiden Serangan Colonial Pipeline (2021)",
      description: "Pada Mei 2021, jaringan pipa bahan bakar terbesar di AS lumpuh total selama berhari-hari akibat infeksi ransomware DarkSide.",
      cause: "Penyerang berhasil masuk hanya melalui satu akun VPN lama yang tidak lagi dipakai oleh staf, yang kebetulan menggunakan password yang bocor di dark web dan TIDAK mengaktifkan Two-Factor Authentication (2FA).",
      lesson: "Satu celah sederhana pada lapisan autentikasi dapat meruntuhkan infrastruktur kritis nasional. Prinsip defense in depth dan audit akun pasif sangatlah krusial."
    },
    tips: [
      "Terapkan pembaruan perangkat lunak (patching) secara berkala agar celah keamanan segera tertutup.",
      "Gunakan koneksi internet yang terenkripsi dan hindari sembarangan menghubungkan perangkat ke jaringan publik.",
      "Lakukan backup data penting secara rutin menggunakan metode 3-2-1 (3 salinan, 2 media berbeda, 1 di lokasi terpisah).",
      "Selalu gunakan prinsip hak akses minimal (Principle of Least Privilege) pada perangkat kerja."
    ],
    quiz: [
      {
        question: "Manakah dari tiga pilar CIA Triad yang bertugas memastikan data tidak diubah atau dipalsukan oleh peretas?",
        options: ["Confidentiality (Kerahasiaan)", "Integrity (Integritas)", "Availability (Ketersediaan)", "Authentication (Autentikasi)"],
        correct: 1,
        explanation: "Integrity (Integritas) memastikan keakuratan dan keaslian informasi agar tidak dimodifikasi secara diam-diam oleh pihak tidak berwenang."
      },
      {
        question: "Apa konsep inti dari strategi 'Defense in Depth'?",
        options: [
          "Memasang antivirus termahal dalam satu komputer",
          "Menerapkan beberapa lapisan keamanan independen untuk melindungi aset data",
          "Memutuskan seluruh perangkat dari jaringan internet selamanya",
          "Hanya mengandalkan firewall bawaan sistem operasi"
        ],
        correct: 1,
        explanation: "Defense in Depth mengandalkan lapisan pertahanan berlapis: jika satu pertahanan gagal, pertahanan lain masih mampu menghadang penyerang."
      },
      {
        question: "Mengapa pembaruan perangkat lunak (security update) sangat penting dilakukan secara berkala?",
        options: [
          "Hanya untuk mempercantik tampilan antarmuka sistem operasi",
          "Untuk menutup celah kerentanan (vulnerabilities) yang telah ditemukan sebelum dieksploitasi peretas",
          "Membuat komputer kehabisan kapasitas memori secara sengaja",
          "Menghapus seluruh file yang tersimpan di hard disk"
        ],
        correct: 1,
        explanation: "Pembaruan rutin menutup celah kerentanan yang diketahui (CVE) sehingga malware atau hacker tidak dapat memanfaatkannya sebagai pintu masuk."
      }
    ]
  },
  {
    id: "phishing-awareness",
    title: "Phishing Awareness",
    category: "Ancaman",
    level: "Mudah",
    duration: "12 menit",
    icon: "mail-warning",
    color: "from-amber-500 to-red-500",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    summary: "Pelajari cara mengenali email, SMS, dan pesan palsu yang mencoba mencuri kredensial, OTP, serta data pribadi Anda.",
    description: "Phishing adalah salah satu teknik serangan siber paling umum di dunia. Pelaku menyamar sebagai institusi terpercaya (bank, penyedia layanan, atau instansi resmi) untuk memanipulasi korban agar menyerahkan data rahasia atau mengklik tautan berbahaya.",
    sections: [
      {
        heading: "Variasi Bentuk Serangan Phishing",
        content: "• Email Phishing: Pesan massal yang meniru perusahaan ternama dengan tautan situs web palsu.\n• Spear Phishing: Serangan terarah dan dipersonalisasi khusus untuk individu atau organisasi tertentu.\n• Whaling: Serangan spear phishing yang menargetkan eksekutif tingkat tinggi (CEO, direktur).\n• Smishing & Vishing: Phishing via SMS atau panggilan telepon (Voice Phishing) dengan memanfaatkan manipulasi suara atau pesan singkat."
      },
      {
        heading: "Tanda-Tanda Utama Pesan Phishing",
        content: "1. Urgensi Berlebihan: 'Akun Anda akan diblokir dalam 2 jam! Klik di sini sekarang!'.\n2. Alamat Pengirim Mencurigakan: Domain pengirim mirip tapi tidak identik (misal: support@bca-klik-verif.xyz bukannya domain resmi).\n3. Tautan Terselubung: Teks tautan bertuliskan 'www.bankanda.com' tetapi URL sebenarnya mengarah ke situs lain saat disorot (hover).\n4. Permintaan Informasi Sensitif: Meminta kata sandi, kode OTP, PIN ATM, atau nomor kartu kredit secara langsung."
      },
      {
        heading: "Bahaya Homoglyph & Typosquatting",
        content: "Penyerang sering menggunakan karakter mirip alfabet (misal huruf Yunani 'ο' menggantikan huruf Latin 'o') atau salah ketik yang disengaja (seperti 'googIe.com' dengan huruf 'I' besar pengganti 'l'). Selalu periksa URL di address bar browser dengan seksama!"
      }
    ],
    caseStudy: {
      title: "Penipuan Surat Undangan Pernikahan APK via WhatsApp",
      description: "Di Indonesia, marak penipuan bermodus file 'Surat Undangan Pernikahan.apk' atau 'Resi Kurir Paket.apk' yang dikirim melalui WhatsApp.",
      cause: "Korban penasaran dan mengunduh lalu menginstal file APK tersebut serta memberikan izin akses SMS (RECEIVE_SMS). Malware langsung menyadap pesan SMS berisi kode OTP perbankan korban.",
      lesson: "Jangan pernah menginstal file berekstensi .APK dari pesan instan asing, dan jangan pernah memberikan izin baca SMS kepada aplikasi yang tidak dikenal."
    },
    tips: [
      "Periksa domain email pengirim hingga ke huruf terakhir sebelum mempercayai isinya.",
      "Arahkan kursor mouse ke atas tautan (hover) untuk melihat tujuan asli URL sebelum mengkliknya.",
      "Instansi resmi dan perbankan TIDAK PERNAH meminta kode OTP atau PIN Anda melalui pesan singkat atau telepon.",
      "Gunakan browser modern yang memiliki fitur deteksi anti-phishing bawaan."
    ],
    quiz: [
      {
        question: "Anda menerima email berlogo bank resmi bertuliskan 'Segera verifikasi rekening Anda dalam 1 jam atau rekening dibekukan'. Tindakan paling tepat adalah:",
        options: [
          "Segera mengklik tautan agar rekening tidak terblokir",
          "Membalas email tersebut dengan mengirimkan nama pengguna dan nomor rekening",
          "Mengabaikan tautan, lalu memeriksa status rekening lewat aplikasi resmi bank atau hotline resmi",
          "Meneruskan email ke seluruh kontak untuk meminta pertolongan"
        ],
        correct: 2,
        explanation: "Rasa panik dan urgensi palsu adalah senjata utama phishing. Selalu verifikasi langsung ke kanal resmi yang independen."
      },
      {
        question: "Apa istilah serangan phishing yang dilancarkan secara spesifik dan dipersonalisasi kepada satu individu tertentu?",
        options: ["Mass Phishing", "Spear Phishing", "Brute Force", "DDoS"],
        correct: 1,
        explanation: "Spear Phishing menargetkan individu tertentu dengan informasi pribadi yang telah dikumpulkan sebelumnya agar tampak sangat meyakinkan."
      },
      {
        question: "Jika sebuah tautan bertuliskan 'klikbca.com' tetapi saat kursor diarahkan ke tautan tersebut muncul 'http://klik-bca-login-update.com/id', apa yang harus Anda lakukan?",
        options: [
          "Klik saja karena tulisan di luarnya sudah benar",
          "Jangan klik karena domain tujuan asli berbeda dengan teks tampilan dan berindikasi kuat phishing",
          "Masukkan password palsu untuk mengetes",
          "Buka tautan menggunakan mode incognito karena pasti aman"
        ],
        correct: 1,
        explanation: "Domain tujuan sebenarnya adalah yang menentukan ke mana Anda dibawa. Teks tautan dapat dipalsukan dengan mudah menggunakan tag HTML."
      }
    ]
  },
  {
    id: "password-security",
    title: "Password Security",
    category: "Proteksi",
    level: "Mudah",
    duration: "10 menit",
    icon: "key",
    color: "from-emerald-500 to-teal-500",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    summary: "Kuasai seni membuat kata sandi yang kebal dari serangan brute force, memahami entropi, dan bahaya credential stuffing.",
    description: "Password adalah garis pertahanan pertama akun online Anda. Menggunakan password sederhana atau mengulang password yang sama di banyak akun adalah resep bencana bagi keamanan digital Anda.",
    sections: [
      {
        heading: "Bagaimana Hacker Membobol Password?",
        content: "• Brute-Force Attack: Komputer mencoba setiap kombinasi karakter secara otomatis dengan kecepatan jutaan tebakan per detik.\n• Dictionary Attack: Menggunakan daftar kata kamus, nama populer, dan tanggal lahir umum.\n• Credential Stuffing: Mengambil daftar email dan password yang bocor dari satu situs, lalu mencobanya secara otomatis ke ratusan situs lain (Google, Instagram, Tokopedia, dll)."
      },
      {
        heading: "Panjang Lebih Penting Daripada Kerumitan",
        content: "Password 8 karakter yang rumit (misal: 'P@$w0rd') dapat dibobol mesin peretas modern dalam hitungan menit. Sebaliknya, Passphrase sepanjang 16-20 karakter yang terdiri dari 4 kata acak (misal: 'Kucing-Terbang-Beli-Kopi-2026') memiliki ruang entropi luar biasa besar dan membutuhkan waktu berabad-abad untuk di-crack."
      },
      {
        heading: "Mengapa Password Manager Adalah Solusi Terbaik?",
        content: "Otak manusia tidak dirancang untuk menghafal 50 kata sandi berbeda yang kuat. Password Manager mengenkripsi seluruh kredensial Anda dengan standar militer (AES-256) dan menghasilkan kata sandi acak unik untuk setiap akun Anda."
      }
    ],
    caseStudy: {
      title: "Kebocoran Data Kredensial LinkedIn & Efek Domino Stuffing",
      description: "Lebih dari 100 juta akun LinkedIn bocor ke internet karena hash kata sandi SHA-1 yang tidak diberi 'salt'.",
      cause: "Jutaan pengguna LinkedIn menggunakan password yang sama untuk email pribadi dan akun media sosial lainnya.",
      lesson: "Ketika satu layanan bocor, seluruh akun Anda yang lain akan terancam jika Anda mendaur ulang (reuse) password yang sama."
    },
    tips: [
      "Gunakan minimal 12 hingga 16 karakter untuk semua akun penting.",
      "Jangan pernah menggunakan informasi pribadi seperti tanggal lahir, nama anak, atau plat nomor kendaraan.",
      "Gunakan konsep Passphrase (kalimat unik yang mudah Anda bayangkan tetapi mustahil ditebak komputer).",
      "Jangan pernah menyimpan password di catatan kertas, spreadsheet tidak terenkripsi, atau file teks di desktop."
    ],
    quiz: [
      {
        question: "Manakah di antara kata sandi berikut yang paling tahan terhadap serangan Brute-Force modern?",
        options: [
          "admin12345",
          "P@ssw0rd!",
          "Kuda-Melompat-Awan-Biru-44",
          "juli1995"
        ],
        correct: 2,
        explanation: "Passphrase panjang (26 karakter) memiliki entropi matematis yang jauh lebih tinggi dibandingkan kata sandi pendek walaupun diberi karakter spesial."
      },
      {
        question: "Apa yang dimaksud dengan serangan 'Credential Stuffing'?",
        options: [
          "Menebak password dengan mengetik secara acak di keyboard",
          "Menggunakan pasangan username/password yang bocor dari suatu platform untuk mencoba login di platform lain",
          "Mencuri fisik laptop korban saat pemiliknya lengah",
          "Mengirimkan spam iklan produk makanan ke ribuan email"
        ],
        correct: 1,
        explanation: "Credential stuffing mengeksploitasi kebiasaan buruk pengguna yang menggunakan password identik di banyak akun berbeda."
      },
      {
        question: "Mengapa disarankan menggunakan aplikasi Password Manager?",
        options: [
          "Agar password dibagikan ke seluruh pengguna internet",
          "Untuk membuat dan menyimpan kata sandi unik, acak, dan panjang untuk setiap akun secara aman dan terenkripsi",
          "Membuat kecepatan koneksi internet menjadi dua kali lipat",
          "Menggantikan fungsi antivirus di komputer"
        ],
        correct: 1,
        explanation: "Password manager menghasilkan dan menyimpan password unik terenkripsi sehingga pengguna tidak perlu menghafal atau mengulang password."
      }
    ]
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    category: "Ancaman",
    level: "Menengah",
    duration: "14 menit",
    icon: "users",
    color: "from-purple-500 to-indigo-500",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    summary: "Pelajari bagaimana peretas mengeksploitasi psikologi manusia: rasa takut, empati, penasaran, dan rasa terdesak.",
    description: "Manusia sering disebut sebagai 'rantai terlemah' dalam keamanan informasi. Social Engineering tidak meretas sistem komputer secara teknis, melainkan memanipulasi pikiran dan emosi manusia untuk membocorkan informasi rahasia.",
    sections: [
      {
        heading: "Teknik Populer Social Engineering",
        content: "• Pretexting: Menciptakan skenario fiktif (misal mengaku sebagai teknisi IT pusat atau auditor internal) untuk meminta akses rahasia.\n• Baiting: Memberikan umpan memikat (misal flashdisk berlabel 'Gaji Karyawan 2026' yang ditinggalkan di lobi, yang sebenarnya berisi trojan).\n• Quid Pro Quo: Menawarkan bantuan palsu demi imbalan data (misal mengaku tim helpdesk yang menawarkan pembersihan virus gratis).\n• Tailgating / Piggybacking: Mengikuti staf resmi masuk melewati pintu gerbang akses kartu tanpa otorisasi."
      },
      {
        heading: "Pemicu Psikologis yang Dimanipulasi",
        content: "Peretas sosial memanfaatkan 6 pemicu psikologis utama:\n1. Otoritas (meniru polisi atau direktur perusahaan)\n2. Urgensi (menciptakan kepanikan agar tidak sempat berpikir logis)\n3. Kelangkaan (hadiah gratis yang hampir habis)\n4. Keingintahuan (gosip atau data rahasia)\n5. Empati (memohon bantuan dalam situasi darurat)\n6. Konsensus Sosial ('Semua orang sudah mengisi form ini')."
      },
      {
        heading: "Cara Mempertahankan Diri",
        content: "Kuncinya adalah 'Skeptisisme Sehat' (Healthy Skepticism). Berhentilah sejenak saat ada permintaan mendesak. Verifikasi identitas pemohon melalui jalur resmi terpisah sebelum melakukan tindakan apa pun."
      }
    ],
    caseStudy: {
      title: "Pembobolan Akun Twitter Tokoh Dunia (2020)",
      description: "Akun Twitter milik Barack Obama, Elon Musk, Bill Gates, dan Apple tiba-tiba mengunggah cuitan penipuan Bitcoin ganda.",
      cause: "Remaja 17 tahun berhasil menipu karyawan Twitter melalui telepon dengan mengaku sebagai staf teknis TI yang membutuhkan akses ke panel administrasi internal Twitter.",
      lesson: "Bahkan perusahaan teknologi raksasa dengan sistem canggih dapat ditembus jika karyawannya berhasil dimanipulasi secara psikologis."
    },
    tips: [
      "Jangan pernah terburu-buru merespons permintaan yang mengatasnamakan atasan jika menyangkut transfer uang atau data rahasia.",
      "Jangan pernah menancapkan flashdisk atau media penyimpanan tak dikenal yang Anda temukan di tempat umum.",
      "Lakukan verifikasi dua arah (out-of-band verification) sebelum menyetujui transaksi sensitif.",
      "Tolak secara sopan siapa pun yang meminta izin membukakan pintu akses aman perusahaan tanpa kartu resmi."
    ],
    quiz: [
      {
        question: "Anda menemukan sebuah flashdisk USB tergeletak di meja kafetaria kantor dengan tulisan 'Bonus Direksi 2026'. Tindakan paling aman adalah:",
        options: [
          "Menancapkannya ke laptop kerja untuk melihat file siapa yang tertinggal",
          "Menancapkannya ke laptop teman agar aman",
          "Tidak menancapkannya ke perangkat apa pun dan menyerahkannya ke tim keamanan / IT Security",
          "Memformat flashdisk tersebut di komputer kantor agar bisa dipakai sendiri"
        ],
        correct: 2,
        explanation: "Ini adalah taktik 'Baiting'. Flashdisk tersebut mungkin sengaja diletakkan dan telah diprogram dengan payload berbahaya (BadUSB) yang otomatis mengeksekusi malware begitu dicolokkan."
      },
      {
        question: "Seseorang menelepon Anda mengaku sebagai petugas IT Support dan meminta password Anda untuk memperbaiki masalah server darurat. Apa yang harus Anda lakukan?",
        options: [
          "Memberikan password karena masalahnya darurat",
          "Menolak memberikan password dan menghubungi helpdesk IT resmi melalui nomor kontak perusahaan yang sah",
          "Memberikan password tetapi meminta mereka segera logout setelah selesai",
          "Memberikan password cadangan saja"
        ],
        correct: 1,
        explanation: "Tim IT yang sah tidak pernah membutuhkan password pribadi pengguna untuk melakukan perawatan server."
      },
      {
        question: "Faktor psikologis apa yang paling sering dieksploitasi oleh penyerang social engineering untuk mematikan daya kritis korban?",
        options: ["Rasa bosan", "Rasa lapar", "Rasa panik dan urgensi waktu yang mendesak", "Rasa kantuk"],
        correct: 2,
        explanation: "Urgensi dan kepanikan memaksa otak korban mengambil keputusan instingtif cepat tanpa melakukan analisis rasional."
      }
    ]
  },
  {
    id: "malware-awareness",
    title: "Malware Awareness",
    category: "Ancaman",
    level: "Menengah",
    duration: "12 menit",
    icon: "bug",
    color: "from-rose-500 to-pink-500",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    summary: "Kenali jenis-jenis perangkat lunak berbahaya: Virus, Trojan, Ransomware, Spyware, dan Rootkit serta cara pencegahannya.",
    description: "Malware (Malicious Software) adalah program yang dirancang sengaja untuk merusak sistem, mencuri data rahasia, atau memeras pemilik perangkat. Memahami cara kerjanya adalah langkah penting untuk menjaga kebersihan ekosistem digital Anda.",
    sections: [
      {
        heading: "Taksonomi Malware Populer",
        content: "• Virus: Program yang menyisipkan dirinya ke program lain dan menyebar saat file tersebut dijalankan.\n• Worm: Malware mandiri yang dapat menduplikasi diri dan menyebar melalui jaringan tanpa interaksi pengguna.\n• Trojan Horse: Menyamar sebagai aplikasi berguna (misal software bajakan/game) padahal membuka pintu belakang (backdoor).\n• Ransomware: Mengenkripsi file penting korban dan menuntut tebusan uang kripto untuk kunci dekripsi.\n• Spyware / Keylogger: Merekam ketukan keyboard, aktivitas layar, dan kamera pengguna secara rahasia."
      },
      {
        heading: "Vektor Infeksi Malware Terbesar",
        content: "1. Mengunduh software bajakan / crack (key generator sering kali disusupi malware infostealer).\n2. Lampiran email berbahaya (.exe, .scr, .vbs, .iso, dokumen dengan macro jahat).\n3. Drive-by download dari situs web berbahaya atau iklan terinfeksi (malvertising).\n4. Media penyimpanan eksternal (USB flash drive) yang terinfeksi."
      },
      {
        heading: "Gejala Perangkat Terinfeksi Malware",
        content: "Kinerja perangkat melambat drastis tanpa alasan, muncul pop-up iklan terus-menerus, kipas berputar kencang akibat utilisasi CPU 100% (penambangan kripto ilegal), atau file penting tiba-tiba berubah ekstensi menjadi kode acak."
      }
    ],
    caseStudy: {
      title: "WannaCry Ransomware Epidemic (2017)",
      description: "Dalam hitungan jam, lebih dari 200.000 komputer di 150 negara terkunci total, termasuk sistem rumah sakit di Inggris.",
      cause: "WannaCry menggunakan eksploit EternalBlue pada protokol SMBv1 Windows yang belum diperbarui oleh pengguna.",
      lesson: "Malware jenis worm dapat melumpuhkan seluruh institusi secara otomatis tanpa perlu korban mengklik file, menegaskan pentingnya update keamanan berkala."
    },
    tips: [
      "Hindari mengunduh program crack atau game bajakan dari forum dan situs tidak resmi.",
      "Gunakan Windows Defender atau antivirus terpercaya dan pastikan definisinya selalu diperbarui.",
      "Nonaktifkan macro pada dokumen Microsoft Office yang berasal dari sumber luar.",
      "Lakukan pemindaian (scan) berkala pada sistem dan media penyimpanan eksternal."
    ],
    quiz: [
      {
        question: "Jenis malware apa yang mengunci file korban dengan enkripsi kuat dan meminta tebusan uang untuk membukanya?",
        options: ["Adware", "Ransomware", "Spyware", "Spam"],
        correct: 1,
        explanation: "Ransomware mengenkripsi file penting dan menuntut uang tebusan (ransom) biasanya dalam bentuk cryptocurrency."
      },
      {
        question: "Mengapa mengunduh 'Software Crack' atau 'Keygen' sangat berbahaya bagi keamanan komputer?",
        options: [
          "Karena pasti membuat kapasitas monitor mengecil",
          "Karena pembuat crack sering menyisipkan Trojan, Backdoor, atau Infostealer di dalamnya",
          "Karena software bajakan memiliki kualitas grafis lebih jelek",
          "Karena tidak bisa dimatikan tombol powernya"
        ],
        correct: 1,
        explanation: "Penjahat siber kerap membungkus malware berbahaya ke dalam file crack gratisan sebagai jebakan paling ampuh bagi pengguna yang mencari software gratis."
      },
      {
        question: "Perbedaan utama antara Virus dan Worm komputer adalah:",
        options: [
          "Worm dapat menyebar sendiri melalui jaringan tanpa perlu file inang atau interaksi pengguna, sedangkan Virus membutuhkan file inang dan eksekusi pengguna",
          "Virus hanya menyerang smartphone, sedangkan Worm hanya menyerang laptop",
          "Worm tidak berbahaya bagi komputer",
          "Virus diciptakan oleh perusahaan antivirus sendiri"
        ],
        correct: 0,
        explanation: "Worm adalah malware mandiri yang secara aktif memanfaatkan kerentanan jaringan untuk menggandakan dirinya ke mesin lain secara otomatis."
      }
    ]
  },
  {
    id: "safe-browsing",
    title: "Safe Browsing",
    category: "Praktik",
    level: "Mudah",
    duration: "10 menit",
    icon: "globe",
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    summary: "Jelajahi internet dengan aman: pahami HTTPS, sertifikat digital, bahaya public Wi-Fi, dan proteksi dari ekstensi nakal.",
    description: "Browser web adalah jendela utama kita ke dunia maya. Namun, berselancar tanpa perlindungan dapat menghadapkan Anda pada pengintaian data, serangan Man-in-the-Middle (MitM), dan infeksi web berbahaya.",
    sections: [
      {
        heading: "HTTP vs HTTPS: Apa Bedanya?",
        content: "• HTTP (Hypertext Transfer Protocol): Mengirimkan data dalam bentuk teks biasa (plaintext). Siapapun di jaringan yang sama dapat mengintip kata sandi atau pesan Anda.\n• HTTPS (HTTP Secure): Data dienkripsi menggunakan protokol TLS/SSL. Meskipun peretas mencegat lalu lintas data, mereka hanya melihat deretan karakter acak yang mustahil dibaca."
      },
      {
        heading: "Mitos Ikon Gembok (Lock Icon)",
        content: "PENTING: Ikon gembok pada browser HANYA berarti koneksi Anda ke situs tersebut terenkripsi. Ikon tersebut BUKAN jaminan bahwa pemilik situs adalah orang jujur. Saat ini banyak situs phishing juga telah menggunakan sertifikat HTTPS gratis untuk menipu korban!"
      },
      {
        heading: "Bahaya Wi-Fi Publik Gratis",
        content: "Koneksi Wi-Fi terbuka di kafe atau bandara sangat rentan terhadap serangan 'Evil Twin' (hotspot palsu berbayang) dan sniffing. Jangan pernah melakukan transaksi perbankan atau memasukkan kredensial sensitif saat terhubung ke Wi-Fi publik tanpa VPN."
      }
    ],
    caseStudy: {
      title: "Serangan Evil Twin Hotspot di Konferensi Internasional",
      description: "Peserta konferensi terhubung ke Wi-Fi terbuka bernama 'Conference_Guest_Free'.",
      cause: "Hotspot tersebut ternyata dipancarkan oleh penyerang menggunakan perangkat portabel khusus. Seluruh lalu lintas data yang tidak terenkripsi disadap dan dimanipulasi.",
      lesson: "Selalu konfirmasi nama SSID resmi ke pengelola tempat, gunakan VPN, atau lebih aman gunakan paket data seluler pribadi."
    },
    tips: [
      "Pastikan alamat situs selalu diawali dengan 'https://' terutama saat memasukkan informasi login atau pembayaran.",
      "Gunakan ekstensi browser ad-blocker dan perlindungan privasi (seperti uBlock Origin).",
      "Periksa izin ekstensi browser dan hapus ekstensi yang tidak lagi digunakan.",
      "Gunakan Virtual Private Network (VPN) terpercaya saat terpaksa memakai Wi-Fi publik."
    ],
    quiz: [
      {
        question: "Apakah keberadaan ikon gembok (HTTPS) pada address bar menjamin 100% bahwa situs tersebut bukan situs penipuan?",
        options: [
          "Ya, hanya situs resmi terpercaya yang bisa mendapatkan gembok HTTPS",
          "Tidak, HTTPS hanya menjamin koneksi terenkripsi, penipu juga bisa memasang HTTPS di situs palsunya",
          "Ya, gembok HTTPS diberikan langsung oleh kepolisian siber dunia",
          "Hanya berlaku jika membukanya di komputer Mac"
        ],
        correct: 1,
        explanation: "Sertifikat TLS/SSL kini bisa didapatkan secara gratis oleh siapa saja. HTTPS menjamin keamanan transmisi, bukan kejujuran entitas pemilik website."
      },
      {
        question: "Tindakan paling aman ketika Anda terpaksa mengakses akun perbankan melalui jaringan Wi-Fi publik di kedai kopi adalah:",
        options: [
          "Menggunakan koneksi paket data seluler sendiri (tethering) atau mengaktifkan VPN terpercaya",
          "Menggunakan mode Incognito / Private Browsing",
          "Mengetik password secara cepat agar tidak terlihat orang lain",
          "Meminta izin kepada barista kedai kopi"
        ],
        correct: 0,
        explanation: "Mode Incognito hanya tidak menyimpan riwayat lokal, namun lalu lintas data tetap terbaca di jaringan Wi-Fi. VPN atau koneksi seluler pribadi melindungi data Anda dari penyadapan jaringan lokal."
      },
      {
        question: "Apa risiko utama dari memasang sembarang ekstensi/add-on pada browser internet?",
        options: [
          "Membuat resolusi layar menjadi hitam putih",
          "Ekstensi berbahaya dapat membaca seluruh halaman web yang Anda buka termasuk password dan nomor kartu kredit",
          "Menghilangkan tombol keyboard secara fisik",
          "Membuat kabel internet terbakar"
        ],
        correct: 1,
        explanation: "Ekstensi browser memiliki akses luas ke DOM halaman web, sehingga ekstensi jahat dapat mencatat input form dan data sensitif."
      }
    ]
  },
  {
    id: "digital-privacy",
    title: "Digital Privacy",
    category: "Privasi",
    level: "Menengah",
    duration: "11 menit",
    icon: "eye-off",
    color: "from-violet-500 to-purple-600",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    summary: "Kendalikan jejak digital Anda, pahami bagaimana data broker mengumpulkan profil Anda, dan lindungi hak privasi Anda.",
    description: "Di era ekonomi data, 'jika produknya gratis, maka Andalah produknya'. Pelajari bagaimana setiap klik, pencarian, dan lokasi Anda dilacak serta langkah praktis untuk membatasi pengawasan digital.",
    sections: [
      {
        heading: "Apa Itu Jejak Digital (Digital Footprint)?",
        content: "• Jejak Digital Pasif: Informasi yang terkumpul tanpa disadari secara langsung (alamat IP, fingerprint browser, durasi kunjungan web, riwayat browsing).\n• Jejak Digital Aktif: Data yang sengaja Anda bagikan ke internet (unggahan media sosial, komentar, ulasan produk, formulir online)."
      },
      {
        heading: "Industri Data Broker & Pelacakan Iklan",
        content: "Data broker membeli dan menggabungkan data dari ribuan sumber untuk membangun profil psikografis Anda secara detail: preferensi politik, status ekonomi, kondisi kesehatan, hingga kebiasaan belanja. Profil ini dijual ke pengiklan atau pihak ketiga lainnya."
      },
      {
        heading: "Bahaya Oversharing di Media Sosial",
        content: "Membagikan tiket pesawat (yang memiliki barcode/PNR), foto kartu identitas, lokasi check-in langsung saat rumah kosong, atau nama hewan peliharaan (yang sering dijadikan jawaban pertanyaan keamanan) memberi amunisi lengkap bagi peretas untuk rekayasa sosial."
      }
    ],
    caseStudy: {
      title: "Skandal Data Cambridge Analytica & Facebook (2018)",
      description: "Data pribadi dari 87 juta pengguna Facebook dikumpulkan tanpa persetujuan eksplisit melalui aplikasi kuis kepribadian pihak ketiga.",
      cause: "Pengguna mengisi kuis yang meminta izin akses profil dan daftar teman pengguna secara berlebihan.",
      lesson: "Data privasi yang Anda serahkan ke aplikasi kuis sederhana dapat digunakan untuk manipulasi psikologis skala masif."
    },
    tips: [
      "Tinjau dan batasi izin aplikasi (permission) di smartphone Anda: matikan izin lokasi dan mikrofon jika tidak relevan.",
      "Jangan pernah mengunggah foto dokumen identitas (KTP, SIM, paspor, boarding pass) ke media sosial.",
      "Gunakan mesin pencari yang fokus pada privasi seperti DuckDuckGo jika tidak ingin aktivitas pencarian diprofilkan.",
      "Bersihkan cookie browser secara rutin atau gunakan fitur tracking prevention."
    ],
    quiz: [
      {
        question: "Mengapa mengunggah foto boarding pass (tiket pesawat) ke media sosial sangat tidak dianjurkan?",
        options: [
          "Karena dapat membuat orang lain iri",
          "Karena barcode pada tiket menyimpan kode booking (PNR) yang dapat digunakan siapa saja untuk mengakses data paspor, nomor telepon, dan mengubah jadwal penerbangan Anda",
          "Karena kualitas foto kamera ponsel akan menurun",
          "Karena pihak bandara akan membatalkan tiket secara otomatis"
        ],
        correct: 1,
        explanation: "Kode barcode tiket menyimpan data PNR (Passenger Name Record) yang memungkinkan peretas masuk ke portal maskapai dan mengeksploitasi data pribadi Anda."
      },
      {
        question: "Apa tujuan utama dari 'Data Broker' di internet?",
        options: [
          "Membantu pengguna memperbaiki komputer rusak",
          "Mengumpulkan, mengagregasi, dan menjual profil data pribadi pengguna kepada pengiklan atau pihak ketiga",
          "Membuat game edukasi online gratis",
          "Menjaga server internet dari bahaya petir"
        ],
        correct: 1,
        explanation: "Data broker memonetisasi data pengguna dengan mengumpulkan jejak aktivitas dari berbagai sumber untuk membuat profil terperinci."
      },
      {
        question: "Manakah tindakan terbaik untuk meminimalkan jejak digital pasif saat menjelajahi web?",
        options: [
          "Menyalakan monitor dengan tingkat kecerahan rendah",
          "Menggunakan browser berorientasi privasi, memblokir cookie pihak ketiga, dan mengaktifkan DNS terenkripsi",
          "Mengetik dengan satu jari saja",
          "Mematikan komputer setiap 15 menit"
        ],
        correct: 1,
        explanation: "Penggunaan browser privasi, pemblokiran tracker pihak ketiga, dan DNS over HTTPS secara signifikan mengurangi pelacakan pasif."
      }
    ]
  },
  {
    id: "two-factor-authentication",
    title: "Two-Factor Authentication (2FA)",
    category: "Proteksi",
    level: "Lanjutan",
    duration: "12 menit",
    icon: "smartphone",
    color: "from-emerald-600 to-green-500",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    summary: "Ketahui mengapa 2FA adalah benteng terkuat akun Anda: perbandingan SMS OTP, TOTP Authenticator, dan Hardware Key.",
    description: "Jika password Anda berhasil dicuri hacker, Two-Factor Authentication (2FA) adalah benteng pertahanan yang mencegah mereka masuk ke dalam akun Anda. Pelajari variasi metode 2FA dari yang paling praktis hingga yang paling aman.",
    sections: [
      {
        heading: "Tiga Faktor Autentikasi",
        content: "Autentikasi keamanan didasarkan pada kombinasi:\n1. Something you KNOW: Sesuatu yang Anda tahu (Password, PIN).\n2. Something you HAVE: Sesuatu yang Anda miliki (Smartphone dengan aplikasi authenticator, kartu pintar, hardware token FIDO2).\n3. Something you ARE: Sesuatu yang melekat pada fisik Anda (Biometrik: sidik jari, pemindaian wajah, retina)."
      },
      {
        heading: "Hierarki Keamanan Metode 2FA",
        content: "• SMS OTP (Level Rendah-Sedang): Rentan terhadap pembajakan nomor (SIM Swapping) dan intersepsi jaringan SS7.\n• Authenticator App / TOTP (Level Tinggi): Menghasilkan kode 6 digit setiap 30 detik secara offline (Google Authenticator, Microsoft Authenticator, Aegis). Jauh lebih aman dari SMS.\n• Hardware Security Key / FIDO2 (Level Tertinggi): Kunci fisik berbasis USB/NFC (misal YubiKey). Kebal terhadap phishing karena terikat secara kriptografis pada domain situs yang dituju."
      },
      {
        heading: "Pentingnya Menyimpan Backup Codes",
        content: "Saat mengaktifkan 2FA, layanan akan memberikan 8-10 kode cadangan (Backup / Recovery Codes). Simpan kode ini di tempat fisik yang aman! Jika ponsel Anda hilang atau rusak, kode cadangan adalah satu-satunya kunci darurat untuk memulihkan akses akun Anda."
      }
    ],
    caseStudy: {
      title: "Kejahatan Pembajakan SIM Card (SIM Swap Scam)",
      description: "Seorang wartawan teknologi kehilangan kendali atas akun email, Twitter, dan rekening kripto dalam semalam.",
      cause: "Pelaku mendatangi gerai operator seluler dan memalsukan identitas korban untuk meminta pergantian kartu SIM baru. Semua SMS OTP login langsung masuk ke HP pelaku.",
      lesson: "Hindari SMS sebagai sarana 2FA untuk akun finansial penting; beralihlah ke aplikasi Authenticator atau kunci fisik."
    },
    tips: [
      "Aktifkan 2FA di seluruh akun vital Anda: email utama, media sosial, e-wallet, dan portal perbankan.",
      "Gunakan aplikasi Authenticator (seperti Google Authenticator) ketimbang SMS kapan pun tersedia opsi tersebut.",
      "Cetak atau tulis kode cadangan (backup codes) di atas kertas dan simpan di tempat aman.",
      "Jangan pernah membagikan kode OTP 6 digit kepada siapa pun, termasuk orang yang mengaku petugas resmi."
    ],
    quiz: [
      {
        question: "Mengapa aplikasi Authenticator (TOTP) lebih direkomendasikan daripada pengiriman OTP lewat SMS?",
        options: [
          "Karena SMS membutuhkan pulsa mahal",
          "Karena SMS rentan terhadap serangan SIM Swapping dan penyadapan jaringan seluler, sedangkan TOTP dihasilkan secara lokal dan independen dari jaringan telepon",
          "Karena aplikasi Authenticator membuat warna layar lebih tajam",
          "Karena SMS tidak bisa dibuka jika tidak ada koneksi Wi-Fi"
        ],
        correct: 1,
        explanation: "SIM swap attack memungkinkan penjahat mengalihkan nomor Anda ke SIM baru sehingga mereka dapat menerima SMS OTP Anda. Aplikasi Authenticator bekerja secara lokal di memori ponsel."
      },
      {
        question: "Manakah dari faktor berikut yang termasuk dalam kategori 'Something you HAVE' pada konsep Multi-Factor Authentication?",
        options: [
          "Password alfanumerik",
          "Kunci fisik USB U2F / Hardware Token",
          "Pemindaian sidik jari",
          "Jawaban nama ibu kandung"
        ],
        correct: 1,
        explanation: "Kunci fisik USB atau smartphone fisik adalah objek yang dimiliki pengguna (Something you HAVE)."
      },
      {
        question: "Jika Anda mengaktifkan 2FA pada akun email penting Anda, hal wajib apa yang harus segera Anda amankan?",
        options: [
          "Mengunggah tangkapan layar kode QR ke story media sosial",
          "Mencatat dan menyimpan kode cadangan (Recovery/Backup Codes) di tempat yang aman",
          "Menghapus aplikasi authenticator dari ponsel",
          "Mengganti password email menjadi '123456'"
        ],
        correct: 1,
        explanation: "Kode pemulihan cadangan (recovery codes) adalah kunci penyelamat jika smartphone Anda hilang atau rusak agar Anda tidak terkunci dari akun selamanya."
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.CYBER_MODULES = CYBER_MODULES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CYBER_MODULES };
}

