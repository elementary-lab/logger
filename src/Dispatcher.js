"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
const tslib_1 = require("tslib");
const stackTraceParser = tslib_1.__importStar(require("stacktrace-parser"));
class Dispatcher {
    constructor(config) {
        // eslint-disable-next-line no-undef
        this.flushBySignals = [];
        this.flushByCountInterval = 1000;
        this.flushByTimeInterval = 0;
        this.traceLevel = 0;
        this.targets = [];
        this.messages = [];
        // eslint-disable-next-line no-undef
        this.flushByTimeIntervalTimer = null;
        this.configure(config);
        this.init();
    }
    configure(config) {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }
    init() {
        // @ts-ignore
        process.flushLogs = async function () {
            const msgToFlush = this.messages;
            this.messages = [];
            await this.flush(msgToFlush, true);
        }.bind(this);
        this.flushBySignals.forEach((signal) => {
            process.on(signal, () => {
                (async () => {
                    const msgToFlush = this.messages;
                    this.messages = [];
                    await this.flush(msgToFlush, true);
                })();
            });
        });
        if (this.flushByTimeInterval > 0) {
            this.flushByTimeIntervalTimer = setInterval(() => {
                (async () => {
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
    log(message, level, data, category = 'application', tags) {
        const time = new Date();
        const traces = [];
        if (this.traceLevel > 0) {
            let count = 0;
            const trace = stackTraceParser.parse(new Error().stack);
            trace.pop();
            trace.map((item) => {
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
    async flush(messages, final = false) {
        const targetErrors = [];
        const targets = this.targets.map((target) => {
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
        await Promise.all(targets).catch(async () => {
            await this.flush(targetErrors, true);
        });
    }
}
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map