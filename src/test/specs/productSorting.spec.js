const HomePageComponents = require('../../pageObjects/components/HomePage.components');
const HomePage = require('../../pageObjects/pages/homepage');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();


describe('Sorting Products - Price Low to High', () => {

    it('should open homepage and display products', async () => {
        await HomePage.open();

        const prices = await HomePage.getProductPrices();

        expect(prices.length).to.be.greaterThan(0);
    });

    it('should select sorting by price ascending and check the order is right', async () => {
        await HomePage.sortByPriceLowToHigh();

        await HomePage.waitForElement(HomePageComponents.sortDropdown);

        const value = await HomePageComponents.sortDropdown.getValue();

        assert.equal(value, 'price,asc');

        await browser.waitUntil(async () => {
            try {
                return await HomePage.arePricesSortedAscending();
            } catch (err) {
                return false;
            }
        }, {
            timeout: 8000,
            interval: 250,
            timeoutMsg: 'Products were not sorted by price within the timeout period'
        });

        const prices = await HomePage.getProductPrices();

        prices.should.be.an('array');
        prices.should.not.be.empty;

        expect(await HomePage.arePricesSortedAscending()).to.equal(true);

        assert.equal(prices[0], Math.min(...prices));
    });


});