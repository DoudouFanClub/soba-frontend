@echo off
:: Launch Command Prompt and run vite
start cmd /k "npm run dev -o"

:: Wait a moment to ensure vite starts
rem timeout /t 5 /nobreak

:: Wait for the user to press a key before closing the script
pause