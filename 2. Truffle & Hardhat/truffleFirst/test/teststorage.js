const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const { BN, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('SimpleStorage', accounts => {
    const owner = accounts[0];
    const second = accounts[1];
    const third = accounts[2];

    let StorageInstance;

    describe("test require and event", function () {
        
        context("test sur telle fonction", function () {

            beforeEach(async function () {
                StorageInstance = await SimpleStorage.new({from:owner});
            });

            it("should verify require pass", async () => {
                await StorageInstance.set(8, { from: owner });
                const storedData = await StorageInstance.get();
                expect(storedData).to.be.bignumber.equal(BN(8));
            });

            it("should verify require not passing", async () => {
                await expectRevert(StorageInstance.set(42, { from: owner }), 'pas bon'); 
            });

            it("should verify event", async () => {
                const findEvent = await StorageInstance.set(8, { from: owner });
                expectEvent(findEvent,"Setted" ,{_value: BN(8)});
            });

        });
    });
});