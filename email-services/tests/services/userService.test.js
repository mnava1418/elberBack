const { sendEmail } = require('../../src/services/emailService')
const {requestRegistrationCode, responseRegistrationCode, verifyAccount} = require('../../src/services/userService')
const {
    requestRegistrationCodeMessage,
    acceptRegistrationCodeMessage,
    rejectRegistrationCodeMessage,
    verifyAccountMessage
} = require('../../src/config/emailMessages')
const {from} = require('../../src/config').email

jest.mock('../../src/services/emailService', () => ({
    sendEmail: jest.fn()
}))

describe('Test User Services', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        sendEmail.mockImplementation(() => {})
    })

    test('request registration code', () => {
        const messageInfo = {sender: 'test@test.com', acceptToken: 'acceptToken', rejectToken: 'rejectToken'}
        const message = JSON.stringify(messageInfo)
        const messageSent = requestRegistrationCodeMessage(messageInfo)
        
        requestRegistrationCode(message)

        expect(sendEmail).toHaveBeenCalledWith(from, 'NEW - Registration Request', messageSent)
    })

    test('accept registration code', () => {
        const messageInfo = {sender: 'test@test.com', action: 'accept', token: 'myToken'}
        const message = JSON.stringify(messageInfo)
        const messageSent = acceptRegistrationCodeMessage(messageInfo.token, messageInfo.sender)
        
        responseRegistrationCode(message)

        expect(sendEmail).toHaveBeenCalledWith(messageInfo.sender, 'Elber - Registration Request', messageSent)
    })

    test('reject registration code', () => {
        const messageInfo = {sender: 'test@test.com', action: 'reject'}
        const message = JSON.stringify(messageInfo)
        const messageSent = rejectRegistrationCodeMessage(messageInfo.sender)
        
        responseRegistrationCode(message)

        expect(sendEmail).toHaveBeenCalledWith(messageInfo.sender, 'Elber - Registration Request', messageSent)
    })

    test('verify account', () => {
        const messageInfo = {email: 'test@test.com', verificationLink: 'link'}
        const message = JSON.stringify(messageInfo)
        const messageSent = verifyAccountMessage(messageInfo.email, messageInfo.verificationLink)
        
        verifyAccount(message)

        expect(sendEmail).toHaveBeenCalledWith(messageInfo.email, 'Elber - Verify your Account', messageSent)
    })
})