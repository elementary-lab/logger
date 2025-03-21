import { MessageEntity } from '../Entities/MessageEntity';
export declare abstract class AbstractFormatter {
    abstract format(item: MessageEntity): string;
    protected getTime(date: Date): string;
    protected getCircularReplacer(): any;
}
//# sourceMappingURL=AbstractFormatter.d.ts.map