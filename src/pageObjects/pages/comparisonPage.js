const BasePage = require("../components/BasePage");
const ComparisonPageComponents = require('../components/ComparisonPage.components');

class ComparisonPage extends BasePage{

    async open() {
        await browser.url('/comparison');
    }

    async isDisplayed() {
        return await ComparisonPageComponents.table.isDisplayed();
    }

    async getProductNamesText() {
        const names = [];
        for (const el of await ComparisonPageComponents.productNames) {
            names.push(await el.getText());
        }
        return names;
    }

    async getPrices() {
        const prices = [];

        for (const price of await ComparisonPageComponents.prices) {
            prices.push(
                parseFloat(
                    (await price.getText()).replace('$', '')
                )
            );
        }

        return prices;
    }
}

module.exports = new ComparisonPage();