@echo off
echo ============================================================
echo Deploying to https://st-john-the-beloved.web.app ...
echo ============================================================
call npx firebase-tools deploy --only hosting
echo.
pause
