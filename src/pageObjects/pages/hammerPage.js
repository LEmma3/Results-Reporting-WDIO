const BasePage = require('../components/BasePage');
const HammerPageComponents = require('../components/HammerPage.components');

class HammerPage extends BasePage{

    async open() {
        await super.open('https://practicesoftwaretesting.com/');
    }

    async getProductName() {
        await HammerPageComponents.productName.waitForDisplayed();
        return await HammerPageComponents.productName.getText();
    }

    async getProductPrice() {
        await HammerPageComponents.productPrice.waitForDisplayed();
        const priceText = await HammerPageComponents.productPrice.getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async increaseQuantity() {
        await HammerPageComponents.increaseQuantity.waitForClickable();
        await HammerPageComponents.increaseQuantity.click();
    }

    async addToCart() {
        await HammerPageComponents.addToCartButton.waitForClickable();
        await HammerPageComponents.addToCartButton.click();
    }

    async goToCart() {
        await HammerPageComponents.cartButton.waitForClickable();
        await HammerPageComponents.cartButton.click();
    }

}

module.exports = new HammerPage();