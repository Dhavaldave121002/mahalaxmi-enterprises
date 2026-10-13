@echo off
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\bin;%PATH%"
cd /d "C:\Users\mahal\.gemini\antigravity-ide\scratch\mahalaxmi-enterprises"
echo ===================================================
echo Pushing Mahalaxmi Enterprises codebase to GitHub...
echo Repository: https://github.com/Dhavaldave121002/mahalaxmi-enterprises.git
echo ===================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo SUCCESS! Your code is now live on GitHub!
    echo Refresh your GitHub page to see all files.
    echo ===================================================
) else (
    echo ===================================================
    echo If prompted above, complete the GitHub sign-in.
    echo ===================================================
)
pause
