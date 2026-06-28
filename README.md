# VAST — Java East Cultural Explorer

**One Map, 38 Regions, Endless Stories.**

VAST adalah landing page interaktif berbasis web statis untuk memperkenalkan kekayaan budaya 38 kota/kabupaten di Jawa Timur melalui peta interaktif, cultural identity card, galeri budaya, kuliner, destinasi, dan mini game edukatif.

Project ini dibuat untuk mengikuti **SDGs Creative Web Competition — Bytesfest 2026** dengan subtema:

> **Culture Verse: Preserving Heritage Through Design**

---

## 1. Project Overview

VAST dirancang sebagai media eksplorasi budaya Jawa Timur yang modern, visual, informatif, dan interaktif. Website ini membantu pengguna mengenal identitas lokal tiap kota/kabupaten melalui pengalaman digital yang ringan dan menyenangkan.

Fokus utama project:

- Mengenalkan budaya lokal Jawa Timur secara visual dan interaktif.
- Menampilkan 38 kota/kabupaten dalam satu pengalaman eksplorasi.
- Menggabungkan informasi budaya, makanan khas, destinasi, dan fakta unik.
- Menyediakan mini game edukatif untuk meningkatkan engagement.
- Memenuhi ketentuan lomba web statis tanpa backend, database, atau storage.

---

## 2. Tema dan Relevansi SDGs

Project ini mendukung semangat **SDG 11 — Sustainable Cities and Communities**, khususnya dalam konteks pelestarian warisan budaya lokal.

VAST bukan portal pemerintah, marketplace, dashboard admin, atau aplikasi booking wisata. VAST adalah **interactive cultural landing page** yang berfokus pada branding budaya Jawa Timur melalui desain modern.

---

## 3. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js |
| UI Library | React.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Source | Static local data |
| Asset Storage | Local assets inside `/public` |
| Backend | Tidak digunakan |
| Database | Tidak digunakan |
| Deployment | Vercel / Netlify |
| Version Control | GitHub |

---

## 4. Project Rules

Aturan wajib project:

1. Semua development dan push ke repository wajib menggunakan branch `dev`.
2. Tidak boleh menggunakan database.
3. Tidak boleh menggunakan backend.
4. Tidak boleh menggunakan LocalStorage.
5. Tidak boleh menggunakan SessionStorage.
6. Tidak boleh menggunakan CMS atau template siap pakai.
7. Tidak boleh menggunakan fitur login/register.
8. Tidak boleh menggunakan payment, booking, marketplace, atau transaksi.
9. Semua data harus berasal dari file statis lokal.
10. Semua skor game hanya bersifat sementara di state React dan tidak disimpan permanen.
11. Semua aset gambar harus memiliki sumber yang jelas atau dibuat sendiri.
12. Website harus responsive untuk desktop, tablet, dan mobile.

---

## 5. Team

| Nama | Tanggung Jawab |
|---|---|
| Meks | UI/UX design, template desain, logo VAST |
| Ceces | Pengumpulan aset gambar, data budaya, makanan, destinasi |
| Rey | Setup project, struktur folder, routing, integrasi frontend |

Catatan:

- Ceces dan Rey bekerja sama dalam pengumpulan dan struktur data budaya per daerah.
- Semua perubahan kode harus melalui branch `dev`.

---

## 6. Timeline Project

| Tanggal | Target |
|---|---|
| 28 Juni | Project mulai, setup repository, struktur folder |
| 30 Juni | Deadline pengumpulan data awal dan setup route |
| 1 Juli | Deadline UI/UX dan logo |
| 2–5 Juli | Fase pengerjaan intensif seluruh halaman |
| 7 Juli | Code Freeze |
| 9 Juli | Website sudah deploy dan siap submit |
| 10–11 Juli | Maintenance, buffer bug fixing, dan submission final |

---

## 7. Main Features

### MVP Features

- Hero section
- Navbar dan footer
- Interactive map / region explorer
- List view alternatif untuk mobile
- Cultural Identity Card
- Detail halaman kota/kabupaten
- Search dan filter daerah
- Featured Region section
- Cultural Journey section
- Galeri budaya, makanan, dan destinasi
- Culture Quiz
- Match the Heritage
- Sliding Puzzle
- Responsive layout
- Dokumentasi project

### Mini Games

Project VAST memiliki 3 mini game edukatif:

1. **Culture Quiz**  
   Kuis pilihan ganda tentang budaya, kuliner, destinasi, batik, dan fakta unik Jawa Timur.

2. **Match the Heritage**  
   Game mencocokkan daerah dengan elemen budaya, makanan khas, atau ikon lokalnya.

3. **Sliding Puzzle**  
   Puzzle geser untuk menyusun gambar landmark, budaya, makanan, atau ikon daerah.

---

## 8. Folder Structure

Struktur utama project saat ini:

```txt
vast/
├── docs/
│   ├── DG.md
│   ├── PRD.md
│   └── SRS.md
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── images/
│   │   └── regions/
│   │       └── [regionSlug]/
│   │           ├── hero/
│   │           ├── budaya/
│   │           ├── foods/
│   │           ├── destinations/
│   │           └── games/
│   │               ├── quiz/
│   │               ├── matching/
│   │               └── puzzle/
│   └── svg/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── games/
│   │   │   ├── page.tsx
│   │   │   ├── matching/
│   │   │   │   └── page.tsx
│   │   │   ├── puzzle/
│   │   │   │   └── page.tsx
│   │   │   └── quiz/
│   │   │       └── page.tsx
│   │   ├── regions/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SiteFooter.tsx
│   │   ├── sections/
│   │   ├── regions/
│   │   ├── games/
│   │   └── ui/
│   ├── data/
│   │   ├── batikPatterns.ts
│   │   ├── destinations.ts
│   │   ├── foods.ts
│   │   ├── heritageItems.ts
│   │   ├── matchingGameItems.ts
│   │   ├── puzzleItems.ts
│   │   ├── quizQuestions.ts
│   │   └── regions.ts
│   ├── lib/
│   │   └── regionService.ts
│   ├── types/
│   │   └── region.ts
│   ├── constants/
│   └── utils/
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

Catatan:

- Folder `sections`, `regions`, `games`, `ui`, `constants`, dan `utils` sudah disiapkan sebagai tempat pengembangan berikutnya.
- Project memakai Next.js App Router.
- `next.config.ts` sudah diarahkan ke static export dengan `output: "export"`.

---

## 8.1 Current Routes

Route yang tersedia saat ini:

| Route | Status | Keterangan |
|---|---|---|
| `/` | Ready | Homepage dengan placeholder hero, explorer, culture, games, dan about. |
| `/regions` | Ready | List 38 kabupaten/kota dari data statis. |
| `/regions/[slug]` | Ready | Dynamic route detail region dari `src/data/regions.ts`. |
| `/games` | Ready | Placeholder halaman daftar mini game. |
| `/games/quiz` | Ready | Placeholder Culture Quiz. |
| `/games/matching` | Ready | Placeholder Match the Heritage. |
| `/games/puzzle` | Ready | Placeholder Sliding Puzzle. |
| `/gallery` | Ready | Placeholder galeri budaya/pattern. |
| `/about` | Ready | Placeholder penjelasan VAST dan SDG 11. |

Homepage juga memiliki section anchor:

```txt
#home
#explore
#culture
#games
#about
```

---

## 9. Asset Folder Convention

Setiap kota/kabupaten memiliki folder aset sendiri berdasarkan `regionSlug`.

Format:

```txt
public/images/regions/[regionSlug]/
├── hero/
├── budaya/
├── foods/
├── destinations/
└── games/
    ├── quiz/
    ├── matching/
    └── puzzle/
```

Contoh:

```txt
public/images/regions/kabupaten-sidoarjo/
├── hero/
│   ├── hero.jpg
│   └── thumbnail.jpg
├── budaya/
│   ├── batik-jetis.jpg
│   └── nyadran.jpg
├── foods/
│   ├── bandeng-asap.jpg
│   └── lontong-kupang.jpg
├── destinations/
│   ├── candi-pari.jpg
│   └── kampung-batik-jetis.jpg
└── games/
    ├── quiz/
    ├── matching/
    └── puzzle/
```

Contoh path di data:

```ts
"/images/regions/kabupaten-sidoarjo/hero/hero.jpg"
"/images/regions/kabupaten-sidoarjo/budaya/batik-jetis.jpg"
"/images/regions/kabupaten-sidoarjo/foods/bandeng-asap.jpg"
"/images/regions/kabupaten-sidoarjo/destinations/candi-pari.jpg"
"/images/regions/kabupaten-sidoarjo/games/puzzle/candi-pari.jpg"
```

---

## 10. Image Naming Rules

Gunakan aturan berikut untuk semua aset gambar:

- Huruf kecil semua.
- Tidak menggunakan spasi.
- Gunakan kebab-case.
- Nama file harus deskriptif.
- Hindari nama file default dari kamera.
- Gunakan format `.jpg`, `.png`, `.webp`, atau `.svg` sesuai kebutuhan.
- Kompres gambar sebelum masuk repository.
- Hindari gambar yang tidak jelas lisensinya.

Contoh benar:

```txt
batik-jetis.jpg
reog-ponorogo.jpg
bandeng-asap.jpg
candi-pari.jpg
hero.jpg
thumbnail.jpg
```

Contoh salah:

```txt
IMG_20240628_12345.jpg
gambar bagus final banget.png
Bandeng Asap FIX (1).jpg
```

---

## 11. Static Data Convention

Semua data project disimpan secara lokal di folder:

```txt
src/data/
```

Contoh file data:

```txt
src/data/
├── batikPatterns.ts
├── destinations.ts
├── foods.ts
├── heritageItems.ts
├── matchingGameItems.ts
├── puzzleItems.ts
├── quizQuestions.ts
└── regions.ts
```

File `regions.ts` saat ini sudah aktif dipakai oleh route `/regions` dan `/regions/[slug]`.
File data lain sudah disiapkan sebagai placeholder untuk konten budaya dan mini game berikutnya.
Tidak ada data yang diambil dari database atau backend.

---

## 12. Recommended Region Type

Contoh struktur type untuk data daerah:

```ts
export type RegionCategory =
  | "pesisir"
  | "pegunungan"
  | "budaya"
  | "kuliner"
  | "batik"
  | "destinasi"
  | "showcase";

export type Region = {
  id: string;
  name: string;
  slug: string;
  type: "kota" | "kabupaten";
  categories: RegionCategory[];
  tagline: string;
  summary: string;
  nickname?: string;
  dialect?: string;
  cultureHighlights: string[];
  foods: string[];
  destinations: string[];
  uniqueFacts: string[];
  isFeatured: boolean;
};
```

---

## 13. Example Region Data

```ts
export const regions = [
  {
    id: "kabupaten-sidoarjo",
    name: "Kabupaten Sidoarjo",
    slug: "kabupaten-sidoarjo",
    type: "kabupaten",
    categories: ["budaya", "kuliner", "destinasi", "showcase"],
    tagline: "Kota Delta dengan kekayaan kuliner dan budaya pesisir.",
    summary:
      "Sidoarjo memiliki identitas kuat melalui olahan bandeng, petis, kampung batik, dan peninggalan sejarah di kawasan delta.",
    nickname: "Kota Delta",
    dialect: "Jawa Suroboyoan",
    cultureHighlights: ["Batik Jetis", "Nyadran", "Tari Banjar Kemuning"],
    foods: ["Bandeng Asap", "Lontong Kupang", "Petis"],
    destinations: ["Kampung Batik Jetis", "Candi Pari", "Lumpur Lapindo"],
    uniqueFacts: ["Sidoarjo dikenal sebagai salah satu pusat olahan bandeng di Jawa Timur."],
    isFeatured: true
  }
];
```

---

## 14. Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd vast
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Buka di browser:

```txt
http://localhost:3000
```

---

## 15. Git Workflow

### Cek Branch Aktif

```bash
git branch
```

Pastikan branch aktif adalah:

```txt
* dev
```

### Membuat Branch Dev

Jika branch `dev` belum ada:

```bash
git checkout -b dev
```

### Commit Perubahan

```bash
git add .
git commit -m "message commit"
```

### Push ke Branch Dev

```bash
git push origin dev
```

---

## 16. Commit Message Convention

Gunakan format commit yang jelas:

```txt
chore: setup project structure
feat: add hero section
feat: add region detail page
feat: add culture quiz
fix: resolve responsive issue on mobile map
docs: update README
refactor: restructure region assets
style: adjust spacing and typography
```

Prefix yang disarankan:

| Prefix | Keterangan |
|---|---|
| chore | Setup, konfigurasi, struktur folder |
| feat | Fitur baru |
| fix | Perbaikan bug |
| docs | Dokumentasi |
| style | Styling tanpa mengubah logic |
| refactor | Perapian kode tanpa mengubah fitur |
| test | Testing |
| perf | Optimasi performa |

---

## 17. Development Priority

Prioritas pengerjaan:

1. Setup project Next.js + Tailwind. **Done**
2. Setup struktur folder awal. **Done**
3. Masukkan PRD, SRS, dan DG ke folder `docs`. **Done**
4. Buat route homepage + section anchors. **Done**
5. Buat route list region dan dynamic detail `/regions/[slug]`. **Done**
6. Buat data dummy 38 daerah + showcase awal. **Done**
7. Implement layout final homepage dari Figma.
8. Implement featured region dan region detail final.
9. Implement search/filter.
10. Implement interactive map atau fallback region list.
11. Implement Culture Quiz.
12. Implement Match the Heritage.
13. Implement Sliding Puzzle jika masih masuk scope.
14. Responsive testing.
15. Deploy.
16. Dokumentasi submission.

---

## 18. Available Scripts

Script default Next.js:

```bash
npm run dev
```

Menjalankan development server.

```bash
npm run build
```

Membuat production build.

```bash
npm run start
```

Menjalankan production server setelah build.

```bash
npm run lint
```

Menjalankan ESLint.

---

## 19. Responsive Requirements

Website harus berjalan baik di:

- Mobile
- Tablet
- Desktop

Catatan penting:

- Peta interaktif harus memiliki alternatif list view untuk mobile.
- Card daerah tidak boleh terlalu padat di layar kecil.
- Gambar harus responsive.
- Tombol harus mudah diklik di layar sentuh.
- Font harus tetap terbaca di mobile.

---

## 20. Performance Requirements

Target performa:

- Lighthouse Performance minimal 85 jika memungkinkan.
- Gambar dikompresi sebelum masuk project.
- Gunakan format `.webp` jika memungkinkan.
- Hindari animasi terlalu berat.
- Hindari dependency tidak perlu.
- Jangan load gambar besar sekaligus jika tidak diperlukan.
- Gunakan `next/image` jika memungkinkan.

---

## 21. Accessibility Requirements

Website harus memperhatikan:

- Alt text untuk gambar penting.
- Kontras warna yang cukup.
- Struktur heading yang rapi.
- Tombol dan link dapat dikenali.
- Navigasi keyboard dasar.
- List view sebagai alternatif peta interaktif.
- Bahasa utama menggunakan Bahasa Indonesia.

---

## 22. Submission Checklist

Checklist sebelum submit lomba:

- [ ] Website sudah deploy.
- [ ] Link deploy aktif.
- [ ] Repository GitHub siap.
- [ ] Branch `dev` digunakan selama development.
- [ ] README.md lengkap.
- [ ] PRD.md tersedia di folder `docs`.
- [ ] SRS.md tersedia di folder `docs`.
- [ ] DG.md tersedia di folder `docs`.
- [ ] Dokumentasi pembuatan PDF siap.
- [ ] Surat orisinalitas siap.
- [ ] Website responsive di desktop.
- [ ] Website responsive di tablet.
- [ ] Website responsive di mobile.
- [ ] Tidak menggunakan backend.
- [ ] Tidak menggunakan database.
- [ ] Tidak menggunakan LocalStorage.
- [ ] Tidak menggunakan SessionStorage.
- [ ] Tidak menggunakan CMS/template.
- [ ] Peta/list region berjalan.
- [ ] Cultural Identity Card berjalan.
- [ ] Search/filter berjalan.
- [ ] Culture Quiz berjalan.
- [ ] Match the Heritage berjalan.
- [ ] Sliding Puzzle berjalan.
- [ ] Tidak ada console error besar.
- [ ] Semua aset gambar aman digunakan.
- [ ] Semua gambar penting memiliki alt text.
- [ ] Build production berhasil.

---

## 23. Build Check

Sebelum deploy, jalankan:

```bash
npm run build
```

Jika berhasil, lanjut deploy ke Vercel/Netlify.

Jika gagal, perbaiki error build terlebih dahulu sebelum submit.

---

## 24. Notes for Developers

Hal yang harus diperhatikan developer:

- Jangan menyimpan skor game ke storage.
- Jangan membuat auth/login.
- Jangan membuat API backend.
- Jangan membuat admin dashboard.
- Jangan menggunakan Google Maps API untuk MVP.
- Jangan menambahkan dependency besar tanpa alasan kuat.
- Selalu cek apakah fitur sesuai PRD dan SRS.
- Semua data harus tetap bisa dibaca dari file statis lokal.

---

## 25. License and Asset Notice

Project ini dibuat untuk kebutuhan kompetisi. Semua aset visual harus menggunakan:

- Aset buatan sendiri,
- Aset bebas lisensi,
- Aset dengan atribusi yang sesuai,
- Atau aset yang sudah mendapatkan izin penggunaan.

Jika lisensi aset tidak jelas, jangan gunakan aset tersebut.

---

## 26. Project Status

Current phase:

```txt
Routing & Static Data Foundation
```

Target:

```txt
Deploy ready before 9 July.
Final submission by 11 July.
```

---

## 27. Documentation

Dokumen pendukung project:

```txt
docs/PRD.md
docs/SRS.md
docs/DG.md
README.md
```

Dokumen tambahan untuk submission:

```txt
Dokumentasi pembuatan PDF
Surat orisinalitas
Screenshot website
Link deploy
Link repository GitHub
```

---

## 28. Closing

VAST dibangun untuk menunjukkan bahwa eksplorasi budaya lokal bisa dibuat lebih modern, interaktif, dan dekat dengan generasi muda.

> One Map, 38 Regions, Endless Stories.
