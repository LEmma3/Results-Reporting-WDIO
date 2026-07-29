const HomePage = require('../../pageObjects/pages/homepage.js');
const HomePageComponents = require('../../pageObjects/components/HomePage.components.js');
const ComparisonPage = require('../../pageObjects/pages/comparisonPage.js');
const ComparisonPageComponents = require('../../pageObjects/components/ComparisonPage.components.js');

const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();

describe('Product comparison feature', () => {

    it('should open homepage', async () => {
        await HomePage.open();
        assert.isTrue((await browser.getUrl()).includes('practicesoftwaretesting'));
    });

    it('should add the first two product to comparison', async () => {
        await HomePage.addProductToCompare(0);
        await HomePage.addProductToCompare(1);
    });

    it('should navigate to comparison page', async () => {
        await HomePage.goToComparison();
        await ComparisonPage.waitForElement(ComparisonPageComponents.table);
        expect(await browser.getUrl()).to.include('/comparison');
    });

    it('should display comparison tables and how both products side-by-side with the correct prices', async () => {
        const displayed = await ComparisonPage.isDisplayed();
        assert.equal(displayed, true);

        const names = await ComparisonPage.getProductNamesText();

        names.should.be.an('array').that.has.lengthOf(2);
        names[0].should.not.equal(names[1]);

        const prices = await ComparisonPage.getPrices();

        expect(prices[0]).to.be.a('number');
        expect(prices[1]).to.be.a('number');

        assert.notEqual(prices[0], prices[1]);

        const specs = await ComparisonPageComponents.specRows;

        expect(specs.length).to.be.greaterThan(0);

        const firstSpec = await specs[0].getText();
        should.exist(firstSpec);
    });

});