import winston, { format } from "winston";


const {timestamp, combine, printf, errors} = format;

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
    http: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    debug: "white",
  },
};

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}, ${level}: ${stack || message}`;
});

function buildProdLogger() {
  return winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.errors({ stack: true }),
          logFormat,
          //winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "warning",
        // format: winston.format.combine(
        //     winston.format.simple(),
        //     winston.format.timestamp()
        // )
      }),
    ],
  });
}


export { buildProdLogger };