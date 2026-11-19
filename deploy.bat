@echo off
echo ============================================================
echo Deploying to https://st-john-the-beloved.web.app ...
echo ============================================================

REM 1. Clear any corrupt local Firebase cache
if exist .firebase (
    echo Clearing old cache...
    rmdir /s /q .firebase
)

REM 2. Run deploy
call npx firebase-tools deploy --only hosting --project st-john-the-beloved

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ============================================================
    echo If you see a connection or request error above:
    echo 1. Check your internet connection or disconnect VPN.
    echo 2. Try refreshing your login by running in PowerShell:
    echo       npx firebase-tools login --reauth
    echo 3. Make sure Hosting is enabled in Firebase Console:
    echo       https://console.firebase.google.com/project/st-john-the-beloved/hosting
    echo ============================================================
)

echo.
pause
