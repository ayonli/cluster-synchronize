# Cluster-Synchronize

**Runs asynchronous operations synchronously between worker processes.**

*Note that this module will not turn your operations synchronous, but make them*
*running sequentially to prevent concurrency issues when your program runs in*
*cluster mode.*

*This module also works with sub-processes forked directly by **child_process***
*as long as they are executed with the same path.*

*This module doesn't rely on cluster and the master process, so it's perfect*
*using it while your program runs under [PM2](https://github.com) supervision.*

## Example

```javascript
import synchronize from "cluster-synchronize";
import * as cluster from "cluster";
import * as os from "os";

if (cluster.isMaster) {
    for (let i=0; i < os.cpus().length; i++) {
        let worker = cluster.fork();
        // ...
    }
} else {
    synchronize(async () => {
        // Do everything asynchronous and don't worry about concurrency control
        // issues.
    });
}
```

## API

`synchronize(body: (done?: (err?: any) => void) => void | Promise<void>): Promise<void>`

This function returns a promise, so you can wait it finishing running and do 
other stuff after that.

If you provide the `done` parameter, you must call it once your job in `body` is
done. If any error passed to `done()`, it will be caught by the promise 
rejection handler.

If `done` isn't provided, then the job in `body` will be automatically handled, 
and any error occurred will be caught by the promise rejection handler.

`synchronize.setTimeout(timeout: number): void`

Sets a timeout to force release the queue for next task. By default, the timeout
is `5000`ms.