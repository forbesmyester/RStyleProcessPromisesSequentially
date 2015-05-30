"use strict";

module.exports = function promiseMap(worker, data) {

    var results = [],
        index = 0;

    function runNext() {

        var workerResult,
            nextLoop = function(result) {
                results.push(result);
                index = index + 1;
                return runNext();
            };

        if (index < data.length) {
            workerResult = worker(data[index]);
            if (workerResult.then) {
                return workerResult.then(nextLoop);
            }
            return nextLoop(workerResult);
        }

        return new Promise(function(resolve) { resolve(results); });

    }

    return runNext(JSON.parse(JSON.stringify(data)));
};

