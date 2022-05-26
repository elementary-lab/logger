import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel, LogLevelString } from '../Types';
import { AbstractTarget } from './AbstractTarget';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';

export class ConsoleTarget extends AbstractTarget implements ConsoleTargetConfig {
    public messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} {userData}';

    public consoleClass: Console = console;

    public constructor(config: ConsoleTargetConfig) {
        super();
        this.configure(config);
    }

    public async export(): Promise<void> {
        this.messages.forEach((item: MessageEntity) => {
            let string = this.getMessagePrefixTemplate();
            string = string.replace('{date}', this.getTime(item.time));
            string = string.replace('{logLevel}', LogLevelString[item.level]);
            string = string.replace('{category}', item.category);
            string = string.replace('{text}', item.message);

            if (item.data !== undefined) {
                string = string.replace('{userData}', '[' + JSON.stringify(item.data, this.getCircularReplacer()) + ']');
            } else {
                string = string.replace('{userData}', '');
            }
            switch (item.level) {
            case LogLevel.EMERGENCY:
                this.consoleClass.error(string);
                break;
            case LogLevel.DEBUG:
                this.consoleClass.debug(string);
                break;
            case LogLevel.INFO:
                this.consoleClass.info(string);
                break;
            case LogLevel.WARNING:
                this.consoleClass.warn(string);
                break;
            default:
                this.consoleClass.trace(string);
            }
        });
    }

    private getCircularReplacer(): any {
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

    public getMessagePrefixTemplate(): string {
        return this.messagePrefixTemplate;
    }
}

interface ConsoleTargetConfig extends TargetConfigInterface {
    messagePrefixTemplate?: string;
    consoleClass?: Console;
}
