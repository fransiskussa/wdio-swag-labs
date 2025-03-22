exports.config = {
    maxInstances: 1,
    specs: ['./test/specs/test.e2e.js'],
    // specs: ['./test/specs/*.js'],
    capabilities: [{
        platformName: "Android",
                "appium:deviceName": "GIZPKF6TOFVWW4IV",
                "appium:platformVersion": "14",
                "appium:automationName": "UiAutomator2",
                
    }],
    framework: 'mocha',
    reporters: [
        ['allure', {
            outputDir: 'allure-results',  // Direktori penyimpanan hasil
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false
        }]
    ],
    services: ['appium'],
    mochaOpts: {
        timeout: 60000
    }
    
};
