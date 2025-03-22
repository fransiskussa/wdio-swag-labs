const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const resultsDir = "./allure-results"; // Folder hasil Allure
const outputDir = "./report-excel"; // Folder output Excel
const excelFilePath = path.join(outputDir, "allure-test-results.xlsx");

// Pastikan folder `result-excel` ada, jika tidak, buat foldernya
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log("📂 Folder output:", outputDir);

// Cari semua file yang memiliki "-result.json" di namanya
const jsonFiles = fs.readdirSync(resultsDir)
    .filter(file => file.endsWith("-result.json"))
    .map(file => path.join(resultsDir, file));



console.log(`🔍 Ditemukan ${jsonFiles.length} file JSON.`);

if (jsonFiles.length === 0) {
    console.log("⚠️ Tidak ada file JSON yang ditemukan. Proses dihentikan.");
    process.exit(1); // Keluar dari script jika tidak ada file JSON
}

// Inisialisasi data Excel
const data = [
    ["TestId","UUID", "Test Case ID", "Name", "Status", "Start Time", "Stop Time", "Severity", "Error Message"]
];


// Baca dan proses setiap file JSON
jsonFiles.forEach(file => {
    console.log(`📄 Memproses: ${file}`);
    const jsonData = JSON.parse(fs.readFileSync(file, "utf8"));
    const tmsLabel = jsonData.labels.find(label => label.name === "tms");
    const tmsValue = tmsLabel ? tmsLabel.value : "N/A"; // Jika tidak ada, berikan "N/A"
    const severityLabel = jsonData.labels.find(label => label.name === "severity");
    const severity = severityLabel ? severityLabel.value : "N/A";
    data.push([
        tmsValue,
        jsonData.uuid,
        jsonData.testCaseId || "N/A",
        jsonData.name,
        jsonData.status,
        new Date(jsonData.start).toLocaleString(),
        new Date(jsonData.stop).toLocaleString(),
        severity,
        jsonData.statusDetails?.message || "N/A"
    ]);
});

// Buat worksheet dan workbook
const worksheet = xlsx.utils.aoa_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "Test Results");

// Simpan ke file Excel di `result-excel`
xlsx.writeFile(workbook, excelFilePath);
console.log(`✅ File Excel berhasil dibuat di: ${excelFilePath}`);

const jsonFiles2 = fs.readdirSync(resultsDir)
    .filter(file => file.endsWith(".json"))
    .map(file => path.join(resultsDir, file));
// Hapus semua file JSON setelah Excel dibuat
jsonFiles2.forEach(file => {
    try {
        fs.unlinkSync(file);
        console.log(`🗑️ Berhasil menghapus: ${file}`);
    } catch (error) {
        console.error(`❌ Gagal menghapus ${file}:`, error);
    }
});

console.log("✅ Semua file JSON berhasil dihapus.");
