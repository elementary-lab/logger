"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTarget = void 0;
const Types_1 = require("../Types");
const AbstractTarget_1 = require("./AbstractTarget");
const LineFormatter_1 = require("../Formatters/LineFormatter");
class ConsoleTarget extends AbstractTarget_1.AbstractTarget {
    constructor(config, consoleInstance) {
        super();
        this.messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} {userData}';
        if (!consoleInstance) {
            consoleInstance = console;
        }
        this.consoleInstance = consoleInstance;
        if (!config.formatter) {
            config.formatter = new LineFormatter_1.LineFormatter();
        }
        this.configure(config);
    }
    async export() {
        this.messages.map((item) => {
            const string = this.formatter.format(item);
            switch (item.level) {
                case Types_1.LogLevel.EMERGENCY:
                    this.consoleInstance.error(string);
                    break;
                case Types_1.LogLevel.DEBUG:
                    this.consoleInstance.debug(string);
                    break;
                case Types_1.LogLevel.PROFILE:
                    this.consoleInstance.profile(string);
                    break;
                case Types_1.LogLevel.WARNING:
                    this.consoleInstance.warn(string);
                    break;
                default:
                    this.consoleInstance.log(string);
            }
        });
    }
}
exports.ConsoleTarget = ConsoleTarget;
//# sourceMappingURL=ConsoleTarget.js.map