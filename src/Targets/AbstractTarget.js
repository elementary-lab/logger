"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTarget = void 0;
class AbstractTarget {
    constructor() {
        this.enabled = true;
        this.levels = [];
        this.exclude = [];
        this.include = [];
        this.exportInterval = 1;
    }
    configure(config) {
        Object.keys(config).forEach(value => {
            this[value] = config[value];
        });
    }
    async collect(messages, final = false) {
        this.messages = this.filterMessages(messages, this.levels, this.include, this.exclude);
        if (this.messages.length > 0 &&
            (final || (this.exportInterval > 0 && this.messages.length >= this.exportInterval))) {
            // set exportInterval to 0 to avoid triggering export again while exporting
            const oldExportInterval = this.exportInterval;
            this.exportInterval = 0;
            await this.export();
            this.exportInterval = oldExportInterval;
        }
    }
    filterMessages(messages, levels = [], include = [], exclude = []) {
        // TODO filter
        return messages.filter((value) => {
            return levels.includes(value.level);
        });
    }
}
exports.AbstractTarget = AbstractTarget;
//# sourceMappingURL=AbstractTarget.js.map