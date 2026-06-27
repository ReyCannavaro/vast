---
title: "Software Requirements Specification (SRS)"
subtitle: "VAST - Java East Cultural Explorer"
author: "Tim BYFEST / Bytesfest 2026"
date: "26 Juni 2026"
lang: id-ID
---

# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

**Nama Project:** VAST - Java East Cultural Explorer  
**Jenis Produk:** Landing page interaktif web statis untuk eksplorasi budaya Jawa Timur  
**Konteks Lomba:** SDGs Creative Web Competition - Bytesfest 2026  
**Subtema:** Culture Verse: Preserving Heritage Through Design  
**Deadline Submit:** 11 Juli 2026  
**Tanggal Mulai Pengerjaan:** Minggu, 28 Juni 2026  
**Tech Stack Utama:** Next.js + React.js  
**Git Flow:** Setiap upload/push ke repository wajib menggunakan branch `dev`.

---

## ASUMSI DAN KLARIFIKASI

1. Nama project tetap **VAST**
2. Website dibangun dengan **Next.js + React.js** sebagai front-end static site. Fitur server-side/backend Next.js tidak digunakan untuk MVP.
3. Website tidak menggunakan database, backend/API server, CMS, LocalStorage, atau SessionStorage.
4. Semua konten budaya, gambar, quiz, matching game, dan puzzle disimpan sebagai data statis di repository.
5. Semua skor game hanya disimpan di state memori React selama halaman berjalan dan hilang saat refresh.
6. Branch kerja utama adalah `dev`. Jika tim membuat feature branch, merge tetap diarahkan ke `dev`.
7. Target minimal MVP adalah 38 kabupaten/kota muncul dalam list/peta, sedangkan detail showcase lengkap diprioritaskan untuk 5-8 daerah apabila waktu terbatas.
8. Deadline teknis internal: code freeze 7 Juli 2026, deploy 9 Juli 2026, buffer bug fixing 10-11 Juli 2026.
9. Dokumen ini adalah dokumen kebutuhan perangkat lunak, bukan desain UI final. Detail visual final mengikuti link Figma dari Meks.
10. Data dan gambar dari Ceces harus divalidasi lisensi dan sumbernya sebelum dipakai.

---

# 1. INTRODUCTION

## 1.1 Purpose

Dokumen Software Requirements Specification (SRS) ini menjelaskan kebutuhan perangkat lunak untuk membangun **VAST - Java East Cultural Explorer**. Dokumen ini menjadi acuan teknis bagi tim BYFEST dalam mengembangkan website sesuai scope, aturan lomba, timeline, dan pembagian tugas.

SRS ini mendefinisikan kebutuhan fungsional, non-fungsional, interface, struktur data statis, batasan sistem, use case, acceptance criteria, dan requirement traceability agar implementasi tidak melebar dari tujuan utama lomba.

## 1.2 Document Conventions

Konvensi yang digunakan:

- **FR-xxx**: Functional Requirement.
- **NFR-xxx**: Non-Functional Requirement.
- **DR-xxx**: Data Requirement.
- **UI-xxx**: User Interface Requirement.
- **INT-xxx**: Interface/Integration Requirement.
- **AC-xxx**: Acceptance Criteria.
- Prioritas menggunakan: **Must**, **Should**, **Could**.
- Status klarifikasi diberi tanda: **[PERLU KLARIFIKASI]**.

## 1.3 Intended Audience and Reading Suggestions

Dokumen ini ditujukan untuk:

- **Meks** sebagai UI/UX Designer dan pembuat logo/template.
- **Ceces** sebagai pengumpul aset gambar dan data budaya.
- **Rey** sebagai pengatur struktur folder, routing, dan implementasi front-end.
- Pembimbing/mentor yang ingin mengecek kelayakan teknis.
- Juri atau pihak lomba jika dibutuhkan sebagai pendukung dokumentasi.

Saran membaca:

1. Project manager membaca seluruh dokumen untuk menjaga scope.
2. Designer fokus pada bagian UI Requirements, use case, dan non-functional visual/responsive.
3. Content curator fokus pada Data Requirements dan Static Data Schema.
4. Developer fokus pada Functional Requirements, Interface, Architecture, dan Acceptance Criteria.

## 1.4 Product Scope

VAST adalah website interaktif berbasis web statis yang memperkenalkan kekayaan budaya 38 kabupaten/kota di Jawa Timur melalui peta interaktif, kartu identitas budaya, pencarian/filter, galeri visual, dan mini game edukatif.

Produk ini bukan portal pemerintah penuh, bukan aplikasi booking wisata, bukan marketplace, bukan dashboard admin, dan bukan platform berbasis database. Fokus produk adalah **branding budaya, edukasi ringan, visual impact, dan interaktivitas** untuk kompetisi desain web.

## 1.5 References

- Brief project VAST dari tim BYFEST.
- Ketentuan SDGs Creative Web Competition - Bytesfest 2026.
- PRD VAST - Java East Cultural Explorer.
- Prinsip SDG 11: Sustainable Cities and Communities, khususnya pelestarian warisan budaya lokal.

---

# 2. OVERALL DESCRIPTION

## 2.1 Product Perspective

VAST merupakan static front-end application yang berjalan sepenuhnya di browser pengguna. Sistem mengambil data dari file statis di dalam project, memproses interaksi dengan React state, lalu menampilkan UI melalui komponen Next.js.

```text
User Browser
    |
    v
Next.js Static Frontend
    |
    +-- UI Components
    +-- Client-side State
    +-- Static Data Modules
    +-- Public Image/SVG Assets
    |
    v
Rendered Interactive Landing Page
```

Tidak ada backend, database, authentication server, payment, map API, notification API, atau penyimpanan permanen pada MVP v1.

## 2.2 Product Functions

Fungsi utama sistem:

1. Menampilkan landing page dengan hero section, value proposition, dan CTA.
2. Menampilkan peta/list 38 kabupaten/kota Jawa Timur.
3. Mengizinkan pengguna memilih daerah untuk melihat Cultural Identity Card.
4. Mengizinkan pengguna mencari dan memfilter daerah.
5. Menampilkan featured regions dan galeri motif/pattern.
6. Menyediakan mini game Culture Quiz.
7. Menyediakan mini game Match the Heritage.
8. Menyediakan struktur halaman/detail region yang responsif.
9. Menyediakan dokumentasi project melalui README dan halaman/section dokumentasi jika dibutuhkan.

## 2.3 User Classes and Characteristics

| User Class | Deskripsi | Karakteristik Teknis | Kebutuhan Utama |
|---|---|---|---|
| Visitor/User | Pengguna umum yang membuka website. | Mengakses dari desktop/mobile, tidak login. | Eksplorasi budaya, peta interaktif, quiz, tampilan menarik. |
| Content Curator | Anggota tim internal yang menyiapkan data dan aset. | Tidak memakai dashboard, bekerja melalui file statis/repository. | Format data jelas, folder aset rapi, validasi sumber. |
| Admin/Developer | Anggota tim internal yang membuat struktur, routing, dan logic. | Menggunakan GitHub, branch `dev`, Next.js, React.js. | Struktur project, route, component, static data, deploy. |

## 2.4 Operating Environment

| Area | Requirement |
|---|---|
| Client Device | Desktop, laptop, tablet, dan smartphone modern. |
| Browser | Chrome, Edge, Firefox, Safari versi modern. |
| Runtime Development | Node.js LTS. **[PERLU KLARIFIKASI]** versi final Node.js yang dipakai tim. |
| Framework | Next.js + React.js. |
| Deployment | Vercel atau Netlify free tier. |
| OS Developer | Windows/macOS/Linux. |
| Network | Website harus tetap ringan untuk koneksi internet standar pengguna Indonesia. |

## 2.5 Design and Implementation Constraints

1. Sistem wajib berupa web statis/front-end.
2. Tidak boleh menggunakan database.
3. Tidak boleh menggunakan LocalStorage atau SessionStorage.
4. Tidak boleh menggunakan CMS atau template siap pakai.
5. Tidak boleh menggunakan login/register.
6. Tidak boleh membuat dashboard admin dinamis.
7. Semua data disimpan dalam file statis TypeScript/JSON.
8. Semua perubahan repository wajib mengikuti branch `dev`.
9. Timeline pengembangan sangat singkat, sehingga fitur Must harus diprioritaskan.
10. Desain peta SVG harus memiliki fallback list view untuk mobile dan aksesibilitas.

## 2.6 Assumptions and Dependencies

Dependencies utama:

- Figma design dari Meks selesai paling lambat 1 Juli 2026.
- Data dan gambar dari Ceces selesai minimal versi awal pada 30 Juni 2026.
- Rey menyelesaikan struktur folder dan routing pada 30 Juni 2026.
- Semua anggota tim dapat mengakses GitHub repository.
- Aset gambar memiliki lisensi aman atau atribusi jelas.
- Vercel/Netlify dapat digunakan tanpa biaya.

---

# 3. SYSTEM FEATURES AND FUNCTIONAL REQUIREMENTS

## 3.1 Landing Page & Hero Section

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Sistem harus menampilkan hero section berisi nama VAST, tagline, deskripsi singkat, visual utama, dan CTA “Mulai Jelajah”. | Must |
| FR-002 | CTA “Mulai Jelajah” harus mengarahkan pengguna ke section peta/list eksplorasi daerah. | Must |
| FR-003 | Hero section harus memberi kesan Culture Verse, modern, dan relevan dengan Jawa Timur. | Must |
| FR-004 | Sistem harus menampilkan value proposition singkat sebelum pengguna mulai eksplorasi. | Should |

Acceptance Criteria:

- **AC-001:** Saat halaman dibuka, pengguna dapat memahami konsep VAST dalam maksimal 10 detik.
- **AC-002:** CTA dapat diklik dan scroll/navigasi berjalan tanpa error.
- **AC-003:** Hero tetap rapi pada desktop, tablet, dan mobile.

## 3.2 Interactive Region Explorer

| ID | Requirement | Priority |
|---|---|---|
| FR-005 | Sistem harus menampilkan 38 kabupaten/kota Jawa Timur dalam bentuk peta SVG atau list region. | Must |
| FR-006 | Pengguna harus dapat memilih daerah melalui peta atau list. | Must |
| FR-007 | Sistem harus menampilkan status hover/active saat daerah dipilih pada perangkat yang mendukung hover. | Should |
| FR-008 | Pada mobile, sistem harus menyediakan alternatif list/card jika peta terlalu sulit digunakan. | Must |
| FR-009 | Sistem harus menampilkan informasi ringkas daerah setelah daerah dipilih. | Must |

Acceptance Criteria:

- **AC-004:** Minimal 38 daerah tersedia pada list/peta.
- **AC-005:** Klik salah satu daerah menampilkan data daerah yang benar.
- **AC-006:** Peta/list tetap dapat digunakan di layar mobile.

## 3.3 Cultural Identity Card

| ID | Requirement | Priority |
|---|---|---|
| FR-010 | Sistem harus menampilkan nama daerah, kategori, julukan, bahasa/dialek, budaya, makanan khas, destinasi, batik/pattern, dan fakta unik. | Must |
| FR-011 | Sistem harus menampilkan gambar utama daerah jika tersedia. | Must |
| FR-012 | Jika data belum lengkap, sistem harus menampilkan fallback text seperti “Data sedang dikurasi” tanpa merusak UI. | Must |
| FR-013 | Sistem dapat menampilkan tombol untuk melihat detail lebih lanjut pada halaman/section region detail. | Should |

Acceptance Criteria:

- **AC-007:** Card tidak crash walau field data tertentu belum lengkap.
- **AC-008:** Informasi utama daerah terbaca jelas.
- **AC-009:** Gambar memiliki alt text yang relevan.

## 3.4 Search and Filter Region

| ID | Requirement | Priority |
|---|---|---|
| FR-014 | Sistem harus menyediakan input pencarian daerah berdasarkan nama, slug, kategori, atau keyword budaya. | Must |
| FR-015 | Sistem harus menyediakan filter kategori seperti pesisir, pegunungan, budaya, kuliner, batik, destinasi, atau showcase. | Must |
| FR-016 | Sistem harus memperbarui hasil pencarian/filter secara client-side tanpa reload halaman. | Must |
| FR-017 | Sistem harus menampilkan empty state jika tidak ada hasil. | Must |

Acceptance Criteria:

- **AC-010:** Search “Malang” menampilkan daerah terkait Malang jika datanya tersedia.
- **AC-011:** Filter kategori menampilkan hasil yang sesuai data.
- **AC-012:** Empty state muncul dengan pesan yang jelas.

## 3.5 Featured Region

| ID | Requirement | Priority |
|---|---|---|
| FR-018 | Sistem harus dapat menampilkan 5-8 daerah showcase dengan konten lebih lengkap. | Should |
| FR-019 | Featured region harus menampilkan visual, ringkasan, dan CTA ke detail. | Should |
| FR-020 | Daftar featured region harus dikendalikan dari field data statis, bukan hardcoded acak. | Should |

Acceptance Criteria:

- **AC-013:** Minimal 5 daerah showcase muncul jika data tersedia.
- **AC-014:** Setiap card featured region memiliki visual dan informasi ringkas.

## 3.6 Culture Quiz

| ID | Requirement | Priority |
|---|---|---|
| FR-021 | Sistem harus menyediakan Culture Quiz berbentuk pilihan ganda. | Must |
| FR-022 | Sistem harus mengambil pertanyaan dari static data `quizQuestions`. | Must |
| FR-023 | Sistem harus menghitung skor sementara menggunakan React state. | Must |
| FR-024 | Sistem harus menampilkan feedback benar/salah dan penjelasan singkat. | Must |
| FR-025 | Sistem harus menyediakan tombol ulangi quiz. | Should |

Acceptance Criteria:

- **AC-015:** Pengguna dapat menyelesaikan quiz dari awal sampai akhir tanpa error.
- **AC-016:** Skor dihitung benar berdasarkan jawaban.
- **AC-017:** Skor hilang saat refresh dan tidak disimpan permanen.

## 3.7 Match the Heritage

| ID | Requirement | Priority |
|---|---|---|
| FR-026 | Sistem harus menyediakan game mencocokkan daerah dengan budaya/makanan/batik/destinasi. | Must |
| FR-027 | Sistem harus memvalidasi pasangan yang dipilih pengguna. | Must |
| FR-028 | Sistem harus menampilkan feedback ketika match benar atau salah. | Must |
| FR-029 | Sistem harus menyediakan data matching dari static data `matchingGameItems`. | Must |

Acceptance Criteria:

- **AC-018:** Minimal 5 pasangan matching tersedia.
- **AC-019:** Validasi pasangan berjalan akurat.
- **AC-020:** Game dapat diulang tanpa reload manual.

## 3.8 Batik & Pattern Gallery

| ID | Requirement | Priority |
|---|---|---|
| FR-030 | Sistem sebaiknya menampilkan galeri motif/pattern terinspirasi batik daerah Jawa Timur. | Should |
| FR-031 | Setiap pattern harus memiliki nama, asal daerah, deskripsi singkat, dan visual/thumbnail. | Should |
| FR-032 | Pattern tidak boleh menggunakan aset berhak cipta tanpa izin. | Must |

Acceptance Criteria:

- **AC-021:** Galeri tidak memuat gambar tanpa sumber/lisensi jelas.
- **AC-022:** Galeri tetap responsif dan tidak memperlambat halaman secara signifikan.

## 3.9 Sliding Puzzle

| ID | Requirement | Priority |
|---|---|---|
| FR-033 | Sistem dapat menyediakan sliding puzzle gambar landmark/batik/ikon budaya jika waktu mencukupi. | Could |
| FR-034 | Puzzle harus berjalan sepenuhnya client-side tanpa menyimpan skor permanen. | Could |
| FR-035 | Jika belum stabil sebelum code freeze, puzzle harus dikeluarkan dari MVP. | Must |

Acceptance Criteria:

- **AC-023:** Puzzle hanya dirilis jika tidak mengganggu fitur Must.
- **AC-024:** Puzzle tidak menyebabkan layout broken di mobile.

## 3.10 Documentation and Submission Support

| ID | Requirement | Priority |
|---|---|---|
| FR-036 | Repository harus memiliki README.md berisi instruksi install, run, build, deploy, dan aturan branch `dev`. | Must |
| FR-037 | Tim harus menyiapkan dokumentasi pembuatan PDF untuk kebutuhan submit lomba. | Must |
| FR-038 | Repository harus rapi dengan struktur folder jelas. | Must |
| FR-039 | Link deploy harus tersedia paling lambat 9 Juli 2026. | Must |

Acceptance Criteria:

- **AC-025:** README dapat diikuti untuk menjalankan project secara lokal.
- **AC-026:** Build production berhasil tanpa error sebelum deploy.
- **AC-027:** Link deploy dapat dibuka publik.

---

# 4. EXTERNAL INTERFACE REQUIREMENTS

## 4.1 User Interface Requirements

| ID | Requirement | Priority |
|---|---|---|
| UI-001 | UI harus menggunakan identitas visual VAST yang konsisten: logo, typography, warna, pattern, dan visual budaya. | Must |
| UI-002 | UI harus memiliki layout responsif untuk desktop, tablet, dan mobile. | Must |
| UI-003 | Navigasi utama harus sederhana dan mengarah ke section penting: Explore, Regions, Games, Gallery, About. | Should |
| UI-004 | Elemen interaktif harus memiliki feedback visual saat hover/click/active. | Must |
| UI-005 | Teks harus menggunakan bahasa Indonesia yang jelas dan mudah dipahami siswa SMK. | Must |
| UI-006 | Peta SVG harus memiliki fallback list view. | Must |
| UI-007 | Empty state, loading-like state statis, dan fallback image harus disiapkan. | Should |

## 4.2 Hardware Interfaces

Tidak ada hardware khusus. Sistem hanya membutuhkan perangkat yang dapat menjalankan browser modern.

## 4.3 Software Interfaces

| Interface | Deskripsi | Status |
|---|---|---|
| Browser DOM | Digunakan untuk rendering UI dan interaksi client-side. | Digunakan |
| Next.js Routing | Digunakan untuk route halaman/region/game. | Digunakan |
| Static Data Modules | Digunakan sebagai sumber data lokal. | Digunakan |
| Vercel/Netlify | Digunakan untuk deploy static/front-end app. | Digunakan |
| Backend API | Tidak digunakan pada MVP v1. | Tidak digunakan |
| Database | Tidak digunakan pada MVP v1. | Tidak digunakan |
| LocalStorage/SessionStorage | Tidak digunakan karena aturan lomba. | Tidak digunakan |
| Authentication | Tidak digunakan. | Tidak digunakan |

## 4.4 Communication Interfaces

Sistem hanya menggunakan komunikasi HTTP/HTTPS standar untuk memuat halaman dan static assets dari hosting. Tidak ada komunikasi real-time, WebSocket, server API, payment gateway, email, notification, atau maps API pada MVP v1.

---

# 5. DATA REQUIREMENTS AND STATIC DATA SCHEMA

Catatan: Bagian ini bukan database schema. Ini adalah struktur data statis lokal yang disimpan di repository, misalnya pada folder `src/data` dan `public/assets`.

## 5.1 regions

**File:** `src/data/regions.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID unik daerah, misalnya `kab-malang`. |
| name | string | Yes | Nama kabupaten/kota. |
| slug | string | Yes | Slug untuk route/detail. |
| type | enum | Yes | `kabupaten` atau `kota`. |
| categories | string[] | Yes | Kategori seperti `pesisir`, `pegunungan`, `kuliner`, `batik`, `budaya`, `destinasi`. |
| tagline | string | No | Kalimat pendek untuk daerah. |
| nickname | string | No | Julukan daerah. |
| dialect | string | No | Bahasa/dialek lokal. |
| population | string | No | Populasi dalam format display, bukan angka wajib. |
| area | string | No | Luas wilayah dalam format display. |
| heroImage | string | No | Path gambar utama. |
| cultureHighlights | string[] | No | Highlight budaya. |
| foodIds | string[] | No | Relasi ke foods. |
| destinationIds | string[] | No | Relasi ke destinations. |
| batikPatternIds | string[] | No | Relasi ke batikPatterns. |
| heritageItemIds | string[] | No | Relasi ke heritageItems. |
| funFact | string | No | Fakta unik. |
| isFeatured | boolean | Yes | Penanda featured region. |
| sourceNotes | string[] | No | Catatan sumber data. |

## 5.2 heritageItems

**File:** `src/data/heritageItems.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID unik item budaya. |
| regionSlug | string | Yes | Relasi ke region. |
| name | string | Yes | Nama budaya/seni/tradisi. |
| category | enum | Yes | `seni`, `tradisi`, `bahasa`, `ikon`, `sejarah`, `lainnya`. |
| description | string | Yes | Deskripsi singkat. |
| image | string | No | Path gambar. |
| source | string | No | Sumber data/gambar. |

## 5.3 foods

**File:** `src/data/foods.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID makanan. |
| regionSlug | string | Yes | Relasi ke region. |
| name | string | Yes | Nama makanan khas. |
| description | string | Yes | Deskripsi singkat. |
| image | string | No | Path gambar. |
| tags | string[] | No | Tag seperti `pedas`, `kuah`, `oleh-oleh`. |

## 5.4 batikPatterns

**File:** `src/data/batikPatterns.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID motif/pattern. |
| regionSlug | string | Yes | Relasi ke region. |
| name | string | Yes | Nama motif/pattern. |
| inspiration | string | No | Inspirasi budaya/daerah. |
| image | string | No | Path gambar/pattern. |
| description | string | Yes | Deskripsi singkat. |

## 5.5 destinations

**File:** `src/data/destinations.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID destinasi. |
| regionSlug | string | Yes | Relasi ke region. |
| name | string | Yes | Nama destinasi. |
| type | enum | Yes | `alam`, `sejarah`, `budaya`, `religi`, `kota`, `lainnya`. |
| description | string | Yes | Deskripsi singkat. |
| image | string | No | Path gambar. |

## 5.6 quizQuestions

**File:** `src/data/quizQuestions.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID pertanyaan. |
| regionSlug | string | No | Bisa null untuk pertanyaan umum Jawa Timur. |
| question | string | Yes | Teks pertanyaan. |
| options | string[] | Yes | Pilihan jawaban. |
| correctAnswer | string | Yes | Jawaban benar. |
| explanation | string | Yes | Feedback edukatif. |
| difficulty | enum | No | `easy`, `medium`, `hard`. |

## 5.7 matchingGameItems

**File:** `src/data/matchingGameItems.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID pasangan. |
| leftLabel | string | Yes | Item sisi kiri, misalnya nama daerah. |
| rightLabel | string | Yes | Item sisi kanan, misalnya makanan/batik. |
| category | enum | Yes | `food`, `batik`, `destination`, `culture`. |
| explanation | string | No | Penjelasan setelah match. |

## 5.8 puzzleItems

**File:** `src/data/puzzleItems.ts`

| Field | Type | Required | Keterangan |
|---|---|---|---|
| id | string | Yes | ID puzzle. |
| regionSlug | string | Yes | Relasi ke region. |
| title | string | Yes | Judul puzzle. |
| image | string | Yes | Gambar puzzle. |
| gridSize | number | Yes | Ukuran grid, misalnya 3 untuk 3x3. |
| difficulty | enum | No | `easy`, `medium`, `hard`. |

## 5.9 Asset Folder Requirement

Struktur folder aset disarankan:

```text
public/
  assets/
    hero/
    map/
      east-java.svg
    regions/
      surabaya/
      malang/
      banyuwangi/
    foods/
    batik/
    destinations/
    games/
```

Penamaan file disarankan lowercase, tanpa spasi, dan memakai hyphen, misalnya `tari-gandrung-banyuwangi.webp`.

---

# 6. PSEUDO SERVICE / FUNCTION INTERFACE

Tidak ada API endpoint pada MVP v1. Semua fungsi berikut berjalan di sisi client/build-time sebagai helper untuk membaca dan memproses data statis.

| Function/Module | Input | Output | Deskripsi | Auth Required? |
|---|---|---|---|---|
| getAllRegions() | none | Region[] | Mengambil semua data daerah. | No |
| getRegionBySlug(slug) | slug: string | Region/null | Mengambil detail daerah berdasarkan slug. | No |
| filterRegions(category) | category: string | Region[] | Memfilter daerah berdasarkan kategori. | No |
| searchRegions(keyword) | keyword: string | Region[] | Mencari daerah berdasarkan nama/kata kunci. | No |
| getFeaturedRegions() | none | Region[] | Mengambil daerah dengan `isFeatured = true`. | No |
| getQuizQuestions(regionSlug?) | regionSlug?: string | QuizQuestion[] | Mengambil pertanyaan quiz umum atau per daerah. | No |
| calculateQuizScore(answers) | answers: UserAnswer[] | ScoreResult | Menghitung skor sementara. | No |
| getMatchingItems() | category?: string | MatchingGameItem[] | Mengambil item matching game. | No |
| validateMatch(pair) | pair: MatchPair | MatchResult | Mengecek pasangan benar/salah. | No |
| getPuzzleByRegion(regionSlug) | regionSlug: string | PuzzleItem/null | Mengambil puzzle daerah jika tersedia. | No |
| getAssetsByRegion(regionSlug) | regionSlug: string | AssetItem[] | Mengambil daftar gambar/aset daerah. | No |

---

# 7. NON-FUNCTIONAL REQUIREMENTS

## 7.1 Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | Halaman utama harus terasa cepat saat dibuka. | First load ideal < 3 detik pada koneksi standar. |
| NFR-002 | Lighthouse Performance harus memenuhi target lomba. | Minimal 85. |
| NFR-003 | Gambar harus dikompresi dan menggunakan format modern jika memungkinkan. | WebP/AVIF jika aman. |
| NFR-004 | SVG peta harus dioptimasi agar tidak terlalu berat. | File SVG dibersihkan dari metadata tidak perlu. |
| NFR-005 | Gambar galeri harus lazy-loaded. | Tidak semua gambar dimuat sekaligus. |

## 7.2 Security

| ID | Requirement |
|---|---|
| NFR-006 | Sistem tidak menyimpan data pribadi pengguna. |
| NFR-007 | Sistem tidak memiliki login/auth sehingga tidak ada credential user. |
| NFR-008 | Konten statis tidak boleh dirender sebagai raw HTML dari string yang tidak terpercaya. |
| NFR-009 | Dependency harus dipilih secukupnya dan tidak mengambil script CDN sembarangan. |
| NFR-010 | Repository tidak boleh menyimpan secret/token API. |
| NFR-011 | Risiko front-end seperti XSS, dependency risk, dan insecure third-party script harus diminimalkan. |

## 7.3 Reliability

| ID | Requirement |
|---|---|
| NFR-012 | Website harus tetap bisa menampilkan fallback jika gambar gagal dimuat. |
| NFR-013 | Data yang belum lengkap tidak boleh menyebabkan crash. |
| NFR-014 | Route detail daerah harus menampilkan not-found state jika slug tidak dikenal. |
| NFR-015 | Build production harus berhasil sebelum code freeze. |

## 7.4 Usability

| ID | Requirement |
|---|---|
| NFR-016 | Pengguna harus bisa menemukan detail daerah dalam maksimal 3 klik dari landing page. |
| NFR-017 | Navigasi harus jelas dan tidak membuat website terasa seperti ensiklopedia panjang. |
| NFR-018 | Bahasa harus ringkas, visual-first, dan mudah dipahami siswa/mahasiswa. |
| NFR-019 | Game harus memiliki instruksi singkat sebelum dimainkan. |

## 7.5 Accessibility

| ID | Requirement |
|---|---|
| NFR-020 | Semua gambar penting harus memiliki alt text. |
| NFR-021 | Elemen interaktif harus dapat diakses dengan keyboard semampunya. |
| NFR-022 | Kontras warna teks dan background harus cukup terbaca. |
| NFR-023 | Peta SVG harus memiliki alternatif list view. |
| NFR-024 | Heading harus tersusun secara semantik. |

## 7.6 Maintainability

| ID | Requirement |
|---|---|
| NFR-025 | Komponen UI harus reusable. |
| NFR-026 | Data statis harus modular dan mudah ditambah. |
| NFR-027 | Struktur folder harus mudah dipahami anggota tim. |
| NFR-028 | README harus menjelaskan cara run, build, deploy, dan kontribusi branch `dev`. |

## 7.7 Portability

| ID | Requirement |
|---|---|
| NFR-029 | Website dapat dijalankan di environment Node.js LTS. |
| NFR-030 | Website dapat dideploy di Vercel atau Netlify tanpa konfigurasi backend khusus. |
| NFR-031 | Project dapat dipindahkan/di-clone melalui GitHub dan dijalankan secara lokal. |

---

# 8. SYSTEM ARCHITECTURE AND PROJECT STRUCTURE

## 8.1 Recommended Route Structure

```text
/
/regions
/regions/[slug]
/games
/games/quiz
/games/matching
/gallery
/about
```

Jika waktu terbatas, `/regions/[slug]` dapat diganti dengan modal/detail section pada halaman utama, tetapi struktur route tetap disiapkan oleh Rey agar scalable.

## 8.2 Recommended Directory Structure

```text
vast/
  public/
    assets/
      hero/
      map/
      regions/
      foods/
      batik/
      destinations/
      games/
  src/
    app/
      page.tsx
      regions/
        page.tsx
        [slug]/
          page.tsx
      games/
        page.tsx
        quiz/
          page.tsx
        matching/
          page.tsx
      gallery/
        page.tsx
      about/
        page.tsx
    components/
      common/
      layout/
      sections/
      regions/
      games/
    data/
      regions.ts
      heritageItems.ts
      foods.ts
      batikPatterns.ts
      destinations.ts
      quizQuestions.ts
      matchingGameItems.ts
      puzzleItems.ts
    lib/
      regionService.ts
      quizService.ts
      matchingService.ts
      utils.ts
    types/
      region.ts
      game.ts
  README.md
  SRS.md
  PRD.md
```

## 8.3 Branch and Collaboration Requirement

| ID | Requirement |
|---|---|
| INT-001 | Semua push/upload ke repository wajib menggunakan branch `dev`. |
| INT-002 | `main` hanya digunakan sebagai branch stabil atau deployment final jika tim memutuskan demikian. |
| INT-003 | Commit message harus jelas, misalnya `feat: add region card component`. |
| INT-004 | Pull/update dari repository dilakukan sebelum mulai coding agar conflict berkurang. |

---

# 9. USE CASES

## 9.1 UC-001 Explore Region from Map/List

| Item | Description |
|---|---|
| Actor | Visitor/User |
| Precondition | Landing page berhasil dimuat. |
| Main Flow | User klik CTA → sistem scroll ke Explorer → user memilih daerah di peta/list → sistem menampilkan Cultural Identity Card → user membuka detail atau lanjut ke game. |
| Alternative Flow | Jika peta sulit digunakan di mobile, user memilih daerah dari list/card. |
| Postcondition | User melihat informasi budaya daerah. |

## 9.2 UC-002 Search and Filter Region

| Item | Description |
|---|---|
| Actor | Visitor/User |
| Precondition | Data regions sudah tersedia. |
| Main Flow | User membuka section region → mengetik keyword atau memilih filter → sistem memperbarui hasil → user klik hasil → detail muncul. |
| Alternative Flow | Jika tidak ada hasil, sistem menampilkan empty state. |
| Postcondition | User menemukan daerah yang dicari atau memahami tidak ada hasil. |

## 9.3 UC-003 Play Culture Quiz

| Item | Description |
|---|---|
| Actor | Visitor/User |
| Precondition | Data quiz tersedia. |
| Main Flow | User membuka quiz → membaca instruksi → menjawab pertanyaan → sistem menghitung skor → sistem menampilkan feedback → user ulangi atau keluar. |
| Alternative Flow | Jika data quiz kosong, sistem menampilkan pesan data sedang dikurasi. |
| Postcondition | User mendapat feedback edukatif dan skor sementara. |

## 9.4 UC-004 Play Match the Heritage

| Item | Description |
|---|---|
| Actor | Visitor/User |
| Precondition | Data matching tersedia. |
| Main Flow | User membuka matching game → memilih pasangan daerah dan item budaya → sistem memvalidasi → feedback tampil → user menyelesaikan semua pasangan. |
| Alternative Flow | Jika jawaban salah, sistem memberi kesempatan mencoba lagi. |
| Postcondition | User memahami asosiasi daerah dengan budaya/makanan/destinasi. |

## 9.5 UC-005 Add Static Content by Content Curator

| Item | Description |
|---|---|
| Actor | Content Curator + Admin/Developer |
| Precondition | Format data sudah disepakati. |
| Main Flow | Ceces mengumpulkan data/gambar → validasi sumber → Rey memasukkan data ke file static → build/test → data tampil di UI. |
| Alternative Flow | Jika gambar belum aman lisensinya, gunakan placeholder sementara. |
| Postcondition | Konten baru tersedia dalam website tanpa database. |

---

# 10. ACCEPTANCE CRITERIA SUMMARY

| Area | Acceptance Criteria |
|---|---|
| Landing Page | Hero, tagline, CTA, dan value proposition tampil jelas. |
| Region Explorer | 38 daerah muncul minimal di list/peta. |
| Region Detail | Minimal 5-8 daerah memiliki showcase lengkap. |
| Search/Filter | Search dan filter berjalan client-side tanpa reload. |
| Culture Quiz | Quiz berjalan dari awal sampai skor tanpa bug mayor. |
| Matching Game | Minimal 5 pasangan matching berjalan benar. |
| Responsive | Desktop, tablet, mobile tidak broken. |
| Performance | Lighthouse performance minimal 85. |
| Compliance | Tidak memakai database, backend, LocalStorage, SessionStorage, CMS, login. |
| Deployment | Link deploy tersedia paling lambat 9 Juli 2026. |
| Repository | README dan SRS.md tersedia; push mengikuti branch `dev`. |

---

# 11. REQUIREMENT TRACEABILITY MATRIX

| Business Goal | Requirement Terkait | Feature/Deliverable |
|---|---|---|
| Menarik perhatian juri melalui visual branding | FR-001, FR-003, UI-001, UI-004 | Hero, visual identity, animation, pattern gallery |
| Membuktikan kesesuaian Culture Verse dan SDG 11 | FR-010, FR-018, DR-001 sampai DR-008 | Cultural Identity Card, featured region, data budaya |
| Membuat pengalaman interaktif dan edukatif | FR-005 sampai FR-029 | Peta/list, search/filter, quiz, matching game |
| Memenuhi ketentuan lomba web statis | NFR-006 sampai NFR-011, INT-001 | Static data, no backend/database/storage |
| Menjaga timeline tim BYFEST | FR-036 sampai FR-039 | README, deploy, code freeze, branch dev |
| Memastikan mobile-friendly | FR-008, UI-002, NFR-020 sampai NFR-024 | Responsive layout, fallback list, accessibility |

---

# 12. DEVELOPMENT PLAN ALIGNMENT

| Tanggal | Target | PIC |
|---|---|---|
| 28 Juni 2026 | Mulai pengerjaan, setup repository, pembagian tugas final. | Semua |
| 30 Juni 2026 | Deadline pengumpulan data awal dan setup route. | Ceces, Rey |
| 1 Juli 2026 | Deadline UI/UX dan logo; mulai slicing. | Meks, Ceces, Rey |
| 2-5 Juli 2026 | Fase pengerjaan intensif seluruh halaman website. | Semua |
| 7 Juli 2026 | Code freeze; fitur Must harus selesai. | Rey + semua |
| 9 Juli 2026 | Website deploy dan siap submit. | Rey |
| 10-11 Juli 2026 | Buffer bug fixing, testing, dokumentasi final. | Semua |

## 12.1 Task Ownership

| Anggota | Tanggung Jawab Utama | Output yang Diharapkan |
|---|---|---|
| Meks | UI/UX website dan logo/template VAST. | Link Figma, logo, style guide, section design. |
| Ceces | Mengumpulkan aset gambar dan data budaya. | Folder gambar, data per kabupaten, hero assets. |
| Rey | Struktur folder, route, integrasi data, implementasi front-end. | Next.js project, routing, components, deploy. |

---

# 13. RISK REQUIREMENTS AND MITIGATION

| Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|
| Data 38 daerah terlalu banyak untuk deadline. | H | H | Prioritaskan 38 daerah muncul di list, 5-8 daerah showcase lengkap. |
| Peta SVG sulit responsif. | H | H | Siapkan list/card region sebagai fallback mobile. |
| Gambar dari internet bermasalah lisensi. | M | H | Gunakan sumber resmi/bebas lisensi/atribusi; siapkan placeholder orisinal. |
| Mini game tidak selesai. | M | H | Quiz dan matching jadi prioritas; puzzle hanya Could. |
| UI terlalu ramai dan tidak fokus. | M | M | Gunakan style guide Figma dan review harian. |
| Next.js digunakan terlalu kompleks hingga melanggar static requirement. | M | H | Hindari API routes, backend, server action, database, dan storage. |
| Push tidak melalui branch dev. | M | M | Tuliskan aturan di README dan reminder grup. |
| Build error mendekati deadline. | M | H | Code freeze 7 Juli, deploy test sebelum 9 Juli. |
| Performa lambat karena gambar besar. | M | H | Kompres gambar, lazy loading, batasi aset di halaman awal. |
| Konten budaya tidak akurat. | M | H | Ceces dan Rey validasi sumber; gunakan catatan sumber. |

---

# 14. OPEN ISSUES / PRIORITY CLARIFICATION QUESTIONS

1. Logo final harus bertuliskan **VAST**
2. Apakah tim akan menggunakan **TypeScript** atau JavaScript biasa di Next.js?
3. Apakah peta SVG Jawa Timur sudah tersedia, atau Rey harus membuat/menyesuaikan dari nol?
4. Apakah setiap kabupaten/kota wajib memiliki 10 gambar lengkap pada MVP, atau cukup prioritas 5-8 daerah showcase?
5. Apakah deployment final akan menggunakan Vercel, Netlify, atau platform lain?
6. Apakah route detail daerah wajib dibuat sebagai halaman `/regions/[slug]`, atau cukup modal/detail section pada landing page agar lebih cepat?
7. Apakah ada batas ukuran repository atau batas aset dari panitia lomba?

---

# 15. APPENDIX: MINIMUM DONE DEFINITION

Sebuah fitur dianggap selesai jika memenuhi syarat berikut:

1. Berjalan tanpa error di local development.
2. Responsif minimal pada desktop dan mobile.
3. Tidak menggunakan database/backend/storage terlarang.
4. Data berasal dari file statis.
5. Komponen tidak merusak layout lain.
6. Sudah dicek melalui build production.
7. Sudah masuk branch `dev`.
8. Jika memakai gambar, gambar sudah dikompresi dan memiliki alt text.
9. Jika fitur termasuk game, user dapat menyelesaikan alur dari awal sampai akhir.
10. Jika fitur termasuk konten budaya, sumber data sudah dicatat atau minimal ditandai untuk validasi.

---

# 16. RECOMMENDED NEXT STEPS

A) Pecah SRS ini menjadi task list teknis untuk Notion/Linear/Trello.  
B) Buat `README.md` dan struktur folder awal Next.js sesuai SRS.  
C) Buat TypeScript types dan sample static data untuk `regions.ts`, `quizQuestions.ts`, dan `matchingGameItems.ts`.
