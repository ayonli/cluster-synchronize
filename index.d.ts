/**
 * Runs asynchronous operations synchronously between worker processes.
 * Note that this function will not turn your operations synchronous, but make 
 * them running sequentially to prevent concurrency issues when your program 
 * runs in cluster mode.
 */
export declare function synchronize(body: (done?: (err?: any) => void) => void | Promise<void>): Promise<void>;

export declare namespace synchronize {
    /** Sets a timeout to force release the queue for next task. */
    function setTimeout(timeout: number): void;
}

export default synchronize;