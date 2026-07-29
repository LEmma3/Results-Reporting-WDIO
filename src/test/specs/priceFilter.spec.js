const { expect } = require('chai');
const HomePageComponents = require('../../pageObjects/components/HomePage.components');
const HomePage = require('../../pageObjects/pages/homepage');

const chai = require('chai');
const assert = chai.assert;
const should = chai.should();

describe('Price Filter Feature', () => {

    beforeEach(async () => {

        await HomePage.open();

    });

    it('should set price filter between 50 and 100 and display only products within selected price range', async () => {

        await HomePage.setPriceRange();

        await HomePage.waitForStableProductList();

        const minValue = await HomePage.getMinimumPriceValue();
        const maxValue = await HomePage.getMaximumPriceValue();

        expect(minValue).to.equal('50');
        expect(maxValue).to.equal('100');

        const prices = await HomePage.getProductPrices();

        prices.forEach(price => {

            expect(price).to.be.at.least(50);
            expect(price).to.be.at.most(100);

        });

    });

});