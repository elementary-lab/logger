"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtension = void 0;
const Types_1 = require("../Types");
class CategoryExtension {
    constructor(dispatcher, categoryName) {
        this.dispatcher = dispatcher;
        this.categoryName = categoryName;
    }
    debug(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.DEBUG, context, category);
    }
    emergency(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.EMERGENCY, context, category);
    }
    error(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.ERROR, context, category);
    }
    info(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.INFO, context, category);
    }
    notice(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.NOTICE, context, category);
    }
    profile(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.PROFILE, context, category);
    }
    trace(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
    }
    warn(message, context, category) {
        if (!category) {
            category = this.categoryName;
        }
        this.dispatcher.log(message, Types_1.LogLevel.TRACE, context, category);
    }
}
exports.CategoryExtension = CategoryExtension;
//# sourceMappingURL=CategoryExtension.js.map