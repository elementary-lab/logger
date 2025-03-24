import { MessageEntity } from '../Entities/MessageEntity';
import { LogLevel } from '../Types';
import { TargetConfigInterface } from '../Interface/LoggerConfigInterface';

export abstract class AbstractTarget implements TargetConfigInterface {
    public enabled = true;
    public levels: LogLevel[] = [];
    public exclude: string[] = [];
    public include: string[] = [];
    public exportInterval = 1;
    public messages: MessageEntity[] | null;

    abstract export(): Promise<void>;

    public configure(config: TargetConfigInterface): void {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }

    public async collect(messages: MessageEntity[], final = false): Promise<void> {
        this.messages = this.filterMessages(messages, this.levels, this.include, this.exclude);
        if (
            this.messages.length > 0 &&
            (final || (this.exportInterval > 0 && this.messages.length >= this.exportInterval))
        ) {
            // set exportInterval to 0 to avoid triggering export again while exporting
            const oldExportInterval = this.exportInterval;
            this.exportInterval = 0;
            await this.export();
            this.exportInterval = oldExportInterval;
        }
    }

    public filterMessages(
        messages: MessageEntity[],
        levels: LogLevel[] = [],
        include: string[] = [],
        exclude: string[] = []
    ): MessageEntity[] {
        const toRegExp = (pattern: string): RegExp => {
            // We screen all special symbols, except *, then replace * by. *
            const escaped = pattern.replace(/[-[\]/{}()+?.\\^$|]/g, '\\$&');
            const regexStr = '^' + escaped.replace(/\*/g, '.*') + '$';
            return new RegExp(regexStr);
        };

        const includePatterns = include.map(toRegExp);
        const excludePatterns = exclude.map(toRegExp);

        return messages.filter((value: MessageEntity) => {
            // The filter by levels
            if (levels.length > 0 && !levels.includes(value.level)) {
                return false;
            }

            const category = value.category;

            // Include verification: if at least one coincidence, then we miss (and do not check Exclude)
            if (includePatterns.length > 0) {
                return includePatterns.some((pattern) => pattern.test(category));
            }

            // Exclude verification: if there is at least one coincidence, then we exclude
            if (excludePatterns.length > 0) {
                const matchedExclude = excludePatterns.some((pattern) => pattern.test(category));
                if (matchedExclude) {
                    return false;
                }
            }

            return true;
        });
    }
}
