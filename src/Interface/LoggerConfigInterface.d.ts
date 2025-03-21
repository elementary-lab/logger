import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';
export interface LoggerConfigInterface {
    flushByCountInterval?: number;
    flushByTimeInterval?: number;
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
//# sourceMappingURL=LoggerConfigInterface.d.ts.map