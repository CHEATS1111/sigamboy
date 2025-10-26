@echo off
REM Скрипт для автоматической загрузки изменений на GitHub

echo Добавление всех измененных файлов...
git add .

echo Коммит изменений...
git commit -m "Автоматическое обновление: %date% %time%"

echo Отправка изменений на GitHub...
git push origin main

echo Готово! Изменения загружены на GitHub.

pause

