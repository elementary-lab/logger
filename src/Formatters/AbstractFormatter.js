"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFormatter = void 0;
class AbstractFormatter {
    getTime(date) {
        return date
            .toISOString()
            .replace(/T/, ' ')
            .replace(/Z/, '');
    }
    getCircularReplacer() {
        const seen = new WeakSet();
        return (key, value) => {
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
exports.AbstractFormatter = AbstractFormatter;
//# sourceMappingURL=AbstractFormatter.js.map