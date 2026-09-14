# Cocktail App

Nuxt 4 + Prisma app voor het bijhouden en ontdekken van cocktailrecepten, met inloggen via Plex.

## Development

```bash
npm install
npm run dev
```

De app draait dan op `http://localhost:3000`. Lokaal gebruik je je eigen `.env` met `DATABASE_URL` (zie `.env.example` voor alle overige variabelen die voor Plex-login nodig zijn).

## Hosting op een NAS (Docker + Traefik)

De app draait in productie als Docker-container achter een Traefik reverse proxy, met een aparte Postgres-container voor de database. Omdat inloggen via Plex een publiek bereikbare HTTPS-callback nodig heeft, werkt dit niet met een zuiver LAN-only opstelling — de NAS moet via het eigen domein bereikbaar zijn.

### 1. Repo op de NAS zetten

```bash
git clone <repo-url> cocktail-app
cd cocktail-app
```

### 2. `.env` aanmaken

```bash
cp .env.example .env
```

Vul in `.env` in:
- `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` — eigen keuze, wordt gebruikt om de Postgres-container te initialiseren.
- `DOMAIN` — het domein waarop de app straks bereikbaar is (bv. `cocktails.jouwdomein.nl`).
- `PLEX_APP_URL` — hetzelfde domein, maar dan als volledige `https://`-URL.
- `NUXT_SESSION_PASSWORD` — genereer met `openssl rand -hex 32`.
- `PLEX_CLIENT_ID` — genereer eenmalig met `uuidgen` en laat daarna staan.
- `PLEX_SERVER_MACHINE_IDENTIFIER` — machine-ID van je eigen Plex-server. Opzoeken via `https://plex.tv/api/v2/resources?X-Plex-Token=JOUW_PLEX_TOKEN` (in de browser, ingelogd op plex.tv) — het `clientIdentifier`-veld van jouw server in de JSON-response.

### 3. Traefik-netwerk koppelen

`docker-compose.yml` verwacht een extern Docker-netwerk genaamd `traefik` waar de Traefik-container zelf ook op aangesloten is. Controleer de naam van dat netwerk op je NAS met:

```bash
docker network ls
```

en pas zo nodig `name: traefik` onderaan `docker-compose.yml` aan.

### 4. Starten

```bash
docker compose up -d --build
```

Bij het opstarten draait de app automatisch `prisma migrate deploy` tegen de Postgres-container voordat de server start (zie `docker-entrypoint.sh`).

### 5. Updaten

```bash
git pull
docker compose up -d --build
```

Nieuwe migraties worden bij elke herstart automatisch toegepast.
