
const {sign} = require('jsonwebtoken')
const {sendMessage, topics} = require('kafka-services')
const userController = require('../../src/controllers/userController')
const admin = require('firebase-admin')
const { email } = require('../../../email-services/src/config')

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}))

jest.mock('kafka-services', () => ({
    sendMessage: jest.fn(),
    topics: {email: 'test-topic'}
}))

jest.mock('firebase-admin', () => ({
    auth: jest.fn()
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

describe('registerUser', () => {
    let mockReq, mockRes, mockStatus, mockJson

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn(() => ({ json: mockJson }));

        mockReq = {
            tokenPayload: {email: 'email@test.com'},
            body: {password: 'myPassword', name: 'myName'}
        }
        
        mockRes = {
            status: mockStatus,
            json: jest.fn()
        };

        sendMessage.mockImplementation(async () => {})
    })

    test('ok', async() => {
        sendMessage.mockResolvedValue()
        const mockCreateUser = jest.fn().mockResolvedValue();
        const mockGenerateEmailVerificationLink = jest.fn().mockResolvedValue('myLink')

        admin.auth.mockImplementation(() => ({
            createUser: mockCreateUser,
            generateEmailVerificationLink: mockGenerateEmailVerificationLink
        }))

        await userController.registerUser(mockReq, mockRes)

        expect(mockCreateUser).toHaveBeenCalledWith({
            email: 'email@test.com',
            password: 'myPassword',
            displayName: 'myName',
            emailVerified: false
        })

        expect(mockGenerateEmailVerificationLink).toHaveBeenCalled()
        
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.status().json).toHaveBeenCalledWith({
            message: 'Registro exitoso. Revisa tu correo para activar tu cuenta.',
            email: 'email@test.com'
        })
    })

    test('error - registration failed', async() => {
        const mockCreateUser = jest.fn().mockRejectedValue(new Error('error'))
        const mockGenerateEmailVerificationLink = jest.fn().mockResolvedValue('myLink')

        admin.auth.mockImplementation(() => ({
            createUser: mockCreateUser,
        }))

        await userController.registerUser(mockReq, mockRes)

        expect(mockCreateUser).toHaveBeenCalledWith({
            email: 'email@test.com',
            password: 'myPassword',
            displayName: 'myName',
            emailVerified: false
        })

        expect(mockGenerateEmailVerificationLink).not.toHaveBeenCalled()
        
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Error al registrar el usuario.'
        })
    })

    test('error - confirmation email failed', async() => {
        const mockCreateUser = jest.fn().mockResolvedValue();
        const mockGenerateEmailVerificationLink = jest.fn().mockRejectedValue()

        admin.auth.mockImplementation(() => ({
            createUser: mockCreateUser,
            generateEmailVerificationLink: mockGenerateEmailVerificationLink
        }))

        await userController.registerUser(mockReq, mockRes)

        expect(mockCreateUser).toHaveBeenCalledWith({
            email: 'email@test.com',
            password: 'myPassword',
            displayName: 'myName',
            emailVerified: false
        })

        expect(mockGenerateEmailVerificationLink).toHaveBeenCalled()
        
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Error al generar link de verificación.'
        })
    })
})