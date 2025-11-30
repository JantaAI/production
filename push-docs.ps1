# Push documentation to GitHub
Write-Host "=== Pushing Documentation to GitHub ===" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Set remote
Write-Host "Setting remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/JantaAI/production.git

# Check if file exists
if (Test-Path COMPLETE_PROJECT_DOCUMENTATION.md) {
    Write-Host "File found: COMPLETE_PROJECT_DOCUMENTATION.md" -ForegroundColor Green
} else {
    Write-Host "ERROR: File not found!" -ForegroundColor Red
    exit 1
}

# Stage file
Write-Host "Staging file..." -ForegroundColor Yellow
git add COMPLETE_PROJECT_DOCUMENTATION.md

# Commit
Write-Host "Committing..." -ForegroundColor Yellow
git commit -m "docs: Add comprehensive project documentation"

# Set branch
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Push
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "=== Done ===" -ForegroundColor Green

