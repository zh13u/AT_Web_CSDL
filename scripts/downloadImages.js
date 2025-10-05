/**
 * Script để tải ảnh sản phẩm từ mạng về local
 * Chạy: node scripts/downloadImages.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Danh sách ảnh cần tải
const images = [
    {
        url: 'https://source.unsplash.com/400x400/?iphone,smartphone',
        filename: 'iphone-15-pro-max.jpg'
    },
    {
        url: 'https://source.unsplash.com/400x400/?samsung,galaxy',
        filename: 'samsung-s24-ultra.jpg'
    },
    {
        url: 'https://source.unsplash.com/400x400/?xiaomi,smartphone',
        filename: 'xiaomi-14-ultra.jpg'
    },
    {
        url: 'https://source.unsplash.com/400x400/?oppo,smartphone',
        filename: 'oppo-find-x7.jpg'
    },
    {
        url: 'https://source.unsplash.com/400x400/?vivo,smartphone',
        filename: 'vivo-x100.jpg'
    },
];

// Tạo thư mục nếu chưa có
const publicDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Hàm download ảnh
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(publicDir, filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, (response) => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${filename}`);
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(filepath, () => { });
                console.error(`❌ Error downloading ${filename}:`, err.message);
                reject(err);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            console.error(`❌ Error downloading ${filename}:`, err.message);
            reject(err);
        });
    });
}

// Tải tất cả ảnh
async function downloadAll() {
    console.log('🚀 Starting download...\n');

    for (const image of images) {
        try {
            await downloadImage(image.url, image.filename);
            // Delay 500ms giữa mỗi request để tránh rate limit
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            // Continue với ảnh tiếp theo nếu có lỗi
        }
    }

    console.log('\n✨ Download completed!');
    console.log(`📁 Images saved to: ${publicDir}`);
}

downloadAll();
