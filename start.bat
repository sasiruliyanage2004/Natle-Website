@echo off
TITLE NATLE Website Server

echo ===================================================
echo            NATLE Website - Local Server
echo ===================================================

:: Ensure port 3000 is free
echo [INFO] Checking Port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [INFO] Freeing Port 3000 - PID %%a
    taskkill /f /pid %%a >nul 2>&1
)

if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
)

echo [INFO] Starting Next.js server on http://localhost:3000...
echo [INFO] Waiting for the application to compile and become ready...

:: Background script to wait until http://localhost:3000 returns HTTP 200 before opening browser
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "while (1) { try { if ((Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { Start-Process 'http://localhost:3000'; break } } catch {} Start-Sleep -Milliseconds 800 }"

call npm run dev

pause
