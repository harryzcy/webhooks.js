import type { Logger } from "../createLogger.js";

export type MiddlewareOptions = {
  path?: string;
  log?: Logger;
};
