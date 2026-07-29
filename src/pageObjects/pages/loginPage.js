const BasePage = require('../components/BasePage');
const LoginPageComponents = require('../components/LoginPage.components');


class LoginPage extends BasePage {

    async open() {

        await super.open('https://practicesoftwaretesting.com/auth/login');
        
    }

    async login(email, password) {
        await LoginPageComponents.emailInput.setValue(email);
        await LoginPageComponents.passwordInput.setValue(password);
        await this.click(LoginPageComponents.loginButton);
    }

    async getErrorMessage() {
        await LoginPageComponents.errorMessage.waitForDisplayed();
        return await LoginPageComponents.errorMessage.getText();
    }

    async isLoginPageDisplayed() {
        return (await browser.getUrl()).includes('/auth/login');
    }

}

module.exports = new LoginPage();