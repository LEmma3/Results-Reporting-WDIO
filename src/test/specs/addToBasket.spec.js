const HammerPage = require('../../pageObjects/pages/hammerPage.js');
const HammerPageComponents = require('../../pageObjects/components/HammerPage.components.js');
const CheckoutPage = require('../../pageObjects/pages/checkoutPage.js');
const CheckoutPageComponents = require('../../pageObjects/components/CheckoutPage.components.js');
const HomePageComponents = require('../../pageObjects/components/HomePage.components.js');
const HomePage = require('../../pageObjects/pages/HomePage.js');

const { expect, assert } = require('chai');

describe('Add to basket feature', () => {
    let productName;
    let unitPrice;

    before(async () => {
        await HomePage.open();
        await HomePage.searchForHammerProduct('Hammer');
        
        await HomePage.openProductByName('Hammer'); 
        
        productName = await HammerPage.getProductName();
        unitPrice = await HammerPage.getProductPrice();

        await HammerPage.increaseQuantity();
        await HammerPage.addToCart();
        await HammerPage.goToCart();
    });

    it('should contain Hammer in the basket', async () => {
        const isPresent = await CheckoutPage.isProductInPageSource(productName);
        expect(isPresent).to.be.true;
    });

    it('should show quantity 2 for Hammer', async () => {
        const quantity = await CheckoutPage.getProductQuantity();
        assert.equal(quantity, '2', 'Quantity should be 2');
    });

    it('should display the correct total price', async () => {
        const totalPrice = await CheckoutPage.getTotalPrice();
        expect(totalPrice).to.equal(unitPrice * 2);
    });

    it('should show 2 items on the cart indicator', async () => {
        const cartCount = await CheckoutPage.getCartCount();
        assert.equal(cartCount, '2');
    });
});