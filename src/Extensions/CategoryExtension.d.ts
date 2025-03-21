import { Dispatcher } from '../Dispatcher';
import { LoggerInterface } from '@elementary-lab/standards/dist/LoggerInterface';
export declare class CategoryExtension implements LoggerInterface {
    private dispatcher;
    private categoryName;
    constructor(dispatcher: Dispatcher, categoryName: string);
    debug(message: string, context?: any, category?: string): void;
    emergency(message: string, context?: any, category?: string): void;
    error(message: string, context?: any, category?: string): void;
    info(message: string, context?: any, category?: string): void;
    notice(message: string, context?: any, category?: string): void;
    profile(message: string, context?: any, category?: string): void;
    trace(message: string, context?: any, category?: string): void;
    warn(message: string, context?: any, category?: string): void;
}
//# sourceMappingURL=CategoryExtension.d.ts.map