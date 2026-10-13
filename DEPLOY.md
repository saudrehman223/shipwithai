# ShipWithAI — Deploy Guide (tumhare tasks + mere tasks)

## Tumhare tasks (aaj — 2026-10-13)

### 1. Domain khareedo: `shipwithai.app`
- **Kahan se:** Porkbun (aaj subah verified) ya Cloudflare Registrar.
- **Keemat:** **$8.75 pehla saal** (1st Year Sale — asal keemat par, asal me $14.93/saal) — **renewal $14.93/saal**. Mera purana $15–20 wala estimate is se zyada tha.
- **Kaise:** Porkbun par account banao → search `shipwithai.app` → buy.
- ⚠️ `.dev` aur `.io` taken hain — sirf `.app` lena (verified available).

### 2. GitHub ka free account
- github.com → Sign up (email + password). Koi payment nahi chahiye.

### 3. Vercel ka free account
- vercel.com → "Continue with GitHub" se login kar lo (asan tareen).

Teenon ho jayen to mujhe bata dena — phir neeche wale steps main tumhare saath karunga.

---

## Mere saath wale steps (jab tumhara setup ready ho)

### 4. Code GitHub par push karna
Main tumhe exact commands dunga (terminal me):
```
git init, git add, git commit, git remote add origin <tumhara-repo-url>, git push
```

### 5. Vercel par deploy
- Vercel dashboard → "Add New Project" → GitHub repo select → Deploy.
- ~2 minute me site live ho jayegi (temporary `*.vercel.app` URL par).

### 6. Custom domain connect karna
- Vercel → Project Settings → Domains → `shipwithai.app` add karo.
- Vercel jo DNS records dega (A / CNAME), wo Cloudflare/Porkbun ke DNS me lagane honge — main bata dunga exactly kahan.
- SSL (https) Vercel khud laga dega, kuch nahi karna.

### 7. Final config update (pehle se ho chuka — skip kar sakte ho)
- `src/site.config.ts` me URL **pehle se** `https://shipwithai.app` par set hai, aur contact email `hello@shipwithai.app` bhi update hai (2026-10-13 ko verified).
- Sirf tab change karna jab brand details badlain — otherwise kuch nahi karna.
- Deploy ke baad check karna: sitemap, RSS, canonical links — sab naye domain par hone chahiye.

### 8. Verify
- `shipwithai.app` kholo → pehla article live hona chahiye
  (uska publishDate 2026-10-13 guzar chuka hai, deploy hote hi auto-publish ho jayega).
- `/sitemap.xml` aur `/feed.xml` check karo.

---

## Kharcha summary
| Cheez | Keemat |
|---|---|
| Domain (shipwithai.app) | **$8.75 pehla saal**, phir $14.93/saal (Porkbun, aaj verified) |
| GitHub | Free |
| Vercel hosting | Free (tumhare traffic level ke liye kafi) |
| **Total** | **$8.75 pehla saal**, phir $14.93/saal |
