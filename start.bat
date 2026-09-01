@echo off
title NATLE & Hosma Ceylon Web Dev Server
color 0A
cls

echo ======================================================================
echo             NATLE & Hosma Ceylon Agri-Tech Web Engine
echo                  Starting Next.js 15+ Dev Server
echo ======================================================================
echo.

cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo [*] Installing project dependencies with npm...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [!] Failed to install dependencies. Please ensure Node.js is installed.
        pause
        exit /b 1
    )
)

echo [*] Starting Next.js development server...
echo [*] Website will be live at: http://localhost:3000
echo.
echo [*] Opening your browser in 3 seconds...
start "" timeout /t 3 /nobreak >nul & start http://localhost:3000

:: Run next dev
npm run dev

pause
