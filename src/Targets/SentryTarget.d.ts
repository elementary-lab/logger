import { AbstractTarget } from './AbstractTarget';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
import { Primitive } from '@sentry/core/build/types/types-hoist/misc';
export declare class SentryTarget extends AbstractTarget implements SentryTargetConfig {
    dsn: string;
    environment: string;
    release: string;
    constructor(config: SentryTargetConfig);
    export(): Promise<void>;
    private convertTrace;
}
interface SentryTargetConfig extends TargetConfigInterface {
    dsn: string;
    environment: string;
    release: string;
    tags?: {
        [key: string]: Primitive;
    };
}
export {};
//# sourceMappingURL=SentryTarget.d.ts.map