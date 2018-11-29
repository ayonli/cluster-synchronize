"use strict";

const assert = require("assert");
const cluster = require("cluster");
const synchronize = require(".").default;

if (cluster.isMaster) {
    describe("cluster-synchronize", () => {
        let hasErr = false;

        after(() => {
            setTimeout(() => {
                process.exit(+hasErr);
            }, 100);
        });

        it("should run procedure synchronously in two workers as expected", function (done) {
            this.timeout(5000);

            let logs = [],
                workers = [];

            for (let i = 0; i < 2; i++) {
                let worker = cluster.fork({ workerId: i + 1 });
                workers.push(worker);

                worker.on("message", msg => {
                    logs.push(msg);

                    if (i === 1) {
                        try {
                            workers.forEach(w => w.destroy());
                            assert.deepStrictEqual(logs, ["1", "2"]);
                            done();
                        } catch (err) {
                            hasErr = true;
                            done(err);
                        }
                    }
                });
            }
        });
    });
} else {
    synchronize(() => {
        process.send(process.env.workerId);
    });
}