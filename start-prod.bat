@echo off
TITLE NATLE Website Server (Production)

echo ===================================================
echo       NATLE Website - Production High-Speed Server
echo ===================================================

:: Ensure port 3000 is free
echo [INFO] Checking Port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [INFO] Freeing Port 3000 (Process ID: %%a)...
    taskkill /f /pid %%a >nul 2>&1
)

if not exist ".next\" (
    echo [INFO] Building optimized application...
    call npm run build
)

start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"
npm start

pause
