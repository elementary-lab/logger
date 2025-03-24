import { LogLevel } from 'src/Types/index';
import { InMemoryTarget } from 'src/Targets/InMemoryTarget';
import { MessageEntity } from 'src/Entities/MessageEntity';
import { AbstractTarget } from 'src';

describe('unit -> InMemoryTarget test', () => {
    let target: AbstractTarget


    describe('filterMessages test', () => {

        beforeAll(() => {
            target= new InMemoryTarget({
                enabled: true,
            });
        });

        const baseMessage = (category: string, level: LogLevel = LogLevel.ERROR): MessageEntity => ({
            category,
            level,
            time: new Date(),
            message: 'Test message',
            trace: [],
            memoryUsage: 0
        });

        const messages: MessageEntity[] = [
            baseMessage('app.utils'),
            baseMessage('app.utils.rules'),
            baseMessage('app.controllers.auth'),
            baseMessage('core.services.db'),
        ];


        test('returns all messages if no filters are set', () => {
            const result = target.filterMessages(messages);
            expect(result).toHaveLength(4);
        });

        test('filters by exact include match', () => {
            const result = target.filterMessages(messages, [], ['app.utils']);
            expect(result).toHaveLength(1);
            expect(result[0].category).toBe('app.utils');
        });

        test('filters by wildcard include pattern', () => {
            const result = target.filterMessages(messages, [], ['app.*.rules']);
            expect(result).toHaveLength(1);
            expect(result[0].category).toBe('app.utils.rules');
        });

        test('filters by exact exclude match', () => {
            const result = target.filterMessages(messages, [], [], ['app.utils']);
            expect(result.find(msg => msg.category === 'app.utils')).toBeUndefined();
            expect(result).toHaveLength(3);
        });

        test('filters by wildcard exclude pattern', () => {
            const result = target.filterMessages(messages, [], [], ['app.*.rules']);
            expect(result.find(msg => msg.category === 'app.utils.rules')).toBeUndefined();
            expect(result).toHaveLength(3);
        });

        test('include has higher priority than exclude', () => {
            const result = target.filterMessages(messages, [], ['app.utils'], ['app.utils']);
            expect(result).toHaveLength(1);
            expect(result[0].category).toBe('app.utils');
        });

        test('filters by log level', () => {
            const customMessages: MessageEntity[] = [
                baseMessage('app.utils', LogLevel.DEBUG),
                baseMessage('app.controllers.auth', LogLevel.ERROR),
                baseMessage('core.services.db', LogLevel.INFO),
            ];
            const result = target.filterMessages(customMessages, [LogLevel.ERROR]);
            expect(result).toHaveLength(1);
            expect(result[0].level).toBe(LogLevel.ERROR);
        });

        test('combine level + include filters', () => {
            const customMessages: MessageEntity[] = [
                baseMessage('app.utils', LogLevel.DEBUG),
                baseMessage('app.utils', LogLevel.INFO),
            ];
            const result = target.filterMessages(customMessages, [LogLevel.INFO], ['app.utils']);
            expect(result).toHaveLength(1);
            expect(result[0].level).toBe(LogLevel.INFO);
        });

        test('combine level + exclude filters', () => {
            const customMessages: MessageEntity[] = [
                baseMessage('app.utils', LogLevel.DEBUG),
                baseMessage('core.services.db', LogLevel.DEBUG),
            ];
            const result = target.filterMessages(customMessages, [LogLevel.DEBUG], [], ['core.*']);
            expect(result).toHaveLength(1);
            expect(result[0].category).toBe('app.utils');
        });

    });

});
