"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryTarget = void 0;
const tslib_1 = require("tslib");
const AbstractTarget_1 = require("./AbstractTarget");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
class SentryTarget extends AbstractTarget_1.AbstractTarget {
    constructor(config) {
        super();
        this.configure(config);
        Sentry.init({
            dsn: this.dsn,
            release: this.release,
            environment: this.environment,
            attachStacktrace: true
        });
    }
    async export() {
        this.messages.forEach((item) => {
            let eventId;
            if (typeof item.data !== 'undefined' && typeof item.data.exception !== 'undefined') {
                eventId = Sentry.captureException(item.data.exception);
            }
            else {
                eventId = Sentry.captureEvent({
                    message: item.message,
                    extra: {
                        stacktrace: this.convertTrace(item.trace)
                    },
                    tags: item.data
                });
            }
            console.log('Add new event to Sentry pool: ' + eventId);
        });
        const sendResult = await Sentry.flush();
        console.log('Send data to sentry' + sendResult);
    }
    convertTrace(trace) {
        const newTrace = {
            frames: [],
            frames_omitted: [1, 2]
        };
        trace.map((item) => {
            newTrace.frames.push({
                abs_path: item.file,
                lineno: item.lineNumber,
                colno: item.column,
                vars: item.arguments
            });
        });
        return newTrace;
    }
}
exports.SentryTarget = SentryTarget;
//# sourceMappingURL=SentryTarget.js.map