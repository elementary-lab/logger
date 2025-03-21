"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormatter = void 0;
const AbstractFormatter_1 = require("./AbstractFormatter");
const index_1 = require("../Types/index");
class JsonFormatter extends AbstractFormatter_1.AbstractFormatter {
    format(item) {
        return JSON.stringify({
            date: this.getTime(item.time),
            level: index_1.LogLevelString[item.level],
            category: item.category,
            userData: JSON.stringify(item.data, this.getCircularReplacer())
        }, null, 0);
    }
}
exports.JsonFormatter = JsonFormatter;
//# sourceMappingURL=JsonFormatter.js.map