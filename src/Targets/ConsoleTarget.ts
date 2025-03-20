import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';
import { AbstractTarget } from './AbstractTarget';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';
import { AbstractFormatter } from '../Formatters/AbstractFormatter';
import { LineFormatter } from '../Formatters/LineFormatter';
import { Console } from 'node:console';

export class ConsoleTarget extends AbstractTarget implements ConsoleTargetConfig {
    public messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} {userData}';
    public readonly formatter: AbstractFormatter;
    private readonly consoleInstance: Console;

    public constructor(config: ConsoleTargetConfig, consoleInstance?: Console) {
        super();
        if (!consoleInstance) {
            consoleInstance = console;
        }
        this.consoleInstance = consoleInstance;
        if (!config.formatter) {
            config.formatter = new LineFormatter();
        }
        this.configure(config);
    }

    public async export(): Promise<void> {
        this.messages.map((item: MessageEntity) => {
            const string = this.formatter.format(item);
            switch (item.level) {
                case LogLevel.EMERGENCY:
                    this.consoleInstance.error(string);
                    break;
                case LogLevel.DEBUG:
                    this.consoleInstance.debug(string);
                    break;
                case LogLevel.PROFILE:
                    this.consoleInstance.profile(string);
                    break;
                case LogLevel.WARNING:
                    this.consoleInstance.warn(string);
                    break;
                default:
                    this.consoleInstance.log(string);
            }
        });
    }
}

interface ConsoleTargetConfig extends TargetConfigInterface {
    messagePrefixTemplate?: string;
    formatter?: AbstractFormatter;
}
