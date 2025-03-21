import { Logger } from '../../src';

import { ConsoleTarget } from 'src/Targets/ConsoleTarget';
import { LogLevel } from 'src/Types';
// @ts-ignore
import { ConsoleTraceable } from '../Helpers/ConsoleTraceable';

describe('Logger console test', () => {
    let logger: Logger;
    let consoleOutput: ConsoleTraceable;
    beforeEach(() => {
        consoleOutput = new ConsoleTraceable();
        logger = new Logger({
            flushByCountInterval: 1,
            traceLevel: 0,
            targets: [
                new ConsoleTarget(
                    {
                        enabled: true,
                        levels: [LogLevel.INFO]
                    },
                    consoleOutput
                )
            ]
        });
    });
    it('Log info result', () => {
        logger.info('testMessage', ['someAdditionalData'], 'customCategory');
        const result = consoleOutput.getEvents();
        expect(result.length).toEqual(1);
        expect(result[0].data.message).toContain('customCategory');
        expect(result[0].data.message).toContain('info');
        expect(result[0].data.message).toContain('testMessage');
        expect(result[0].data.message).toContain('someAdditionalData');
    });
    it('Log with category', () => {
        logger.withCategory('pluginCategory').info('testMessageWithCategory', ['someAdditionalDataWithCategory']);
        const result = consoleOutput.getEvents();
        expect(result.length).toEqual(1);
        expect(result[0].data.message).toContain('pluginCategory');
        expect(result[0].data.message).toContain('info');
        expect(result[0].data.message).toContain('testMessageWithCategory');
        expect(result[0].data.message).toContain('someAdditionalDataWithCategory');
    });
});
