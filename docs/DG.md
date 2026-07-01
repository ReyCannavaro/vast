# VAST — Design Guidelines

**Document Type:** Design Brief & UI/UX Guidelines  
**Project:** VAST — Java East Cultural Explorer  
**Event:** SDGs Creative Web Competition — Bytesfest 2026  
**Subtheme:** Culture Verse: Preserving Heritage Through Design  
**Version:** 1.0  
**Owner:** UI/UX Team + Frontend Team  
**Status:** Draft for UI/UX exploration

---

## 1. Purpose

Dokumen ini menjadi panduan awal untuk tim UI/UX dan frontend dalam merancang tampilan website VAST. Fokus dokumen ini adalah menyamakan kebutuhan halaman, section, struktur visual, dan aturan desain agar hasil Figma mudah dislicing ke Next.js + React.js.

Dokumen ini sengaja **belum mengunci palette warna dan gaya visual final**, karena bagian tersebut akan dieksplorasi oleh tim UI/UX.

---

## 2. Product Context

VAST adalah landing page interaktif untuk memperkenalkan budaya, kuliner, destinasi, dan identitas 38 kota/kabupaten di Jawa Timur. Website ini harus terasa modern, interaktif, informatif, responsif, dan tetap realistis untuk dikerjakan oleh tim dalam waktu lomba yang singkat.

VAST bukan portal pemerintah, marketplace, dashboard admin, atau aplikasi booking wisata. VAST adalah **interactive cultural landing page** yang fokus pada branding budaya Jawa Timur.

---

## 3. Design Goals

1. Membuat pengalaman eksplorasi budaya Jawa Timur yang modern dan menarik bagi generasi muda.
2. Menampilkan 38 kota/kabupaten secara jelas tanpa membuat tampilan terasa seperti ensiklopedia panjang.
3. Menonjolkan identitas budaya melalui visual, ilustrasi, micro-interaction, dan storytelling.
4. Membuat desain yang mudah dislicing ke Next.js + Tailwind CSS.
5. Memastikan tampilan responsive untuk desktop, tablet, dan mobile.
6. Memudahkan juri memahami value project dalam 30–60 detik pertama.

---

## 4. Required Pages

Untuk MVP lomba, jumlah halaman disarankan **6 halaman utama**.

| No | Page | Route | Priority | Purpose |
|---|---|---|---|---|
| 1 | Home / Landing Page | `/` | Must | Halaman utama untuk mengenalkan VAST, CTA, peta/region explorer, featured regions, journey, gallery, dan preview game. |
| 2 | Region Detail Page | `/regions/[slug]` | Must | Menampilkan detail satu kota/kabupaten: hero, cultural identity card, budaya, makanan, destinasi, fakta unik, dan related game. |
| 3 | Culture Quiz Page | `/game/quiz` | Must | Mini game kuis pilihan ganda tentang budaya Jawa Timur. |
| 4 | Match the Heritage Page | `/game/matching` | Must | Mini game mencocokkan daerah dengan budaya/makanan/destinasi khas. |
| 5 | Sliding Puzzle Page | `/game/puzzle` | Should/Must jika sempat | Mini game puzzle geser berbasis gambar budaya/destinasi daerah. |
| 6 | About / Documentation Section atau Page | `/about` atau section di Home | Should | Menjelaskan tujuan VAST, relevansi SDG 11, dan cara kerja website. |

### Page Priority Notes

- Home dan Region Detail adalah inti pengalaman VAST.
- Tiga halaman game penting untuk menunjukkan inovasi dan interaktivitas.
- About dapat berupa section di Home jika waktu terbatas.
- Jika waktu sangat sempit, `/about` tidak perlu menjadi halaman terpisah.

---

## 5. Home Page Sections

Home page harus menjadi landing page utama yang kuat secara branding dan mudah dipahami.

| Order | Section | Priority | Description |
|---|---|---|---|
| 1 | Navbar | Must | Navigasi utama: Home, Explore, Culture, Game, About. |
| 2 | Hero Section | Must | Headline, tagline, deskripsi singkat, CTA “Mulai Jelajah”, visual utama Jawa Timur. |
| 3 | Problem / Why VAST | Should | Menjelaskan masalah: budaya tersebar, kurang interaktif, generasi muda kurang mengenal daerah. |
| 4 | Value Proposition | Must | Menjelaskan kenapa VAST berbeda dari website budaya/pariwisata biasa. |
| 5 | Interactive Map / Region Explorer | Must | Peta atau list interaktif 38 kota/kabupaten. Harus punya fallback list untuk mobile. |
| 6 | Featured Regions | Must | Menampilkan 5–8 daerah showcase dengan visual dan ringkasan menarik. |
| 7 | Cultural Identity Preview | Should | Preview isi detail daerah: budaya, makanan, destinasi, dialek, fakta unik. |
| 8 | Cultural Journey | Should | Alur eksplorasi: pilih daerah → baca cerita → lihat budaya → main game. |
| 9 | Budaya Gallery | Should | Galeri visual budaya seperti batik, tari, kesenian, festival, ikon lokal. |
| 10 | Foods & Destinations Preview | Should | Preview makanan khas dan destinasi unggulan. |
| 11 | Game Preview | Must | Preview 3 mini game: Quiz, Matching, Puzzle. |
| 12 | SDG / Impact Section | Should | Menjelaskan hubungan VAST dengan SDG 11 dan pelestarian budaya. |
| 13 | Final CTA | Must | CTA terakhir: “Mulai Jelajah Jawa Timur”. |
| 14 | Footer | Must | Nama project, navigasi, credit tim, link repo/deploy jika dibutuhkan. |

---

## 6. Region Detail Page Sections

Halaman detail daerah harus terasa seperti “profil budaya” yang singkat, visual, dan interaktif.

| Order | Section | Priority | Description |
|---|---|---|---|
| 1 | Region Hero | Must | Nama daerah, julukan, tagline, hero image daerah. |
| 2 | Quick Facts | Must | Populasi, luas wilayah, tipe daerah, kategori, dialek/julukan jika ada. |
| 3 | Cultural Identity Card | Must | Ringkasan identitas budaya daerah. |
| 4 | Budaya Section | Must | Menampilkan budaya daerah: batik, tari, adat, kesenian, festival, ikon budaya. |
| 5 | Foods Section | Must | Makanan khas daerah. |
| 6 | Destinations Section | Must | Destinasi wisata/heritage unggulan. |
| 7 | Unique Facts | Should | Fakta unik yang membuat daerah mudah diingat. |
| 8 | Related Game CTA | Should | Arahkan user untuk mencoba quiz/matching/puzzle terkait budaya. |
| 9 | Related Regions | Could | Rekomendasi daerah lain yang serupa. |
| 10 | Back to Explore | Must | Tombol kembali ke explorer/home. |

---

## 7. Game Pages Sections

### 7.1 Culture Quiz Page

| Section | Priority | Description |
|---|---|---|
| Game Intro | Must | Menjelaskan cara bermain dan tema quiz. |
| Question Card | Must | Pertanyaan, pilihan jawaban, indikator nomor soal. |
| Feedback State | Must | Benar/salah dan penjelasan singkat. |
| Score Summary | Must | Skor sementara, tidak disimpan permanen. |
| Restart / Explore CTA | Must | Ulangi game atau jelajahi daerah lain. |

### 7.2 Match the Heritage Page

| Section | Priority | Description |
|---|---|---|
| Game Intro | Must | Menjelaskan cara mencocokkan daerah dengan warisan budaya. |
| Matching Board | Must | Kartu daerah dan kartu budaya/makanan/destinasi. |
| Match Feedback | Must | Indikator match benar atau salah. |
| Score / Progress | Should | Progress pasangan yang benar. |
| Restart / Explore CTA | Must | Ulangi game atau lanjut eksplorasi. |

### 7.3 Sliding Puzzle Page

| Section | Priority | Description |
|---|---|---|
| Game Intro | Must | Menjelaskan cara menyusun puzzle. |
| Puzzle Board | Must | Grid puzzle 3x3 atau versi sederhana. |
| Preview Image | Should | Gambar referensi kecil. |
| Move Counter | Could | Jumlah langkah selama sesi berjalan. |
| Completion Feedback | Must | Pesan selesai dan informasi budaya dari gambar. |
| Restart / Explore CTA | Must | Ulangi atau lihat detail daerah. |

---

## 8. Palette Warna

**Status:** Belum ditentukan oleh UI/UX Team.

Tim UI/UX perlu mengisi palette warna final setelah eksplorasi visual di Figma.

| Token | Warna | Hex | Fungsi | Status |
|---|---|---|---|---|
| Primary | TBD | TBD | Warna utama brand VAST | To be defined |
| Secondary | TBD | TBD | Warna pendukung | To be defined |
| Accent | TBD | TBD | Warna CTA/interaksi penting | To be defined |
| Background | TBD | TBD | Background utama | To be defined |
| Surface | TBD | TBD | Card, panel, dan section surface | To be defined |
| Text Primary | TBD | TBD | Teks utama | To be defined |
| Text Secondary | TBD | TBD | Teks pendukung | To be defined |
| Border | TBD | TBD | Garis pemisah/border card | To be defined |
| Success | TBD | TBD | Feedback game benar | To be defined |
| Error | TBD | TBD | Feedback game salah | To be defined |

### Palette Direction Notes

Tim UI/UX bebas mengeksplorasi arah warna, tetapi harus mempertimbangkan:

- Cocok dengan tema budaya Jawa Timur.
- Tidak terlalu gelap jika mengganggu readability.
- Tidak terlalu ramai karena konten budaya sudah visual-heavy.
- CTA harus jelas terlihat.
- Kontras warna harus aman untuk aksesibilitas.
- Warna final harus mudah diterjemahkan ke Tailwind config atau CSS variables.

---

## 9. Style / Visual Direction

**Status:** Belum ditentukan oleh UI/UX Team.

Bagian ini sengaja dikosongkan secara keputusan final agar tim UI/UX dapat mengeksplorasi gaya terbaik.

| Aspect | Direction | Status |
|---|---|---|
| Overall Style | TBD by UI/UX Team | To be defined |
| Mood | TBD by UI/UX Team | To be defined |
| Typography Style | TBD by UI/UX Team | To be defined |
| Illustration Style | TBD by UI/UX Team | To be defined |
| Card Style | TBD by UI/UX Team | To be defined |
| Icon Style | TBD by UI/UX Team | To be defined |
| Map Style | TBD by UI/UX Team | To be defined |
| Game UI Style | TBD by UI/UX Team | To be defined |
| Motion Style | TBD by UI/UX Team | To be defined |

### Style Exploration Guidelines

UI/UX Team boleh mencari sendiri gaya terbaik, tetapi hasil akhirnya disarankan memenuhi kriteria:

1. Terlihat modern dan kompetitif untuk lomba web design.
2. Tidak terlihat seperti website pemerintah yang kaku.
3. Tidak terlihat seperti template travel generik.
4. Memiliki identitas budaya yang kuat tanpa terlalu ramai.
5. Mudah dislicing ke komponen React + Tailwind.
6. Masih readable di mobile.
7. Cocok dengan interaksi peta, card, dan mini game.

---

## 10. Component Guidelines

Komponen yang perlu disiapkan di Figma dan frontend:

| Component | Purpose | Priority |
|---|---|---|
| Navbar | Navigasi utama | Must |
| Button Primary | CTA utama | Must |
| Button Secondary | CTA pendukung | Must |
| Section Title | Judul section konsisten | Must |
| Region Card | Card daerah di explorer/featured | Must |
| Region Detail Card | Card identitas budaya | Must |
| Culture Card | Card budaya/kesenian | Must |
| Food Card | Card makanan khas | Must |
| Destination Card | Card destinasi | Must |
| Game Card | Preview mini game | Must |
| Quiz Card | UI pertanyaan quiz | Must |
| Matching Card | UI kartu matching | Must |
| Puzzle Tile | Tile puzzle geser | Should |
| Search Input | Search daerah | Must |
| Filter Chip | Filter kategori daerah | Must |
| Badge / Tag | Label kategori | Must |
| Modal / Drawer | Detail cepat, jika diperlukan | Could |
| Footer | Penutup halaman | Must |

---

## 11. Responsive Guidelines

Desain harus dibuat minimal untuk 3 ukuran:

| Breakpoint | Target | Notes |
|---|---|---|
| Mobile | 360–430px | Prioritaskan readability dan list view. |
| Tablet | 768–1024px | Layout 2 kolom jika memungkinkan. |
| Desktop | 1280px+ | Visual lebih luas, peta dan featured section lebih dominan. |

### Mobile Rules

1. Peta interaktif tidak boleh menjadi satu-satunya cara eksplorasi daerah.
2. Harus ada list/search/filter region sebagai alternatif mobile.
3. Card tidak boleh terlalu padat.
4. CTA harus mudah diklik dengan jari.
5. Section panjang harus diberi spacing yang cukup.
6. Game UI harus tetap bisa dimainkan di layar kecil.

---

## 12. Asset Guidelines

Struktur aset final per kota/kabupaten:

```txt
public/images/regions/[regionSlug]/
├── hero/
├── budaya/
├── foods/
├── destinations/
└── game/
    ├── quiz/
    ├── matching/
    └── puzzle/
```

### Image Usage

| Folder | Usage |
|---|---|
| `hero/` | Hero image dan thumbnail daerah. |
| `budaya/` | Batik, tari, adat, festival, kesenian, ikon budaya. |
| `foods/` | Makanan/minuman khas. |
| `destinations/` | Tempat wisata, heritage, landmark. |
| `game/quiz/` | Gambar pendukung quiz jika dibutuhkan. |
| `game/matching/` | Gambar/kartu untuk matching game. |
| `game/puzzle/` | Gambar untuk sliding puzzle. |

### Naming Rules

- Gunakan lowercase.
- Gunakan kebab-case.
- Jangan pakai spasi.
- Jangan pakai nama default kamera.
- Kompres gambar sebelum masuk repository.
- Pastikan sumber gambar aman secara lisensi.

Contoh:

```txt
hero.jpg
thumbnail.jpg
batik-jetis.jpg
reog-ponorogo.jpg
bandeng-asap.jpg
candi-pari.jpg
```

---

## 13. UX Flow Summary

### 13.1 Explore Region Flow

User membuka Home → melihat Hero → klik “Mulai Jelajah” → melihat peta/list daerah → memilih daerah → masuk Region Detail → melihat budaya, makanan, destinasi → mencoba mini game.

### 13.2 Quiz Flow

User membuka Culture Quiz → membaca instruksi → menjawab soal → mendapatkan feedback → melihat skor sementara → ulangi game atau eksplor daerah lain.

### 13.3 Matching Flow

User membuka Match the Heritage → melihat kartu daerah dan kartu budaya → mencocokkan pasangan → menerima feedback → menyelesaikan semua pasangan → melihat hasil.

### 13.4 Puzzle Flow

User membuka Sliding Puzzle → memilih/menjalankan puzzle → menyusun tile gambar → selesai → melihat informasi budaya dari gambar tersebut.

---

## 14. UI/UX Deliverables

Tim UI/UX diharapkan menghasilkan:

| Deliverable | Priority | Notes |
|---|---|---|
| Moodboard | Must | Referensi awal visual. |
| Palette warna | Must | Saat ini TBD. |
| Typography direction | Must | Font heading/body. |
| Logo VAST | Must | Untuk header dan dokumentasi. |
| Homepage design | Must | Desktop dan mobile. |
| Region detail design | Must | Desktop dan mobile. |
| Game pages design | Must | Minimal quiz dan matching; puzzle jika sempat. |
| Component set | Must | Button, card, badge, input, section title. |
| Exportable assets | Must | Logo, icons, pattern, decorative assets. |
| Figma link | Must | Dibagikan ke grup tim. |

---

## 15. Frontend Handoff Notes

Agar mudah dislicing oleh frontend:

1. Gunakan auto layout di Figma jika memungkinkan.
2. Beri nama frame dan layer dengan jelas.
3. Pisahkan komponen reusable.
4. Sertakan ukuran spacing utama.
5. Sertakan state button: default, hover, active, disabled.
6. Sertakan state card: default, hover, selected.
7. Sertakan desain empty state untuk search/filter.
8. Sertakan desain feedback game benar/salah.
9. Jangan gunakan efek visual yang terlalu sulit direalisasikan dalam waktu singkat.
10. Pastikan desain mobile bukan hanya hasil shrink dari desktop.

---

## 16. Open Items for UI/UX Team

Bagian berikut belum dikunci dan perlu diisi oleh UI/UX Team:

- Palette warna final.
- Font heading dan body.
- Style visual utama.
- Style logo VAST.
- Style ilustrasi/pattern.
- Style map Jawa Timur.
- Style card dan game UI.
- Referensi visual kompetitor/inspirasi.
- Final layout Figma.

---

## 17. Design Acceptance Criteria

Desain dianggap siap dislicing jika memenuhi:

- Semua page utama memiliki desain desktop dan mobile.
- Semua section utama sudah ada.
- Palette warna final sudah ditentukan.
- Logo final sudah tersedia.
- Komponen utama sudah konsisten.
- CTA terlihat jelas.
- Desain tidak terlalu ramai.
- Konten budaya tetap mudah dibaca.
- Struktur halaman sesuai PRD/SRS.
- Figma link sudah dibagikan ke tim.

---

## 18. Notes for Agent / Frontend AI

Jika file ini dibaca oleh AI agent, gunakan dokumen ini sebagai panduan desain dan struktur halaman. Jangan menentukan palette warna final atau style visual final jika belum diberikan oleh tim UI/UX. Gunakan placeholder token seperti `primary`, `secondary`, `accent`, `background`, dan `surface`.

Agent boleh membuat struktur komponen, page, dan section berdasarkan dokumen ini, tetapi keputusan visual final tetap menunggu Figma dari UI/UX Team.

---

## 19. Closing

Design Guidelines ini menjadi jembatan antara ide produk, UI/UX design, dan implementasi frontend. Tujuannya bukan membatasi kreativitas, tetapi memastikan desain VAST tetap rapi, bisa dislicing, dan sesuai kebutuhan lomba.

> VAST — One Map, 38 Regions, Endless Stories.
