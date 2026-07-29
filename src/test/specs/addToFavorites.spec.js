const LoginPage = require('../../pageObjects/pages/loginPage.js');
const LoginPageComponents = require('../../pageObjects/components/LoginPage.components.js');
const HomePage = require('../../pageObjects/pages/homepage.js');
const HomePageComponents = require('../../pageObjects/components/HomePage.components.js');
const FavoritesPage = require('../../pageObjects/pages/favoritesPage.js');
const FavoritesPageComponents = require('../../pageObjects/components/FavoritesPage.components.js');
const ProductPage = require('../../pageObjects/pages/productPage.js');
const ProductPageComponents = require('../../pageObjects/components/ProductPage.components.js');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Add to favourites feature', () => {

    it('should login with valid credentials', async () => {
        await browser.url('https://practicesoftwaretesting.com/auth/login');

        await LoginPage.login('email@email.com', '12345678Password@');

        await HomePage.waitForElement(HomePageComponents.menuButton);

    });

    it('should find Thor Hammer and open product', async () => {
        await HomePageComponents.homeButton.click();

        await HomePage.waitForElement(HomePageComponents.sortDropdown);

        await HomePage.searchForProduct('Thor Hammer');

        await HomePage.openProductByName('Thor Hammer');

        await HomePage.waitForElement(ProductPageComponents.productTitle);

        const title = await ProductPageComponents.productTitle.getText();

        assert.equal(title, 'Thor Hammer');

        await ProductPage.waitForElement(ProductPageComponents.favouriteButton);
    });

    it('should add product to favourites', async () => {
        await ProductPage.addToFavourites();

        await ProductPage.waitForElement(ProductPageComponents.productTitle);
    });

    it('should open favourites page from menu', async () => {
        await HomePageComponents.menuButton.click();
        await ProductPage.waitForElement(HomePageComponents.myFavoritesLink);
        await HomePageComponents.myFavoritesLink.click();
        await FavoritesPage.waitForElement(FavoritesPageComponents.favoriteProductName);

        const url = await browser.getUrl();
        expect(url).to.include('favorites');
    });

    it('should verify Thor Hammer is in favourites list', async () => {
        const isPresent = await FavoritesPage.isProductDisplayed('Thor Hammer');
        expect(isPresent).to.be.true;
    });

});