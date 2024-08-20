const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should fill the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await expect(await $(page.fromField)).toHaveValue('East 2nd Street');
        await expect(await $(page.toField)).toHaveValue('1300 1st St');
    })

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.selectSupprotive();
        await expect(await $(page.callSupportiveButton)).toBeExisting();
    })

    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should add card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.selectPaymentmethod('123400001234', '12');
        await expect(await $(page.cardnumberField)).toHaveValue('123400001234');
        await expect(await $(page.cardcodeField)).toHaveValue('12');
    })

    it('should write a mesage for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.selectMessagefordriver('test message');
        await expect(await $(page.messageField)).toHaveValue('test message');
    })

    it('should switch blanket and handkerchiefs slider on and off', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.orderSwitch();
        await expect(await $(page.blankets)).toBeExisting();
    })

    it('should add 2 icecreams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.icecreamCounter();
        await expect(await $(page.icecreamcountertext)).toHaveText('2');
    })

    it('should populate car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.carSearch();
        await expect(await $(page.carsearchModal)).toBeExisting();

    })

    it('should switch to driver info modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street', '1300 1st St');
        await page.carSearch();
        await browser.pause(40000);
        await expect(await $(page.driverinfoModal)).toBeExisting();

    })
})

