import pino from "pino";
const streams = [
  {
    level: "trace", // support logging of all levels to this location
    stream: process.stdout, // logs to the standard output
  },
  {
    level: "trace", // support logging of all levels to this location
    stream: pino.destination("logs/server-log"), // log to this file
  },
];

const logger = pino(
    {
      level: "debug", // minimum level to log
    },
    pino.multistream(streams)
);


export default logger
  