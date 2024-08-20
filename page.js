module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardnumberField: '#number',
    cardcodeField: '(//*[@id="code"])[2]',
    messageField: '//*[@id="comment"]',
    blankets: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/span',
    icecream: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    callSupportiveButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentmethod: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    addcardbutton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[2]',
    linkbutton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    orderbutton: '//*[@id="root"]/div/div[3]/div[4]/button',
    
    // Modals
    phoneNumberModal: '.modal',
    addingacardModal: '.modal',
    carsearchModal: '//*[@id="root"]/div/div[5]/div[2]',
    driverinfoModal: '//*[@id="root"]/div/div[5]/div[2]',
    // titles/labels
    addingcardtitle: '//*[@id="root"]/div/div[2]/div[2]/div[2]/div',
    icecreamcountertext: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',
    driverInfo: '//*[@id="root"]/div/div[5]/div[2]/div[2]/div[1]/div[1]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupprotive: async function() {
        const callSupportiveButton = await $(this.callSupportiveButton);
        await callSupportiveButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
        selectPaymentmethod: async function(cardnumber, code) {
        const paymentmethod = await $(this.paymentmethod);
        await paymentmethod.click();
        const addcardbutton = await $(this.addcardbutton);
        await addcardbutton.click();
      
        const cardnumberField = await $(this.cardnumberField);
        await cardnumberField.setValue(cardnumber);
        const cardcodeField = await $(this.cardcodeField);
        await cardcodeField.setValue(code);
        const addingcardtitle = await $(this.addingcardtitle);
        await addingcardtitle.click();
        await $(this.linkbutton).click()


    },
    selectMessagefordriver: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message);
    
    },

    orderSwitch: async function() {
        const blankets = await $(this.blankets);
        await blankets.click();
    },

    icecreamCounter: async function() {
        const icecream = await $(this.icecream);
        await icecream.click();
        await icecream.click();
    },

    carSearch: async function() {
    const orderbutton = await $(this.orderbutton);
    await orderbutton.click();
       
    },
};