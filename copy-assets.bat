@echo off
cd /d "D:\cursor Projects\janta"
if not exist "public\assets" mkdir "public\assets"
xcopy /Y "designs\Files\Files\*.png" "public\assets\"
xcopy /Y "designs\Janta\src\assets\*.png" "public\assets\"
dir /b "public\assets\*.png" | find /c ".png"
