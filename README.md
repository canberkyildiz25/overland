# TravelTrucks

TravelTrucks, karavan ve campervan kiralama senaryosu için geliştirilmiş bir React uygulamasıdır.
Kullanıcılar araçları listeleyebilir, filtreleyebilir, favorilere ekleyebilir ve detay sayfasından inceleyebilir.

## Özellikler

- Ana sayfa (`/`) ve katalog (`/catalog`) akışı
- Lokasyon, ekipman ve araç tipine göre filtreleme
- `Load more` ile kademeli listeleme
- Favori araçları `localStorage` üzerinde saklama
- Araç detay sayfası (`/catalog/:id`) ile:
	- Özellikler sekmesi
	- Yorumlar sekmesi
	- Rezervasyon formu

## Teknolojiler

- React 19
- Vite
- React Router DOM
- Redux Toolkit + React Redux
- Axios
- ESLint

## Kurulum

> Gereksinim: Node.js 18+

```bash
npm install
```

## Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Lint kontrolü
npm run lint
```

## Proje Yapısı

```text
src/
	pages/          # Home, Catalog, VehicleDetails
	services/       # API istekleri
	store/          # Redux slice ve store
	data/           # Statik veri (gerekirse)
```

## API

Uygulama veri kaynağı olarak MockAPI kullanır:

- Base URL: `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io`
- Endpoints:
	- `GET /campers`
	- `GET /campers/:id`

## Notlar

- Favoriler tarayıcı bazlı tutulur (`localStorage`).
- Araç detay sayfasındaki rezervasyon formu şu an demo amaçlıdır.

## Geliştirici

Proje: `canberkyildiz25/Travel-Trucks`


