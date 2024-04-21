const { Kafka } = require('kafkajs');
const { sendMessage, consumeMessagesFromTopic } = require('../../src/services/kafkaServices');

jest.mock('kafkajs', () => {
    return {
        Kafka: jest.fn(() => {
            return {
                producer: jest.fn(() => ({
                    connect: jest.fn(),
                    send: jest.fn(),
                    disconnect: jest.fn()
                })),
                consumer: jest.fn(() => ({
                    connect: jest.fn(),
                    subscribe: jest.fn(),
                    run: jest.fn()
                }))
            };
        }),
        Partitioners: {
            LegacyPartitioner: jest.fn()
        }
    };
});

describe('consumeMessagesFromTopic', () => {
    let mockConnect, mockSubscribe, mockRun, mockOnMessage

    beforeEach(() => {
        jest.clearAllMocks()

        mockConnect = jest.fn()
        mockSubscribe = jest.fn()
        mockRun = jest.fn()
        mockOnMessage = jest.fn()

        Kafka.mockImplementation(() => {
            return {
                consumer: () => ({
                    connect: mockConnect,
                    subscribe: mockSubscribe,
                    run: mockRun
                })
            };
        });
    })

    test('should connect, subscribe and process message', async () => {
        mockConnect.mockResolvedValue()
        mockSubscribe.mockResolvedValue()
        
        mockRun.mockImplementation(({ eachMessage }) => {
            eachMessage({
                topic: 'test-topic',
                partition: 0,
                message: { key: Buffer.from('key'), value: Buffer.from('value') }
            });
        })

        await expect(consumeMessagesFromTopic('test-topic', mockOnMessage)).resolves.not.toThrow();
        
        expect(mockConnect).toHaveBeenCalled();
        expect(mockSubscribe).toHaveBeenCalled();
        expect(mockRun).toHaveBeenCalled();
        expect(mockOnMessage).toHaveBeenCalledWith('key', 'value');
    })

    test('unable to connect', async() => {
        mockConnect.mockRejectedValue(new Error('Unable to connect to kafka'));

        await expect(consumeMessagesFromTopic('test-topic', mockOnMessage)).rejects.toThrow('Unable to connect to kafka');

        expect(mockConnect).toHaveBeenCalled();
        expect(mockSubscribe).not.toHaveBeenCalled();
        expect(mockRun).not.toHaveBeenCalled();
        expect(mockOnMessage).not.toHaveBeenCalled();
    })

    test('unable to subscribe', async() => {
        mockConnect.mockResolvedValue()
        mockSubscribe.mockRejectedValue(new Error('Unable to subscribe to topic test-topic'));

        await expect(consumeMessagesFromTopic('test-topic', mockOnMessage)).rejects.toThrow('Unable to subscribe to topic test-topic');

        expect(mockConnect).toHaveBeenCalled();
        expect(mockSubscribe).toHaveBeenCalled();
        expect(mockRun).not.toHaveBeenCalled();
        expect(mockOnMessage).not.toHaveBeenCalled();
    })
})

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
