# PowerShell script to ensure files are created, committed, and pushed to GitHub
# Usage: .\push-to-github.ps1

$ErrorActionPreference = 'Stop'

Write-Host "=== GitHub Push Script ===" -ForegroundColor Cyan
Write-Host "Repository: JantaAI/production" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create directory
Write-Host "[1/6] Creating public/assets directory..." -ForegroundColor Yellow
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
    Write-Host "  ✓ Created public directory" -ForegroundColor Green
}
if (-not (Test-Path "public\assets")) {
    New-Item -ItemType Directory -Path "public\assets" | Out-Null
    Write-Host "  ✓ Created public/assets directory" -ForegroundColor Green
} else {
    Write-Host "  ✓ Directory already exists" -ForegroundColor Green
}

# Step 2: Copy files
Write-Host "[2/6] Copying PNG files..." -ForegroundColor Yellow
$source1 = "designs\Files\Files"
$source2 = "designs\Janta\src\assets"
$dest = "public\assets"
$copied = 0

if (Test-Path $source1) {
    $files1 = Get-ChildItem "$source1\*.png" -ErrorAction SilentlyContinue
    foreach ($f in $files1) {
        Copy-Item $f.FullName -Destination "$dest\$($f.Name)" -Force
        $copied++
        Write-Host "  ✓ Copied: $($f.Name)" -ForegroundColor Gray
    }
}

if (Test-Path $source2) {
    $files2 = Get-ChildItem "$source2\*.png" -ErrorAction SilentlyContinue
    foreach ($f in $files2) {
        Copy-Item $f.FullName -Destination "$dest\$($f.Name)" -Force
        $copied++
        Write-Host "  ✓ Copied: $($f.Name)" -ForegroundColor Gray
    }
}

$total = (Get-ChildItem "$dest\*.png" -ErrorAction SilentlyContinue).Count
Write-Host "  ✓ Total files: $total" -ForegroundColor Green

if ($total -eq 0) {
    Write-Host "  ✗ ERROR: No files copied!" -ForegroundColor Red
    exit 1
}

# Step 3: Verify files
Write-Host "[3/6] Verifying files..." -ForegroundColor Yellow
if (-not (Test-Path "public\assets\Logo Janta.png")) {
    Write-Host "  ✗ ERROR: Logo Janta.png not found!" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Files verified" -ForegroundColor Green

# Step 4: Add to git
Write-Host "[4/6] Adding files to git..." -ForegroundColor Yellow
git add -f public/ 2>&1 | Out-Null
$status = git status --short public/ 2>&1
if ($status) {
    Write-Host "  ✓ Files staged:" -ForegroundColor Green
    $status | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
} else {
    Write-Host "  ⚠ No new files to stage (may already be committed)" -ForegroundColor Yellow
}

# Step 5: Commit
Write-Host "[5/6] Committing changes..." -ForegroundColor Yellow
$commitMsg = "Add all design assets to public/assets directory for Vercel deployment"
git commit -m $commitMsg 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    $latestCommit = git log --oneline -1
    Write-Host "  ✓ Commit successful: $latestCommit" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Commit skipped (no changes or already committed)" -ForegroundColor Yellow
}

# Step 6: Push
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Yellow
$pushOutput = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Push successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== Verification ===" -ForegroundColor Cyan
    Write-Host "Latest commits:" -ForegroundColor Yellow
    git log --oneline -3 | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    Write-Host ""
    Write-Host "Check GitHub: https://github.com/JantaAI/production/tree/main/public" -ForegroundColor Cyan
} else {
    Write-Host "  ✗ Push failed!" -ForegroundColor Red
    Write-Host $pushOutput -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Complete ===" -ForegroundColor Green
