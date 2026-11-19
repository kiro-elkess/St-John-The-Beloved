@echo off
echo ============================================================
echo Logging in to Firebase (Google Account)...
echo ============================================================
call npx firebase-tools login --reauth
echo.
pause