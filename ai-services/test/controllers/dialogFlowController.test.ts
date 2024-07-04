import { Request, Response } from "express";
import { SessionsClient } from '@google-cloud/dialogflow';
import dialogFlowController from "../../src/controllers/dialogFlowController";

jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue(JSON.stringify({project_id: 'project_id'}))
}))

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('123')
}))

// Mock de @google-cloud/dialogflow
jest.mock('@google-cloud/dialogflow', () => ({
    SessionsClient: jest.fn()
}));

const mockSessionsClient = SessionsClient as jest.MockedClass<typeof SessionsClient>;

const mockDetectIntent = jest.fn();
mockSessionsClient.prototype.detectIntent = mockDetectIntent;
mockSessionsClient.prototype.projectAgentSessionPath = jest.fn().mockReturnValue('sessionPath')

describe('sendMessage', () => {
    let mockReq: Partial<Request>, mockRes: Partial<Response>, mockJson: jest.Mock, mockStatus: jest.Mock;

    beforeEach(() => {
        mockReq = {
            body: {}
        };
        
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockRes = { status: mockStatus };
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });


    test('error - invalid query', async() => {
        await dialogFlowController.sendMessage(mockReq as Request, mockRes as Response)

        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({
            error: 'Query es un campo obligatorio'
        })
    })

    test('error - unable to query dialogflow', async () => {
        mockReq.body = { query: 'test' };
        mockDetectIntent.mockRejectedValueOnce(new Error('Connection error'));

        await dialogFlowController.sendMessage(mockReq as Request, mockRes as Response);

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            error: 'Error al conectar con dialogFlow'
        });
    })

    test('ok', async () => {
        mockReq.body = { query: 'test' };
        mockDetectIntent.mockResolvedValue([{
            queryResult: {
                fulfillmentText: 'fulfilmentTest',
                intent: {
                    displayName: 'intentName'
                }
            }
        }]);

        await dialogFlowController.sendMessage(mockReq as Request, mockRes as Response);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
            responseText: 'fulfilmentTest',
            intentName: 'intentName'
        });
    })
});
