# DEKART — Landing Page

Одностраничный сайт студии дизайна интерьеров «ДЕКАРТ» (анаграмма имён основательниц — Дарьи и Екатерины). Референс: asolis.ru.

## Стек

Чистый HTML/CSS/JS — **без фреймворков, без сборки, без npm**. Просто 3 файла. Менять можно напрямую и сразу коммитить.

- `index.html` — разметка всех секций + модалка портфолио
- `style.css` — стили, CSS custom properties, полная адаптивность
- `script.js` — IntersectionObserver для reveal, модалка, табы, счётчики
- `test_screenshot.py` — Playwright-скрипт для визуальной проверки

## Деплой

**GitHub Pages (автоматический):** `git push origin main` → через ~30 сек обновляется https://goodwinsis.github.io/landing-page/

Репо: https://github.com/goodwinsis/landing-page (branch `main`, публичный, владелец `goodwinsis`).

Авторизация для пуша настроена локально через `gh` (keyring macOS). Просто `git push` сработает.

## Структура страницы (id секций)

1. `#hero` — главный экран с фоном, parallax на мыши, CTA-кнопками
2. `#portfolio` — сетка 3×n, клик по карточке → модалка с галереей
3. `#services` — 6 карточек услуг с нумерацией 01–06 (тёмный фон)
4. `#pricing` — таблица тарифов с табами «Готовая отделка»/«White Box»
5. `#process` — timeline из 5 этапов работы (тёмный фон)
6. `#about` — история бренда, счётчики 150+/7/98%
7. `#reviews` — 3 отзыва (тёмный фон)
8. `.cta` — блок «бесплатная консультация»
9. `#contact` — форма + контакты (тёмный фон)
10. `footer` — логотип, навигация, соц-иконки

## Ключевые паттерны

### BEM-нейминг
Используется везде: `.block`, `.block__element`, `.block--modifier`. Соблюдать при добавлении нового.

### Цветовые переменные (в `:root`)
```
--color-primary: #c05a38    // терракотовый акцент
--color-dark: #1a1614        // тёмные секции
--color-beige-light: #f5f0ec // светлые секции
--color-text: #2a2a2a
--color-text-light: #8a827d
```

Тёмные секции — класс `.section--dark`. Светлые — просто `.section`.

### Типографика
- Заголовки: `Playfair Display` (italic вариант для акцентов через `<em>`)
- Текст: `Inter` (300/400/500/600)
- В заголовках паттерн: `<h2>Стоимость <em>наших услуг</em></h2>` — italic + primary color

### Reveal-анимации
Любой новый блок, который должен появляться при скролле → добавить класс `reveal`. IntersectionObserver (в `script.js`) автоматически добавит `reveal--visible`.

Для staggered-появления внутри грида — прописать `transition-delay` в CSS (см. пример `.services__grid .reveal:nth-child(N)`).

### Модалка портфолио
Данные проектов — в массиве `projects` в `script.js`. Чтобы **добавить новый проект**:
1. В `index.html` добавить `.portfolio__item` с `data-project="5"` (следующий индекс)
2. В `script.js` добавить объект в массив `projects` с полями:
   ```js
   { tag, title, meta: [{label, value}], description, details: [], images: [] }
   ```
3. Изображения — Unsplash URLs с `?w=1400&q=85`

## Как вносить правки

### Текстовый контент
Редактировать напрямую в `index.html`. Всё — кириллица, никаких i18n.

### Цены в тарифах
`index.html` → секция `#pricing` → `.pricing__row` содержит `.pricing__type`, `.pricing__area`, `.pricing__price`. Два таба: `data-panel="ready"` (готовая отделка) и `data-panel="whitebox"`.

### Контакты
Телефон и email искать грепом — встречаются в hero CTA, секции `#contact` и футере.

### Новая секция
Создать `<section class="my-section section" id="my-section">` с `.container` внутри. Заголовок через `.section__header` + `.section__label` + `.section__title`. Тёмный фон — добавить `section--dark`.

## Визуальная проверка (обязательно перед коммитом CSS-правок)

```bash
cd /Users/alexanderignatov/GolandProjects/landing-page
python3 test_screenshot.py
```

Скрипт делает скриншоты всех секций + модалки + мобильных вью в `/tmp/landing_*.png`. Открыть их через Read tool и визуально сверить. Адаптировать скрипт под новые секции — добавлять id в список `sections`.

Для CSS-отладки по правилам `~/.claude/CLAUDE.md` (инжект рамок, перебор styleSheets) — использовать Playwright `page.evaluate()`.

## Git-флоу

- Работаем в `main` напрямую (одиночный проект, PR не нужны)
- Сообщения коммитов на русском, структурированно: `feat:`, `fix:`, `chore:`
- Coauthor-тег: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
- После пуша GitHub Pages обновляется автоматически (~30 сек)

## Что НЕ делать

- **Не добавлять сборщики** (vite/webpack/npm). Проект должен работать открытием `index.html` в браузере.
- **Не переписывать на фреймворк** (React/Vue). Архитектура простая специально.
- **Не менять BEM** на utility-CSS (Tailwind). Стили сейчас читаются сверху вниз без борьбы со спецификой.
- **Не трогать `~/.claude/CLAUDE.md` правило** про Playwright для визуальной отладки — использовать его.
