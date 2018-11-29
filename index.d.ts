/**
 * Runs asynchronous operations synchronously between worker processes.
 * Note that this function will not turn your operations synchronous, but make 
 * them running sequentially to protect concurrency issues when your program 
 * runs in cluster mode.
 */
export function synchronize(body: (done?: (err?: any) => void) => void | Promise<void>): Promise<void>;
export default synchronize;