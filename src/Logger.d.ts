import { LoggerConfigInterface } from './Interface/LoggerConfigInterface';
import { CategoryExtension } from './Extensions/CategoryExtension';
import { LoggerInterface } from '@elementary-lab/standards/dist/LoggerInterface';
export declare class Logger implements LoggerInterface {
    private readonly dispatcher;
    constructor(config: LoggerConfigInterface);
    withCategory(categoryName: string): CategoryExtension;
    debug(message: string, context?: any, category?: string): void;
    emergency(message: string, context?: any, category?: string): void;
    error(message: string, context?: any, category?: string): void;
    info(message: string, context?: any, category?: string): void;
    profile(message: string, context?: any, category?: string): void;
    warn(message: string, context?: any, category?: string): void;
    trace(message: string, context?: any, category?: string): void;
    notice(message: string, context?: any, category?: string): void;
}
//# sourceMappingURL=Logger.d.ts.map