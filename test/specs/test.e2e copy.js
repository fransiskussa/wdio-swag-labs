const { remote } = require('webdriverio');
const allure = require("@wdio/allure-reporter").default;

describe('Swag_Labs App Automation', () => {
    let driver;

    before(async () => {
        driver = await remote({
            hostname: '127.0.0.1',
            port: 4723,
            path: '/',
            capabilities: {
            platformName: "Android",
            "appium:deviceName": "GIZPKF6TOFVWW4IV",
            "appium:platformVersion": "14",
            "appium:app": "C:\\wdio-swag-labs\\apk\\Swag_Labs_Mobile_Appcom.swaglabsmobileappv2.7.1.apk",
            "appium:appPackage": "com.swaglabsmobileapp",
            "appium:appActivity": "com.swaglabsmobileapp.SplashActivity",
            "appium:automationName": "UiAutomator2",
            "appium:noReset": false,
            "appium:fullReset": true,
            "appium:newCommandTimeout": 3600,
            "appium:implicitWait": 3000 
            }
        });
    });

    

    // beforeEach(async () => {
    //     console.log("⏳ Menunggu 1 detik sebelum setiap langkah...");
    //     await driver.pause(8000); // Delay sebelum setiap `it()`
    // });

    it('User completes a full purchase flow', async () => {
        try {
            const el2 = await driver.$("accessibility id:test-Username");
            await el2.addValue("standard_user");
            
            const el3 = await driver.$("accessibility id:test-Password");
            await el3.addValue("secret_sauce");
            
            const el4 = await driver.$("accessibility id:test-LOGIN");
            await el4.click();
            
            const el5 = await driver.$("-android uiautomator:new UiSelector().description(\"test-ADD TO CART\").instance(0)");
            await el5.click();
            
            const el6 = await driver.$("accessibility id:test-ADD TO CART");
            await el6.click();
            
                await driver.action('pointer')
                .move({ duration: 0, x: 869, y: 1953 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 850, y: 518 })
                .up({ button: 0 })
                .perform();
            
            const el7 = await driver.$("-android uiautomator:new UiSelector().description(\"test-ADD TO CART\").instance(2)");
            await el7.click();
            
            const el8 = await driver.$("accessibility id:test-REMOVE");
            await el8.click();
            
            const el9 = await driver.$("-android uiautomator:new UiSelector().description(\"test-ADD TO CART\").instance(3)");
            await el9.click();
                      
            const el10 = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.ImageView\").instance(3)");
            await el10.click();
            
            const el11 = await driver.$("-android uiautomator:new UiSelector().description(\"test-REMOVE\").instance(0)");
            await el11.click();
            
            await driver.action('pointer')
                .move({ duration: 0, x: 952, y: 1753 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 845, y: 435 })
                .up({ button: 0 })
                .perform();
            
            const el12 = await driver.$("accessibility id:test-CHECKOUT");
            await el12.click();
            
            const el13 = await driver.$("accessibility id:test-First Name");
            await el13.addValue("Fransiskus Andika Indriawan");
            
            const el14 = await driver.$("accessibility id:test-Last Name");
            await el14.addValue("-");

            const el15 = await driver.$("accessibility id:test-Zip/Postal Code");
            await el15.addValue("50711");

            const el16 = await driver.$("accessibility id:test-CONTINUE");
            await el16.click();
            

            await driver.pause(2000); 

                     await driver.action('pointer')
                .move({ duration: 0, x: 820, y: 2334 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 903, y: 122 })
                .up({ button: 0 })
                .perform();
            

            const el17 = await driver.$("accessibility id:test-FINISH");
            await el17.click();

            const el18 = await driver.$("accessibility id:test-BACK HOME");
            await el18.click();

            
            allure.addTestId('TC001');

        } catch (error) {
            let severity = 'minor';

            if (error.message.includes("element wasn't found") || 
                error.message.includes("session not created") || 
                error.message.includes("invalid session id")) {
                severity = 'critical';  // Kesalahan fatal, tes tidak bisa dilanjutkan
            } else if (error.message.includes("element click intercepted") || 
                    error.message.includes("stale element reference") || 
                    error.message.includes("timeout") || 
                    error.message.includes("invalid element state")) {
                severity = 'major';  // Masalah besar yang mempengaruhi eksekusi tes
            } else if (error.message.includes("assertion failed") || 
                    error.message.includes("element not interactable") || 
                    error.message.includes("javascript error")) {
                severity = 'minor';  // Masalah validasi atau tampilan
            } else if (error.message.includes("no such window") || 
                    error.message.includes("no such frame") || 
                    error.message.includes("unexpected alert open")) {
                severity = 'moderate';  // Masalah sedang, tapi masih bisa ditangani
            } else {
                severity = 'trivial';  // Masalah ringan atau tidak berdampak besar
            }

            allure.addTestId('TC001');
            allure.addSeverity(severity);
            allure.addIssue('ISSUE-1234');

            allure.addStep(`Test Failed - Severity: ${severity}`, {
                status: "failed",
                message: error.message
            });

            throw error;
        }
    });

    // after(async () => {
    //     await driver.deleteSession();
    // });
});
