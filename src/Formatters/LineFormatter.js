"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineFormatter = void 0;
const AbstractFormatter_1 = require("./AbstractFormatter");
const index_1 = require("../Types/index");
class LineFormatter extends AbstractFormatter_1.AbstractFormatter {
    constructor() {
        super(...arguments);
        this.messagePrefixTemplate = '[{date}][{logLevel}][{category}] {text} {userData}';
    }
    format(item) {
        // tslint:disable-next-line:variable-name
        let string = this.getMessagePrefixTemplate();
        string = string.replace('{date}', this.getTime(item.time));
        string = string.replace('{logLevel}', index_1.LogLevelString[item.level]);
        string = string.replace('{category}', item.category);
        string = string.replace('{text}', item.message);
        if (typeof item.data === 'undefined') {
            string = string.replace('{userData}', '');
            return string;
        }
        if (Array.isArray(item.data)) {
            string = string.replace('{userData}', JSON.stringify(item.data, this.getCircularReplacer()));
        }
        else {
            string = string.replace('{userData}', '[' + JSON.stringify(item.data, this.getCircularReplacer()) + ']');
        }
        return string;
    }
    getMessagePrefixTemplate() {
        return this.messagePrefixTemplate;
    }
}
exports.LineFormatter = LineFormatter;
//# sourceMappingURL=LineFormatter.js.map