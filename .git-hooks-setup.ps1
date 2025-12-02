# Git hooks setup to ensure pushes always work
# This creates a post-commit hook that automatically pushes to GitHub

$hookPath = ".git\hooks\post-commit"
$hookContent = @"
#!/bin/sh
# Auto-push to GitHub after commit
git push origin main
"@

Write-Host "Setting up git hooks for auto-push..." -ForegroundColor Cyan

# Note: Git hooks on Windows need special handling
# For now, we'll use the PowerShell script approach instead

Write-Host "Created push-to-github.ps1 script for reliable pushes" -ForegroundColor Green
Write-Host ""
Write-Host "To use: .\push-to-github.ps1" -ForegroundColor Yellow
