import { buildDevlogger } from "./devLogger.js";
import { buildProdLogger } from "./prodLogger.js";

let addLogger = null
if (process.env.NODE_ENV === 'development') {
    addLogger = buildDevlogger();
} else {
    addLogger = buildProdLogger();
}

export {addLogger}