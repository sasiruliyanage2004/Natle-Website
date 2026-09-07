@echo off
TITLE NATLE Website Server

echo ===================================================
echo            NATLE Website - Dev Server
echo ===================================================

if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    npm install
)

echo [INFO] Opening http://localhost:3000 in your browser...
start http://localhost:3000

echo [INFO] Starting Next.js development server on Port 3000...
npm run dev

pause
