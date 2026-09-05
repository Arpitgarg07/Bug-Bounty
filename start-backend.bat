@echo off
echo Starting Bug Bounty Backend Server...
cd backend
echo.
echo Checking environment...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit /b 1
)

echo Starting server on http://localhost:4000
echo.
npm run dev
