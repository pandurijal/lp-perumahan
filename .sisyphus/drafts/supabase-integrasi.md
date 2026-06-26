# Draft: Supabase Integrasi

## Project Overview
- **Nama**: LP Perumahan (Landing Page)
- **Stack**: React 19 + Vite + TypeScript + Tailwind CSS v4
- **Backend**: Express terdaftar di dependencies tapi belum digunakan
- **Database**: Tidak ada (simulasi di LeadForm)
- **AI Studio App**: Punya GEMINI_API_KEY di env

## Current State (yang perlu diubah)
- `src/components/LeadForm.tsx` — Form reservasi (name, phone, email, type unit)
  - Saat ini pakai `setTimeout` simulasi API call
  - Tidak ada penyimpanan ke database
- Tidak ada Supabase sama sekali di proyek

## Requirements (from user)
- Integrasi Supabase
- Data reservasi dari LeadForm disimpan ke database Supabase

## Open Questions
- Apakah sudah punya project Supabase? Atau perlu dibuatkan?
- Data yang perlu disimpan: hanya dari LeadForm (name, phone, email, type unit) atau ada tambahan?
- Mau pake Supabase client langsung dari frontend (dangerous, exposed anon key) atau bikin Express backend sebagai proxy?
- Perlu notifikasi ke WhatsApp/Email saat ada reservasi baru?
- Perlu fitur admin/lihat data reservasi? Atau cuma simpan saja?
- Apakah perlu row-level security (RLS) di Supabase?
- Lingkungan: development dulu, baru production?

## Technical Decisions (confirmed)
- [x] Supabase client library: `@supabase/supabase-js`
- [x] Backend approach: Frontend langsung (Supabase client via browser + RLS)
- [x] Data schema: name, phone, email, unit_type + id (UUID) + created_at (timestamptz)
- [x] Additional features: Simpan saja. Tidak perlu admin panel / notifikasi.

## Still Needed
- Supabase project URL dan anon key (untuk env variables)
- Konfirmasi nama tabel (default: `reservations`)
