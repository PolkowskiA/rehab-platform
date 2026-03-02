**Projekt**

Prosty monorepo zawierający backend w ASP.NET Core (API) oraz frontend z React + Vite.

Struktura

- Backend: [backend/PatientRehabPanel.API](backend/PatientRehabPanel.API)
- Frontend: [frontend](frontend)

Szybki start — Docker (zalecane)

- Zbuduj i uruchom oba serwisy:

```bash
docker compose up --build
```

- Frontend: http://localhost:3001
- Backend (API): http://localhost:5000

Jeśli chcesz przebudować tylko frontend:

```bash
docker compose build --no-cache frontend
docker compose up -d frontend
```

Szybki start — lokalnie (dewelopersko)

- Backend (dotnet):

```bash
cd backend/PatientRehabPanel.API
dotnet run
```

- Frontend (dev server):

```bash
cd frontend
npm install
npm run dev
```

Konfiguracja / zmienne środowiskowe

- Frontend używa `VITE_API_BASE_URL` (ustawiane przy buildzie lub w pliku `.env`).
- Backend czyta connection string z `ConnectionStrings__DefaultConnection` i dozwolone origins z `FRONTEND_ORIGINS` (lista oddzielona przecinkami).

Baza danych

- Projekt używa pliku SQLite `backend/PatientRehabPanel.API/rehab.db`, który w Compose jest montowany do kontenera jako `/data/rehab.db`.
- Reset bazy (usuwa wszystkie dane):

```bash
docker compose down
rm backend/PatientRehabPanel.API/rehab.db
docker compose up --build
```

CORS i URL API

- Backend przyjmuje pochodzenia zdefiniowane w `FRONTEND_ORIGINS` (zmienna środowiskowa lub konfiguracja).
- Frontend uruchomiony w przeglądarce musi kierować żądania do hosta/dostępu widocznego z przeglądarki (np. `http://localhost:5000`), a nie nazwy usługi Dockera.

Polecenia (cheat-sheet)

- Pełny rebuild i uruchomienie: `docker compose up --build`
- Zatrzymaj i usuń kontenery: `docker compose down`
- Zbuduj pojedynczy serwis: `docker compose build --no-cache <service>`
