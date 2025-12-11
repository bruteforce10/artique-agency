# Deploy ke Cloudflare Pages

## Opsi 1: Deploy melalui Cloudflare Pages Dashboard (Recommended)

1. Login ke Cloudflare Dashboard
2. Pergi ke Pages > Create a project
3. Connect repository GitHub/GitLab
4. Konfigurasi Build Settings:
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: (kosongkan)

## Opsi 2: Deploy Manual dengan Wrangler

```bash
# Build untuk Cloudflare
npm run build:cloudflare

# Deploy ke Cloudflare Pages
npx wrangler pages deploy .vercel/output/static --project-name=artique-agency
```

## Opsi 3: Menggunakan Cloudflare Pages Deploy Command

Jika menggunakan Cloudflare Pages dengan custom deploy command:

```bash
npm run pages:deploy
```

## Catatan Penting

- Pastikan environment variables sudah diset di Cloudflare Pages dashboard
- API routes akan berfungsi dengan @cloudflare/next-on-pages adapter
- Build output akan berada di `.vercel/output/static`
