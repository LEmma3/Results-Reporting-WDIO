const HomePageComponents = require('../../pageObjects/components/HomePage.components');
const HomePage = require('../../pageObjects/pages/homepage');

const {expect, assert} = require('chai');

describe('Product Search Feature', () => {

    beforeEach(async () => {
        await HomePage.open();
    });

    it('should search for products by keyword (hammer)', async () => {

        await HomePage.searchForHammerProduct('Hammer');

        const results = await HomePage.getProductTitles();

        expect(results.length).to.be.greaterThan(0);

        results.forEach(title => {
            expect(title.toLowerCase()).to.include('hammer');
        });

    });

});