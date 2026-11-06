# Atrament

Pisanie opowieści z AI, które pamięta postacie, wydarzenia i otwarte wątki. Działa jako apka na iPhonie (PWA) bez App Store i bez serwera: dane trzymasz na telefonie, a zapytania idą prosto do API modeli.

## Instalacja na iPhonie (ok. 10 minut, za darmo)

1. Załóż na GitHubie publiczne repozytorium, np. `atrament`.
2. Wrzuć do niego wszystkie pliki z tego folderu (Add file → Upload files).
3. W repo wejdź w Settings → Pages → Source: „Deploy from a branch”, wybierz `main`, potem Save.
4. Po minucie dostaniesz adres typu `https://twojlogin.github.io/atrament/`.
5. Otwórz go w **Safari** na iPhonie, stuknij Udostępnij → „Do ekranu początkowego”.
6. Odpal Atrament z ekranu, wejdź w Ustawienia i wklej klucz z https://openrouter.ai/keys (doładuj konto paroma dolarami).

Repo może być publiczne, bo w kodzie nie ma żadnych kluczy ani tekstów. Wszystko zapisuje się dopiero na Twoim telefonie.

## Jak to działa

- **Pisarz** (domyślnie Kimi K3): pisze sceny, pomysły i alternatywne zakończenia.
- **Redaktor** (domyślnie Gemini 3.8 Flash + LanguageTool): poprawia polszczyznę, a zmiany pokazuje jako przekreślone i dopisane. Stuknięciem odrzucasz pojedyncze poprawki.
- **Archiwista** (domyślnie Gemini 3.8 Flash): po zatwierdzeniu sceny wyciąga wydarzenia, wiedzę postaci (wie / nie wie), nowe i zamknięte wątki oraz streszczenie. Zgłasza też błędy ciągłości. Wszystko zatwierdzasz ptaszkami.

Model nigdy nie dostaje całej książki. Dostaje karty postaci obecnych w scenie, streszczenia rozdziałów, najistotniejsze fakty, otwarte wątki i koniec poprzedniej sceny. Prompt zostaje mały (kilka–kilkanaście tysięcy tokenów) przy dowolnej długości opowieści. Podgląd: przycisk „Co widzi model”.

## Książka

Zakładka **Książka** zamienia sceny w gotowy tekst do wydania:
- Spis treści z rozdziałami i częściami. Rozdziały i sceny przesuwasz strzałkami: scena przesunięta poza pierwszą albo ostatnią pozycję przechodzi do sąsiedniego rozdziału. Ptaszkiem wyłączasz scenę z książki.
- Strona tytułowa, dedykacja, motto i blurb na okładkę, który model napisze z pamięci opowieści.
- Numeracja rozdziałów: „Rozdział pierwszy”, „Rozdział 1”, „Rozdział I” albo bez numerów. Do tego separator scen.
- Polska typografia przy składzie: „cudzysłowy”, półpauzy w dialogach, wielokropek i twarde spacje po jednoliterowych wyrazach (bez sierotek).
- Statystyki wydawnicze: słowa, strony maszynopisu (1800 znaków), arkusze wydawnicze (40 000 znaków), szacowana liczba stron w druku i postęp do celu.
- Tryb czytania z typografią książkową i skokiem do rozdziałów.
- Eksport: **EPUB** (Apple Books, czytniki, Kindle przez Send to Kindle), **DOCX** w formacie maszynopisu dla wydawnictwa (TNR 12, interlinia 1,5, rozdziały od nowej strony), **PDF** przez drukowanie w formacie A5 oraz Markdown.

## Walka z tikami

- Każda scena dostaje inny typ zakończenia (cliffhanger, dialog, obraz, zwrot…), losowany tak, żeby się nie powtarzał.
- Model widzi, jak kończyły się ostatnie sceny, z poleceniem, żeby nie kończyć podobnie.
- Wykrywacz łapie „I to było…”, krótkie akapity-puenty, refleksje narratora i frazy z Twojej czarnej listy (zakładka Styl).
- „Utnij puentę” usuwa końcowe jednolinijkowce, a „Inne zakończenia” daje 3 warianty samej końcówki.

## Dataset pod Twój model

Apka sama zbiera:
- **SFT**: prompt + to, co napisał model, + Twoja finalna wersja (po poprawkach). Uczy stylu i poprawnej polszczyzny.
- **DPO**: wybrane zakończenie kontra odrzucone. Oducza tików.

Eksport w Ustawieniach, format JSONL zgodny z Unsloth / TRL. Gdy wytrenujesz model, wystaw go jako endpoint zgodny z OpenAI i wpisz w „Własny endpoint”. Nic więcej nie zmieniasz.

## Prywatność

- Przełącznik „Tylko dostawcy, którzy nie trenują na moich tekstach” jest domyślnie włączony (`data_collection: deny` w OpenRouter).
- ZDR (zero przechowywania) to opcja dodatkowa. Mocno zawęża dostawców.
- LanguageTool wysyła tekst do api.languagetool.org. Możesz to wyłączyć.

## Kopie

iOS potrafi wyczyścić dane apki, której długo nie otwierasz. Rób co jakiś czas „Zapisz kopię” w Ustawieniach (plik JSON, bez kluczy).
