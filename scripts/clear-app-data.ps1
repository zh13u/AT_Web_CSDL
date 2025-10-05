# Script to clear all Next.js and browser data

Write-Host "🧹 Clearing Next.js Application Data..." -ForegroundColor Yellow

# 1. Clear Next.js build cache
Write-Host "`n📁 Clearing .next directory..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "✅ .next cleared" -ForegroundColor Green
}
else {
    Write-Host "⚠️ .next not found" -ForegroundColor Yellow
}

# 2. Clear node_modules/.cache
Write-Host "`n📁 Clearing node_modules cache..." -ForegroundColor Cyan
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache" -ErrorAction SilentlyContinue
    Write-Host "✅ node_modules/.cache cleared" -ForegroundColor Green
}

# 3. Clear TypeScript cache
Write-Host "`n📁 Clearing TypeScript cache..." -ForegroundColor Cyan
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item -Force "tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue
    Write-Host "✅ tsconfig.tsbuildinfo cleared" -ForegroundColor Green
}

Write-Host "`n✨ Cache cleared successfully!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Clear browser storage (F12 > Application > Storage > Clear site data)" -ForegroundColor White
Write-Host "2. Run: pnpm dev" -ForegroundColor White
Write-Host "3. Open browser in Incognito mode (Ctrl+Shift+N)" -ForegroundColor White
