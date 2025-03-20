import { InspectOptions } from 'util';
export interface ConsoleTraceableEvent {
    eventType: string;
    data: any;
}
export class ConsoleTraceable implements Console {
    private events: ConsoleTraceableEvent[] = [];

    public getEvents(): ConsoleTraceableEvent[] {
        return this.events;
    }

    public Console: console.ConsoleConstructor;

    public assert(value: any, message?: string, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'assert',
            data: {
                value,
                message,
                optionalParams
            }
        });
    }

    public clear(): void {
        this.events.push({
            eventType: 'clear',
            data: {}
        });
    }

    public count(label?: string): void {
        this.events.push({
            eventType: 'count',
            data: { label }
        });
    }

    public countReset(label?: string): void {
        this.events.push({
            eventType: 'countReset',
            data: {
                label
            }
        });
    }

    public debug(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'debug',
            data: {
                message,
                optionalParams
            }
        });
    }

    public dir(obj: any, options?: InspectOptions): void {
        this.events.push({
            eventType: 'dir',
            data: {
                obj,
                options
            }
        });
    }

    public dirxml(...data: any[]): void {
        this.events.push({
            eventType: 'dir',
            data
        });
    }

    public error(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'error',
            data: {
                message,
                optionalParams
            }
        });
    }

    public group(...label: any[]): void {
        this.events.push({
            eventType: 'group',
            data: {
                label
            }
        });
    }

    public groupCollapsed(...label: any[]): void {
        this.events.push({
            eventType: 'groupCollapsed',
            data: {
                label
            }
        });
    }

    public groupEnd(): void {
        this.events.push({
            eventType: 'groupEnd',
            data: {}
        });
    }

    public info(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'info',
            data: {
                message,
                optionalParams
            }
        });
    }

    public log(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'log',
            data: {
                message,
                optionalParams
            }
        });
    }

    public profile(label?: string): void {
        this.events.push({
            eventType: 'profile',
            data: {
                label
            }
        });
    }

    public profileEnd(label?: string): void {
        this.events.push({
            eventType: 'profileEnd',
            data: {
                label
            }
        });
    }

    public table(tabularData: any, properties?: ReadonlyArray<string>): void {
        this.events.push({
            eventType: 'table',
            data: {
                tabularData,
                properties
            }
        });
    }

    public time(label?: string): void {
        this.events.push({
            eventType: 'time',
            data: {
                label
            }
        });
    }

    public timeEnd(label?: string): void {
        this.events.push({
            eventType: 'timeEnd',
            data: {
                label
            }
        });
    }

    public timeLog(label?: string, ...data: any[]): void {
        this.events.push({
            eventType: 'timeLog',
            data: {
                label,
                data
            }
        });
    }

    public timeStamp(label?: string): void {
        this.events.push({
            eventType: 'trace',
            data: {
                label
            }
        });
    }

    public trace(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'trace',
            data: {
                message,
                optionalParams
            }
        });
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        this.events.push({
            eventType: 'warn',
            data: {
                message,
                optionalParams
            }
        });
    }
}
