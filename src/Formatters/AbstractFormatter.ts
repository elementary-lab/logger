import { MessageEntity } from '../Entities/MessageEntity';

export abstract class AbstractFormatter {
    public abstract format(item: MessageEntity): string;

    protected getTime(date: Date): string {
        return date
            .toISOString()
            .replace(/T/, ' ')
            .replace(/Z/, '');
    }

    protected getCircularReplacer(): any {
        const seen = new WeakSet();
        return (key, value): any => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    }
}
