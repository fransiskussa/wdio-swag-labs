const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');

const inputFolder = 'allure-results';  // Folder input JSON
const outputFolder = 'xml-results';    // Folder output XML

// Pastikan folder output ada
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
    if (file.endsWith('.json')) {
        const jsonPath = path.join(inputFolder, file);
        const xmlPath = path.join(outputFolder, file.replace('.json', '.xml'));

        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

        const xmlObj = create({ version: '1.0' })
            .ele('AllureResults');

        Object.entries(jsonData).forEach(([key, value]) => {
            xmlObj.ele(key).txt(String(value));
        });

        fs.writeFileSync(xmlPath, xmlObj.end({ prettyPrint: true }), 'utf-8');

        console.log(`✅ ${file} berhasil dikonversi ke XML.`);
    }
});

console.log(`🎉 Semua file JSON telah dikonversi ke XML dalam folder '${outputFolder}'.`);