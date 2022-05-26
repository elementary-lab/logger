import { MessageEntity } from '../Entities/MessageEntity';
import { AbstractTarget } from './AbstractTarget';
import * as Sentry from '@sentry/node';
import { StackFrame } from 'stacktrace-parser';
import { Stacktrace } from '@sentry/node';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
import { Primitive } from '@sentry/types/dist/misc';
import { Transport, TransportClass } from '@sentry/types/types/transport';
import { HTTPSTransport } from '@sentry/node/esm/transports/https';


export class SentryTarget extends AbstractTarget implements SentryTargetConfig {
    public dsn: string;
    public environment: string;
    public release: string;
    public transport: TransportClass<Transport> = HTTPSTransport;

    public constructor(config: SentryTargetConfig) {
        super();
        this.configure(config);
        Sentry.init({
            dsn: this.dsn,
            release: this.release,
            environment: this.environment,
            attachStacktrace: true,
            debug: true,
            transport: this.transport
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
                    stacktrace: this.convertTrace(item.trace),
                    tags: item.data,
                });
            }
            console.log('Add new event to Sentry pool: ' + eventId);
        });
        const sendResult = await Sentry.flush(5000);
        console.log('Send data to sentry: ' + sendResult);
    }

    private convertTrace(trace: StackFrame[]): Stacktrace {
        const newTrace: Stacktrace = {
            frames: [],
            frames_omitted: [1, 2],
        };
        trace.forEach((item: StackFrame) => {
            newTrace.frames.push({
                // eslint-disable-next-line @typescript-eslint/camelcase
                abs_path: item.file ?? 'null',
                lineno: item.lineNumber ?? 0,
                colno: item.column ?? 0,
                vars: item.arguments,
            });
        });
        return newTrace;
    }
}

interface SentryTargetConfig extends TargetConfigInterface {
    dsn: string;
    environment: string;
    release: string;
    transport?: TransportClass<Transport>
    tags?: {
        [key: string]: Primitive;
    };
}

