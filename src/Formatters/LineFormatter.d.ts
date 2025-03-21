import { AbstractFormatter } from './AbstractFormatter';
import { MessageEntity } from '../Entities/MessageEntity';
export declare class LineFormatter extends AbstractFormatter {
    messagePrefixTemplate: string;
    format(item: MessageEntity): string;
    getMessagePrefixTemplate(): string;
}
//# sourceMappingURL=LineFormatter.d.ts.map