# Manual Push Script - Run this in PowerShell
# This will copy files, commit, and push to GitHub

Write-Host "=== Manual GitHub Push ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Copy files manually (you'll see output)
Write-Host "[1/4] Copying PNG files..." -ForegroundColor Yellow
$source1 = "designs\Files\Files"
$source2 = "designs\Janta\src\assets"
$dest = "public\assets"

# Ensure directory exists
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

# Copy from first source
if (Test-Path $source1) {
    Get-ChildItem "$source1\*.png" | ForEach-Object {
        Copy-Item $_.FullName -Destination "$dest\$($_.Name)" -Force
        Write-Host "  Copied: $($_.Name)" -ForegroundColor Green
    }
}

# Copy from second source
if (Test-Path $source2) {
    Get-ChildItem "$source2\*.png" | ForEach-Object {
        Copy-Item $_.FullName -Destination "$dest\$($_.Name)" -Force
        Write-Host "  Copied: $($_.Name)" -ForegroundColor Green
    }
}

# Verify
$count = (Get-ChildItem "$dest\*.png" -ErrorAction SilentlyContinue).Count
Write-Host "  Total PNG files: $count" -ForegroundColor Cyan

if ($count -eq 0) {
    Write-Host "  ERROR: No files found! Check source directories." -ForegroundColor Red
    exit 1
}

# Step 2: Add to git
Write-Host ""
Write-Host "[2/4] Adding files to git..." -ForegroundColor Yellow
git add -f public/assets/*.png
git status --short public/

# Step 3: Commit
Write-Host ""
Write-Host "[3/4] Committing..." -ForegroundColor Yellow
git commit -m "Add all design assets to public/assets directory"

# Step 4: Push
Write-Host ""
Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Check: https://github.com/JantaAI/production/tree/main/public/assets" -ForegroundColor Cyan
