# PRD - VAST: Java East Cultural Explorer

**Versi:** 1.0  
**Tanggal Dokumen:** 26 Juni 2026  
**Project:** VAST - Java East Cultural Explorer  
**Tagline Utama:** One Map, 38 Regions, Endless Stories.  
**Jenis Produk:** Landing page interaktif berbasis web statis  
**Konteks:** SDGs Creative Web Competition - Bytesfest 2026  
**Subtema:** Culture Verse: Preserving Heritage Through Design  
**Fokus SDG:** SDG 11 - Sustainable Cities and Communities, khususnya pelestarian warisan budaya lokal.

---

## ASUMSI YANG DIBUAT

1. Website VAST dibuat sebagai **landing page interaktif statis**, bukan portal data pemerintah, marketplace, dashboard admin, ataupun aplikasi booking wisata.
2. MVP mengikuti aturan lomba: **tanpa database, tanpa backend, tanpa LocalStorage, tanpa SessionStorage, tanpa CMS, dan tanpa template siap pakai**.
3. Data 38 kota/kabupaten Jawa Timur ditaruh sebagai file statis lokal di dalam repository, misalnya `regions.ts`, `quizData.ts`, `heritageData.ts`, dan file aset gambar/SVG.
4. Semua skor game hanya disimpan sementara di state React selama halaman aktif dan akan hilang ketika halaman di-refresh.
5. Untuk MVP lomba, semua 38 daerah harus muncul minimal di peta atau list view, tetapi detail showcase lengkap diprioritaskan untuk 5-8 daerah terlebih dahulu.
6. Tim terdiri dari 3 orang dengan kemampuan pelajar/mahasiswa, sehingga scope harus dipotong agar visual, interaksi, dan stabilitas lebih kuat daripada jumlah fitur berlebihan.
7. Tanggal mulai pengerjaan belum disebutkan secara eksplisit. Timeline dibuat mundur dari deadline pengumpulan 8-11 Juli 2026 dan diberi flag bila perlu klarifikasi.
8. Website ditargetkan menggunakan React + Vite + Tailwind CSS. TypeScript disarankan, tetapi JavaScript tetap diterima bila tim membutuhkan kecepatan implementasi.
9. Aset budaya, gambar landmark, batik, dan ikon harus menggunakan aset buatan sendiri, aset bebas lisensi, atau aset yang memiliki izin penggunaan.
10. Peta SVG Jawa Timur diasumsikan dapat dibuat custom atau digambar ulang dari referensi legal, bukan mengambil mentah dari sumber berlisensi tanpa izin.

---

## 1. PROJECT OVERVIEW

### 1.1 Ringkasan Produk

VAST - Java East Cultural Explorer adalah landing page interaktif untuk memperkenalkan kekayaan budaya 38 kota/kabupaten di Jawa Timur melalui peta SVG yang dapat diklik, cultural identity card, search/filter daerah, galeri motif visual, dan mini game edukatif. Produk ini dirancang untuk lomba desain web dengan fokus pada branding budaya, visual modern, interaksi ringan, dan pengalaman eksplorasi yang mudah dipahami generasi muda.

### 1.2 Visi

Menjadi pengalaman digital interaktif yang membuat budaya Jawa Timur terasa dekat, menarik, dan mudah dijelajahi oleh generasi muda.

### 1.3 Misi

Mengemas informasi budaya, kuliner, batik, bahasa, destinasi, dan cerita lokal Jawa Timur dalam satu landing page statis yang modern, responsif, edukatif, dan gamified.

### 1.4 Value Proposition

VAST berbeda dari website pariwisata/budaya biasa karena tidak hanya menyajikan informasi, tetapi mengubah eksplorasi budaya menjadi pengalaman visual dan interaktif melalui **satu peta, 38 daerah, kartu identitas budaya, filter tematik, dan mini game edukatif**. Produk ini menonjolkan branding yang kuat, storytelling yang ringkas, serta interaksi yang relevan untuk juri lomba: visual design 30%, inovasi dan fungsional 30%, kesesuaian tema 25%, dan responsive design 15%.

### 1.5 Tujuan Produk v1

- Menampilkan identitas budaya Jawa Timur secara modern dan mudah dibagikan.
- Membantu pengguna menemukan budaya daerah melalui peta interaktif dan list view.
- Membuat pembelajaran budaya lebih ringan melalui quiz dan matching game.
- Memenuhi semua ketentuan teknis lomba tanpa melanggar larangan database/storage/CMS.
- Menciptakan first impression yang kuat ketika juri membuka landing page.

### 1.6 Out of Scope v1

- Database, backend, server API, ataupun CMS.
- Login/register, autentikasi, role-based access control, dan dashboard admin dinamis.
- Booking wisata, payment, marketplace, tiket, order, atau transaksi.
- Leaderboard permanen, penyimpanan skor game, LocalStorage, SessionStorage, cookies analytics kompleks.
- Edit konten dari UI admin.
- Maps API eksternal seperti Google Maps API atau Mapbox untuk MVP.
- Scraping data pemerintah/pariwisata secara otomatis.
- Progressive Web App penuh, push notification, dan offline caching kompleks.
- Mode multiplayer game atau sharing skor otomatis.

---

## 2. COMPETITIVE ANALYSIS

| Kompetitor | Kelebihan | Kekurangan | Differentiator VAST |
|---|---|---|---|
| SIDITA Disbudpar Jawa Timur | Relevan dengan data pariwisata Jawa Timur; memiliki konteks institusional; cocok untuk pengguna yang mencari informasi resmi. | Pengalaman visual dan storytelling cenderung administratif; interaksi budaya belum dibuat gamified; kurang terasa sebagai landing page kompetisi yang emosional. | VAST menempatkan budaya sebagai pengalaman eksplorasi visual, bukan sekadar direktori informasi. |
| Website resmi Disbudpar Jawa Timur | Memiliki otoritas, cakupan informasi luas, dan kredibilitas pemerintah. | Banyak informasi disajikan dalam format berita/artikel; user journey untuk generasi muda tidak selalu ringkas; branding visual daerah belum terintegrasi dalam satu pengalaman. | VAST merangkum budaya 38 daerah dalam peta, kartu ringkas, filter, dan mini game agar lebih cepat dipahami. |
| Google Maps/Travel | Sangat kuat untuk navigasi, lokasi, ulasan, dan pencarian destinasi. | Fokus utama bukan edukasi budaya; motif batik, bahasa/dialek, kuliner, dan identitas lokal tidak dikurasi sebagai pengalaman budaya. | VAST berfokus pada identitas budaya, bukan navigasi lokasi. Tidak membutuhkan API maps sehingga sesuai aturan lomba. |
| Website pariwisata daerah/kabupaten | Konten lokal bisa cukup spesifik; beberapa daerah punya informasi unggulan masing-masing. | Terfragmentasi per daerah; kualitas visual tidak konsisten; pengguna harus membuka banyak website untuk melihat gambaran Jawa Timur. | VAST menyatukan 38 daerah dalam satu brand dan satu pengalaman eksplorasi. |
| Media sosial pariwisata/budaya | Visual menarik, mudah viral, cocok untuk awareness, dan familiar bagi anak muda. | Konten cepat tenggelam, tidak terstruktur, sulit dicari ulang, dan tidak membentuk alur belajar sistematis. | VAST menggabungkan daya tarik visual media sosial dengan struktur web yang searchable, interaktif, dan edukatif. |

### Kesimpulan Analisis Kompetitif

Peluang utama VAST adalah mengisi celah antara **otoritas informasi** dan **pengalaman digital yang menarik**. Kompetitor resmi kuat dalam kredibilitas, sementara media sosial kuat dalam visual. VAST harus mengambil posisi sebagai landing page budaya yang ringkas, imersif, dan mudah dinilai oleh juri dalam waktu singkat.

---

## 3. USER PERSONA

### Persona 1 - Siswa/Mahasiswa Jawa Timur

**Nama & Profil Demografis:** Naya, 17 tahun, siswa SMK di Surabaya. Aktif menggunakan Instagram/TikTok, suka desain visual, tetapi pengetahuan budaya daerah lain di Jawa Timur masih terbatas.  
**Goals:** Mengenal budaya Jawa Timur dengan cara cepat, visual, dan tidak membosankan.  
**Pain Points:** Website budaya sering terasa seperti teks panjang; sulit membedakan ciri khas tiap daerah; kurang tertarik jika tidak ada visual atau interaksi.  
**Motivasi:** Ingin belajar budaya lokal untuk tugas sekolah, lomba, konten kreatif, atau menambah rasa bangga terhadap daerah sendiri.

### Persona 2 - Wisatawan Lokal

**Nama & Profil Demografis:** Ardi, 25 tahun, pekerja muda dari Jawa Tengah yang ingin berkunjung ke Jawa Timur saat liburan.  
**Goals:** Mengetahui karakter daerah, makanan khas, destinasi unggulan, dan cerita lokal sebelum menentukan tempat kunjungan.  
**Pain Points:** Informasi tersebar di banyak artikel, sering terlalu promosi, dan tidak selalu menjelaskan identitas budaya daerah.  
**Motivasi:** Ingin mendapatkan gambaran cepat tentang Jawa Timur sebelum menyusun rencana perjalanan ringan.

### Persona 3 - Guru/Komunitas Budaya/Pegiat Wisata

**Nama & Profil Demografis:** Bu Rina, 38 tahun, guru sejarah dan anggota komunitas budaya lokal.  
**Goals:** Memiliki media edukasi ringan yang bisa ditampilkan di kelas atau kegiatan komunitas.  
**Pain Points:** Materi budaya sering dalam bentuk PDF panjang, slide statis, atau video yang tidak bisa dieksplor bebas oleh siswa.  
**Motivasi:** Ingin memantik diskusi budaya menggunakan media digital yang menarik dan mudah diakses.

---

## 4. USER STORIES

### 4.1 Visitor/User

1. As a Visitor/User, I want membuka landing page dengan hero yang jelas so that saya langsung paham bahwa VAST adalah peta budaya Jawa Timur.
2. As a Visitor/User, I want mengklik peta Jawa Timur per daerah so that saya bisa mengeksplor budaya daerah tertentu secara cepat.
3. As a Visitor/User, I want melihat cultural identity card so that saya memahami bahasa, kuliner, batik, destinasi, dan fakta unik daerah tersebut.
4. As a Visitor/User, I want mencari daerah dengan keyword so that saya tidak harus menelusuri peta satu per satu.
5. As a Visitor/User, I want memfilter daerah berdasarkan kategori so that saya bisa menemukan daerah pesisir, budaya, kuliner, batik, atau destinasi sesuai minat.
6. As a Visitor/User, I want memainkan Culture Quiz so that saya bisa belajar budaya Jawa Timur dengan cara yang lebih menyenangkan.
7. As a Visitor/User, I want memainkan Match the Heritage so that saya bisa mengingat pasangan daerah dan ikon budayanya.
8. As a Visitor/User, I want membuka website dari mobile so that saya tetap bisa menjelajah tanpa harus memakai laptop.

### 4.2 Content Curator

1. As a Content Curator, I want mengisi data daerah dalam file statis so that konten bisa dikelola tanpa database.
2. As a Content Curator, I want membuat standar format data tiap daerah so that informasi konsisten dan mudah ditampilkan di UI.
3. As a Content Curator, I want memberi label kategori pada tiap daerah so that fitur filter bisa berjalan akurat.
4. As a Content Curator, I want memilih 5-8 daerah showcase so that MVP tetap realistis dan kualitas konten unggulan lebih dalam.
5. As a Content Curator, I want mencatat sumber referensi konten so that data budaya dapat dipertanggungjawabkan saat dokumentasi lomba.
6. As a Content Curator, I want menyiapkan asset guideline so that gambar, motif, dan ikon tidak melanggar hak cipta.
7. As a Content Curator, I want menulis feedback edukatif untuk quiz so that pengguna tidak hanya tahu benar/salah, tetapi juga belajar konteks budaya.

### 4.3 Admin/Developer

1. As an Admin/Developer, I want membuat struktur komponen reusable so that setiap section mudah dikembangkan dan tidak duplikatif.
2. As an Admin/Developer, I want membuat service function untuk mengambil data statis so that UI tidak membaca data secara berantakan.
3. As an Admin/Developer, I want memastikan tidak ada LocalStorage/SessionStorage so that website mematuhi aturan lomba.
4. As an Admin/Developer, I want mengoptimasi SVG dan gambar so that performa website tetap cepat.
5. As an Admin/Developer, I want membuat responsive fallback list view so that peta tetap bisa digunakan di mobile dan aksesibel.
6. As an Admin/Developer, I want menulis README dan dokumentasi teknis so that repository mudah dipahami juri.
7. As an Admin/Developer, I want deploy ke Vercel/Netlify so that link karya dapat dikumpulkan tepat waktu.

---

## 5. FEATURE LIST

### 5.1 Visitor/User Features

| Fitur | Deskripsi Singkat | Prioritas | Kompleksitas |
|---|---|---|---|
| Hero Section | Headline, tagline, value proposition, visual peta/ornamen, CTA Mulai Jelajah. | Must | S |
| Peta SVG Interaktif | Peta Jawa Timur dengan area daerah yang bisa hover/click. | Must | L |
| Detail Card Daerah | Kartu ringkas berisi identitas budaya dan fakta unik daerah. | Must | M |
| Search Daerah | Pencarian berdasarkan nama daerah atau keyword budaya. | Must | S |
| Filter Kategori | Filter berdasarkan pesisir, pegunungan, budaya, kuliner, batik, destinasi. | Must | M |
| Culture Quiz | Quiz pilihan ganda dengan skor sementara dan feedback edukatif. | Must | M |
| Match the Heritage | Mencocokkan daerah dengan kuliner/batik/ikon budaya. | Must | M |
| Responsive Layout | Tampilan optimal untuk desktop, tablet, dan mobile. | Must | M |
| Batik & Pattern Gallery | Galeri motif visual terinspirasi batik Jawa Timur. | Should | M |
| Featured Region | Section showcase 5-8 daerah dengan detail lebih lengkap. | Should | M |
| Sliding Puzzle | Puzzle gambar landmark/motif budaya. | Could | L |
| Featured Journey Mode | Alur eksplorasi rekomendasi: Taste, Pattern, Story, Destination. | Could | M |
| Sound Effect Ringan | Efek suara saat jawaban benar/click/puzzle selesai. | Could | S |
| Dark/Light Theme | Mode visual alternatif jika tidak mengganggu waktu pengerjaan. | Could | M |

### 5.2 Content Curator Features

| Fitur | Deskripsi Singkat | Prioritas | Kompleksitas |
|---|---|---|---|
| Static Content Template | Format data baku untuk tiap daerah. | Must | S |
| Source Reference Notes | Catatan sumber referensi budaya untuk dokumentasi. | Must | S |
| Showcase Region Selection | Menentukan 5-8 daerah prioritas untuk detail penuh. | Must | S |
| Quiz Content Bank | Kumpulan pertanyaan dan feedback edukatif. | Must | M |
| Asset License Checklist | Checklist legalitas aset visual. | Should | S |
| Copywriting Guideline | Gaya bahasa ringkas, edukatif, dan tidak terlalu ensiklopedis. | Should | S |

### 5.3 Admin/Developer Features

| Fitur | Deskripsi Singkat | Prioritas | Kompleksitas |
|---|---|---|---|
| React + Vite Setup | Setup project statis dengan komponen modular. | Must | S |
| Tailwind Design System | Token warna, typography, spacing, button, card, section. | Must | M |
| Static Data Services | Fungsi untuk membaca, mencari, dan memfilter data lokal. | Must | M |
| Game Logic Modules | Logic quiz dan matching tanpa storage permanen. | Must | M |
| README.md | Instruksi install, run, build, deploy, dan aturan lomba. | Must | S |
| Deployment Config | Deploy ke Vercel/Netlify gratis. | Must | S |
| Performance Optimization | Lazy loading, kompres gambar, optimasi SVG. | Should | M |
| Accessibility Improvements | Keyboard navigation, alt text, focus state, list fallback. | Should | M |

---

## 6. TECH STACK & JUSTIFIKASI

| Layer | Teknologi | Alasan Pemilihan | Alternatif jika gagal |
|---|---|---|---|
| Frontend Framework | React + Vite | Cepat, cocok untuk web statis, mudah deploy, mendukung komponen reusable. | HTML/CSS/JS vanilla bila tim kesulitan framework. |
| Language | TypeScript | Membantu menjaga struktur data 38 daerah agar tidak mudah salah field. | JavaScript dengan JSDoc dan validasi manual. |
| Styling | Tailwind CSS | Cepat membangun UI responsif, konsisten, dan mudah dikustom. | CSS Modules atau CSS biasa. |
| Animation | CSS Transition + Framer Motion ringan | Membuat micro-interaction terasa modern tanpa terlalu kompleks. | CSS animation saja bila performa/kompleksitas menjadi masalah. |
| Data Source | File statis `.ts`/`.js`/`.json` | Sesuai aturan tanpa database dan mudah dilacak di GitHub. | Satu file `data.js` sederhana bila modul terlalu banyak. |
| Map | Custom SVG Jawa Timur | Dapat diklik, ringan, dapat distyling, tidak butuh Maps API. | List/grid daerah sebagai fallback bila SVG belum selesai. |
| Game Logic | React state + utility functions | Skor sementara tanpa LocalStorage/SessionStorage. | DOM state vanilla bila tidak memakai React. |
| Deployment | Vercel atau Netlify Free Tier | Gratis, cepat, cocok untuk static site, mudah share link. | GitHub Pages. |
| Version Control | GitHub | Wajib/relevan untuk repository lomba dan kolaborasi tim. | GitLab jika GitHub bermasalah, tetapi GitHub tetap disarankan. |
| Design Tool | Figma | Memudahkan wireframe, style guide, dan dokumentasi visual. | Penpot/Canva untuk aset pendukung, tetapi Figma utama. |

---

## 7. ARSITEKTUR SISTEM

### 7.1 High Level Architecture

```text
+-----------------------------+
| User Browser                |
| Desktop / Tablet / Mobile   |
+--------------+--------------+
               |
               v
+-----------------------------+
| Static Hosting              |
| Vercel / Netlify            |
+--------------+--------------+
               |
               v
+-----------------------------+
| React + Vite App            |
| Routing/Sections/Components |
+--------------+--------------+
               |
               v
+-----------------------------+
| Component Logic Layer       |
| Map, Cards, Filter, Game   |
+--------------+--------------+
               |
               v
+-----------------------------+
| Static Data Layer           |
| regions.ts, quizData.ts,    |
| heritageData.ts, assets     |
+-----------------------------+
```

### 7.2 Alur Rendering

Client membuka website → static hosting mengirim HTML/CSS/JS/assets → React app membaca data statis lokal → komponen memproses state interaksi → UI menampilkan peta, kartu daerah, filter, dan mini game.

### 7.3 Integrasi Pihak Ketiga

- **Vercel/Netlify:** deployment static site.
- **GitHub:** repository, version control, dan bukti orisinalitas pengembangan.
- **Tidak digunakan pada v1:** payment gateway, authentication provider, notification service, database, external maps API, analytics kompleks, atau API budaya eksternal.

### 7.4 Catatan API Eksternal

API eksternal tidak digunakan pada MVP v1 agar website stabil, cepat, tidak bergantung koneksi layanan pihak ketiga, dan tetap sesuai aturan lomba sebagai web statis front-end.

---

## 8. DATABASE SCHEMA / STATIC DATA SCHEMA

Project ini **tidak menggunakan database**. Bagian ini mendefinisikan struktur data statis lokal yang disimpan dalam file JavaScript/TypeScript/JSON di dalam repository. Format dibuat menyerupai schema agar mudah dipahami dan dijaga konsistensinya.

### 8.1 `regions`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID unik daerah. | primary key lokal |
| `slug` | string | Slug URL/internal, contoh `surabaya`. | unik |
| `name` | string | Nama kota/kabupaten. | - |
| `type` | enum | `kota` atau `kabupaten`. | enum: kota, kabupaten |
| `population` | string | Populasi dalam format display. | opsional untuk MVP |
| `areaKm2` | string/number | Luas wilayah. | opsional untuk MVP |
| `dialect` | string[] | Bahasa/dialek lokal. | - |
| `nickname` | string | Julukan daerah. | - |
| `categories` | string[] | Kategori filter. | pesisir, pegunungan, budaya, kuliner, batik, destinasi |
| `summary` | string | Ringkasan identitas daerah. | - |
| `heroImage` | string | Path aset gambar utama. | ke assets |
| `mapPathId` | string | ID path SVG untuk area peta. | ke SVG map |
| `featured` | boolean | Apakah masuk showcase. | true/false |

### 8.2 `heritageItems`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID warisan budaya. | primary key lokal |
| `regionSlug` | string | Daerah pemilik budaya. | relasi ke regions.slug |
| `name` | string | Nama warisan budaya. | - |
| `type` | enum | Jenis warisan. | seni, ritual, arsitektur, musik, tari, cerita |
| `description` | string | Penjelasan singkat. | - |
| `image` | string | Path aset gambar/ilustrasi. | opsional |

### 8.3 `foods`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID kuliner. | primary key lokal |
| `regionSlug` | string | Daerah asal/terkenal. | relasi ke regions.slug |
| `name` | string | Nama kuliner. | - |
| `description` | string | Rasa, bahan, atau cerita singkat. | - |
| `tags` | string[] | Pedas, gurih, manis, street-food, dll. | opsional |
| `image` | string | Path aset gambar/ilustrasi. | opsional |

### 8.4 `batikPatterns`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID motif. | primary key lokal |
| `regionSlug` | string | Daerah terkait. | relasi ke regions.slug |
| `name` | string | Nama/inspirasi motif. | - |
| `meaning` | string | Makna filosofis atau inspirasi visual. | - |
| `colors` | string[] | Palet warna utama. | hex/string |
| `image` | string | Path pattern/ilustrasi. | asset lokal |

### 8.5 `destinations`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID destinasi. | primary key lokal |
| `regionSlug` | string | Lokasi daerah. | relasi ke regions.slug |
| `name` | string | Nama destinasi. | - |
| `category` | enum | Jenis destinasi. | alam, budaya, sejarah, religi, kota |
| `description` | string | Deskripsi singkat. | - |
| `image` | string | Path aset. | opsional |

### 8.6 `quizQuestions`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID pertanyaan. | primary key lokal |
| `regionSlug` | string/null | Jika pertanyaan spesifik daerah. | relasi opsional ke regions.slug |
| `question` | string | Teks pertanyaan. | - |
| `options` | string[] | Pilihan jawaban. | minimal 3-4 opsi |
| `correctAnswer` | string | Jawaban benar. | harus salah satu options |
| `explanation` | string | Feedback edukatif setelah menjawab. | - |
| `difficulty` | enum | Tingkat kesulitan. | easy, medium, hard |

### 8.7 `matchingGameItems`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID item matching. | primary key lokal |
| `regionSlug` | string | Daerah asal. | relasi ke regions.slug |
| `leftLabel` | string | Label sisi daerah. | contoh: Malang |
| `rightLabel` | string | Label ikon budaya/kuliner/batik. | contoh: Bakso Malang |
| `type` | enum | Tipe pasangan. | food, batik, destination, heritage |
| `hint` | string | Hint edukatif opsional. | - |

### 8.8 `puzzleItems`

| Field | Tipe Data | Keterangan | Relasi/Enum |
|---|---|---|---|
| `id` | string | ID puzzle. | primary key lokal |
| `regionSlug` | string | Daerah terkait. | relasi ke regions.slug |
| `title` | string | Judul puzzle. | - |
| `image` | string | Gambar yang disusun. | asset lokal |
| `gridSize` | number | Ukuran grid puzzle. | 3 atau 4 disarankan |
| `difficulty` | enum | Tingkat kesulitan. | easy, medium, hard |

---

## 9. API ENDPOINTS / FUNCTION INTERFACE

### 9.1 Tidak Ada API Endpoint pada MVP v1

VAST tidak memiliki backend dan tidak menggunakan server API pada MVP v1. Semua data dibaca dari file statis lokal di dalam project. Oleh karena itu, bagian ini mendefinisikan pseudo-service/function interface yang dipakai oleh komponen front-end.

| Function/Module | Input | Output | Deskripsi | Auth Required? |
|---|---|---|---|---|
| `getAllRegions()` | none | `Region[]` | Mengambil semua data daerah dari file statis. | No |
| `getRegionBySlug(slug)` | `slug: string` | `Region | null` | Mengambil satu daerah berdasarkan slug. | No |
| `filterRegions(category)` | `category: string` | `Region[]` | Memfilter daerah berdasarkan kategori. | No |
| `searchRegions(keyword)` | `keyword: string` | `Region[]` | Mencari daerah berdasarkan nama, kategori, atau keyword budaya. | No |
| `getQuizQuestions(regionSlug?)` | `regionSlug?: string` | `QuizQuestion[]` | Mengambil pertanyaan quiz umum atau spesifik daerah. | No |
| `calculateQuizScore(answers)` | `answers: UserAnswer[]` | `QuizResult` | Menghitung skor sementara dan feedback. | No |
| `getMatchingItems()` | none | `MatchingGameItem[]` | Mengambil item matching game. | No |
| `validateMatch(pair)` | `pair: MatchPair` | `{ correct: boolean; feedback: string }` | Mengecek apakah pasangan daerah dan ikon budaya benar. | No |
| `getPuzzleByRegion(regionSlug)` | `regionSlug: string` | `PuzzleItem | null` | Mengambil puzzle sesuai daerah. | No |

> Catatan implementasi: karakter `| null` pada dokumentasi function interface perlu ditulis benar di kode TypeScript. Di tabel Markdown ini dipisahkan agar tidak mengganggu format tabel.

---

## 10. NON-FUNCTIONAL REQUIREMENTS

### 10.1 Security

- Tidak ada autentikasi, akun pengguna, data sensitif, payment, ataupun transaksi.
- Hindari render HTML mentah seperti `dangerouslySetInnerHTML` kecuali benar-benar aman dan sudah disanitasi.
- Konten budaya ditulis sebagai string biasa di data statis.
- Dependency harus dipilih seperlunya dan diperiksa melalui `npm audit` sebelum final.
- Hindari script CDN sembarangan agar tidak menambah risiko supply chain.
- Risiko OWASP Top 10 yang relevan untuk front-end statis: XSS dari konten yang dirender, vulnerable dependency, security misconfiguration pada hosting, dan insecure third-party scripts.
- Repository tidak boleh menyimpan API key, token, credential, atau file rahasia.

### 10.2 Performance

- Target first meaningful load di koneksi normal: di bawah 3 detik untuk halaman awal.
- Target Lighthouse Performance minimal 85.
- SVG peta harus dioptimasi: path dibersihkan, ID rapi, ukuran file ditekan.
- Gambar landmark/batik dikompresi ke WebP/AVIF bila memungkinkan.
- Gunakan lazy loading untuk gambar di section bawah.
- Hindari animasi berat pada mobile.
- Split data dan aset jika ukuran awal terlalu besar, tetapi tetap tanpa backend.

### 10.3 Scalability

- Static hosting aman untuk traffic 10x karena tidak ada server state dan tidak ada database bottleneck.
- Struktur data modular memudahkan penambahan detail 38 daerah secara bertahap.
- Komponen reusable seperti `RegionCard`, `FilterBar`, `QuizCard`, dan `PatternTile` mengurangi duplikasi.
- Jika data makin lengkap, dapat dipisah per domain: regions, foods, batik, destinations, heritage, game.
- Untuk v2, bisa dipertimbangkan CMS/headless API, tetapi tidak untuk lomba v1.

### 10.4 Accessibility & Lokalisasi

- Bahasa utama: Bahasa Indonesia formal-ringan.
- Jika ada tanggal/waktu, gunakan konteks WIB.
- Semua gambar harus memiliki alt text.
- Peta SVG harus dapat diakses dengan keyboard atau diberi alternatif list/grid view.
- Tombol dan elemen klik memiliki focus state yang jelas.
- Kontras warna harus cukup, terutama pada teks di atas motif/pattern.
- Ukuran teks mobile minimal nyaman dibaca.
- Jangan hanya mengandalkan warna untuk menyampaikan informasi kategori.
- Pastikan seluruh fitur utama dapat digunakan tanpa hover, karena mobile tidak memiliki hover.

---

## 11. ALUR BISNIS UTAMA

### 11.1 Alur Eksplorasi Peta Daerah

User membuka landing page → User melihat hero dan CTA “Mulai Jelajah” → User klik CTA → Website scroll ke section peta → User melihat peta SVG Jawa Timur → User hover/click daerah → [Jika desktop] tooltip ringkas muncul → User klik daerah → Cultural Identity Card muncul → User membaca ringkasan budaya → User memilih buka detail, featured region, atau mini game terkait.

### 11.2 Alur Culture Quiz

User memilih section Mini Game → User klik Culture Quiz → Sistem menampilkan pertanyaan pertama → User memilih jawaban → Sistem memberi feedback benar/salah sementara → User lanjut ke pertanyaan berikutnya → Semua pertanyaan selesai → Sistem menghitung skor sementara → Sistem menampilkan feedback edukatif → User bisa ulangi quiz atau eksplor daerah lain.

### 11.3 Alur Search/Filter Daerah

User membuka daftar daerah → User mengetik keyword atau memilih filter kategori → Sistem mencocokkan keyword dengan nama daerah, kategori, dan metadata budaya → [Jika hasil ditemukan] daftar/peta menyorot daerah relevan → User klik salah satu daerah → Detail card muncul → [Jika hasil kosong] sistem menampilkan empty state dengan saran reset filter.

---

## 12. RISK & MITIGASI

| Risiko | Probabilitas | Dampak | Strategi Mitigasi |
|---|---|---|---|
| Scope terlalu luas karena 38 kota/kabupaten. | H | H | Tampilkan semua daerah minimal di peta/list, tetapi detail lengkap hanya 5-8 showcase untuk MVP. |
| Data budaya tidak akurat. | M | H | Curator wajib mencatat sumber referensi dan melakukan cross-check minimal 2 sumber untuk konten showcase. |
| Peta SVG sulit dibuat responsif. | H | H | Siapkan fallback list/grid daerah; peta desktop dibuat prioritas, mobile memakai list interaktif bila perlu. |
| Mini game tidak selesai atau bug. | M | H | Prioritaskan 2 game stabil: Quiz dan Matching. Sliding Puzzle masuk Could. |
| Visual terlalu ramai. | M | M | Buat design system dengan palet terbatas, spacing konsisten, dan motif hanya sebagai aksen. |
| Website terasa seperti ensiklopedia. | M | H | Gunakan copywriting pendek, kartu visual, storytelling, dan CTA eksplorasi, bukan paragraf panjang. |
| Aset visual melanggar hak cipta. | M | H | Gunakan aset buatan sendiri, open license, atau ilustrasi/pattern original; dokumentasikan sumber aset. |
| Performa lambat karena gambar besar. | M | M | Kompres gambar, lazy load, gunakan WebP, dan batasi animasi berat. |
| Ketentuan lomba terlanggar karena storage/database. | M | H | Audit kode sebelum submit: tidak ada database, LocalStorage, SessionStorage, CMS, atau template. |
| Tim kekurangan waktu sebelum deadline. | H | H | Lock scope MVP; daily check; freeze fitur 2-3 hari sebelum submit; fokus polish dan dokumentasi. |
| Konten 38 daerah belum lengkap. | H | M | Gunakan data minimal untuk semua daerah dan konten lengkap untuk showcase. Tandai roadmap konten setelah lomba. |
| UI peta sulit digunakan dengan keyboard/screen reader. | M | M | Tambahkan list view alternatif dan aria-label pada path/interaksi. |

---

## 13. SUCCESS METRICS / KPI

- Minimal 38 kota/kabupaten Jawa Timur muncul di peta atau daftar daerah.
- Minimal 5-8 daerah memiliki detail showcase lengkap.
- Minimal 2 mini game berjalan tanpa bug mayor: Culture Quiz dan Match the Heritage.
- User dapat menemukan detail daerah dalam maksimal 3 klik dari landing page.
- Lighthouse Performance minimal 85 pada desktop dan mobile target.
- Layout responsif berjalan baik di desktop, tablet, dan mobile.
- Peta memiliki fallback list view untuk mobile dan aksesibilitas.
- Tidak ada penggunaan database, backend, LocalStorage, SessionStorage, CMS, atau template.
- Repository GitHub memiliki README, struktur folder jelas, dan instruksi run/build/deploy.
- Dokumentasi PDF pembuatan, link deploy, repo GitHub, dan surat orisinalitas siap dikumpulkan.
- Presentasi juri dapat menjelaskan hubungan VAST dengan Culture Verse dan SDG 11 dalam waktu kurang dari 2 menit.
- Minimal 80% tester internal memahami fungsi utama website tanpa penjelasan langsung dari tim.

---

## 14. ESTIMASI WAKTU / SPRINT PLAN

[⚠️ PERLU KLARIFIKASI] Tanggal mulai pengerjaan belum disebutkan. Sprint berikut diasumsikan dibuat mundur dari deadline pengumpulan 8-11 Juli 2026.

| Sprint | Durasi | Deliverable | PIC |
|---|---|---|---|
| Sprint 0 - Scope Lock & Setup | 26-27 Juni 2026 | Finalisasi PRD, sitemap, moodboard, GitHub repo, setup React/Vite/Tailwind. | PIC 1 + PIC 2 + PIC 3 |
| Sprint 1 - Core Landing & Design System | 28-30 Juni 2026 | Hero, navigation, section structure, design tokens, base components, responsive grid. | PIC 1: integrasi; PIC 2: UI/UX; PIC 3: draft konten |
| Sprint 2 - Peta, Data Daerah, dan Detail Card | 1-3 Juli 2026 | Peta SVG interaktif versi 1, data 38 daerah minimal, 5-8 showcase, search/filter. | PIC 1: map/component; PIC 2: aset; PIC 3: konten |
| Sprint 3 - Mini Game & Gallery | 4-5 Juli 2026 | Culture Quiz, Matching Game, batik/pattern gallery dasar, feedback edukatif. | PIC 3: game logic; PIC 1: integrasi; PIC 2: visual game |
| Sprint 4 - Responsive Polish & Performance | 6-7 Juli 2026 | Mobile layout, fallback list view, optimasi SVG/gambar, accessibility pass, bug fixing. | PIC 1 + PIC 2 |
| Sprint 5 - Dokumentasi & Submission Pack | 8 Juli 2026 | README, dokumentasi pembuatan PDF, screenshot, deploy Vercel/Netlify, surat orisinalitas. | PIC 1: repo/deploy; PIC 2: visual doc; PIC 3: narasi konten |
| Buffer Submit | 9-11 Juli 2026 | Cadangan untuk revisi, upload ulang, perbaikan bug minor, dan persiapan presentasi. | Semua PIC |

### Rekomendasi Pembagian Kerja Harian

- PIC 1 fokus pada struktur project, integrasi komponen, state interaksi, deploy, dan audit aturan teknis.
- PIC 2 fokus pada Figma, visual identity, layout responsive, asset/pattern, dan polish presentasi.
- PIC 3 fokus pada riset konten, data statis, quiz/matching content, game logic dasar, dan dokumentasi narasi budaya.

---

## 15. PRIORITAS MVP UNTUK MENANG LOMBA

1. **First impression hero harus kuat.** Dalam 5 detik, juri harus paham bahwa ini adalah peta budaya Jawa Timur yang modern.
2. **Peta interaktif harus terasa sebagai fitur utama.** Walaupun data detail belum penuh untuk 38 daerah, interaksi peta/list harus mulus.
3. **Game tidak boleh setengah matang.** Lebih baik 2 game sederhana tapi stabil daripada 3 game yang bug.
4. **Visual tidak boleh generik.** Gunakan motif/pattern Jawa Timur sebagai aksen modern, bukan ornamen berlebihan.
5. **Mobile harus aman.** Karena peta rawan sulit di mobile, fallback list view adalah fitur wajib.
6. **Dokumentasi harus menonjolkan kepatuhan lomba.** Jelaskan tidak ada database/storage/CMS dan semua data bersifat statis.

---

## 16. PERTANYAAN KLARIFIKASI PRIORITAS

1. Apakah tim sudah memiliki file SVG peta Jawa Timur yang legal/orisinal, atau perlu dibuat ulang dari nol?
2. Dari 38 kota/kabupaten, daerah mana saja yang akan dijadikan 5-8 showcase utama?
3. Apakah gaya visual yang diinginkan lebih condong ke modern premium, playful gamified, atau cultural editorial?
4. Apakah tim akan memakai TypeScript atau JavaScript agar estimasi teknis bisa disesuaikan?
5. Apakah dokumentasi pembuatan PDF dan surat orisinalitas memiliki format resmi dari panitia Bytesfest 2026?

---

## 17. OPSI LANGKAH LANJUTAN

A. Breakdown PRD ini menjadi task list format Notion/Linear lengkap dengan status, priority, PIC, dan estimasi jam.  
B. Generate prompt untuk membuat wireframe/sitemap VAST di Figma atau AI design tool.  
C. Buat technical spec lebih detail untuk fitur spesifik, misalnya peta SVG interaktif, Culture Quiz, atau Matching Game.
