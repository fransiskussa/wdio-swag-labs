const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const inputFolder = 'allure-results'; // Folder tempat file JSON disimpan
const outputFolder = 'report-excel'; // Folder tujuan
const outputFile = path.join(outputFolder, 'allure-results.xlsx'); // Path lengkap file output


let allSteps = [];

// Fungsi untuk memformat tanggal ke "DD-MM-YYYY HH:mm:ss"
const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

fs.readdirSync(inputFolder).forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(inputFolder, file);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (jsonData.steps) {
            jsonData.steps.forEach(step => {
                allSteps.push({
                    "Test Case": jsonData.name || "Unknown",
                    "Nama Langkah": step.name,
                    "Status": step.status,
                    "Waktu Mulai": formatDate(step.start),
                    "Waktu Selesai": formatDate(step.stop),
                    "Durasi (ms)": step.stop - step.start,
                    // "File Sumber": file  // Nama file sumber
                });
            });
        }
    }
});

// Buat workbook dan worksheet
const worksheet = XLSX.utils.json_to_sheet(allSteps);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Allure Test Results");

// Simpan ke file Excel
XLSX.writeFile(workbook, outputFile);

console.log(`🎉 Semua JSON telah dikonversi ke Excel: ${outputFile}`);
