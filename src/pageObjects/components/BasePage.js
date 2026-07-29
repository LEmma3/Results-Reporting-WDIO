class BasePage {

    async open(url) {
        await browser.url(url);
    }


    async waitForElement(element) {
        await element.waitForDisplayed({
            timeout: 5000
        });
    }


    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }


    async click(element) {
        await this.waitForElement(element);
        await element.click();
    }

    async type(element, text) {
        await this.waitForElement(element);
        await element.setValue(text);
    }

    async waitForElements(elements) {

        await browser.waitUntil(async () => {

            const list = await elements;

            return list.length > 0;

        }, {
            timeout: 10000,
            timeoutMsg: 'Elements were not loaded'
        });


        await elements[0].waitForDisplayed({
            timeout: 5000
        });

    }

}

module.exports = BasePage;