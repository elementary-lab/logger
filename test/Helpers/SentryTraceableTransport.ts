import { Transport } from '@sentry/types';
import { Event } from '@sentry/types/types/event';
import { Response } from '@sentry/types/types/response';
import { Session } from '@sentry/node';

export class SentryTraceableTransport implements Transport {
    private events: Event[] = [];
    private sessions: Session[] = [];

    public close(timeout?: number): PromiseLike<boolean> {
        return Promise.resolve(false);
    }

    public sendEvent(event: Event): PromiseLike<Response> {
        this.events.push(event);
        return Promise.resolve({
            reason: 'NoopTransport: Event has been skipped because no Dsn is configured.',
            status: 'success'
        });
    }

    public sendSession(session: Session): PromiseLike<Response> {
        this.sessions.push(session);
        return Promise.resolve({
            reason: 'NoopTransport: Event has been skipped because no Dsn is configured.',
            status: 'success'
        });
    }

    public getEvents(): Event[] {
        return this.events;
    }
}
