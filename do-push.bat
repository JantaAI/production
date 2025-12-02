@echo off
cd /d "D:\cursor Projects\janta"
echo === Starting push process === > push-log.txt
echo. >> push-log.txt

echo Step 1: Creating directory >> push-log.txt
if not exist "public\assets" mkdir "public\assets" >> push-log.txt 2>&1

echo Step 2: Copying PNG files >> push-log.txt
xcopy /Y "designs\Files\Files\*.png" "public\assets\" >> push-log.txt 2>&1
xcopy /Y "designs\Janta\src\assets\*.png" "public\assets\" >> push-log.txt 2>&1

echo Step 3: Git add >> push-log.txt
git add -A public/ >> push-log.txt 2>&1

echo Step 4: Git status >> push-log.txt
git status --short >> push-log.txt 2>&1

echo Step 5: Git commit >> push-log.txt
git commit -m "Add design assets - %date% %time%" >> push-log.txt 2>&1

echo Step 6: Git push >> push-log.txt
git push origin main >> push-log.txt 2>&1

echo Step 7: Verification >> push-log.txt
git log --oneline -3 >> push-log.txt 2>&1

type push-log.txt
