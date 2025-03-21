/// <reference types="node" />
import { LogLevel } from './Types';
import { MessageEntity, MessageTag } from './Entities/MessageEntity';
import { LoggerConfigInterface, TargetConfigInterface } from './Interface/LoggerConfigInterface';
export declare class Dispatcher implements LoggerConfigInterface {
    flushBySignals: NodeJS.Signals[];
    flushByCountInterval: number;
    flushByTimeInterval: number;
    traceLevel: number;
    targets: TargetConfigInterface[];
    private messages;
    private flushByTimeIntervalTimer;
    constructor(config: LoggerConfigInterface);
    configure(config: LoggerConfigInterface): void;
    init(): void;
    log(message: string, level: LogLevel, data?: any, category?: string, tags?: MessageTag[]): void;
    flush(messages: MessageEntity[], final?: boolean): Promise<void>;
}
//# sourceMappingURL=Dispatcher.d.ts.map