# WebStore

## Beskrivelse
Denne applikasjonen er en enkel e-handelsplattform hvor brukere kan søke etter produkter, filtrere etter kategorier og legge produkter til i en handlekurv. Applikasjonen har et responsivt design som fungerer både på mobil og desktop.

## Info

|           |                                                               |
|-----------|---------------------------------------------------------------|
| Navn      | WebStore - Caseoppgave                                        |
| Teknologi | `React 18`, `Vite 5`, `Nginx`, `Material UI 6`                |
| Docker    | `webstore-telenor`                                            |
| URL       | [Lokalt](http://localhost:3000)                               |
| Backend   | `http://fakestoreapi.com` --> nginx reverse proxy ttil `/api` |

## Status
| Info          | Verdi |
|---------------|:-----:|
| Fullført      |   ✅   |
| Ikke fullført |  🔜   |

### Funksjoner
| Feature            | Status | Beskrivelse                                                                  |
|--------------------|:------:|------------------------------------------------------------------------------|
| Grid med produkter |   ✅    | Grid med tilgjengelige produkter.                                            |
| Produktside        |   ✅    | Side med detaljert beskrivelse av produkter og valg av størrelse på klær.    |
| Handlekurven       |   ✅    | Handlekurven med session storage, og dynamisk oppdatering.                   |
| Pålogging          |   🔜   | Ikke implementert på grunn av begrenset tid til å fullføre oppgaven.         |
| Error håndtering   |   🔜   | Enkelte steder bruker `console.error()` istedenfor å vise info til brukeren. |

## Oversikt
```
.
├── App.tsx
├── assets
│   ├── LogoImage.tsx
│   ├── bag.png
│   └── telenor_logo.png
├── common
│   ├── ErrorPage.tsx
│   ├── Header.tsx
│   └── LoadingPage.tsx
├── components
│   ├── AddToCartSnackbar.tsx
│   ├── CardItem.tsx
│   ├── ShoppingCartDrawer.tsx
│   └── ShoppingCartItem.tsx
├── main.tsx
├── pages
│   ├── Index.tsx
│   └── ProductPage.tsx
├── theme.ts
└── utils
    ├── CartAction.ts
    ├── CartContext.tsx
    ├── Localisation.ts
    ├── api.ts
    └── types.ts
```

## Hvordan starte applikasjon?

1. Klon repoet
    ```zsh
    git clone git@github.com:aleksandarperendic/WebStore.git
    ```
2. Gå inn i mappen
    ```zsh
    cd WebStore
    ```
3. Kjør applikasjonen med Docker
    ```zsh
    make docker startLocal
    ```
4. Åpne nettleseren og gå til [http://localhost:3000](http://localhost:3000)
5. For å stoppe applikasjonen
    ```zsh
    make docker stopLocal
    ```

## Hvorfor Docker?
Formålet er å levere en produksjonsklar applikasjon. Her er det brukt et multi-stage Docker-image for å minimere størrelsen ved å ekskludere unødvendige avhengigheter fra sluttimagen. I tillegg er Nginx konfigurert til å route alle forespørsler fra `/api` i applikasjonen til `https://fakestoreapi.com`.

Ved å containerisere applikasjonen med Docker, sikres det at den oppfører seg likt på alle plattformer, uavhengig av miljøforskjeller.

**Merk:** Hvis Docker ikke er installert eller tilgjengelig, kan man kjøre applikasjonen direkte ved å endre URL i `/src/utils/api.ts` fra `/api` til `https://fakestoreapi.com`, og deretter starte applikasjonen med `npm run dev`.

## Teknologier
[![Teknologier](https://skillicons.dev/icons?i=vite,react,ts,nodejs,nginx&theme=light)]()

## Disclaimer
Denne applikasjonen er utviklet som en caseoppgave for Telenor og er kun ment for demonstrasjonsformål, ikke for produksjon. Alle bilder og data, med unntak av Telenor-logoen og bildet av en tom handlekurv, er hentet fra [Fake Store API](https://fakestoreapi.com/).