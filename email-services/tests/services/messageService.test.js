const {consumeMessagesFromTopic} = require ('kafka-services')
const { consumeMessages } = require('../../src/services/messageService')
const { requestRegistrationCode, responseRegistrationCode, verifyAccount } = require('../../src/services/userService')

jest.mock('kafka-services', () => ({
    consumeMessagesFromTopic: jest.fn(),
    topics: {email: 'email_topic'}
}))

jest.mock('../../src/services/userService', () => ({
    requestRegistrationCode: jest.fn(),
    responseRegistrationCode: jest.fn(),
    verifyAccount: jest.fn()
}))

describe('consumeMessages', () => {
    test('process request_access', async () => {
        consumeMessagesFromTopic.mockImplementation((topic, callback) => {
            callback('request_access', 'testMessage')
            return Promise.resolve()
        })
        requestRegistrationCode.mockImplementation(() => {})

        await consumeMessages()
        expect(requestRegistrationCode).toHaveBeenCalledWith('testMessage')
    })

    test('unable to consume message', async () => {
        consumeMessagesFromTopic.mockRejectedValue(new Error('Error consuming messages'))
        await expect(consumeMessages()).rejects.toThrow('Error consuming messages');
    })

    test('process response_access', async () => {
        consumeMessagesFromTopic.mockImplementation((topic, callback) => {
            callback('response_access', 'testMessage')
            return Promise.resolve()
        })
        responseRegistrationCode.mockImplementation(() => {})

        await consumeMessages()
        expect(responseRegistrationCode).toHaveBeenCalledWith('testMessage')
    })

    test('process verify_account', async() => {
        consumeMessagesFromTopic.mockImplementation((topic, callback) => {
            callback('verify_account', 'testMessage')
            return Promise.resolve()
        })
        verifyAccount.mockImplementation(() => {})

        await consumeMessages()
        expect(verifyAccount).toHaveBeenCalledWith('testMessage')
    })
})
