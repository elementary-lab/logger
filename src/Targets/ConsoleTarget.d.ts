/// <reference types="node" />
import { AbstractTarget } from './AbstractTarget';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
import { AbstractFormatter } from '../Formatters/AbstractFormatter';
export declare class ConsoleTarget extends AbstractTarget implements ConsoleTargetConfig {
    messagePrefixTemplate: string;
    readonly formatter: AbstractFormatter;
    private readonly consoleInstance;
    constructor(config: ConsoleTargetConfig, consoleInstance?: Console);
    export(): Promise<void>;
}
interface ConsoleTargetConfig extends TargetConfigInterface {
    messagePrefixTemplate?: string;
    formatter?: AbstractFormatter;
}
export {};
//# sourceMappingURL=ConsoleTarget.d.ts.map