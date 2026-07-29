const BasePage = require('../components/BasePage');
const HomePageComponents = require('../components/HomePage.components');

class HomePage extends BasePage{

    async open() {
        await super.open(
            'https://practicesoftwaretesting.com/'
        );
    }


    async getCurrentLanguage() {
        return await this.getText(HomePageComponents.languageDropdown);
    }

    async searchForHammerProduct(product) {

        await HomePageComponents.searchInput.setValue(product);
        await this.waitForElement(HomePageComponents.searchButton);
        await this.click(HomePageComponents.searchButton);

        await browser.waitUntil(async () => {
            try {
                const titles = await this.getProductTitles();
                return titles.length > 0 &&
                    titles.every(title =>
                        title.toLowerCase().includes(product.toLowerCase())
                    );
            } catch (err) {
                return false; // list still updating, try again next interval
            }
        }, {
            timeout: 5000,
            interval: 250,
            timeoutMsg: `Search results for "${product}" did not stabilize in time`
        });
    }

    async searchForProduct(product) {

        await this.type(HomePageComponents.searchInput, product);
        await this.click(HomePageComponents.searchButton);

        await browser.waitUntil(async () => {
            const products = await HomePageComponents.productCards;

            if (products.length !== 1) {
                return false;
            }

            const text = await products[0].getText();
            return text === product;

        }, {
            timeout: 10000,
            timeoutMsg: `Product "${product}" was not found`
        });
    }


    async changeLanguageToSpanish() {

        await HomePageComponents.languageDropdown.click();

        await HomePageComponents.spanishLanguage.click();

        await HomePageComponents.homeTextTranslate.waitUntil(
            async function () {
                return (await this.getText()) === 'Inicio';
            },
            {
                timeout: 5000
            }
        );
    }

    async getProductTitles() {

        const titles = [];

        const products = await HomePageComponents.productTitles;

        for (const product of products) {

            titles.push(await product.getText());

        }

        return titles;

    }

    async setPriceRange() {

        await this.waitForElement(HomePageComponents.priceFilterMin);

        await this.waitForElement(HomePageComponents.priceFilterMax);

        await HomePageComponents.priceFilterMin.dragAndDrop({
            x: 68,
            y: 0
        });

        await HomePageComponents.priceFilterMax.dragAndDrop({
            x: 1,
            y: 0
        });

    }

    async getProductPrices() {

        await browser.waitUntil(async () => {

            const products = await HomePageComponents.productPrices;

            return products.length > 0 &&
            await products[0].isDisplayed();

    }, {
            timeout: 10000,
            timeoutMsg: 'Product prices were not loaded'
        });

        const prices = [];

        const elements = await HomePageComponents.productPrices;

        await this.waitForElements(HomePageComponents.productPrices);

        for (const element of elements) {

            const value = await element.getText();

            prices.push(
                parseFloat(
                    value.replace('$', '')
                )
            );

        }

        return prices;
    
    }

    async getMinimumPriceValue() {

        return await HomePageComponents.priceFilterMin.getAttribute('aria-valuenow');

    }


    async getMaximumPriceValue() {

        return await HomePageComponents.priceFilterMax.getAttribute('aria-valuenow');

    }

    async openProductByName(name) {

    const products = await HomePageComponents.productCards;

    for (const product of products) {

        if ((await product.getText()) === name) {
            await product.click();
            return;
        }

    }

    throw new Error(`Product "${name}" not found`);
}


    async addProductToCompare(index) {
    const button = await HomePageComponents.compareButtons[index];

    await button.waitForDisplayed({ timeout: 5000 });
    await button.waitForClickable();
    await button.click();
    await this.waitForElement(HomePageComponents.compareNowLink);
    }

    async goToComparison() {
        await HomePageComponents.compareNowLink.click();
    }

    async sortByPriceLowToHigh() {
        await HomePageComponents.sortDropdown.selectByAttribute('value', 'price,asc');
    }

    async arePricesSortedAscending() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        return JSON.stringify(prices) === JSON.stringify(sorted);

    }

    async waitForStableProductList(selector = 'span[data-test="product-price"]', timeout = 5000) {
    let previousCount = -1;
    let stableSince = Date.now();

    await browser.waitUntil(async () => {
        const elements = await $$(selector);
        const currentCount = elements.length;

        if (currentCount !== previousCount) {
            previousCount = currentCount;
            stableSince = Date.now();
            return false; 
        }

        return Date.now() - stableSince > 500;
    }, { timeout, timeoutMsg: 'Product list never stabilized' });
}

}

module.exports = new HomePage();