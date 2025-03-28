import { LogLevel } from './Types';
import { MessageEntity, MessageTag } from './Entities/MessageEntity';
import { AbstractTarget } from './Targets/AbstractTarget';
import { StackFrame } from 'stacktrace-parser';
import * as stackTraceParser from 'stacktrace-parser';
import { LoggerConfigInterface, TargetConfigInterface } from './Interface/LoggerConfigInterface';
import * as console from 'node:console';

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
        // @ts-ignore
        process.flushLogs = async function() {
            const msgToFlush = this.messages;
            this.messages = [];
            await this.flush(msgToFlush, true);
        }.bind(this);

        this.flushBySignals.forEach((signal) => {
            process.on(signal, () => {
                (async() => {
                    const msgToFlush = this.messages;
                    this.messages = [];
                    await this.flush(msgToFlush, true);
                })();
            });
        });
        if (this.flushByTimeInterval > 0) {
            this.flushByTimeIntervalTimer = setInterval(() => {
                (async() => {
                    if (this.messages.length !== 0) {
                        const msgToFlush = this.messages;
                        this.messages = [];
                        return await this.flush(msgToFlush);
                    }
                })();
            }, this.flushByTimeInterval);
        }
        process.on('exit', () => {
            clearInterval(this.flushByTimeIntervalTimer);
        });
    }

    public log(message: string, level: LogLevel, data?: any, category = 'application', tags?: MessageTag[]): void {
        const time = new Date();
        const traces: StackFrame[] = [];
        if (this.traceLevel > 0) {
            let count = 0;
            const trace = stackTraceParser.parse(new Error().stack);
            trace.pop();
            trace.map((item: StackFrame) => {
                if (count++ >= this.traceLevel) {
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
            this.flush(this.messages);
            this.messages = [];
        }
    }

    public async flush(messages: MessageEntity[], final = false): Promise<void> {
        const targetErrors: MessageEntity[] = [];

        const targets = this.targets.map((target: AbstractTarget) => {
            if (target.enabled) {
                return target.collect(messages, final);
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
                //         trace: stackTraceParser.parse(new Error().stack)
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
