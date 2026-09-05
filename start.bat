@echo off
REM Bug Bounty Platform - Windows Quick Start Script
REM This script starts both backend and frontend servers

echo.
echo ========================================
echo   Bug Bounty Platform - Quick Start
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo [ERROR] Please run this script from the Bug-Bounty root directory
    pause
    exit /b 1
)

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    pause
    exit /b 1
)

echo [OK] Node.js detected
echo.

REM Install nodemon if needed
cd backend
findstr /C:"nodemon" package.json >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installing nodemon...
    call npm install --save-dev nodemon
)
cd ..

echo.
echo ========================================
echo   Starting Servers
echo ========================================
echo.
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in either window to stop
echo.

REM Start backend in new window
echo [INFO] Starting Backend API...
start "Bug Bounty Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo [INFO] Starting Frontend Server...
start "Bug Bounty Frontend" cmd /k "npx http-server -p 3000"

echo.
echo ========================================
echo   Servers Started!
echo ========================================
echo.
echo Backend:  http://localhost:4000/health
echo Frontend: http://localhost:3000
echo.
echo Two new windows have opened.
echo Close them to stop the servers.
echo.

pause
