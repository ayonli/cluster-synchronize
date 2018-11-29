"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const connectQueue = require("ipqueue").default;
const hash = require("string-hash");

const queue = connectQueue(hash(process.cwd()).toString(16));

/**
 * Runs asynchronous operations synchronously between worker processes.
 * Note that this function will not turn your operations synchronous, but make 
 * them running sequentially to protect concurrency issues when your program 
 * runs in cluster mode.
 */
function synchronize(body) {
    return new Promise((resolve, reject) => {
        queue.push(next => {
            let done = (err) => {
                next();
                err ? reject(err) : resolve();
            };

            try {
                if (!body.length) {
                    let res = body();

                    if (res && typeof res["then"] == "function") {
                        res.then(done).catch(done);
                    } else {
                        done();
                    }
                } else {
                    body(done);
                }
            } catch (err) {
                done(err);
            }
        });
    });
}

exports.default = exports.synchronize = synchronize;