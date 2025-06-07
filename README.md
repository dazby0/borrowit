# BorrowIT – System Zarządzania Biblioteką Cyfrową

## Spis treści
1. [Opis projektu](#opis-projektu)
2. [Funkcjonalności](#funkcjonalno%C5%9Bci)
3. [Instrukcja uruchomienia](#instrukcja-uruchomienia)
4. [Struktura aplikacji](#struktura-aplikacji)
5. [Dane wejściowe](#dane-wej%C5%9Bciowe)
6. [Kontakt](#kontakt)

---

## Opis projektu

BorrowIT to aplikacja webowa służąca do zarządzania biblioteką cyfrową.  
Umożliwia rejestrację i zarządzanie użytkownikami, obsługę wypożyczeń książek oraz monitorowanie statusów dostępności. Projekt jest oparty na wzorcu MVC i zaimplementowany w technologii .NET 8 (backend) oraz React + TypeScript + MUI (frontend).

---

## Funkcjonalności

- Rejestracja i logowanie użytkowników z podziałem na role (Admin, User) z użyciem JWT
- CRUD książek: dodawanie, edycja, usuwanie i wyświetlanie listy
- Zarządzanie wypożyczeniami książek z filtrowaniem i historią
- Eksport danych do plików CSV (książki, wypożyczenia, użytkownicy)
- Statystyki biblioteki w panelu administratora (aktywni użytkownicy, wypożyczenia, top książek)
- Panel użytkownika z profilem i aktywnościami
- Zaawansowana walidacja formularzy po stronie klienta i serwera
- Estetyczny interfejs użytkownika z MUI
- Autoryzacja dostępu do zasobów na podstawie ról
- Pełna paginacja i filtrowanie na liście książek i wypożyczeń

---

## Instrukcja uruchomienia

### Backend

1. Przejdź do katalogu `backend`:
   ```bash
   cd backend
   ```
2. Zainstaluj zależności:
   ```bash
   dotnet restore
   ```
3. Uruchom migracje i stwórz bazę danych (SQLite):
   ```bash
   dotnet ef database update
   ```
4. Uruchom backend:
   ```bash
   dotnet run
   ```
   Backend będzie dostępny pod adresem: `http://localhost:5127`

### Frontend

1. Przejdź do katalogu `frontend`:
   ```bash
   cd frontend
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom frontend:
   ```bash
   npm start
   ```
   Frontend będzie dostępny pod adresem: `http://localhost:3000`

---

## Struktura aplikacji

```
### Backend (`/backend`)

- `/Controllers`  
  Zawiera kontrolery API, które obsługują żądania HTTP i kierują je do odpowiednich serwisów.  
  Pliki:  
  - `AuthController.cs` – uwierzytelnianie i logowanie użytkowników, zarządzanie sesją  
  - `BooksController.cs` – operacje na książkach (CRUD, lista, szczegóły)  
  - `BorrowingsController.cs` – zarządzanie wypożyczeniami (wypożyczanie, historia)  
  - `UsersController.cs` – zarządzanie użytkownikami i ich danymi  

- `/Data`  
  - `ApplicationDbContext.cs` – kontekst bazy danych EF Core, konfiguracja modeli i relacji  
  - Migrations/ – folder generowany automatycznie z migracjami bazy danych  

- `/Dtos`  
  Obiekty transferu danych służące do przesyłania danych między backendem a frontendem oraz między warstwami aplikacji:  
  - `BookDtos.cs`  
  - `BorrowingDtos.cs`  
  - `PagedResult.cs` – obsługa paginacji odpowiedzi  
  - `UserDtos.cs`  

- `/Models`  
  Definicje encji bazodanowych odwzorowujących tabele:  
  - `Book.cs`  
  - `Borrowing.cs`  
  - `User.cs`  

- `/Services`  
  Warstwa logiki biznesowej, obsługuje operacje i reguły na modelach:  
  - `AuthService.cs`  
  - `BookService.cs`  
  - `BorrowingService.cs`  
  - `ExportService.cs` – obsługa eksportu danych (CSV itp.)  
  - `UserService.cs`  

- `DbSeeder.cs`  
  Klasa inicjalizująca bazę danych przykładowymi danymi testowymi (seed).

/frontend                 - projekt React + TypeScript + MUI, komponenty UI, routing, integracja z API
/frontend/src/api         - funkcje do komunikacji z backendem
/frontend/src/components  - komponenty React (formularze, listy, modale)
/frontend/src/hooks       - custom hooki do logiki biznesowej i pobierania danych
/frontend/src/pages       - strony routingu React Router
/frontend/src/schemas     - walidacja formularzy (Zod)
/frontend/src/context     - kontekst autoryzacji i sesji użytkownika
/frontend/src/utils       - narzędzia pomocnicze (np. download CSV)
```

---

## Dane wejściowe

Projekt korzysta z bazy danych SQLite, która jest tworzona i zarządzana za pomocą migracji Entity Framework.

Przykładowe dane testowe można dodać przez mechanizm seedingu w projekcie backendowym (`DbSeeder`), który tworzy:

- przykładowych użytkowników (Admin, User)
- kilka książek o różnych tytułach i autorach
- przykładowe wypożyczenia (aktywne i zakończone)

---

## Kontakt

W razie pytań lub problemów, proszę o kontakt pod adresem email: **kowalczyk.wojtek168@gmail.com**
