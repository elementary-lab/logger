"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Dispatcher_1 = require("./Dispatcher");
const Types_1 = require("./Types");
const CategoryExtension_1 = require("./Extensions/CategoryExtension");
class Logger {
    constructor(config) {
        this.dispatcher = new Dispatcher_1.Dispatcher(config);
    }
    withCategory(categoryName) {
        return new CategoryExtension_1.CategoryExtension(this.dispatcher, categoryName);
    }
    debug(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.DEBUG, context, category);
    }
    emergency(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.EMERGENCY, context, category);
    }
    error(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.ERROR, context, category);
    }
    info(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.INFO, context, category);
    }
    profile(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.PROFILE, context, category);
    }
    warn(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.WARNING, context, category);
    }
    trace(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.TRACE, context, category);
    }
    notice(message, context, category) {
        this.dispatcher.log(message, Types_1.LogLevel.NOTICE, context, category);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map