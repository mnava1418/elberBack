const {consumeMessagesFromTopic} = require ('kafka-services')
const { consumeMessages } = require('../../src/services/messageService')
const { requestRegistrationCode } = require('../../src/services/userService')

jest.mock('kafka-services', () => ({
    consumeMessagesFromTopic: jest.fn(),
    topics: {email: 'email_topic'}
}))

jest.mock('../../src/services/userService', () => ({
    requestRegistrationCode: jest.fn()
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
})
