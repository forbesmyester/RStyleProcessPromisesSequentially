"use strict";

var expect = require('expect.js'),
    index = require('../index.js');

describe('index', function() {
    it('Will return empty results for empty input', function(done) {
        index(function() { throw new Error("Should not run"); }, [])
            .then(function(result) {
                expect(result.length).to.equal(0);
                done();
            }, done);
    });
    it('Can map (with non promise returning worker)', function(done) {
        index(function(a) { return a + 1; }, [1, 2, 3])
            .then(function(result) {
                expect(result).to.eql([2, 3, 4]);
                done();
            }, done);
    });
    it('Can map (with promise returning worker)', function(done) {
        var worker = function(a) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve(a + 1);
                }, 1);
            });
        };
        index(worker, [1, 2, 3])
            .then(function(result) {
                expect(result).to.eql([2, 3, 4]);
                done();
            }, done);
    });
});
