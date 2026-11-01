@echo off
title VASTUKRUTA Architecture Platform Starter
echo ========================================================
echo   VASTUKRUTA - AR. PRANALI GHORPADE STUDIO LAUNCHER
echo ========================================================
echo.
echo 1. Starting Backend Express Server (Port 5000)...
start "Vastukruta API Server (Port 5000)" cmd /k "cd /d \"%~dp0server\" && npm start"

echo 2. Starting Frontend React Client (Port 5173)...
start "Vastukruta Web Client (Port 5173)" cmd /k "cd /d \"%~dp0client\" && npm run dev"

echo.
echo ========================================================
echo   Vastukruta servers launched successfully!
echo.
echo   Public Studio Website:  http://localhost:5173
echo   Admin Architect Portal: http://localhost:5173/admin/login
echo   Backend REST API:       http://localhost:5000/api
echo   Health Status:          http://localhost:5000/api/health
echo ========================================================
echo.
timeout /t 3 >nul
