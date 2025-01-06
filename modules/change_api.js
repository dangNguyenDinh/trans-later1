const fs = require('fs');
const path = require('path');
var dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Đường dẫn tới file .env


// Hàm thay đổi value của key
function change_api(key, newValue) {
    // Đọc nội dung file .env
    let envPath = path.resolve(__dirname, '../.env');
    let envData = fs.readFileSync(envPath, 'utf-8');
    const regex = new RegExp(`^(${key}=).*`, 'm'); // Tìm dòng chứa key cần thay đổi

    // Kiểm tra nếu key tồn tại
    if (regex.test(envData)) {
        // Cập nhật value  
        envData = envData.replace(regex, `$1${newValue}`);
        
    } else {
        return false;
    }

    process.env[key] = newValue;
    // Ghi lại nội dung mới vào file .env
    fs.writeFileSync(envPath, envData, 'utf-8');
    return true;
}

module.exports = change_api;
