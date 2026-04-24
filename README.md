# Arbetslivserfarenhet - REST API

Detta repository innehåller Backend-kod för ett enklare REST API byggt med Express. API:et är skapat för att hantera en databas över arbetslivserfarenheter. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad för att kunna administrera poster via en extern klient.

## Live-version

En liveversion av API:et finns tillgänglig på följande URL: [Frontend](https://dt207glab3frontend.onrender.com/)

## Installation och databas

API:et använder MongoDB som databas. Anslutning sker via Mongoose i backend-koden. En molnbaserad tjänst (MongoDB Atlas) används för hosting.

| Tabell-namn | Fält |
| :--- | :--- |
| _id (ObjectID), companyname (String), jobtitle (String), location (String), fictive (Boolean) |

## Användning

Nedan finns beskrivet hur man når API:et på olika vis:

| Metod | Ändpunkt | Beskrivning |
| :--- | :--- | :--- |
| GET | /jobs | Hämtar alla lagrade arbetslivserfarenheter. |
| GET | /jobs/:id | Hämtar en specifik post med angivet **_id**. |
| POST | /jobs | Lagrar en ny post. Kräver att ett jobb-objekt skickas med i JSON-format. |
| PUT | /jobs/:id | Uppdaterar en existerande post med angivet **_id**. Kräver att ett jobb-objekt skickas med. |
| DELETE | /jobs/:id | Raderar en post med angivet **_id**. |

Ett jobb-objekt returneras/skickas som JSON med följande struktur:

```json
{
   "companyname": "Företaget AB",
   "jobtitle": "Webbutvecklare",
   "location": "Sundsvall",
   "fictive": false
}