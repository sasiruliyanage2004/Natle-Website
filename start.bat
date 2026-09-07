@echo off
TITLE NATLE Website Server

echo ===================================================
echo            NATLE Website - Dev Server
echo ===================================================

if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    npm install
)

echo [INFO] Starting Next.js development server...
npm run dev

pause
