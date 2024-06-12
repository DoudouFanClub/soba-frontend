@echo off
:: Launch Command Prompt and run vite
start cmd /k "npm run dev"

:: Wait a moment to ensure vite starts
timeout /t 5 /nobreak

:: Wait for the user to press a key before closing the script
pause