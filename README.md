# Intern Profile Dashboard — React Onboarding Hari ke-1 & 2

Proyek ini adalah tugas **Hari ke-1 & 2** dari _Roadmap Onboarding React.js Fundamental_ untuk siswa magang frontend.

**Fokus pembelajaran:** Component, props, TypeScript typing, list rendering, conditional rendering, dan event handling.

## Prasyarat

- [Node.js](https://nodejs.org) versi 18 atau lebih baru
- Salah satu package manager: **npm**, **yarn**, **pnpm**, atau **bun**

## Instalasi

```bash
# Menggunakan npm (default)
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install

# Atau menggunakan bun
bun install
```

## Menjalankan Aplikasi

### Mode Pengembangan

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

Akses aplikasi di `http://localhost:5173`.

### Build Produksi

```bash
npm run build
yarn build
pnpm build
bun run build
```

Hasil build tersedia di `dist/`.

### Pratinjau Build

```bash
npm run preview
yarn preview
pnpm preview
bun run preview
```

### Linting

```bash
npm run lint
yarn lint
pnpm lint
bun run lint
```

## Struktur Proyek

```text
src/
├── components/
│   ├── Greeting.tsx        # Komponen sapaan
│   ├── Header.tsx          # Menampilkan judul dashboard
│   ├── LearningCard.tsx    # Card daftar materi pembelajaran
│   └── ProfileCard.tsx     # Card profil siswa
├── App.tsx                 # Komponen utama
├── main.tsx                # Entry point aplikasi
├── App.css                 # Gaya komponen App
└── index.css               # Gaya global & tema
```

## Ringkasan Materi

| Konsep                      | Penerapan di Proyek                              |
| --------------------------- | ------------------------------------------------ |
| **Function component**      | Header, ProfileCard, LearningCard                |
| **Props & TypeScript type** | Setiap component menerima props bertipe          |
| **List rendering & key**    | Data siswa & materi di-render dengan `.map()`    |
| **Conditional rendering**   | Tampilkan/sembunyikan daftar materi, empty state |
| **Event handling**          | Tombol toggle untuk menampilkan materi           |
| **useState**                | State `showMateri` untuk mengontrol visibilitas  |

## Tujuan Pembelajaran

- [x] Membuat component terpisah (minimal 3)
- [x] Menggunakan props dengan TypeScript type
- [x] Menampilkan data dengan `.map()` dan `key`
- [x] Memisahkan UI dari `App.tsx` ke component
- [x] Penamaan component yang mudah dipahami

## Teknologi

- **React 19** — library untuk membangun antarmuka
- **TypeScript 6** — JavaScript dengan tipe statis
- **Vite 8** — build tool dan dev server
- **React Compiler** — optimasi re-render otomatis
