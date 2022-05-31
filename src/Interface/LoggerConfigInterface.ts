import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';

export interface LoggerConfigInterface {
    // eslint-disable-next-line no-undef
    flushBySignals: NodeJS.Signals[]
    flushByCountInterval?: number;
    flushByTimeInterval?: number;
    traceLevel: number;
    targets: TargetConfigInterface[];
}

export interface TargetConfigInterface {
    enabled: boolean;
    categories?: string[];
    levels?: LogLevel[];
    except?: string[];
    prefix?: string;
    exportInterval?: number;
    messages?: MessageEntity[] | null;
}
