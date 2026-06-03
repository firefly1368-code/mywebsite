# 🚀 CyberOps Portfolio — Cara Pakai

## 📁 Struktur File
```
portfolio2/
├── index.html              ← File utama (EDIT INI)
├── css/style.css           ← Semua styling
├── js/app.js               ← Semua JavaScript
└── assets/
    └── images/
        ├── avatar.png      ← Foto profil kamu (sudah ada)
        ├── bg-anime.jpg    ← Background hero (sudah ada)
        └── certs/          ← Taruh foto sertifikat di sini
            ├── cert1.jpg
            ├── cert2.jpg
            └── ...
```

---

## ✏️ CARA GANTI NAMA & INFO

Buka `index.html`, cari dan ganti:
- `ALEX` → nama depan kamu
- `CYBEROPS` → nama/brand kamu
- `Alex CyberOps` → nama lengkap kamu
- `your@email.com` → email kamu
- `yourusername` → username GitHub kamu
- `yourname` → nama LinkedIn kamu

---

## 🏅 CARA TAMBAH FOTO SERTIFIKAT

1. Simpan foto sertifikat ke folder `assets/images/certs/`
   - Contoh: `cert1.jpg`, `cert2.jpg`, dst

2. Buka `index.html`, cari bagian `<!-- CERT 1 -->`

3. Ganti ini:
```html
<div class="cert-placeholder">
  <i class="fas fa-network-wired"></i>
  <span>SERTIFIKAT 1</span>
  <small>Ganti dengan foto asli</small>
</div>
```

Jadi ini:
```html
<img src="assets/images/certs/cert1.jpg" alt="Sertifikat Networking"/>
```

4. Ganti juga judul, issuer, dan tahun:
```html
<div class="cert-title">NAMA SERTIFIKAT KAMU</div>
<div class="cert-meta">
  <span class="cert-org">Nama Lembaga</span>
  <span class="cert-year">2024</span>
</div>
<span class="cert-cat networking">NETWORKING</span>
```
   Kategori tersedia: `networking`, `security`, `linux`, `devops`

---

## 🎵 MUSIK OTOMATIS

Musik sudah diset **otomatis mulai** saat user klik "ENTER SYSTEM".
- Berjalan di background menggunakan YouTube IFrame API
- Tidak perlu buka tab YouTube
- 11 lagu playlist sudah tersetting

---

## 🌐 DEPLOY KE GITHUB PAGES

```bash
# 1. Buat repo baru di GitHub (nama: portfolio)
# 2. Upload semua file

git init
git add .
git commit -m "init: cyberops portfolio"
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main

# 3. Settings → Pages → Deploy from branch main → /root
# 4. Live di: https://USERNAME.github.io/portfolio
```

---

## 🎨 CARA GANTI WARNA

Buka `css/style.css`, edit bagian `:root`:
```css
:root {
  --neon:  #00d4ff;  /* Biru cyan */
  --neon2: #7b2fff;  /* Ungu */
  --neon3: #00ff9f;  /* Hijau */
}
```

---

## 📱 4 HALAMAN

| Halaman | Isi |
|---------|-----|
| **1 - Home** | Hero, nama, typed animation, stats, tombol |
| **2 - About & Skills** | Profil, bio, skill bars semua kategori |
| **3 - Works & Certs** | Projects, Certificates (foto), Videos (11 YT) |
| **4 - Contact** | Social links, contact form |

Navigasi: scroll mouse, swipe mobile, atau klik dots di kanan layar.
