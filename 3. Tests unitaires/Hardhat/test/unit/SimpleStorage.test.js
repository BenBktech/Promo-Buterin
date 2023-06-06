const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

describe("test SimpleStorage", function() {
    let deployedContract

    beforeEach(async function() {
        [this.owner, this.addr1, this.addr2] = await ethers.getSigners()
        let contract = await ethers.getContractFactory("SimpleStorage")
        deployedContract = await contract.deploy()
    })

    describe("Initialization", function() {
        it('should get the number and the number should be equal to 0', async function() {
            let number = await deployedContract.getNumber()
            assert(number.toString() === "0") // toString() car "number" est un BN
            // assert.equal(number.toString(), "0");
            // expect(number.toString()).to.be.equal("0")
        })
    })

    describe("Set", function() {
        it('should set the number and get an updated number', async function() {
            let transaction = await deployedContract.setNumber(7)
            let informationsAboutTheTransaction = await transaction.wait()
            //console.log(informationsAboutTheTransaction)
            let number = await deployedContract.getNumber()
            //console.log(number)
            assert(number.toString() === "7")
            //console.log(this.owner)
        })
    })
})