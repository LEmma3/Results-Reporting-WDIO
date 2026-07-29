const BasePage = require("../components/BasePage");
const ProductPageComponents = require('../components/ProductPage.components');

class ProductPage extends BasePage{

    async addToFavourites() {
        await ProductPageComponents.favouriteButton.waitForDisplayed({ timeout: 5000 });
        await ProductPageComponents.favouriteButton.click();
    }
}

module.exports = new ProductPage();