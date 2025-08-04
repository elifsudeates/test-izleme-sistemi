# Test İzleme Sistemi

Bu proje, test süreçlerinin takibini kolaylaştırmak için geliştirilmiş bir web uygulamasıdır. Hem **backend** (Node.js/Express/PostgreSQL) hem de **frontend** (Angular) bileşenlerini içerir.

## İçerik

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
  - [Backend](#backend-kurulumu)
  - [Frontend](#frontend-kurulumu)
- [Kullanım](#kullanım)
- [API Endpointleri](#api-endpointleri)
- [Geliştirici Bilgisi](#geliştirici-bilgisi)

---

## Özellikler

- Cihaz ve test yönetimi
- Test sonuçlarının kaydı ve takibi
- Dosya yükleme ve belge yönetimi
- Filtreleme ve arama fonksiyonları
- Modern Angular arayüzü

## Kurulum

### Backend Kurulumu

1. `backend` klasörüne girin:
   ```sh
   cd backend
   ```
2. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
3. `.env` dosyasını oluşturun ve veritabanı bilgilerinizi girin (örnek için `.env.example` dosyasını kullanabilirsiniz).
4. PostgreSQL veritabanınızı oluşturun ve gerekli tabloları ekleyin.
5. Sunucuyu başlatın:
   ```sh
   npm run dev
   ```
   veya
   ```sh
   npm start
   ```

### Frontend Kurulumu

1. `frontend` klasörüne girin:
   ```sh
   cd frontend
   ```
2. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
3. Angular uygulamasını başlatın:
   ```sh
   ng serve
   ```
4. Uygulamaya [http://localhost:4200](http://localhost:4200) adresinden erişebilirsiniz.

## Kullanım

- Frontend arayüzü üzerinden cihaz ve test ekleyebilir, test sonuçlarını görüntüleyebilir ve dosya yükleyebilirsiniz.
- Backend API'si ile RESTful endpointlere erişebilirsiniz.

## API Endpointleri

Backend API örnekleri:
- `GET /api/items` : Cihazları listeler
- `POST /api/item-tests` : Test sonucu ekler (dosya yükleme destekli)
- `GET /api/item-tests` : Test sonuçlarını listeler
- `GET /api/item-tests/:itemTestId/documents` : Teste ait belgeleri getirir
- `POST /api/item-tests/:itemTestId/documents` : Belge yükler

Detaylı endpoint listesi için [backend/server.js](backend/server.js) dosyasına bakabilirsiniz.

## Geliştirici Bilgisi

- Lisans: MIT
- Geliştirici: Elif Sude ATES

---

Herhangi bir sorun veya öneri için lütfen