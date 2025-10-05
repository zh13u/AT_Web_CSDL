# Script PowerShell để update tất cả getImage() calls trong mockData.ts
# Chạy từ thư mục gốc project

$file = "lib/mockData.ts"
$content = Get-Content $file -Raw

# Replace tất cả getImage() với slug
$replacements = @{
    'getImage\("Apple", "iPhone 15 Pro Max"\)'              = 'getImage("iphone-15-pro-max", "Apple")'
    'getImage\("Apple", "iPhone 15 Pro"\)'                  = 'getImage("iphone-15-pro", "Apple")'
    'getImage\("Apple", "iPhone 15 Plus"\)'                 = 'getImage("iphone-15-plus", "Apple")'
    'getImage\("Apple", "iPhone 15"\)'                      = 'getImage("iphone-15", "Apple")'
    'getImage\("Apple", "iPhone 14 Pro Max"\)'              = 'getImage("iphone-14-pro-max", "Apple")'
    'getImage\("Apple", "iPhone 14"\)'                      = 'getImage("iphone-14", "Apple")'
    'getImage\("Samsung", "Galaxy S24 Ultra"\)'             = 'getImage("samsung-galaxy-s24-ultra", "Samsung")'
    'getImage\("Samsung", "Galaxy S24 Plus"\)'              = 'getImage("samsung-galaxy-s24-plus", "Samsung")'
    'getImage\("Samsung", "Galaxy S24"\)'                   = 'getImage("samsung-galaxy-s24", "Samsung")'
    'getImage\("Samsung", "Galaxy Z Fold5"\)'               = 'getImage("samsung-galaxy-z-fold5", "Samsung")'
    'getImage\("Samsung", "Galaxy Z Flip5"\)'               = 'getImage("samsung-galaxy-z-flip5", "Samsung")'
    'getImage\("Samsung", "Galaxy A55"\)'                   = 'getImage("samsung-galaxy-a55", "Samsung")'
    'getImage\("Samsung", "Galaxy A35"\)'                   = 'getImage("samsung-galaxy-a35", "Samsung")'
    'getImage\("Samsung", "Galaxy M34"\)'                   = 'getImage("samsung-galaxy-m34", "Samsung")'
    'getImage\("Xiaomi", "Xiaomi 14 Ultra"\)'               = 'getImage("xiaomi-14-ultra", "Xiaomi")'
    'getImage\("Xiaomi", "Xiaomi 14"\)'                     = 'getImage("xiaomi-14", "Xiaomi")'
    'getImage\("Xiaomi", "Xiaomi 13T Pro"\)'                = 'getImage("xiaomi-13t-pro", "Xiaomi")'
    'getImage\("Xiaomi", "Redmi Note 13 Pro Plus"\)'        = 'getImage("xiaomi-redmi-note-13-pro-plus", "Xiaomi")'
    'getImage\("Xiaomi", "Redmi Note 13 Pro"\)'             = 'getImage("xiaomi-redmi-note-13-pro", "Xiaomi")'
    'getImage\("Xiaomi", "Redmi 13C"\)'                     = 'getImage("xiaomi-redmi-13c", "Xiaomi")'
    'getImage\("Xiaomi", "POCO X6 Pro"\)'                   = 'getImage("xiaomi-poco-x6-pro", "Xiaomi")'
    'getImage\("Xiaomi", "POCO F5"\)'                       = 'getImage("xiaomi-poco-f5", "Xiaomi")'
    'getImage\("OPPO", "Find X7 Ultra"\)'                   = 'getImage("oppo-find-x7-ultra", "OPPO")'
    'getImage\("OPPO", "Find N3"\)'                         = 'getImage("oppo-find-n3", "OPPO")'
    'getImage\("OPPO", "Reno11 Pro"\)'                      = 'getImage("oppo-reno11-pro", "OPPO")'
    'getImage\("OPPO", "A78"\)'                             = 'getImage("oppo-a78", "OPPO")'
    'getImage\("Vivo", "X100 Pro"\)'                        = 'getImage("vivo-x100-pro", "Vivo")'
    'getImage\("Vivo", "V29e"\)'                            = 'getImage("vivo-v29e", "Vivo")'
    'getImage\("Vivo", "Y36"\)'                             = 'getImage("vivo-y36", "Vivo")'
    'getImage\("Vivo", "Y17s"\)'                            = 'getImage("vivo-y17s", "Vivo")'
    'getProductGallery\("Apple", "iPhone 15 Pro Max", 5\)'  = 'getGallery("iphone-15-pro-max", "Apple", 5)'
    'getProductGallery\("Samsung", "Galaxy S24 Ultra", 5\)' = 'getGallery("samsung-galaxy-s24-ultra", "Samsung", 5)'
    'getProductGallery\("Xiaomi", "Xiaomi 14 Ultra", 5\)'   = 'getGallery("xiaomi-14-ultra", "Xiaomi", 5)'
    'getProductGallery\("OPPO", "Find X7 Ultra", 5\)'       = 'getGallery("oppo-find-x7-ultra", "OPPO", 5)'
}

foreach ($pattern in $replacements.Keys) {
    $content = $content -replace $pattern, $replacements[$pattern]
}

Set-Content $file -Value $content -NoNewline
Write-Host "✓ Updated all getImage() and getGallery() calls!"
