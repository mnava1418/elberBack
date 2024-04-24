const {readFileSync} = require('fs')
const {createTransport} = require('nodemailer')
const {sendEmail} = require('../../src/services/emailService')

jest.mock('fs', () => ({
    readFileSync: jest.fn()
}))

jest.mock('nodemailer', () => ({
    createTransport: jest.fn(),
}))

describe('sendEmail', () => {
    test('was able to send an email', async() => {
        let mockSendEmail = jest.fn()
        let mockClose = jest.fn()
        let mockFs = JSON.stringify({test: 'test'})

        readFileSync.mockImplementation((myFile) => mockFs)
        createTransport.mockImplementation(({}) => ({
            sendMail: mockSendEmail,
            close: mockClose
        }))

        mockSendEmail.mockResolvedValue({messageId: '12345'})
        await sendEmail('test@test.com', 'test', 'test')
        expect(mockSendEmail).toHaveBeenCalled()
        expect(mockClose).toHaveBeenCalled()
    })
})