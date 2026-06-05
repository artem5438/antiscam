# Статичный сайт «Противодействие мошенникам» · Норильск

Памятка для жителей г. Норильска: инструкции по защите от мошенничества, срочная помощь и контакты.

## Структура

- `index.html` — главная
- `pages/` — разделы сайта
- `assets/css/styles.css` — стили
- `assets/js/layout.js` — шапка, подвал, мобильное меню
- `assets/js/app.js` — размер текста (3 уровня) и чеклист
- `assets/images/norilsk-hero.jpg` — фото для hero на главной
- `docs/PITCH.md` — материал для защиты

## Локальный запуск

```bash
cd "/Users/artem/Documents/scammers"
python3 -m http.server 8080
```

Откройте [http://localhost:8080](http://localhost:8080)

## Публикация на GitHub Pages

### 1. Перенос в репозиторий

```bash
cd "/Users/artem/Documents/scammers"
git init
git add .
git commit -m "Initial commit: anti-scam site for Norilsk"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Замените `<username>` и `<repo>` (например `antiscam`).

### 2. Включение GitHub Pages

**Вариант A — через настройки (проще):**

1. GitHub → репозиторий → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, папка **`/ (root)`**
4. Сохранить

**Вариант B — через GitHub Actions (уже настроен):**

1. **Settings** → **Pages** → **Source:** GitHub Actions
2. При каждом `push` в `main` сработает workflow `.github/workflows/pages.yml`

### 3. Адрес сайта

Для проектного репозитория (не `username.github.io`):

```
https://<username>.github.io/<repo>/
```

Пример: `https://ivanov.github.io/antiscam/`

Файл `.nojekyll` в корне отключает Jekyll — сайт отдаётся как чистая статика.

## Проверка перед сдачей

На телефоне и на компьютере:

1. Открыть главную — видно фото Норильска в hero
2. Пройти: Срочная помощь → Схемы → Куда обращаться
3. Переключить размер текста: Стандарт / Средний / Большой
4. На экране уже 860px: кнопка «Меню» открывает и закрывает навигацию
5. Номер 112 отображается текстом (без автозвонка)

## Возможности

- Адаптивная вёрстка (мобильные и десктоп)
- Три уровня размера текста с сохранением в браузере
- Интерактивный чеклист с прогрессом
- Hero с фото Норильска на главной
