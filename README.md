# DOT Malang Kuy 2026 Batch 1 - Challenge Frontend React.js

![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplikasi Kuis Interaktif yang dikembangkan sebagai submission untuk **Challenge Frontend React.js DOT Malang 2026**. Aplikasi ini terintegrasi dengan OpenTDB API, memiliki fitur Leaderboard, manajemen waktu, dan desain yang responsif.

## 🔗 Link Demo & Repository

| Platform | Link Akses |
| :--- | :--- |
| **🚀 Live Demo (Vercel)** | [**Klik di sini untuk mencoba aplikasi**](https://dot-internship-batch1-2026.vercel.app/) |
| **📂 Repository GitHub** | [**Lihat Source Code**](https://github.com/Hmuhasibi21/dot-internship-batch1-2026) |

## 🚀 Fitur Unggulan

1. **Dynamic Quiz System**:
   - Mengambil soal secara realtime dari OpenTDB API (Difficulty: Medium).
   - Tipe soal Multiple Choice dengan pengacakan jawaban otomatis.

2. **Advanced Timer & Scoring**:
   - Batas waktu **30 detik** per soal.
   - Auto-submit jika waktu habis.
   - Penilaian otomatis di akhir sesi.

3. **Leaderboard System (Local Storage)**:
   - Menyimpan riwayat skor tertinggi pengguna di browser.
   - Sorting otomatis berdasarkan **Skor Tertinggi** lalu **Waktu Tercepat**.
   - Fitur **Hapus Riwayat** (Clear Leaderboard) dengan pop-up konfirmasi yang aman.
   - Data persisten (tidak hilang saat refresh atau ganti akun).

4. **Smart Session Management**:
   - Fitur **Resume Kuis**: Jika browser tertutup atau di-refresh, user bisa melanjutkan soal terakhir yang dikerjakan tanpa kehilangan progres.
   - Pop-up konfirmasi sesi aktif di halaman login.

5. **Interactive UI/UX**:
   - Desain Responsif (Mobile Friendly & Desktop).
   - Animasi **Falling Emojis** (tema edukasi) di background.
   - Halaman Review Jawaban (Benar/Salah) beserta kunci jawaban di akhir kuis.
   - Feedback visual saat jawaban benar/salah.

## 🛠 Tech Stack

- **Core**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect, useRef) & LocalStorage

## 📦 Cara Menjalankan Project (Lokal)

Jika ingin menjalankan project ini di komputer lokal Anda:

1. **Clone Repository**
   ```bash
   git clone [https://github.com/Hmuhasibi21/dot-internship-batch1-2026.git](https://github.com/Hmuhasibi21/dot-internship-batch1-2026.git)