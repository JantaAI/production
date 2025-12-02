# GitHub Push Setup - JantaAI/production

This repository is configured to ensure reliable pushes to GitHub.

## Quick Push Script

Use `push-to-github.ps1` to automatically:
1. Create `public/assets` directory
2. Copy all PNG files from design folders
3. Add files to git
4. Commit changes
5. Push to GitHub with verification

### Usage

```powershell
.\push-to-github.ps1
```

## Git Alias

A git alias `push-verify` has been configured. Use it like:

```powershell
git push-verify
```

This will push and verify the push succeeded.

## Manual Steps

If you need to do it manually:

```powershell
# 1. Create directory and copy files
New-Item -ItemType Directory -Force -Path "public\assets" | Out-Null
Get-ChildItem "designs\Files\Files\*.png" | ForEach-Object { Copy-Item $_.FullName -Destination "public\assets\$($_.Name)" -Force }
Get-ChildItem "designs\Janta\src\assets\*.png" | ForEach-Object { Copy-Item $_.FullName -Destination "public\assets\$($_.Name)" -Force }

# 2. Add, commit, and push
git add public/
git commit -m "Your commit message"
git push origin main

# 3. Verify
git log --oneline -3
```

## Repository Info

- **Remote**: https://github.com/JantaAI/production.git
- **Branch**: main
- **Public Assets**: https://github.com/JantaAI/production/tree/main/public
