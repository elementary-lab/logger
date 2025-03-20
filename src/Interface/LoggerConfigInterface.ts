import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';

export interface LoggerConfigInterface {
    flushInterval: number;
    traceLevel: number;
    targets: TargetConfigInterface[];
}

export interface TargetConfigInterface {
    enabled: boolean;
    levels?: LogLevel[];
    include?: string[];
    exclude?: string[];
    exportInterval?: number;
    messages?: MessageEntity[] | null;
}
