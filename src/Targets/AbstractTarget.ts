import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';

export abstract class AbstractTarget implements TargetConfigInterface {
    public enabled = true;
    public levels: LogLevel[] = [];
    public categories: string[] = [];
    public except: string[] = [];
    public prefix: string = '';
    public exportInterval = 1;
    public messages: MessageEntity[] = [];

    abstract export(): Promise<void>;

    public configure(config: TargetConfigInterface): void {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }

    public async collect(messages: MessageEntity[], final = false): Promise<void> {
        this.messages = this.filterMessages(messages, this.levels, this.categories, this.except);
        if (
            this.messages.length > 0 &&
            (final || (this.exportInterval > 0 && this.messages.length >= this.exportInterval))
        ) {
            // set exportInterval to 0 to avoid triggering export again while exporting
            const oldExportInterval = this.exportInterval;
            this.exportInterval = 0;
            const result = await this.export();
            this.exportInterval = oldExportInterval;
            return result;
        }
        return Promise.resolve();
    }

    public filterMessages(
        messages: MessageEntity[],
        levels: LogLevel[] = [],
        categories: string[] = [],
        except: string[] = []
    ): MessageEntity[] {
        // TODO filter
        return messages.filter((value: MessageEntity) => {
            return levels.includes(value.level);
        });
    }

    protected getTime(date: Date): string {
        return date
            .toISOString()
            .replace(/T/, ' ')
            .replace(/Z/, '');
    }
}
