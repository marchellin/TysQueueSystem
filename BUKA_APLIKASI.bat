@echo off
echo Membuka Sistem Antrian Taeyang Sung...

:: Mencoba buka pakai Google Chrome dalam mode Aplikasi (tanpa tab/URL bar)
start chrome --app="%~dp0index.html"

:: Jika Chrome tidak ada, coba pakai Microsoft Edge
if %errorlevel% neq 0 (
    start msedge --app="%~dp0index.html"
)

:: Jika dua-duanya gagal, buka normal pakai browser bawaan
if %errorlevel% neq 0 (
    start "" "%~dp0index.html"
)

exit
