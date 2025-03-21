import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
export declare abstract class AbstractTarget implements TargetConfigInterface {
    enabled: boolean;
    levels: LogLevel[];
    exclude: string[];
    include: string[];
    exportInterval: number;
    messages: MessageEntity[] | null;
    abstract export(): Promise<void>;
    configure(config: TargetConfigInterface): void;
    collect(messages: MessageEntity[], final?: boolean): Promise<void>;
    filterMessages(messages: MessageEntity[], levels?: LogLevel[], include?: string[], exclude?: string[]): MessageEntity[];
}
//# sourceMappingURL=AbstractTarget.d.ts.map