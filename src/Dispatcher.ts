import { LogLevel } from './Types';
import { MessageEntity, MessageTag } from './Entities/MessageEntity';
import { AbstractTarget } from './Targets/AbstractTarget';
import { StackFrame } from 'stacktrace-parser';
import * as stackTraceParser from 'stacktrace-parser';
import { LoggerConfigInterface, TargetConfigInterface } from './Interface/LoggerConfigInterface';

export class Dispatcher implements LoggerConfigInterface {
    // eslint-disable-next-line no-undef
    public flushBySignals: NodeJS.Signals[] = [];

    public flushByCountInterval = 1000;

    public flushByTimeInterval = 0;

    public traceLevel = 0;

    public targets: TargetConfigInterface[] = [];

    private messages: MessageEntity[] = [];

    // eslint-disable-next-line no-undef
    private flushByTimeIntervalTimer: NodeJS.Timer | null = null;

    public constructor(config: LoggerConfigInterface) {
        this.configure(config);
        this.init();
    }

    public configure(config: LoggerConfigInterface): void {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }

    public init(): void {
        this.flushBySignals.forEach((signal) => {
            (async() => {
                await this.flush(this.messages, true);
            })();
        });
        if (this.flushByTimeInterval > 0) {
            this.flushByTimeIntervalTimer = setInterval(async() => {
                if (this.messages.length !== 0) {
                    const msgToFlush = this.messages;
                    this.messages = [];
                    return await this.flush(msgToFlush);
                }
            }, this.flushByTimeInterval);
        }
    }

    public log(message: string, level: LogLevel, data?: any, category = 'application', tags?: MessageTag[]): void {
        const time = new Date();
        const traces: StackFrame[] = [];
        if (this.traceLevel > 0) {
            let count = 0;
            // @ts-ignore
            const trace = stackTraceParser.parse(new Error().stack ?? []);
            trace.pop();
            // eslint-disable-next-line array-callback-return
            trace.forEach((item: StackFrame) => {
                if (count++ >= this.traceLevel) {
                    // eslint-disable-next-line array-callback-return
                    return;
                }
                traces.push(item);
            });
        }
        this.messages.push({
            level,
            time,
            data,
            message,
            tags,
            category,
            trace: traces,
            memoryUsage: process.memoryUsage().heapUsed
        });

        if (this.flushByCountInterval > 0 && this.messages.length >= this.flushByCountInterval) {
            const flushMsg = this.messages;
            this.messages = [];
            this.flush(flushMsg);
        }
    }

    public async flush(messages: MessageEntity[], final = false): Promise<void> {
        const targetErrors: MessageEntity[] = [];

        const targets = this.targets.map((target: AbstractTarget) => {
            if (target.enabled) {
                return target.collect(messages, final);
                // TODO add try catch
                // try {
                //
                // } catch (exception) {
                //     targetErrors.push({
                //         level: LogLevel.WARNING,
                //         time: new Date(),
                //         data: [exception.name, exception.message, exception.stack],
                //         message: 'Unable to send log via ' + target.constructor.name,
                //         category: 'logger.core',
                //         memoryUsage: process.memoryUsage().heapUsed,
                //         trace: stackTraceParser.parse(new Error().stack),
                //     });
                // }
            }
            return Promise.resolve();
        });
        await Promise.all(targets).catch(async() => {
            await this.flush(targetErrors, true);
        });
    }
}
