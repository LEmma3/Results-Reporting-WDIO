const LoginPage = require('../../pageObjects/pages/LoginPage');

const {expect, assert} = require('chai');


describe('Invalid Login Feature', () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should stay on login page and display an error message when invalid credentials are submitted', async () => {

        await LoginPage.login(
            'email@email.com',
            'wrongpassword'
        );

        const isLoginPage = await LoginPage.isLoginPageDisplayed();
        assert.isTrue(isLoginPage);

        const errorText = await LoginPage.getErrorMessage();
        expect(errorText).to.include('Invalid email or password');

    });

});