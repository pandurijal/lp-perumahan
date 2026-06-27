# Draft: Integrasi Duitku Pop - Landing Page Perumahan

## Requirements (confirmed)

- **Tujuan**: Pembayaran biaya reservasi Rp 10.000
- **Metode integrasi**: Duitku Pop (checkout.process, halaman payment Duitku)
- **Callback handler**: Frontend callback only (per user — TAPI ada caveat serius, lihat di bawah)
- **User flow**: Isi form → bayar → reservasi masuk
- **Project stack**: React 19 + TypeScript + Vite 6, Supabase (auth + DB), Tailwind v4, Express (di deps)
- **Existing DB**: tabel `reservations` (id, name, phone, email, unit_type, created_at) + RLS policy insert-only untuk anon
- **Existing form**: `LeadForm.tsx` insert ke `reservations` (tanpa payment flow)

## Technical Decisions (Duitku Pop)

- **Create Invoice**: POST ke `https://api-sandbox.duitku.com/api/merchant/createInvoice`
- **Auth header signature**: `HMAC_SHA256(merchantCode + timestamp, apiKey)` → hex lowercase
- **Headers wajib**: `x-duitku-timestamp` (ms UNIX), `x-duitku-signature`, `x-duitku-merchantcode`, `Content-Type: application/json`
- **Request body**: paymentAmount=10000, merchantOrderId, productDetails, customerVaName, email, phoneNumber, itemDetails[], customerDetail, callbackUrl, returnUrl, expiryPeriod
- **Response**: `{ merchantCode, reference, paymentUrl, statusCode, statusMessage }`
- **Frontend widget**: include `https://app-sandbox.duitku.com/lib/js/duitku.js`, panggil `window.checkout.process(reference, { successEvent, pendingEvent, errorEvent, closeEvent })`
- **Expiry period**: 10 menit (reasonable untuk reservasi)

## Trade-off / Caveats (WAJIB di-plan)

1. **JS callback TIDAK BOLEH untuk update status payment resmi** (per Duitku docs): "respon dari JS callback hanya bisa dipergunakan untuk notifikasi pembayaran kepada pelanggan dan tidak diperkenankan untuk merubah status pada sistem anda. Duitku menyediakan HTTP Callback untuk keperluan tersebut."
2. **Konsekuensi "Frontend callback only"**:
   - Reservasi tercatat di Supabase saat INSERT, tapi `payment_status` hanya bisa di-update dari frontend (tidak aman)
   - User bisa close browser → status tidak terupdate
   - **Rekomendasi**: Tetap pakai Express backend MINIMAL untuk callback (sudah ada di `dependencies`, hanya butuh ~30 baris kode). Server bisa update `reservations.payment_status` di Supabase via service_role.
3. **Alternatif yang lebih aman untuk "frontend-only-ish"**:
   - Pakai `returnUrl` di frontend → setelah bayar, user balik ke landing page → frontend panggil Duitku "transaction status check" API (GET endpoint)
   - Tapi ini masih ada gap: user bisa close browser SEBELUM returnUrl
4. **Disarankan untuk production**: Express callback + signature validation di server.

## Open Questions (perlu klarifikasi user)

- [ ] Mode sandbox atau production? (sandbox untuk development aman; production butuh live credentials)
- [ ] Apakah user sudah punya merchantCode & apiKey Duitku? (kalau belum, perlu daftar di https://passport.duitku.com/merchant)
- [ ] Test infrastructure: project belum punya unit test. Mau setup vitest, atau cukup agent-QA?
- [ ] Untuk "callback only" — apakah boleh tetap pakai Express minimal (untuk keamanan), atau benar-benar 100% frontend (konsekuensi: status payment unreliable)?

## Scope Boundaries

**INCLUDE**:
- Tambah kolom payment-related di tabel `reservations` (merchant_order_id, duitku_reference, payment_status, payment_method, paid_at, amount)
- Update `LeadForm` untuk: setelah submit, create invoice → munculkan Duitku Pop
- Tambah script `duitku.js` di `index.html`
- Tambah endpoint Express minimal untuk HTTP callback (signature validation → update Supabase) — PENDING user confirmation
- Update `AdminPage` untuk tampilkan status payment
- Migration Supabase: tambah kolom payment, tambah RLS policy untuk select (admin only)
- ENV variables: `DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY`, `DUITKU_CALLBACK_URL`, `DUITKU_RETURN_URL`, `DUITKU_ENV` (sandbox/prod)
- `.env.example` updated

**EXCLUDE** (scope creep):
- Refactor LeadForm styling/UX yang tidak terkait payment
- Tambah payment method baru di luar yang Duitku sediakan
- Tambah auth/login requirement sebelum bayar (per user: tanpa login)
- Refactor AdminPage yang tidak terkait payment
- Setup unit/integration test (PENDING user decision)
- Documentasi panjang (README, JSDoc) — minimal saja

## AI Slop Patterns to Avoid

- Jangan over-engineer dengan type definitions yang tidak perlu
- Jangan tambah komentar JSDoc di setiap function
- Jangan extract utility untuk hal yang cuma dipakai 1x
- Jangan tulis test untuk trivial code (formatter, dll)
- Jangan over-comment, code-nya harus self-explanatory
- Jangan bikin file types/index.ts terpisah kalau cuma 1-2 type
- Jangan bikin hook untuk hal yang cuma 1x dipakai
- Jangan bikin component wrapper untuk icon/library call
