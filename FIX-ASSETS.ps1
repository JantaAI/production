# Fix Assets Script - Copy all required images and push to GitHub
# Run this: .\FIX-ASSETS.ps1

$ErrorActionPreference = 'Stop'

Write-Host "=== Fixing Missing Assets ===" -ForegroundColor Cyan
Write-Host ""

# Required files from code analysis
$requiredFiles = @(
    "Logo Janta.png",
    "clip.png",
    "mic (4).png",
    "arrow.png",
    "5917bfa10402943b0f061dd2b5e720d71c67964c.png",
    "8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png",
    "46768b18ab068fb9bc1afac1f2178cd51000d120.png",
    "consultation (1).png",
    "doctor (1).png",
    "report (1).png"
)

# Ensure directory exists
$dest = "public\assets"
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
    Write-Host "Created $dest directory" -ForegroundColor Green
}

# Copy ALL PNG files from both sources
Write-Host "[1/5] Copying all PNG files..." -ForegroundColor Yellow

$source1 = "designs\Files\Files"
$source2 = "designs\Janta\src\assets"
$copied = 0

# Copy from first source
if (Test-Path $source1) {
    Get-ChildItem "$source1\*.png" | ForEach-Object {
        Copy-Item $_.FullName -Destination "$dest\$($_.Name)" -Force
        Write-Host "  ✓ $($_.Name)" -ForegroundColor Gray
        $copied++
    }
}

# Copy from second source
if (Test-Path $source2) {
    Get-ChildItem "$source2\*.png" | ForEach-Object {
        Copy-Item $_.FullName -Destination "$dest\$($_.Name)" -Force
        Write-Host "  ✓ $($_.Name)" -ForegroundColor Gray
        $copied++
    }
}

Write-Host "  Total files copied: $copied" -ForegroundColor Green

# Verify required files exist
Write-Host ""
Write-Host "[2/5] Verifying required files..." -ForegroundColor Yellow
$missing = @()
foreach ($file in $requiredFiles) {
    if (Test-Path "$dest\$file") {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ MISSING: $file" -ForegroundColor Red
        $missing += $file
    }
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "ERROR: Missing required files:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    exit 1
}

# Check total files
$total = (Get-ChildItem "$dest\*.png" -ErrorAction SilentlyContinue).Count
Write-Host ""
Write-Host "Total PNG files in destination: $total" -ForegroundColor Cyan

# Add to git
Write-Host ""
Write-Host "[3/5] Adding files to git..." -ForegroundColor Yellow
git add -f public/assets/*.png
$status = git status --short public/
if ($status) {
    Write-Host "  Files staged:" -ForegroundColor Green
    $status | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
} else {
    Write-Host "  ⚠ No changes to stage" -ForegroundColor Yellow
}

# Commit
Write-Host ""
Write-Host "[4/5] Committing..." -ForegroundColor Yellow
git commit -m "Add all design assets - fix missing buttons and images" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    $commit = git log --oneline -1
    Write-Host "  ✓ Committed: $commit" -ForegroundColor Green
} else {
    Write-Host "  ⚠ No changes to commit" -ForegroundColor Yellow
}

# Push
Write-Host ""
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
$pushOutput = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Push successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== SUCCESS ===" -ForegroundColor Green
    Write-Host "Check GitHub: https://github.com/JantaAI/production/tree/main/public/assets" -ForegroundColor Cyan
    Write-Host "Vercel will auto-deploy. Check: https://production-weld-delta.vercel.app/" -ForegroundColor Cyan
} else {
    Write-Host "  ✗ Push failed!" -ForegroundColor Red
    Write-Host $pushOutput -ForegroundColor Red
    exit 1
}
