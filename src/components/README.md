# Component Conventions

Struktur komponen VAST disusun agar mudah diskalakan tanpa membuat halaman
terlalu penuh logic presentasi.

## Folder

- `layout/`: komponen rangka global seperti header, footer, dan layout tetap.
- `ui/`: primitive reusable yang tidak bergantung pada domain data tertentu.
- `sections/`: blok halaman berukuran section, misalnya hero atau daftar konten.
- `regions/`: komponen domain untuk region, budaya, kuliner, destinasi, dan batik.
- `game/`: komponen domain untuk quiz, matching, puzzle, dan katalog game.

## Rules

- Gunakan `PascalCase` untuk nama file dan nama komponen.
- Prefer named export: `export function ComponentName()`.
- Tipe props ditempatkan dekat komponen dengan nama `ComponentNameProps`.
- Komponen di `ui/` tidak boleh import data dari `src/data` atau service domain.
- Komponen domain boleh menerima data dari service, tetapi logic query tetap
  dipanggil dari page atau service layer.
- Jika slicing belum dikerjakan, gunakan template TODO pendek agar route tetap
  jelas tanpa membuat UI final palsu.

## TODO Template

Gunakan format:

```tsx
<TodoPanel task="TODO: Tugas yang harus dilakukan." />
```

TODO harus spesifik, singkat, dan hanya menjelaskan pekerjaan berikutnya.
