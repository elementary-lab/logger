'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevelString = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["PROFILE"] = 0] = "PROFILE";
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["NOTICE"] = 4] = "NOTICE";
    LogLevel[LogLevel["WARNING"] = 5] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 6] = "ERROR";
    LogLevel[LogLevel["EMERGENCY"] = 7] = "EMERGENCY";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var LogLevelString;
(function (LogLevelString) {
    LogLevelString[LogLevelString["profile"] = 0] = "profile";
    LogLevelString[LogLevelString["trace"] = 1] = "trace";
    LogLevelString[LogLevelString["debug"] = 2] = "debug";
    LogLevelString[LogLevelString["info"] = 3] = "info";
    LogLevelString[LogLevelString["notice"] = 4] = "notice";
    LogLevelString[LogLevelString["warn"] = 5] = "warn";
    LogLevelString[LogLevelString["error"] = 6] = "error";
})(LogLevelString = exports.LogLevelString || (exports.LogLevelString = {}));
//# sourceMappingURL=index.js.map