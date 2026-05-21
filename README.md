# PrataUt
Ett community-forum där användare anonymt kan dela erfarenheter och bryta ensamhet, sida vid sida med verifierade psykologer. PrataUt sänker tröskeln till professionell hjälp genom ett varmt, avdramatiserat forum.

## Funktioner
- **Gemensamt Forumflöde** - Användare och verifierade psykologer interagerar i samma flöde för att ge unika perspektiv och stöd.
- **Rollbaserad Behörighet** - Strikt och säker hantering av tre unika roller (user, psychologist, admin) för att garantera plattformens trygghet.
- **Anonymt erfarenhetsutbyte** - Möjlighet för användare att dela känsliga tankar och upplevelser utan krav på perfekt formulering.
- **Sessionshantering** – Säker inloggning och autentisering för alla användartyper.

## Teknisk Stack
- Node.js
- Express 5
- TypeScript
- MongoDB med Mongoose
- Zod
- React
- Jest och Supertest för tester

## Installation
1. Klona repot:
```bash
   git clone https://github.com/goteborg-1/prata-community-platform.git
   cd prata-community-platform
```
2. Installera beroenden:
```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ../shared && npm install
   cd ..
```
3. Skapa en .env-fil baserad på .env.example
```bash
   cp backend/.env.example backend/.env
```
4. Starta utvecklingsservern
```bash
   npm run dev
```
## API-översikt
Alla endpoints nås under basadressen /api/v1

| Endpoint | Beskrivning |
|---|---|
| `/api/v1/users` | Registrering, inloggning och sessionshantering |
| `/api/v1/profile` | Hämta och uppdatera användarprofiler |
| `/api/v1/posts` | Skapa, hämta och interagera med forumtrådar |
| `/api/v1/comments` | Skapa, hämta och radera kommentarer kopplade till trådar |

> Detaljerad API-dokumentation med request/response-exempel finns i [`LÄNK TILL API-DOKUMENTATION`](backend/README.md).

## Mappstruktur
```text
├── backend/
│   └── src/
│       ├── config/         # Databas- och miljökonfiguration
│       ├── controllers/    # Affärslogik per resurs
│       ├── middleware/     # Autentisering, rollkontroll, felhantering
│       ├── models/         # Mongoose-scheman (User, Post, Comment)
│       ├── routes/         # Express-rutter
│       ├── app.ts          # Express-applikation och middleware-setup
│       └── server.ts       # Startpunkt – startar HTTP-servern
├── frontend/
│   └── src/
│       ├── components/     # Återanvändbara UI-komponenter
│       ├── context/        # React Context för global state
│       ├── hooks/          # Egna React hooks
│       ├── layout/         # Sidlayout och navigationskomponenter
│       ├── pages/          # Sidkomponenter per route
│       ├── App.tsx         # Rotkomponent med routing
│       └── main.tsx        # Ingångspunkt för React-appen
├── shared/
│   ├── schema/
│   │   ├── comment/        # Zod-scheman för kommentarer
│   │   ├── post/           # Zod-scheman för inlägg
│   │   └── user/           # Zod-scheman för användare
│   ├── constants.ts        # Delade konstanter (t.ex. kategorier)
│   └── index.ts            # Exportpunkt för shared-paketet
└── README.md
```
## Tester
Projektet använder **Jest** och **Supertest** för att säkerställa kodkvalitet och säkerhet kring rollhanteringen.
```bash
# Kör hela testsviten
npm test
```

## Författare
Utvecklat av grupp Göteborg 1 från **Chas Academy** som en del av Boiler Room-projektet.

- David Lindblom - [Github](https://github.com/Gagipose)
- Veronica Czarnotta - [Github](https://github.com/vczarnotta)