import logger from "pino";
import dayjs from "dayjs";
import pinoPretty from "pino-pretty";

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  prettifier: pinoPretty,
});

export default log;