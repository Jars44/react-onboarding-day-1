# Dokumen Eksplorasi Codebase — Day 3

## Ringkasan Project

**GroApp Access** adalah front-end web aplikasi ERP manajemen bisnis dengan React 19 + TypeScript 6 + Vite 8, Clean Architecture, Zustand 5 + Context, Tailwind CSS 4, Firebase 11, dan i18n (id/en). Terdapat 13 modul fitur: Auth, Company, User, Role, Unit, Workspace, Dashboard, Onboarding, Profile, Notification, Accounting, Master, dan Media.

## Struktur Folder — Root Level

| Path          | Deskripsi                                                        |
| ------------- | ---------------------------------------------------------------- |
| `kubernetes/` | Manifes deployment GKE                                           |
| `nginx/`      | Konfigurasi nginx production (SPA fallback, gzip, caching)       |
| `public/`     | Asset statis (font, ikon, gambar, file lokaliasi JSON)           |
| `.claude/`    | Sistem workflow agent (89 agent, hook enforcement, memory)       |
| `.husky/`     | Git hooks (commitlint + lint-staged)                             |
| `docs/`       | Governance (20 konstitusi), PRD (4 group), API spec, rencana bug |
| `prd/`        | Dokumen perencanaan bugfix                                       |
| `.storybook/` | Konfigurasi Storybook                                            |

### `src/` — Source Code

```text
src/
├── app/        # Composition root
├── assets/     # 5006 ikon SVG, PNG, lokaliasi TS, SVG kustom
├── features/   # 13 modul clean architecture
├── shared/     # API, UI atomic design, store global, utility
└── test/       # Setup Vitest
```

### `src/app/` — Composition Root

| Sub-path        | Deskripsi                                                                             |
| --------------- | ------------------------------------------------------------------------------------- |
| `bootstrap/`    | Boot aplikasi (error classifier, session callback, company selection, loading screen) |
| `composition/`  | DI wiring per fitur (auth, company, user, workspace, dll.)                            |
| `config/`       | Environment config (`env.ts`)                                                         |
| `interruption/` | Overlay global (re-auth, hard-block, verification, role-changed, fallback)            |
| `layouts/`      | Layout utama (AppMainAccessLayout + sidebar + navbar + breadcrumb)                    |
| `providers/`    | Provider global (Toast, AppBootstrap, AppProviders)                                   |
| `router/`       | Route definitions, AuthGuard, VerificationSecondGuard, NotFoundPage                   |
| `state/`        | Context + Zustand store (company, media, profile, workspace)                          |

### `src/features/` — 13 Modul

Setiap modul: `domain/` → `application/` → `infrastructure/` → `presentation/` (+ `testing/` untuk beberapa).

| Feature         | Deskripsi                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------- |
| `auth/`         | Login (manual, Google, Apple, Firebase), register, forgot/reset password, verifikasi, guard |
| `company/`      | CRUD perusahaan, geo master (provinsi/kota/kecamatan/desa), upload logo                     |
| `user/`         | Manajemen profil, daftar perusahaan-user, undangan (create/resend/accept)                   |
| `role/`         | Daftar peran, detail peran, permission retrieval                                            |
| `unit/`         | Manajemen unit bisnis                                                                       |
| `workspace/`    | CRUD workspace, search, infinite scroll, type-to-confirm delete                             |
| `dashboard/`    | Halaman utama, welcome section, module cards, quick actions                                 |
| `onboarding/`   | Alur onboarding pengguna baru                                                               |
| `profile/`      | Edit profil, modal, halaman sukses                                                          |
| `notification/` | Daftar notifikasi, badge count, mark as read, konfirmasi undangan                           |
| `accounting/`   | Halaman marketing/entry publik                                                              |
| `master/`       | Data master domain model + API infrastructure                                               |
| `media/`        | Upload, get, delete file + utility gambar                                                   |

### `src/shared/` — Pustaka Bersama

| Sub-path        | Deskripsi                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| `api/`          | HTTP client (axios, interceptor token, 401 retry, error handling)                    |
| `config/`       | Cookie config, country codes, runtime config                                         |
| `failure/`      | AppFailure types, HTTP failure mapper                                                |
| `foundation/`   | Design token (warna, tipografi, breakpoint, layout, font-face)                       |
| `lib/`          | Custom hooks, JWT decode, cookie storage, time/URL/validation utility                |
| `presentation/` | Global Zustand stores (auth, interruption, re-auth metadata)                         |
| `result/`       | Either/Left/Right monad                                                              |
| `state/`        | DataState, StatusState classes                                                       |
| `types/`        | Shared TypeScript types (auth session, element ID, dll.)                             |
| `ui/`           | Atomic design — atoms (16), molecules (8), organisms (3), pattern (6+), template (3) |

## Routing

Definisi di `src/app/router/routes.tsx` (React Router DOM v7):

| Grup Route              | Guard / Layout                      | Fitur                                                           |
| ----------------------- | ----------------------------------- | --------------------------------------------------------------- |
| `/auth/*`               | Public                              | Login, register, forgot/reset password, verifikasi              |
| `/accounting/*`         | Public                              | Marketing akuntansi                                             |
| `/` (index + sub-route) | `AuthGuard` + `AppMainAccessLayout` | Dashboard, Workspace, Company, User, Role, Unit, Profile, Notif |
| `/onboarding/*`         | `AuthGuard`                         | Wizard onboarding                                               |
| `/success/*`            | `AuthGuard`                         | Halaman sukses standalone                                       |
| `/auth/verification/*`  | `VerificationSecondGuard`           | Verifikasi kedua                                                |
| `*`                     | —                                   | Redirect `/not-found`                                           |

Setiap fitur punya `create{Routes}()` → array `{ path, element }` yang di-mapping di route utama. `AuthGuard` cek `useAuthStore.authStatus`.

## Pattern Component

**Atomic Design** — 5 tingkatan:

| Tingkat       | Kategori | Contoh                                                                |
| ------------- | -------- | --------------------------------------------------------------------- |
| **Atoms**     | 16       | Button, Tooltip, Divider, OTP Input, Popover, Badge, Profile Photo    |
| **Molecules** | 8        | Input Field, Modal (4 varian), Breadcrumb, Tabs Group, File Uploader  |
| **Organisms** | 3        | Fallback Page, LoaderCard, Rotating Loading Icon                      |
| **Pattern**   | 6+       | Table (5 sub), Calendar, Input Group (6 varian), Data Statement, Card |
| **Template**  | 3        | Sidebar, Onboarding Stepper, Success Page                             |

Data state pakai `DataState<T>` (`initial → loading → success | empty | failure`) + monad `Either<Left, Right>`.

## Pattern Styling

**Tailwind CSS 4** + design token kustom di `src/shared/foundation/`:

- **Warna**: Prefix `app-sm-atribut-*` per produk (access, accounting, pocket)
- **Tipografi**: Scale `app-typescale-h1` sampai `caption` (desktop + mobile)
- **Font**: Plus Jakarta Sans (7 weight), Flow Circular (1 weight)
- **Layout**: Spacing `app-layout-*`, `app-component-*`, `app-inline-*`
- **Breakpoint**: Kustom `max-w-app-viewport-max`

Semua di-import via `app-foundation.css`.

## Halaman yang Dipelajari

### Dashboard Page (`src/features/dashboard/presentation/pages/dashboard.page.tsx`)

- Welcome section + 3 quick actions (Invite Team, Manage Role, Audit Log) via `StandardButton`
- 2 module cards: GroApp Access & GroApp Accounting
- Aksesibilitas: lacak interaksi terakhir via `useState`
- Layout: `sm:grid-cols-2 lg:grid-cols-3`

**Components**: `StandardButton` (atom), `useLocalization` (hook i18n), `DashboardModuleCard` (inline)

### Workspace List Page (`src/features/workspace/presentation/pages/workspace-list.page.tsx`)

- Card list dengan avatar inisial + search filtering
- Infinite scroll (Intersection Observer, 6 awal + 3 per batch)
- CRUD modal: FormModal, ImpactInfoModal (delete blocked), TypeToConfirmDialog (confirm delete)
- Validasi duplikat nama, toast notif, loading overlay, empty/no-results/error states

**Components**: `InputGroupSearch`, `WorkspaceCard`, `LoadingWorkspaceCard`, 3 modals, custom hooks (useCreate/Update/DeleteWorkspace)

## Alur Singkat

```text
/dashboard → AuthGuard → AppMainAccessLayout → Outlet → DashboardPage
  ├── StandardButton (@shared/ui/atoms/button)
  ├── useLocalization (localization-gen-react-adapter)
  └── DashboardModuleCard (inline)

/workspaces → AuthGuard → AppMainAccessLayout → Outlet → WorkspaceListPage
  ├── InputGroupSearch (@shared/ui/pattern/input-group)
  ├── WorkspaceCard, LoadingWorkspaceCard
  ├── WorkspaceFormModal, WorkspaceImpactInfoModal, WorkspaceTypeToConfirmDialog
  └── useCreateWorkspace, useUpdateWorkspace, useDeleteWorkspace
```

## Catatan Kendala

1. Struktur folder cukup dalam (hingga 6-7 level) karena menerapkan clean architecture secara ketat (domain/application/infrastructure/presentation per fitur).
2. Dokumentasi dan konfigurasi agent workflow (`.claude/` dan `docs/`) sangat ekstensif dan membutuhkan waktu untuk memahami seluruh governance.
3. Beberapa state menggunakan pola Context + Zustand Store secara paralel yang perlu dipahami dengan baik agar tidak bingung saat debugging.

## Pertanyaan untuk Mentor

1. **Http client standar?** — Ada `http-client.ts` (interceptor lengkap) dan `api-client.ts` (wrapper lama). Mana yang dipakai untuk implementasi baru?
2. **Cara tambah route/page baru?** — Tiap fitur punya `create{Routes}()`. Apakah ini wajib? Ada generator/scaffolding buat struktur clean architecture?
3. **Kapan pakai Context+Store vs Store saja?** — Ada yang pakai Context (company, media, profile, workspace) ada yang langsung (auth, interruption). Apa panduannya?
