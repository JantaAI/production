# Copy assets and push to GitHub
$ErrorActionPreference = 'Stop'
$logFile = "copy-log.txt"

function Log-Message {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

Log-Message "Starting copy and push process..."

# Step 1: Verify source files exist
$src1 = "D:\cursor Projects\janta\designs\Files\Files"
$src2 = "D:\cursor Projects\janta\designs\Janta\src\assets"
$dest = "D:\cursor Projects\janta\public\assets"

Log-Message "Source 1 exists: $(Test-Path $src1)"
Log-Message "Source 2 exists: $(Test-Path $src2)"
Log-Message "Destination exists: $(Test-Path $dest)"

# Step 2: Get all PNG files
$files1 = @()
$files2 = @()

if (Test-Path $src1) {
    $files1 = Get-ChildItem "$src1\*.png" -ErrorAction SilentlyContinue
    Log-Message "Found $($files1.Count) files in source 1"
}

if (Test-Path $src2) {
    $files2 = Get-ChildItem "$src2\*.png" -ErrorAction SilentlyContinue
    Log-Message "Found $($files2.Count) files in source 2"
}

# Step 3: Copy files
$allFiles = $files1 + $files2
Log-Message "Total files to copy: $($allFiles.Count)"

foreach ($file in $allFiles) {
    $destPath = Join-Path $dest $file.Name
    try {
        Copy-Item $file.FullName -Destination $destPath -Force
        Log-Message "Copied: $($file.Name)"
    } catch {
        Log-Message "ERROR copying $($file.Name): $_"
    }
}

# Step 4: Verify copied files
Start-Sleep -Seconds 2
$copiedFiles = Get-ChildItem "$dest\*.png" -ErrorAction SilentlyContinue
Log-Message "Files in destination: $($copiedFiles.Count)"
foreach ($f in $copiedFiles) {
    Log-Message "  - $($f.Name) ($($f.Length) bytes)"
}

# Step 5: Git operations
Set-Location "D:\cursor Projects\janta"
Log-Message "Current directory: $(Get-Location)"

if ($copiedFiles.Count -gt 0) {
    Log-Message "Adding files to git..."
    git add -f "public/assets/*.png" 2>&1 | Out-String | ForEach-Object { Log-Message "git add: $_" }
    
    $status = git status --short public/ 2>&1
    Log-Message "Git status:"
    $status | ForEach-Object { Log-Message "  $_" }
    
    if ($status) {
        Log-Message "Committing..."
        git commit -m "Add all design assets to public/assets" 2>&1 | Out-String | ForEach-Object { Log-Message "git commit: $_" }
        
        Log-Message "Pushing to GitHub..."
        $pushOutput = git push origin main 2>&1 | Out-String
        Log-Message "git push output: $pushOutput"
        
        Log-Message "Latest commit:"
        git log --oneline -1 | ForEach-Object { Log-Message "  $_" }
    } else {
        Log-Message "No files to commit"
    }
} else {
    Log-Message "ERROR: No files were copied!"
}

Log-Message "Process complete. Check $logFile for details."
