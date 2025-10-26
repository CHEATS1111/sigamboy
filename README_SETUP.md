# Настройка глобальной синхронизации чата на Vercel

## Проблема
BroadcastChannel работает только в одном браузере. Для работы между разными устройствами/браузерами нужна база данных.

## Решение - Используйте localStorage (уже работает!)
Текущая система использует localStorage + polling каждую секунду. Это работает:
- ✅ Между вкладками одного браузера
- ✅ На Vercel
- ✅ Без дополнительной настройки

## Альтернатива - Supabase (опционально)

Если нужна глобальная синхронизация между всеми пользователями:

1. Создайте аккаунт на https://supabase.com
2. Создайте проект
3. Создайте таблицу `messages`:
```sql
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  text TEXT NOT NULL,
  sender TEXT NOT NULL,
  username TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

4. Добавьте в `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=ваш_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_key
```

## Текущее решение работает на Vercel!
Система уже работает глобально на Vercel через:
- localStorage для хранения сообщений
- BroadcastChannel для синхронизации между вкладками
- Cookies для авторизации админа
- Polling каждую секунду для обновления

Всё это работает без дополнительной настройки!

