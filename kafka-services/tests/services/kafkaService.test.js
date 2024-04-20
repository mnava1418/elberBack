const { Kafka } = require('kafkajs');
const { sendMessage } = require('../../src/services/kafkaServices');

jest.mock('kafkajs', () => {
    return {
        Kafka: jest.fn(() => {
            return {
                producer: jest.fn(() => ({
                    connect: jest.fn(),
                    send: jest.fn(),
                    disconnect: jest.fn()
                }))
            };
        }),
        Partitioners: {
            LegacyPartitioner: jest.fn()
        }
    };
});

describe('sendMessage', () => {
    let mockConnect, mockSend, mockDisconnect;

    beforeEach(() => {
        jest.clearAllMocks();

        mockConnect = jest.fn();
        mockSend = jest.fn();
        mockDisconnect = jest.fn();
        Kafka.mockImplementation(() => {
            return {
                producer: () => ({
                    connect: mockConnect,
                    send: mockSend,
                    disconnect: mockDisconnect
                })
            };
        });
    });

    test('connect and send message to topic', async () => {
        mockConnect.mockResolvedValue();
        mockSend.mockResolvedValue();
        mockDisconnect.mockResolvedValue();

        await expect(sendMessage('test-topic', 'test-key', 'test-message')).resolves.not.toThrow();

        expect(mockConnect).toHaveBeenCalled();
        expect(mockSend).toHaveBeenCalledWith({
            topic: 'test-topic',
            messages: [{ key: 'test-key', value: 'test-message' }]
        });
        expect(mockDisconnect).toHaveBeenCalled();
    });

    test('unable to connect', async () => {
        mockConnect.mockRejectedValue(new Error('Unable to connect to kafka'));

        await expect(sendMessage('test-topic', 'test-key', 'test-message')).rejects.toThrow('Unable to connect to kafka');

        expect(mockConnect).toHaveBeenCalled();
        expect(mockDisconnect).not.toHaveBeenCalled();
    });

    test('unable to send message', async () => {
        mockConnect.mockResolvedValue();
        mockSend.mockRejectedValue(new Error('Unable to send message to topic: test-topic'));
        mockDisconnect.mockResolvedValue();

        await expect(sendMessage('test-topic', 'test-key', 'test-message')).rejects.toThrow('Unable to send message to topic: test-topic');

        expect(mockConnect).toHaveBeenCalled();
        expect(mockSend).toHaveBeenCalled();
        expect(mockDisconnect).toHaveBeenCalled();
    });
});
