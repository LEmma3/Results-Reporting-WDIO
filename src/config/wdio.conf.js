const { ReportAggregator } = require('wdio-html-nice-reporter');

let reportAggregator;

exports.config = {

    runner: 'local',
    specs: [
       '../test/specs/**/*.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],

    before: async function (capabilities, specs) {
        await browser.setWindowSize(1920, 1080);
    },


    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: [
        'spec',
        ['html-nice', {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Automation Report',
            linkScreenshots: true,
            showInBrowser: true,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],

    onPrepare: function (config, capabilities) {
        reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Test Automation Master Report',
            browserName: capabilities.browserName,
            collapseTests: true
        });
        reportAggregator.clean();
    },

    onComplete: function () {
        return reportAggregator.createReport();
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
