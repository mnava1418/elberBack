
const {sign} = require('jsonwebtoken')
const {sendMessage, topics} = require('kafka-services')
const userController = require('../../src/controllers/userController')

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}))

jest.mock('kafka-services', () => ({
    sendMessage: jest.fn(),
    topics: {email: 'test-topic'}
}))

describe('requestRegistrationCode', () => {
    let mockReq, mockRes, mockStatus, mockJson

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn(() => ({ json: mockJson }));

        mockReq = {
            body: { email: 'test@example.com' }
        };
        mockRes = {
            status: mockStatus,
            json: jest.fn()
        };

        sign.mockImplementation(() => 'myToken')

        sendMessage.mockImplementation(async () => {})        
    })

    test('ok', async () => {
        sendMessage.mockResolvedValue()
        
        await userController.requestRegistrationCode(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            message: `Hemos recibido tu solicitud. Si esta es aprobada, recibirás un correo electrónico en test@example.com con las instrucciones necesarias para continuar con tu registro.`
        })
    })

    test('error', async () => {
        sendMessage.mockRejectedValue(new Error('Unable to send message to topic: test-topic'));
        
        await userController.requestRegistrationCode(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unable to send message to topic: test-topic'
        });
    });
})

describe('responseRegistrationCode', () => {
    let mockReq, mockRes, mockStatus, mockJson

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn(() => ({ json: mockJson }));

        mockReq = {
            tokenPayload: {sender: 'mySender', action: 'myAction'}
        }
        
        mockRes = {
            status: mockStatus,
            json: jest.fn()
        };
    })

    test('ok', async () => {
        sendMessage.mockResolvedValue()

        await userController.responseRegistrationCode(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            message: `Hemos enviado tu respuesta a mySender.`
        })
    })

    test('error', async () => {
        sendMessage.mockRejectedValue(new Error('Unable to send message to topic: test-topic'));
        
        await userController.responseRegistrationCode(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unable to send message to topic: test-topic'
        })
    })
})