import { AbstractFormatter } from './AbstractFormatter';
import { LogLevelString } from '../Types/index';
import { MessageEntity } from '../Entities/MessageEntity';

export class JsonFormatter extends AbstractFormatter {
    public format(item: MessageEntity): string {
        return JSON.stringify(
            {
                date: this.getTime(item.time),
                level: LogLevelString[item.level],
                category: item.category,
                text: item.message,
                userData: JSON.stringify(item.data, this.getCircularReplacer())
            },
            null,
            0
        );
    }
}
