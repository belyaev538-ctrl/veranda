# VERANDARU Yacht Edition — Вариант 4 (`/v4`)

Полное ТЗ от заказчика + статус реализации в коде.

**URL:** http://localhost:3000/v4  
**Контент:** `lib/v4-content.ts`  
**UI:** `components/v4/*`

---

## Статус реализации

| Блок | ТЗ | В коде |
|------|-----|--------|
| 0 Intro компас | ✓ | ✓ (общий компонент, ключ `v4`) |
| 1 Hero | ✓ | ✓ |
| 2 Statement | ✓ | ✓ |
| 3 Who we are | ✓ | ✓ |
| 4 What we create | ✓ | ✓ |
| 5 Yacht areas (7 карточек, гориз. лента) | ✓ | ✓ |
| 6 Custom projects | ✓ | ✓ |
| 7 Visualization | ✓ | ✓ |
| 8 Collections (6, гориз. лента) | ✓ | ✓ |
| 9 Materials 2×3 | ✓ | ✓ |
| 10 Private / NDA | ✓ | ✓ |
| 11 Why VERANDARU | ✓ | ✓ |
| 12 FAQ accordion | ✓ | ✓ |
| 13 Gallery + lightbox | ✓ | ✓ |
| 14 Final CTA | ✓ | ✓ |
| 15 Footer | ✓ | ✓ |

**Доработать позже:** scroll-hijack для горизонтальных секций (GSAP pin), magnetic buttons, отдельные фото `public/images/v4/`, видео hero, загрузка файла в форме.

---

## Цвета (CSS variables)

```css
--v4-dark: #020B1F;
--v4-deep: #031A33;
--v4-sea: #6FAFC8;
--v4-cyan: #8FBFD0;
--v4-sand: #C9B596;
--v4-milk: #F4F1EA;
```

## Шрифты

- Заголовки: Cormorant Garamond (`--font-v4-serif`)
- Текст: Inter (`--font-v4-sans`)

## Кнопки

Контур `muted-cyan`, `border-radius: 999px`, hover — заливка cyan, текст dark.

---

## Формула страницы (один вопрос = один блок)

1. Что это за мир? → Hero  
2. Кто мы? → Who we are  
3. Что создаём? → Spaces  
4. Где на яхте? → Yacht Areas  
5. Как под проект? → Custom  
6. Визуализация заранее? → Visualization  
7. Коллекции? → Collections  
8. Материалы? → Materials  
9. Почему мало фото? → NDA  
10. Почему доверять? → Why  
11. Вопросы? → FAQ  
12. Контакт? → Final CTA  

**Итог:** «мы создаём вашу личную зону отдыха на воде», не каталог мебели.

---

Полный текст блоков (заголовки, FAQ, карточки зон) — в `lib/v4-content.ts`.
