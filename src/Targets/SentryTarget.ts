import { MessageEntity } from '../Entities/MessageEntity';
import { AbstractTarget } from './AbstractTarget';
import * as Sentry from '@sentry/node';
import { StackFrame } from 'stacktrace-parser';
import { Stacktrace } from '@sentry/node';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
import { Primitive } from '@sentry/core/build/types/types-hoist/misc';

export class SentryTarget extends AbstractTarget implements SentryTargetConfig {
    public dsn: string;
    public environment: string;
    public release: string;

    public constructor(config: SentryTargetConfig) {
        super();
        this.configure(config);
        Sentry.init({
            dsn: this.dsn,
            release: this.release,
            environment: this.environment,
            attachStacktrace: true
        });
    }

    public async export(): Promise<void> {
        this.messages.forEach((item: MessageEntity) => {
            let eventId;
            if (typeof item.data !== 'undefined' && typeof item.data.exception !== 'undefined') {
                eventId = Sentry.captureException(item.data.exception);
            } else {
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

    private convertTrace(trace: StackFrame[]): Stacktrace {
        const newTrace: Stacktrace = {
            frames: [],
            frames_omitted: [1, 2]
        };
        trace.map((item: StackFrame) => {
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

interface SentryTargetConfig extends TargetConfigInterface {
    dsn: string;
    environment: string;
    release: string;
    tags?: {
        [key: string]: Primitive;
    };
}
