const {verify} = require('jsonwebtoken')
const authController = require('../../src/controllers/authController')

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}))

describe('validateTokenQuery', () => {
    let mockReq, mockRes, mockStatus, mockJson, mockNext

    beforeEach(() => {
        mockJson = jest.fn()
        mockNext = jest.fn()
        mockStatus = jest.fn(() => ({ json: mockJson }))
        
        mockRes = {
            status: mockStatus,
            json: jest.fn()
        };
    })

    test('token not provided', () => {
        mockReq = { query: {}}

        authController.validateTokenQuery(mockReq, mockRes, mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unauthorized user.'
        })
        expect(mockNext).not.toHaveBeenCalled()
    })

    test('invalid token', () => {
        verify.mockImplementation(() => {
            throw new Error('Invalid token')
        })

        mockReq = { query: {token: 'myToken'}}

        authController.validateTokenQuery(mockReq, mockRes, mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unauthorized user.'
        })
        expect(mockNext).not.toHaveBeenCalled()
    })

    test('valid token', () => {
        verify.mockImplementation(() => ({info: 'userInfo'}))

        mockReq = { query: {token: 'myToken'}}

        authController.validateTokenQuery(mockReq, mockRes, mockNext)
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.status().json).not.toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalled()
    })
})

describe('isAdminToken', () => {
    let mockReq, mockRes, mockStatus, mockJson, mockNext

    beforeEach(() => {
        mockJson = jest.fn()
        mockNext = jest.fn()
        mockStatus = jest.fn(() => ({ json: mockJson }))
        
        mockRes = {
            status: mockStatus,
            json: jest.fn()
        };
    })

    test('payload not provided', () => {
        mockReq = { query: {}}

        authController.isAdminToken(mockReq, mockRes, mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unauthorized user.'
        })
        expect(mockNext).not.toHaveBeenCalled()
    })

    test('is NOT an admin', () => {
        mockReq = { tokenPayload: {}}

        authController.isAdminToken(mockReq, mockRes, mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.status().json).toHaveBeenCalledWith({
            error: 'Unauthorized user.'
        })
        expect(mockNext).not.toHaveBeenCalled()
    })

    test('is an admin', () => {
        mockReq = { tokenPayload: {isAdmin: true}}

        authController.isAdminToken(mockReq, mockRes, mockNext)
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.status().json).not.toHaveBeenCalled()
        expect(mockNext).toHaveBeenCalled()
    })
})