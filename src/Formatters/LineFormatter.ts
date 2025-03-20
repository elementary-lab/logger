import { AbstractFormatter } from './AbstractFormatter';
import { LogLevelString } from '../Types/index';
import { MessageEntity } from '../Entities/MessageEntity';

export class LineFormatter extends AbstractFormatter {
    public messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} {userData}';

    public format(item: MessageEntity): string {
        // tslint:disable-next-line:variable-name
        let string = this.getMessagePrefixTemplate();
        string = string.replace('{date}', this.getTime(item.time));
        string = string.replace('{logLevel}', LogLevelString[item.level]);
        string = string.replace('{category}', item.category);
        string = string.replace('{text}', item.message);

        if (typeof item.data === 'undefined') {
            string = string.replace('{userData}', '');
            return string;
        }

        if (Array.isArray(item.data)) {
            string = string.replace('{userData}', JSON.stringify(item.data, this.getCircularReplacer()));
        } else {
            string = string.replace('{userData}', '[' + JSON.stringify(item.data, this.getCircularReplacer()) + ']');
        }

        return string;
    }

    public getMessagePrefixTemplate(): string {
        return this.messagePrefixTemplate;
    }
}
