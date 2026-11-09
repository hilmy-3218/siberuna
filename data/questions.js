/**
 * Siberuna - Cyber Quiz Question Bank
 * Berisi minimal 10 pertanyaan mendalam dan berbobot untuk setiap kategori:
 * 1. Phishing (10 soal)
 * 2. Password Security (10 soal)
 * 3. Malware (10 soal)
 * 4. Social Engineering (10 soal)
 * 5. Digital Privacy (10 soal)
 * Total: 50 Soal Edukatif
 */

const QUIZ_QUESTIONS = {
  phishing: [
    {
      id: "phish-1",
      question: "Anda menerima email dari 'support@paypaI.com' (huruf L diganti I kapital) yang menyatakan transaksi $500 berhasil dilakukan. Taktik manipulasi domain ini dikenal sebagai:",
      options: [
        "Typosquatting / Homoglyph Attack",
        "SQL Injection",
        "Cross-Site Scripting",
        "DDoS Attack"
      ],
      correctAnswer: 0,
      explanation: "Typosquatting atau Homoglyph attack memanfaatkan kemiripan visual huruf (seperti huruf 'I' besar yang tampak persis seperti huruf 'l' kecil) untuk mengelabui mata korban."
    },
    {
      id: "phish-2",
      question: "Apa perbedaan paling mendasar antara email phishing massal biasa dengan serangan Spear Phishing?",
      options: [
        "Phishing biasa menggunakan lampiran file, sedangkan spear phishing tidak",
        "Spear Phishing ditargetkan secara spesifik kepada individu tertentu dengan pesan yang dipersonalisasi",
        "Spear Phishing hanya bisa dikirimkan melalui saluran SMS",
        "Phishing massal selalu lolos dari filter spam email"
      ],
      correctAnswer: 1,
      explanation: "Spear Phishing menggunakan informasi personal yang telah diriset terlebih dahulu (nama, rekan kerja, jabatan) sehingga pesannya terlihat jauh lebih meyakinkan bagi target tertentu."
    },
    {
      id: "phish-3",
      question: "Istilah untuk serangan phishing yang secara khusus menargetkan eksekutif tingkat atas perusahaan seperti CEO, CFO, atau Direktur adalah:",
      options: [
        "Dolphin Phishing",
        "Whaling",
        "Trolling",
        "Angler Phishing"
      ],
      correctAnswer: 1,
      explanation: "Whaling (perburuan paus) mengincar target bernilai tinggi (C-level executives) untuk mencuri data finansial atau meloloskan transfer dana dalam jumlah raksasa."
    },
    {
      id: "phish-4",
      question: "Anda menerima pesan WhatsApp dari nomor asing: 'Selamat! No HP Anda memenangkan undian 100 Juta dari Bank X, klik link: bit.ly/hadiah-bank-2026'. Serangan ini disebut:",
      options: [
        "Vishing",
        "Smishing (SMS/Chat Phishing)",
        "Ransomware",
        "Adware"
      ],
      correctAnswer: 1,
      explanation: "Smishing adalah singkatan dari SMS Phishing, yang kini juga mencakup penipuan via aplikasi pesan instan seperti WhatsApp, Telegram, atau Line."
    },
    {
      id: "phish-5",
      question: "Ketika memeriksa sebuah email yang mencurigakan, langkah pertama yang paling aman untuk memverifikasi keaslian tautan tanpa mengkliknya adalah:",
      options: [
        "Membuka tautan di jendela penyamaran (Incognito)",
        "Mengarahkan kursor mouse ke atas tautan (hover) untuk melihat URL tujuan sebenarnya di bilah status",
        "Mengeklik tautan tersebut dari smartphone karena ponsel kebal virus",
        "Membalas email tersebut dan bertanya apakah pengirimnya asli"
      ],
      correctAnswer: 1,
      explanation: "Hover kursor (menyorot tanpa mengklik) memperlihatkan URL hyperlink tujuan sebenarnya di sudut bawah browser, membongkar URL palsu yang disamarkan teks tampilan."
    },
    {
      id: "phish-6",
      question: "Apa alasan utama mengapa pesan phishing sering kali menggunakan bahasa yang bernada sangat panik atau mendesak (sense of urgency)?",
      options: [
        "Karena pengirim tidak memiliki banyak kuota internet",
        "Untuk memicu respons emosional instingtif korban sehingga tidak sempat berpikir kritis atau memeriksa fakta",
        "Agar email tersebut terkirim lebih cepat oleh server",
        "Memenuhi standar tata bahasa formal internasional"
      ],
      correctAnswer: 1,
      explanation: "Kepanikan mematikan fungsi evaluasi kritis otak (korteks prefrontal). Korban yang tergesa-gesa lebih cenderung langsung mengklik tanpa memeriksa kejanggalan."
    },
    {
      id: "phish-7",
      question: "Sebuah email menyatakan akun perbankan Anda akan diblokir kecuali Anda mengunggah foto kartu identitas dan kartu ATM bolak-balik ke formulir online. Indikator bahaya paling nyata adalah:",
      options: [
        "Email dikirim pada akhir pekan",
        "Lembaga perbankan resmi tidak pernah meminta CVV/CVC kartu ATM atau data rahasia melalui formulir web eksternal",
        "Ukuran tulisan terlalu kecil",
        "Email menggunakan bahasa Indonesia"
      ],
      correctAnswer: 1,
      explanation: "Bank dan institusi keuangan resmi memiliki regulasi ketat dan tidak akan pernah meminta foto fisik kartu ATM beserta kode CVV/CVC rahasia melalui formulir tautan email."
    },
    {
      id: "phish-8",
      question: "Apa yang dimaksud dengan 'Vishing' dalam dunia rekayasa sosial dan penipuan digital?",
      options: [
        "Pencurian data melalui siaran video langsung",
        "Voice Phishing: Penipuan phishing yang dilakukan melalui panggilan telepon suara langsung",
        "Penyebaran virus melalui file gambar JPG",
        "Pembajakan visual monitor korban"
      ],
      correctAnswer: 1,
      explanation: "Vishing (Voice Phishing) menggunakan panggilan telepon (bahkan kini menggunakan AI voice cloning) untuk memanipulasi korban agar mentransfer uang atau memberikan OTP."
    },
    {
      id: "phish-9",
      question: "Manakah dari alamat pengirim email berikut yang PALING mencurigakan jika mengklaim berasal dari layanan resmi Google Security?",
      options: [
        "no-reply@accounts.google.com",
        "security-alert@google.com",
        "google-security-support@secure-login-portal-xyz.biz",
        "support@google.com"
      ],
      correctAnswer: 2,
      explanation: "Domain sebenarnya ada di bagian paling akhir sebelum ekstensi: 'secure-login-portal-xyz.biz'. Penipu menaruh nama 'google' di awal subdomain untuk mengelabui mata pembaca."
    },
    {
      id: "phish-10",
      question: "Jika Anda terlanjur mengklik tautan phishing dan memasukkan kata sandi akun Anda, tindakan darurat pertama yang harus dilakukan adalah:",
      options: [
        "Menutup browser dan berharap penipu lupa",
        "Segera mengganti kata sandi akun tersebut melalui aplikasi/website resmi dari perangkat aman, serta mengakhiri sesi aktif (log out all devices)",
        "Mematikan daya komputer dan tidak menyalakannya selama seminggu",
        "Mengirim email komplain ke alamat phishing tersebut"
      ],
      correctAnswer: 1,
      explanation: "Waktu sangat krusial. Segera ganti password dari jalur resmi dan pilih opsi 'Keluar dari semua perangkat' sebelum penyerang sempat mengambil alih atau mengubah email pemulihan."
    }
  ],

  password: [
    {
      id: "pass-1",
      question: "Manakah dari konsep pembuatan kata sandi berikut yang paling efektif menahan serangan Brute-Force dan mudah diingat?",
      options: [
        "Satu kata kamus pendek ditambah angka: 'Jakarta1'",
        "Passphrase panjang yang terdiri dari 4 kata acak tak berhubungan: 'Kopi-Langit-Sepeda-Melompat-89'",
        "Kombinasi 6 huruf acak: 'xQ#9!a'",
        "Nama panggilan anak dibalik: 'anidub'"
      ],
      correctAnswer: 1,
      explanation: "Passphrase panjang (25+ karakter) memberikan ruang entropi matematis yang sangat masif, membutuhkan waktu miliaran tahun untuk ditebak mesin pencari kombinasi."
    },
    {
      id: "pass-2",
      question: "Mengapa mengganti huruf menjadi angka yang mirip (seperti 'P@ssw0rd1') TIDAK lagi dianggap aman oleh standar keamanan modern (seperti NIST)?",
      options: [
        "Karena kamus peretas (dictionary attack) sudah memprogram permutasi leetspeak (@=a, 0=o, 1=i) secara otomatis",
        "Karena simbol dilarang oleh pembuat browser",
        "Karena angka membuat server menjadi lambat",
        "Karena hanya boleh menggunakan huruf kapital"
      ],
      correctAnswer: 0,
      explanation: "Algoritma brute-force modern menyertakan aturan leetspeak otomatis. Kombinasi 'P@ssw0rd' akan diuji di detik-detik awal serangan berbasis kamus."
    },
    {
      id: "pass-3",
      question: "Apa risiko paling fatal dari kebiasaan menggunakan SATU kata sandi yang sama untuk semua akun online Anda?",
      options: [
        "Keyboard komputer menjadi cepat aus",
        "Jika satu situs web mengalami kebocoran data, penyerang dapat mengakses seluruh akun Anda lainnya (Credential Stuffing)",
        "Akun Anda akan ditandai spam oleh Google",
        "Layanan perbankan akan menolak transfer dana Anda"
      ],
      correctAnswer: 1,
      explanation: "Kebocoran data di satu forum kecil sekalipun dapat membuka akses ke email dan rekening penting Anda jika kredensialnya sama persis."
    },
    {
      id: "pass-4",
      question: "Berapa panjang karakter minimal yang direkomendasikan oleh standar NIST untuk kata sandi akun penting?",
      options: [
        "Minimal 4 karakter",
        "Minimal 6 karakter",
        "Minimal 12 hingga 16 karakter",
        "Maksimal 8 karakter"
      ],
      correctAnswer: 2,
      explanation: "NIST dan pakar keamanan menyarankan panjang minimal 12 karakter (dan idealnya 16+ karakter untuk akun master atau administrator)."
    },
    {
      id: "pass-5",
      question: "Apa fungsi utama dari teknik 'Salting' dalam penyimpanan hash kata sandi di sistem database?",
      options: [
        "Membuat rasa database menjadi lebih gurih",
        "Menambahkan deretan karakter acak unik pada setiap password sebelum di-hash agar kebal dari pencarian Rainbow Table",
        "Mengubah password menjadi file suara",
        "Membatasi jumlah percobaan login pengguna"
      ],
      correctAnswer: 1,
      explanation: "Salt memastikan bahwa dua pengguna dengan kata sandi identik akan menghasilkan nilai hash yang sama sekali berbeda, menggagalkan serangan tabel pencarian balik (Rainbow Table)."
    },
    {
      id: "pass-6",
      question: "Apa keunggulan menggunakan pengelola kata sandi (Password Manager) seperti Bitwarden atau 1Password?",
      options: [
        "Membantu membagikan password secara terbuka ke internet",
        "Membuat dan menyimpan kata sandi acak berkekuatan tinggi yang berbeda untuk tiap akun dalam brankas terenkripsi",
        "Menghilangkan kebutuhan akan koneksi internet",
        "Mencegah laptop terkena debu"
      ],
      correctAnswer: 1,
      explanation: "Password manager mengenkripsi seluruh brankas menggunakan AES-256 dengan Master Password tunggal, sehingga Anda tidak perlu lagi mengingat puluhan kata sandi unik."
    },
    {
      id: "pass-7",
      question: "Standar pedoman NIST SP 800-63B terbaru TIDAK lagi mewajibkan pengguna untuk mengganti password setiap 30-90 hari secara paksa. Mengapa?",
      options: [
        "Karena peretas sudah tidak tertarik lagi mencuri password",
        "Karena penggantian paksa yang terlalu sering justru mendorong pengguna membuat pola yang mudah ditebak (misal: Januari1!, Februari2!)",
        "Karena server database kehabisan ruang penyimpanan",
        "Karena sistem enkripsi sekarang sudah tidak bisa dipecahkan"
      ],
      correctAnswer: 1,
      explanation: "Riset membuktikan rotasi paksa berkala menyebabkan pengguna memakai pola prediksi berurutan. Standar modern lebih menekankan panjang password dan verifikasi terhadap daftar password bocor."
    },
    {
      id: "pass-8",
      question: "Kapan Anda WAJIB segera mengganti kata sandi akun Anda?",
      options: [
        "Setiap kali Anda selesai menonton video di YouTube",
        "Ketika platform tersebut mengumumkan insiden kebocoran data (data breach) atau terdeteksi aktivitas login asing",
        "Setiap kali baterai smartphone Anda habis",
        "Hanya saat tahun baru masehi"
      ],
      correctAnswer: 1,
      explanation: "Penggantian kata sandi wajib dilakukan seketika ada notifikasi aktivitas mencurigakan atau peringatan kebocoran data dari pemantau kredensial."
    },
    {
      id: "pass-9",
      question: "Di mana tempat yang PALING TIDAK AMAN untuk mencatat kata sandi penting Anda?",
      options: [
        "Di dalam brankas Password Manager terenkripsi",
        "Di sticky notes yang ditempelkan di tepi monitor komputer kantor atau file teks terbuka di desktop",
        "Di dalam buku catatan rahasia yang terkunci di brankas fisik rumah",
        "Di memori otak Anda sendiri"
      ],
      correctAnswer: 1,
      explanation: "Sticky note di monitor rentan terhadap bahaya 'Shoulder Surfing' (orang lain melihat langsung), dan file teks polos di desktop sangat mudah diekstrak oleh infostealer malware."
    },
    {
      id: "pass-10",
      question: "Apa yang diukur oleh istilah 'Entropi Kata Sandi' (Password Entropy) dalam keamanan kriptografi?",
      options: [
        "Kecepatan pengetikan kata sandi oleh pengguna",
        "Tingkat ketidakpastian atau keacakan kata sandi yang diukur dalam satuan bit logaritmik",
        "Ukuran file kata sandi dalam kilobyte",
        "Berapa lama kata sandi tersebut tersimpan di server"
      ],
      correctAnswer: 1,
      explanation: "Entropi (dihitung dalam bit) merepresentasikan seberapa sulit sebuah kata sandi ditebak melalui pencarian acak atau komputasi brute-force."
    }
  ],

  malware: [
    {
      id: "mal-1",
      question: "Malware jenis apakah yang secara diam-diam merekam setiap ketukan tombol keyboard untuk mencuri username, password, dan pesan percakapan korban?",
      options: [
        "Adware",
        "Keylogger",
        "Worm",
        "Ransomware"
      ],
      correctAnswer: 1,
      explanation: "Keylogger (bagian dari keluarga Spyware) menyusup di sistem operasi untuk menangkap ketukan keyboard dan mengirimkan log tersebut ke server penyerang."
    },
    {
      id: "mal-2",
      question: "Sebuah program tampak seperti game pembersih RAM gratis yang bermanfaat, namun di latar belakang membuka akses pintu belakang (backdoor) ke sistem Anda. Program ini adalah:",
      options: [
        "Trojan Horse",
        "Ransomware",
        "Macro Virus",
        "Fileless Worm"
      ],
      correctAnswer: 0,
      explanation: "Mengadopsi kisah Kuda Troya mitologi Yunani, Trojan menyamarkan diri sebagai program legal atau berguna padahal membawa muatan jahat (malicious payload)."
    },
    {
      id: "mal-3",
      question: "Apa karakteristik utama yang membedakan 'Ransomware' dari jenis malware lainnya?",
      options: [
        "Menampilkan iklan banner produk makanan di layar desktop",
        "Mengenkripsi dokumen dan file pribadi korban menggunakan algoritma kriptografi kuat dan meminta uang tebusan untuk kunci dekripsinya",
        "Mematikan koneksi Bluetooth",
        "Mengirim email ucapan selamat ulang tahun ke semua kontak"
      ],
      correctAnswer: 1,
      explanation: "Ransomware menyandera data korban dengan enkripsi asimetris (misal AES-256 + RSA), sehingga file tidak bisa dibuka tanpa kunci privat yang dikuasai penyerang."
    },
    {
      id: "mal-4",
      question: "Jenis malware yang memiliki kemampuan menyebar secara otomatis dari satu komputer ke komputer lain melalui celah jaringan tanpa campur tangan korban adalah:",
      options: [
        "Worm",
        "Spyware",
        "Scareware",
        "Adware"
      ],
      correctAnswer: 0,
      explanation: "Worm tidak membutuhkan file inang (host file) maupun tindakan klik pengguna untuk bereplikasi; worm mencari komputer rentan di jaringan dan menginfeksinya secara mandiri."
    },
    {
      id: "mal-5",
      question: "Apa yang dimaksud dengan malware 'Rootkit'?",
      options: [
        "Program untuk mempercantik tampilan folder Windows",
        "Malware canggih level kernel yang beroperasi di lapisan terdalam sistem operasi untuk menyembunyikan eksistensinya dan malware lain dari deteksi antivirus",
        "Aplikasi untuk mengukur suhu kipas prosesor",
        "Virus yang hanya menyerang kabel LAN"
      ],
      correctAnswer: 1,
      explanation: "Rootkit memanipulasi panggilan API sistem operasi atau kernel sehingga proses jahat dan filenya tidak terlihat sama sekali di Task Manager maupun scanner biasa."
    },
    {
      id: "mal-6",
      question: "Apa bahaya dari dokumen Word atau Excel berekstensi .docm atau yang meminta Anda 'Enable Content / Enable Macros' saat dibuka dari email asing?",
      options: [
        "Membuat ukuran font dokumen membesar",
        "Dokumen tersebut dapat mengeksekusi skrip Visual Basic for Applications (VBA Macro) yang mengunduh dan menginstal malware ke komputer Anda",
        "Menghabiskan tinta printer",
        "Hanya akan menerjemahkan teks ke bahasa asing"
      ],
      correctAnswer: 1,
      explanation: "Macro adalah skrip otomatisasi yang sangat sering dimanfaatkan penjahat siber untuk mengeksekusi perintah PowerShell jahat saat tombol 'Enable Content' ditekan korban."
    },
    {
      id: "mal-7",
      question: "Kumpulan ribuan atau jutaan perangkat terinfeksi malware yang dikendalikan dari jarak jauh oleh penyerang melalui Command & Control (C2) server disebut:",
      options: [
        "Cluster Server",
        "Botnet (Zombie Network)",
        "Neural Network",
        "Data Lake"
      ],
      correctAnswer: 1,
      explanation: "Botnet digunakan penyerang untuk melancarkan serangan penolakan layanan terdistribusi (DDoS), mengirim jutaan email spam, atau penambangan kripto massal."
    },
    {
      id: "mal-8",
      question: "Mengapa strategi pencadangan data 'Metode 3-2-1' sangat direkomendasikan sebagai penangkal serangan Ransomware?",
      options: [
        "Karena metode ini membuat ransomware menjadi antivirus",
        "Menyimpan 3 salinan data, pada 2 media penyimpanan berbeda, dengan minimal 1 salinan disimpan di lokasi terpisah / offline (air-gapped) yang tidak terjangkau jaringan",
        "Hanya membutuhkan 3 detik untuk memulihkan seluruh komputer",
        "Metode ini diajarkan oleh pembuat ransomware"
      ],
      correctAnswer: 1,
      explanation: "Jika ransomware mengenkripsi komputer dan hard drive eksternal lokal Anda, salinan cadangan offline (air-gapped) atau cloud terisolasi menjamin data Anda tetap dapat dipulihkan tanpa membayar tebusan."
    },
    {
      id: "mal-9",
      question: "Apa istilah untuk teknik serangan di mana malware disisipkan ke dalam jaringan iklan online resmi pada situs web populer?",
      options: [
        "Clickbaiting",
        "Malvertising (Malicious Advertising)",
        "Pharming",
        "Defacing"
      ],
      correctAnswer: 1,
      explanation: "Malvertising menyusupkan kode jahat ke dalam jaringan sindikasi iklan daring, sehingga pengunjung situs terkemuka pun dapat terpapar eksploitasi browser tanpa sengaja mengunduh file."
    },
    {
      id: "mal-10",
      question: "Tiba-tiba muncul jendela pop-up di layar berbunyi: 'PERINGATAN! Komputer Anda terinfeksi 39 Virus! Segera hubungi nomor telepon ini dan bayar $100 untuk membersihkan'. Ini adalah contoh taktik:",
      options: [
        "Scareware",
        "Zero-day Exploit",
        "Rootkit",
        "Man-in-the-Middle"
      ],
      correctAnswer: 0,
      explanation: "Scareware adalah tipuan rekayasa sosial yang menggunakan peringatan palsu mengerikan untuk menakut-nakuti korban agar membeli software abal-abal atau menelepon sindikat penipu."
    }
  ],

  social: [
    {
      id: "soc-1",
      question: "Seorang pelaku menelepon resepsionis perusahaan mengaku sebagai konsultan audit pajak mendesak yang butuh salinan laporan keuangan staf sebelum sore ini. Taktik social engineering ini disebut:",
      options: [
        "Pretexting",
        "Watering Hole",
        "Brute Force",
        "SQL Injection"
      ],
      correctAnswer: 0,
      explanation: "Pretexting adalah pembuatan skenario fiktif yang terencana untuk membangun legitimasi palsu agar korban mematuhi permintaan data rahasia."
    },
    {
      id: "soc-2",
      question: "Pelaku sengaja meninggalkan beberapa USB drive berlabel 'Daftar Gaji & Bonus Direksi 2026' di tempat parkir kantor dengan harapan ada karyawan yang memungut dan mencolokkannya. Taktik ini disebut:",
      options: [
        "Baiting (Pemberian Umpan)",
        "Pharming",
        "Dumpster Diving",
        "Shoulder Surfing"
      ],
      correctAnswer: 0,
      explanation: "Baiting mengeksploitasi rasa penasaran atau ketamakan manusia dengan menyediakan 'umpan' fisik atau digital yang membawa muatan berbahaya."
    },
    {
      id: "soc-3",
      question: "Seorang penyerang berjalan tepat di belakang seorang staf berkartu akses resmi sambil membawa tumpukan kardus berat dan meminta tolong dibukakan pintu gedung aman. Teknik ini disebut:",
      options: [
        "Tailgating / Piggybacking",
        "Eavesdropping",
        "Bluejacking",
        "Skimming"
      ],
      correctAnswer: 0,
      explanation: "Tailgating mengeksploitasi kesopanan sosial manusia untuk menyusup ke fasilitas fisik terlarang tanpa memindai kredensial akses."
    },
    {
      id: "soc-4",
      question: "Apa yang dimaksud dengan praktik 'Dumpster Diving' dalam konteks pengumpulan intelijen penyerang siber?",
      options: [
        "Berenang di danau untuk menyembunyikan laptop",
        "Mengaduk-aduk tempat sampah fisik kantor untuk mencari dokumen kertas berisi password, memo internal, atau nomor telepon penting yang tidak dihancurkan (shredded)",
        "Menghapus cache browser secara manual",
        "Membuang harddisk lama ke laut"
      ],
      correctAnswer: 1,
      explanation: "Banyak informasi rahasia dibuang begitu saja tanpa mesin penghancur kertas (paper shredder), memudahkan pelaku merancang serangan spear phishing yang akurat."
    },
    {
      id: "soc-5",
      question: "Ketika seseorang mengintip dari belakang punggung Anda di ATM atau transportasi umum untuk melihat Anda mengetikkan PIN atau pola kunci layar, teknik ini dinamai:",
      options: [
        "Shoulder Surfing",
        "Man-in-the-Middle",
        "DNS Poisoning",
        "Clickjacking"
      ],
      correctAnswer: 0,
      explanation: "Shoulder Surfing adalah pengamatan visual langsung terhadap input data rahasia korban saat berada di ruang publik."
    },
    {
      id: "soc-6",
      question: "Mengapa prinsip verifikasi 'Out-of-Band' (jalur independen terpisah) adalah penangkal paling ampuh terhadap serangan Business Email Compromise (BEC)?",
      options: [
        "Karena tidak memerlukan sambungan listrik",
        "Karena sebelum mentransfer dana atas instruksi email atasan/rekanan, staf mengonfirmasi kembali ke nomor telepon resmi yang sudah terdaftar sebelumnya, bukan nomor di email tersebut",
        "Karena membatalkan semua pembayaran perusahaan",
        "Karena menggunakan surat pos kilat khusus"
      ],
      correctAnswer: 1,
      explanation: "Jika akun email rekanan diretas, mengonfirmasi lewat jalur telepon resmi yang terverifikasi memastikan instruksi transfer tersebut asli dan bukan manipulasi peretas."
    },
    {
      id: "soc-7",
      question: "Taktik di mana penyerang menawarkan 'solusi' atau bantuan teknis palsu demi imbalan data atau akses sistem disebut:",
      options: [
        "Quid Pro Quo (Sesuatu untuk Sesuatu)",
        "Zero-Day Exploit",
        "Smishing",
        "Stalking"
      ],
      correctAnswer: 0,
      explanation: "Quid Pro Quo menawarkan layanan semu (misal: mengaku teknisi IT yang menelepon secara acak untuk 'memperbaiki bug') dan meminta kredensial login sebagai kompensasi."
    },
    {
      id: "soc-8",
      question: "Dalam prinsip psikologi pengaruh (Cialdini), mengapa penipu online gemar berpura-pura menjadi aparat penegak hukum atau pejabat resmi?",
      options: [
        "Prinsip Otoritas (Authority) — orang cenderung patuh tanpa ragu ketika berhadapan dengan figur kekuasaan",
        "Prinsip Kelangkaan (Scarcity)",
        "Prinsip Timbal Balik (Reciprocity)",
        "Prinsip Kesukaan (Liking)"
      ],
      correctAnswer: 0,
      explanation: "Otoritas memicu rasa takut akan sanksi hukum, membuat korban menuruti instruksi tanpa berani membantah atau melakukan verifikasi kritis."
    },
    {
      id: "soc-9",
      question: "Anda menerima pesan dari teman lama di media sosial: 'Hai, tolong banget! Aku lagi tertahan di kantor polisi dan butuh pulsa/transfer darurat Rp500 ribu sekarang!'. Respon terbaik Anda:",
      options: [
        "Segera mentransfer karena kasihan pada teman Anda",
        "Hubungi teman Anda tersebut secara langsung melalui panggilan telepon biasa atau jalur lain untuk memastikan apakah akunnya sedang dibajak",
        "Memarahi orang tersebut di kolom komentar",
        "Mengirimkan foto KTP Anda"
      ],
      correctAnswer: 1,
      explanation: "Pembajakan akun media sosial sering diikuti pesan permintaan uang darurat kepada daftar teman. Verifikasi langsung dengan suara telepon nyata adalah keharusan."
    },
    {
      id: "soc-10",
      question: "Apa langkah perlindungan terbaik yang harus diterapkan organisasi untuk menanggulangi ancaman Social Engineering?",
      options: [
        "Memasang kabel jaringan anti-air",
        "Pelatihan kesadaran keamanan berkala (Security Awareness Training) dan simulasi rutin untuk seluruh karyawan",
        "Melarang karyawan berbicara satu sama lain di kantor",
        "Mengganti monitor komputer setiap semester"
      ],
      correctAnswer: 1,
      explanation: "Karena sasaran social engineering adalah manusia, edukasi berkelanjutan dan pembentukan budaya sadar risiko (security-first culture) adalah benteng pertahanan terkuat."
    }
  ],

  privacy: [
    {
      id: "priv-1",
      question: "Apa yang membedakan 'Jejak Digital Aktif' dengan 'Jejak Digital Pasif'?",
      options: [
        "Jejak aktif hanya ada di siang hari, pasif di malam hari",
        "Jejak aktif adalah data yang sengaja dibagikan pengguna (status medsos, formulir), sedangkan jejak pasif terkumpul di latar belakang (alamat IP, fingerprint peramban)",
        "Jejak pasif tidak bisa dilihat oleh siapa pun",
        "Jejak aktif dibuat oleh robot komputer"
      ],
      correctAnswer: 1,
      explanation: "Jejak aktif adalah jejak yang Anda tinggalkan dengan sengaja, sedangkan jejak pasif direkam oleh pelacak web, server log, dan jaringan tanpa interaksi aktif Anda."
    },
    {
      id: "priv-2",
      question: "Apa fungsi utama dari Virtual Private Network (VPN) terkait privasi saat menjelajahi internet?",
      options: [
        "Menghapus seluruh file sampah di hard disk secara otomatis",
        "Mengenkripsi lalu lintas data Anda dan menyembunyikan alamat IP asli Anda dari situs yang Anda kunjungi serta penyedia internet (ISP)",
        "Membuat koneksi internet menjadi 100% kebal dari serangan phishing",
        "Memperbaiki kabel fiber optik yang putus"
      ],
      correctAnswer: 1,
      explanation: "VPN membuat terowongan terenkripsi (encrypted tunnel) sehingga ISP maupun pengintai di jaringan Wi-Fi tidak dapat membaca lalu lintas situs yang Anda kunjungi."
    },
    {
      id: "priv-3",
      question: "Apa risiko privasi dari memberikan izin akses lokasi latar belakang (Background Location) ke aplikasi kalkulator atau senter pada smartphone?",
      options: [
        "Kamera ponsel akan menyala terus",
        "Aplikasi tersebut tidak membutuhkan lokasi untuk fungsinya, data pergerakan fisik Anda dapat dijual ke pihak ketiga atau broker data",
        "Kalkulator akan menghitung rumus yang salah",
        "Ponsel tidak bisa bergetar saat menerima telepon"
      ],
      correctAnswer: 1,
      explanation: "Prinsip hak akses minimal: aplikasi utilitas sederhana tidak membutuhkan izin lokasi. Izin berlebih sering dimanfaatkan untuk monetisasi data profil geolokasi pengguna."
    },
    {
      id: "priv-4",
      question: "Apa yang dimaksud dengan 'Browser Fingerprinting' dalam teknologi pelacakan daring?",
      options: [
        "Memindai sidik jari fisik pengguna pada layar sentuh",
        "Mengidentifikasi pengguna unik berdasarkan kombinasi konfigurasi browser, plugin terpasang, resolusi layar, font sistem, dan sistem operasi",
        "Merekam sidik jari pada casing laptop",
        "Membersihkan layar monitor dari bekas jari"
      ],
      correctAnswer: 1,
      explanation: "Browser Fingerprinting mampu melacak pengguna secara akurat bahkan jika pengguna telah menghapus cookie atau beralih ke mode Incognito."
    },
    {
      id: "priv-5",
      question: "Apakah menggunakan 'Mode Incognito / Private Browsing' membuat Anda sepenuhnya anonim di internet dari pemantauan penyedia internet (ISP) atau pemilik jaringan Wi-Fi?",
      options: [
        "Ya, mode ini menyembunyikan Anda dari seluruh dunia termasuk polisi dan ISP",
        "Tidak, mode penyamaran hanya tidak menyimpan riwayat lokal dan cookie di perangkat Anda, ISP dan admin jaringan tetap melihat situs yang Anda buka",
        "Ya, mode ini otomatis mengubah alamat IP Anda ke negara lain",
        "Hanya anonim jika digunakan di komputer Apple"
      ],
      correctAnswer: 1,
      explanation: "Incognito hanya bersifat lokal di komputer Anda agar orang lain yang memakai komputer yang sama tidak melihat history. Lalu lintas keluar tetap terpantau oleh ISP dan router."
    },
    {
      id: "priv-6",
      question: "Mengapa sebaiknya Anda menghindari masuk (login) ke berbagai situs menggunakan fitur 'Sign in with Social Media' jika sangat peduli privasi?",
      options: [
        "Karena tombol tersebut bisa membuat keyboard rusak",
        "Karena platform media sosial tersebut dapat melacak situs web apa saja yang Anda gunakan dan mengaitkannya ke profil periklanan Anda",
        "Karena sandi media sosial akan langsung terhapus",
        "Karena akan diblokir oleh pembuat sistem operasi"
      ],
      correctAnswer: 1,
      explanation: "Single Sign-On (SSO) sosial memberikan kemudahan namun memperluas jaring pelacakan profil aktivitas Anda antar-platform ke satu raksasa teknologi pengiklan."
    },
    {
      id: "priv-7",
      question: "Apa risiko dari menjawab kuis tren viral di media sosial seperti 'Siapa namamu di zaman kerajaan berdasarkan nama ibu dan hewan peliharaan pertamamu'?",
      options: [
        "Akun media sosial akan terkunci otomatis dalam 5 menit",
        "Informasi tersebut sering kali merupakan jawaban dari Pertanyaan Keamanan (Security Questions) untuk reset kata sandi akun online Anda",
        "Membuat gambar profil berubah sendiri",
        "Mengurangi kuota internet hingga 90%"
      ],
      correctAnswer: 1,
      explanation: "Kuis viral semacam itu sering dirancang oleh penambang data untuk memanen jawaban umum pertanyaan keamanan perbankan dan email secara halus."
    },
    {
      id: "priv-8",
      question: "Teknologi 'End-to-End Encryption' (E2EE) pada aplikasi pesan instan menjamin bahwa:",
      options: [
        "Pesan hanya dapat dibaca oleh pengirim dan penerima; pihak penyedia aplikasi maupun peretas di tengah jalan tidak dapat mendekripsinya",
        "Pesan akan terhapus otomatis dalam 3 detik",
        "Pesan tidak bisa difoto dengan kamera lain",
        "Pengirim tidak perlu membayar kuota internet"
      ],
      correctAnswer: 0,
      explanation: "E2EE menggunakan pasangan kunci kriptografis di perangkat ujung pengirim dan penerima. Server perantara hanya meneruskan paket data terenkripsi tanpa kunci pembuka."
    },
    {
      id: "priv-9",
      question: "Apa fungsi dari fitur 'DNS-over-HTTPS' (DoH) dalam melindungi privasi berselancar?",
      options: [
        "Mempercepat unduhan file video",
        "Mengenkripsi permintaan kueri nama domain (DNS) sehingga penyedia internet (ISP) lokal tidak dapat mengintip nama situs yang Anda tuju",
        "Menghilangkan kebutuhan akan alamat IP",
        "Membuat situs web otomatis berbahasa Indonesia"
      ],
      correctAnswer: 1,
      explanation: "Kueri DNS tradisional dikirim dalam plaintext. DoH membungkus permintaan DNS di dalam paket HTTPS standar sehingga ISP tidak bisa melihat daftar website yang Anda akses."
    },
    {
      id: "priv-10",
      question: "Sebelum membuang atau menjual smartphone lama Anda, langkah paling tepat untuk memastikan data pribadi tidak dapat dipulihkan pemilik baru adalah:",
      options: [
        "Menghapus aplikasi satu per satu",
        "Melakukan Factory Reset (Kembalikan ke Setelan Pabrik) setelah memastikan perangkat telah terenkripsi penuh, serta mengeluarkan akun cloud utama terlebih dahulu",
        "Mengganti casing luar ponsel",
        "Mematikan daya ponsel selama 24 jam"
      ],
      correctAnswer: 1,
      explanation: "Factory reset pada perangkat yang terenkripsi akan menghancurkan kunci enkripsi penyimpanan, sehingga data lama tidak dapat dipulihkan oleh perangkat lunak recovery."
    }
  ]
};

if (typeof window !== "undefined") {
  window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_QUESTIONS };
}

