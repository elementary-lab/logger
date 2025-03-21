import { Dispatcher } from '../Dispatcher';
import { LoggerInterface } from '@elementary-lab/standards/src/LoggerInterface';
import { LogLevel } from '../Types';

export class CategoryExtension implements LoggerInterface {
    public constructor(private dispatcher: Dispatcher, private categoryName: string) {}

    public debug(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.DEBUG, context, category);
    }

    public emergency(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.EMERGENCY, context, category);
    }

    public error(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.ERROR, context, category);
    }

    public info(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.INFO, context, category);
    }

    public notice(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.NOTICE, context, category);
    }

    public profile(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.PROFILE, context, category);
    }

    public trace(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
    }

    public warn(message: string, context?: any, category?: string): void {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, LogLevel.TRACE, context, category);
    }
}
