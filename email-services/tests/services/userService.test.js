const { sendEmail } = require('../../src/services/emailService')
const {requestRegistrationCode, responseRegistrationCode} = require('../../src/services/userService')
const {
    requestRegistrationCodeMessage,
    acceptRegistrationCodeMessage,
    rejectRegistrationCodeMessage
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

        expect(sendEmail).toHaveBeenCalledWith(messageInfo.sender, 'DOT - Registration Request', messageSent)
    })

    test('reject registration code', () => {
        const messageInfo = {sender: 'test@test.com', action: 'reject'}
        const message = JSON.stringify(messageInfo)
        const messageSent = rejectRegistrationCodeMessage(messageInfo.sender)
        
        responseRegistrationCode(message)

        expect(sendEmail).toHaveBeenCalledWith(messageInfo.sender, 'DOT - Registration Request', messageSent)
    })
})