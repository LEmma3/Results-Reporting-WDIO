const HomePageComponents = require('../../pageObjects/components/HomePage.components');
const HomePage = require('../../pageObjects/pages/HomePage');

const {expect, assert} = require('chai');


describe('Language change', () => {

    beforeEach(async () => {

        await HomePage.open();

    });


    it('should load page with English language', async () => {

        const language = await HomePage.getCurrentLanguage();

        expect(language).to.include('EN');

    });



    it('should switch language to Spanish', async () => {

        await HomePage.changeLanguageToSpanish();
        await HomePageComponents.homeTextTranslate.waitForDisplayed();

        const text = await HomePageComponents.homeTextTranslate.getText();
        assert.equal(text,'Inicio');

        const language = await HomePage.getCurrentLanguage();

        expect(language).to.include('ES');

    });


});