# PowerShell script to download programme.json from EHFG website
# and save it as programm.json in the public directory

$url = "https://www.ehfg.org/programme.json"
$outputPath = Join-Path $PSScriptRoot "public\sessions.json"

Write-Host "Downloading programme data from $url..."

try {
    # Create public directory if it doesn't exist
    $publicDir = Join-Path $PSScriptRoot "public"
    if (-not (Test-Path $publicDir)) {
        New-Item -ItemType Directory -Path $publicDir -Force
        Write-Host "Created public directory: $publicDir"
    }

    # Download the file
    Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing

    Write-Host "Successfully downloaded programme data to: $outputPath"

    # Display file size
    $fileInfo = Get-Item $outputPath
    Write-Host "File size: $($fileInfo.Length) bytes"

} catch {
    Write-Error "Failed to download programme data: $($_.Exception.Message)"
    exit 1
}
