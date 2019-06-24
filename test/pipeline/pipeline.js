const assert = require("assert");
const sinon = require("sinon");
const expect = require("expect");
const {Pipe} = require("../../source/pipeline/pipeline");

describe("Pipeline", () => {
    const aFunctionNeedsTooLongTime = (time, res) =>
        new Promise((resolve, _) => setTimeout(()=>resolve(res), time));

    it("non process", async () => {
        const pipeline = new Pipe(1);
        assert.equal(await pipeline.result(), 1);
    });

    it("all pass process", async () => {
        const pipeline = new Pipe(1);
        const result = await pipeline.$($=>$).result();
        assert.equal(result , 1);
    });

    it("return double of arg afater sleeping 1 sec", async () => {
        const result = await (new Pipe(1)).$(async $=>await aFunctionNeedsTooLongTime(1*1000, $ + 1)).result();
        assert.equal(result , 2);
    });

    it("transmission of exception", async () => {
        try{
            const result = await (new Pipe(1)).$(async $=>{throw "err1"}).$($=>$).$($=>aFunctionNeedsTooLongTime(1*1000, $ + 1)).result();
        }catch(err){
            assert.equal(err , "err1");
        }
    });
});