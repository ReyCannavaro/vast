# VAST

![VAST Logo](../public/logo.png)

**Java East Cultural Explorer**

Dokumentasi Project  
Culture Verse: Preserving Heritage Through Design  
SDG 11 - Sustainable Cities and Communities

VAST adalah platform eksplorasi budaya Jawa Timur berbasis web statis. Produk ini menggabungkan peta interaktif, katalog budaya, kuliner, destinasi, galeri visual, dan mini game edukatif untuk memperkenalkan kekayaan 38 kabupaten/kota Jawa Timur dalam pengalaman yang ringan, terarah, dan mudah diakses.

## Tim Pengembang

| Nama | Peran |
| --- | --- |
| Achmad Raffi Akbar Baihaqy | UI/UX Designer |
| Reyjuno Al Cannavaro | Project Manager dan Frontend Developer |
| Marcellina Septya Safira | Data Searcher dan Frontend Developer |

## Ringkasan Eksekutif

VAST dirancang sebagai media eksplorasi budaya yang bisa dipakai tanpa backend. Seluruh data utama disimpan sebagai data statis di dalam repository sehingga aplikasi dapat dibangun, diaudit, dan dipublikasikan sebagai static site.

Fokus produk ini bukan hanya menampilkan daftar informasi. VAST menyusun data daerah menjadi alur pengalaman: pengguna dapat melihat Jawa Timur lewat peta, masuk ke detail kabupaten/kota, membaca identitas budaya, membuka makanan khas dan destinasi dalam popup, lalu menguji pemahaman melalui quiz, matching, dan puzzle.

## Tujuan Produk

VAST membantu pengguna mengenali budaya Jawa Timur melalui pengalaman digital yang lebih hidup daripada artikel biasa. Pengguna tidak dipaksa membaca dari awal sampai akhir, tetapi diberi jalur eksplorasi yang alami: melihat wilayah, memilih daerah, menemukan konten, lalu bermain.

Tujuan utama project ini:

- Memperkenalkan identitas budaya 38 kabupaten/kota di Jawa Timur.
- Menghubungkan data budaya, kuliner, destinasi, batik, dan visual daerah dalam satu sistem.
- Menyediakan pengalaman belajar yang interaktif melalui mini game.
- Menjaga aplikasi tetap ringan, mudah dipublikasikan, dan tidak bergantung pada server.

## Ruang Lingkup

VAST mencakup halaman utama, peta eksplorasi, detail wilayah, galeri, dan mini game. Seluruh halaman dirancang untuk saling terhubung dengan data lokal.

Ruang lingkup utama:

- Home sebagai pengantar pengalaman dan akses cepat ke peta serta mini game.
- Explore Map sebagai pintu utama untuk memilih kabupaten/kota.
- Detail wilayah untuk membaca profil, identitas budaya, kuliner, destinasi, fakta unik, dan galeri daerah.
- Gallery untuk menampilkan koleksi visual yang diambil dari data lintas wilayah.
- Mini Game untuk quiz, matching, dan puzzle berbasis data budaya.

Hal yang sengaja tidak menjadi ruang lingkup:

- Sistem login.
- Dashboard admin.
- Database server.
- API publik.
- CMS.
- Pembayaran atau transaksi.

## Pengalaman Pengguna

Alur utama pengguna dimulai dari halaman home. Pengguna melihat identitas VAST, memahami bahwa produk ini berfokus pada budaya Jawa Timur, lalu memilih salah satu jalur eksplorasi.

Alur pertama adalah eksplorasi peta. Pengguna masuk ke halaman regions, memilih kabupaten/kota dari peta Jawa Timur, lalu membuka halaman detail daerah tersebut. Di halaman detail, data disajikan dalam beberapa lapisan: ringkasan wilayah, identitas budaya, fakta unik, makanan khas, destinasi, dan visual kebudayaan.

Alur kedua adalah bermain. Pengguna memilih mini game dari halaman game, memilih wilayah, lalu menyelesaikan tantangan yang terhubung dengan data daerah. Dengan pola ini, game tidak berdiri sendiri, tetapi menjadi lanjutan dari proses belajar.

## Struktur Informasi

VAST memakai struktur informasi yang konsisten agar setiap data daerah dapat dipakai ulang di banyak halaman.

| Area | Isi Utama | Dipakai Pada |
| --- | --- | --- |
| Region | Nama daerah, slug, tipe, populasi, luas, kelompok budaya, hero image | Peta, detail wilayah, game |
| Heritage | Budaya, tradisi, kesenian, pakaian, bahasa, catatan budaya | Detail wilayah, galeri, quiz |
| Food | Makanan khas, deskripsi, kategori, gambar | Detail wilayah, galeri, quiz |
| Destination | Destinasi wisata, tipe, deskripsi, gambar | Detail wilayah, galeri, puzzle |
| Batik | Motif batik, asal, filosofi, gambar | Detail wilayah, quiz |
| Quiz | Pertanyaan, opsi, jawaban, konteks daerah | Mini game quiz |
| Puzzle | Gambar dan materi tantangan | Mini game puzzle |

## Data Jawa Timur

Data utama project berada di `src/data`. Struktur ini dipilih agar seluruh konten bisa diproses saat build dan tetap aman untuk static export.

File data penting:

- `src/data/regions.ts`
- `src/data/heritageItems.ts`
- `src/data/foods.ts`
- `src/data/destinations.ts`
- `src/data/batikPatterns.ts`
- `src/data/quizQuestions.ts`
- `src/data/eastJavaRegencyMap.ts`
- `src/data/geo/east_java_regencies.geojson`

Setiap item data dibuat agar memiliki relasi dengan `regionSlug`. Relasi ini penting karena halaman detail, galeri, dan mini game mengambil data dari sumber yang sama. Jika satu daerah diperbarui, konten tersebut dapat ikut muncul pada banyak bagian aplikasi.

## Peta Interaktif

Peta Jawa Timur memakai data GeoJSON untuk membentuk wilayah kabupaten/kota. Pendekatan ini lebih tepat daripada menebak titik koordinat manual karena garis wilayah dapat mengikuti bentuk geografis sebenarnya.

Perilaku peta:

- Wilayah dapat diarahkan kursor untuk melihat nama kabupaten/kota.
- Wilayah dapat diklik untuk membuka ringkasan.
- Popup menampilkan informasi daerah dan tombol menuju halaman detail.
- Nama wilayah tidak ditampilkan terus-menerus agar peta tetap bersih.

Keputusan desain peta dibuat agar pengguna fokus pada bentuk wilayah dan interaksi, bukan pada label yang terlalu padat.

## Halaman Detail Wilayah

Halaman detail wilayah adalah pusat informasi setiap kabupaten/kota. Halaman ini menyatukan data statistik, narasi budaya, fakta unik, makanan, destinasi, dan gambar budaya.

Komponen utama halaman detail:

- Hero wilayah dengan gambar daerah.
- Ringkasan metadata wilayah.
- Identitas budaya daerah.
- Fakta unik.
- Kartu budaya, makanan, dan destinasi.
- Popup detail untuk membaca deskripsi lengkap.
- Galeri visual daerah.

Popup dipakai untuk menjaga halaman tetap rapi. Deskripsi yang panjang tidak dipaksa masuk ke kartu kecil, tetapi dibuka saat pengguna memang ingin membaca lebih jauh.

## Galeri

Gallery menampilkan data visual dari budaya, kuliner, dan destinasi. Konten dibuat dinamis dengan pilihan acak agar halaman terasa hidup saat dibuka ulang.

Hero gallery memakai gambar `public/images/regions/kabupaten-jombang/budaya/jaranan-dor.jpg` untuk memberi karakter budaya yang kuat sejak halaman pertama.

Tujuan gallery:

- Menjadi etalase visual lintas wilayah.
- Membantu pengguna menemukan konten tanpa harus mulai dari peta.
- Menghubungkan gambar dengan data daerah terkait.

## Mini Game

Mini Game terdiri dari tiga mode: quiz, matching, dan puzzle. Ketiganya menggunakan data budaya yang sama dengan halaman eksplorasi, sehingga permainan tetap terikat pada isi project.

### Quiz

Quiz menanyakan konten yang berkaitan dengan daerah, lalu pengguna memilih jawaban yang sesuai. Struktur pertanyaan diarahkan agar tidak sekadar menebak nama kabupaten, tetapi memahami budaya, kuliner, atau destinasi yang berhubungan dengan wilayah tertentu.

### Matching

Matching menguji kemampuan pengguna memasangkan daerah dengan konten budaya, kuliner, atau destinasi yang sesuai. Mode ini cocok untuk membangun ingatan asosiasi antarwilayah.

### Puzzle

Puzzle menggunakan gambar dari data daerah. Pengguna memilih wilayah terlebih dahulu, lalu memainkan puzzle yang berhubungan dengan konten visual wilayah tersebut.

## Arsitektur Teknis

Project dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan data statis lokal. Aplikasi disiapkan untuk berjalan sebagai static site.

Keputusan arsitektur:

- Data disimpan di `src/data` agar mudah diaudit dan tidak membutuhkan server.
- Komponen dibagi berdasarkan domain: layout, regions, gallery, game, dan UI.
- Routing mengikuti struktur App Router.
- Slug wilayah menjadi penghubung utama antarhalaman.
- Asset gambar disimpan di `public/images`.

## Struktur Folder

Struktur folder utama:

```txt
src/
  app/
    game/
    gallery/
    regions/
  components/
    game/
    gallery/
    layout/
    regions/
    sections/
    ui/
  data/
    geo/
  lib/
  types/
public/
  images/
  logo.png
  logo-putih.png
docs/
```

Struktur ini dibuat agar pengembangan berikutnya bisa dilakukan tanpa mencampur logika data, tampilan, dan halaman.

## Identitas Visual

Bahasa visual VAST mengambil arah budaya kontemporer: hangat, bersih, editorial, dan tidak terlalu ramai. Warna coklat digunakan sebagai aksen utama, sedangkan putih tetap menjadi dasar agar konten mudah dibaca.

Elemen visual utama:

- Logo VAST sebagai penanda brand.
- Layout luas dengan ruang kosong yang cukup.
- Kartu yang dipakai seperlunya, bukan sebagai dekorasi berlebihan.
- Gambar daerah sebagai pembawa suasana.
- Peta sebagai elemen eksplorasi utama.

## Quality Check

Validasi yang relevan untuk project ini:

- Memastikan setiap `regionSlug` valid.
- Memastikan gambar yang direferensikan tersedia di `public/images`.
- Memastikan halaman detail dapat dibuka untuk setiap kabupaten/kota.
- Memastikan game tidak memulai soal sebelum pengguna memilih wilayah.
- Memastikan popup dapat discroll ketika deskripsi panjang.
- Memastikan build Next.js berhasil.

Command yang biasa dipakai:

```bash
npm run build
npm run lint
npm run validate:game
npm run validate:map
```

## Cara Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka aplikasi:

```txt
http://localhost:3000
```

Build production:

```bash
npm run build
```

## Deployment

Karena project disiapkan sebagai aplikasi statis, hasil build dapat dipublikasikan ke platform hosting static atau frontend hosting modern.

Pilihan deployment yang sesuai:

- Vercel.
- Netlify.
- GitHub Pages jika output static sudah disesuaikan.
- Static hosting lain yang mendukung file HTML, CSS, dan JavaScript.

## Risiko dan Catatan Lanjutan

Beberapa area yang perlu dijaga saat project berkembang:

- Akurasi data budaya harus terus diverifikasi dari sumber tepercaya.
- Gambar perlu tetap konsisten penamaannya agar tidak gagal dimuat.
- Data game harus seimbang agar tidak terlalu mudah dan tidak terlalu acak.
- Peta perlu tetap memakai GeoJSON yang valid agar bentuk wilayah tidak bergeser.
- Desain perlu dijaga agar tidak berubah menjadi terlalu dekoratif.

## Roadmap Pengembangan

Tahap berikutnya yang masuk akal:

- Menambah sumber referensi untuk setiap data budaya.
- Membuat panel kurasi internal jika project kelak memakai backend.
- Menambah mode game baru berbasis cerita daerah.
- Menambahkan filter galeri berdasarkan kategori dan wilayah.
- Menambahkan halaman credits sumber gambar dan sumber data.
- Mengoptimalkan ukuran gambar untuk performa mobile.

## Penutup

VAST menempatkan budaya Jawa Timur sebagai pengalaman yang bisa dijelajahi, bukan hanya dibaca. Dengan peta, data daerah, galeri, dan mini game, project ini memberi ruang bagi pengguna untuk mengenal tradisi lokal secara lebih interaktif dan dekat.

Dokumentasi ini menjadi acuan teknis dan produk untuk memahami bagaimana VAST disusun, bagaimana data saling terhubung, dan bagian mana yang perlu dijaga saat pengembangan dilanjutkan.
