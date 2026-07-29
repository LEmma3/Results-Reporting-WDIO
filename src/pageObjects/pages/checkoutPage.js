const BasePage = require('../components/BasePage');
const CheckoutPageComponents = require('../components/CheckoutPage.components');

class CheckoutPage extends BasePage{

    async open() {
        await super.open('https://practicesoftwaretesting.com/checkout');  
    }

    async getProductQuantity() {
        await CheckoutPageComponents.HammerProductQuantity.waitForDisplayed();
        return await CheckoutPageComponents.HammerProductQuantity.getValue();
    }

    async getTotalPrice() {
      
        const priceElement = await CheckoutPageComponents.HammerTotalPrice;
        await priceElement.waitForDisplayed({ timeout: 5000 });

        await browser.waitUntil(async () => {
            const text = await priceElement.getText();
            return text.trim() !== '' && text.trim() !== '$0.00';
        }, { 
            timeout: 5000, 
            timeoutMsg: 'Total price did not update in time' 
        });

        const priceText = await priceElement.getText();
        console.log(priceText);
        return parseFloat(priceText.replace('$', ''));
    }

    async getCartCount() {
        await CheckoutPageComponents.cartCount.waitForDisplayed();
        return await CheckoutPageComponents.cartCount.getText();
    }

    async isProductInPageSource(productName) {
        const pageSource = await browser.getPageSource();
        return pageSource.includes(productName);
    }

}

module.exports = new CheckoutPage();