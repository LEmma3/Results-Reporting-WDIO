const BasePage = require("../components/BasePage");
const FavoritesPageComponents = require('../components/FavoritesPage.components');

class FavoritesPage extends BasePage{

    async isProductDisplayed(productName) {
        const name = await FavoritesPageComponents.favoriteProductName.getText();
        return name.includes(productName);
    }
}

module.exports = new FavoritesPage();