# RendezVous Québec — Frontend (Next.js)

Site de rencontres Next.js 14 connecté à Sanity CMS.

## ⚡ Démarrage en 3 étapes

### 1. Ouvrez `.env.local` et mettez votre Project ID Sanity
```
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id_ici
```
Trouvez votre Project ID sur https://www.sanity.io/manage

### 2. Installez les dépendances
```bash
npm install
```

### 3. Lancez le site
```bash
npm run dev
# → http://localhost:3000
```

## 🚀 Déploiement Netlify (depuis GitHub)

1. Pushez ce dossier sur GitHub
2. Sur Netlify : **New site → Import from Git**
3. Build settings :
   - Build command : `npm run build`
   - Publish directory : `.next`
4. Variables d'environnement (Site settings → Environment variables) :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = votre Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
5. Cliquez Deploy

## 📄 Pages et metadata SEO

| Page | Meta title | Meta description |
|------|-----------|-----------------|
| `/` | RendezVous Québec – Rencontres authentiques | Statique |
| `/annonces` | Toutes les annonces – Célibataires au Québec | Dynamique selon filtre |
| `/profil/[slug]` | Prénom, âge ans à Ville | Dynamique avec OG image |
| `/regions` | Rencontres par région au Québec | Statique |
| `/regions/[slug]` | Rencontres à {Ville} | Dynamique par ville |
| `/categories` | Types de rencontres au Québec | Statique |
| `/categories/[slug]` | {Catégorie} au Québec | Dynamique par catégorie |
| `/tags` | Tags et centres d'intérêt | Statique |
