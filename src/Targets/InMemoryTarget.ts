import { AbstractTarget } from 'src/Targets/AbstractTarget';
import { TargetConfigInterface } from 'src/Interface/LoggerConfigInterface';
import { MessageEntity } from 'src/Entities/MessageEntity';

export class InMemoryTarget extends AbstractTarget {
    public constructor(config: TargetConfigInterface) {
        super();
        this.configure(config);
    }

    public export(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public getMessages(): MessageEntity[] {
        return this.messages;
    }
}
