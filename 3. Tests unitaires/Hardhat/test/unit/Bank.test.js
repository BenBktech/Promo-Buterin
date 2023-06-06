const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

describe("Test Bank", function() {

    let bank, owner, addr1, addr2

    describe("Initialization", function() {

        beforeEach(async function() {
            [owner, addr1, addr2] = await ethers.getSigners() //Récupère les comptes hardhat de test
            let contract = await ethers.getContractFactory("Bank")
            bank = await contract.deploy()
        })

        it('should deploy the smart contract', async function() {
            let theOwner = await bank.owner()
            assert.equal(owner.address, theOwner)
        })
    })

    describe("Deposit", function() {
        beforeEach(async function() {
            [owner, addr1, addr2] = await ethers.getSigners() //Récupère les comptes hardhat de test
            let contract = await ethers.getContractFactory("Bank")
            bank = await contract.deploy()
        })

        it('should NOT deposit Ethers on the Bank smart contract if NOT the owner', async function() {
            let etherQuantity = ethers.utils.parseEther('0.1'); //Convertir en Wei
            await expect(bank.connect(addr1).deposit({ value: etherQuantity })).to.revertedWith('Ownable: caller is not the owner')
        })

        it('should NOT deposit Ethers if not enough funds provided', async function() {
            let etherQuantity = ethers.utils.parseEther('0.09');
            await expect(bank.deposit({ value: etherQuantity })).to.revertedWith('not enough funds provided')
        })

        it('should deposit Ethers if Owner and if enough funds provided', async function() {
            let etherQuantity = ethers.utils.parseEther('0.1');
            await expect(bank.deposit({ value: etherQuantity }))
            .to.emit(
                bank, 
                'Deposit'
            )
            .withArgs(
                owner.address, 
                etherQuantity
            )
            let balanceOfBank = await ethers.provider.getBalance(bank.address)
            assert.equal(balanceOfBank.toString(), "100000000000000000")
            //assert.equal(balanceOfBank.eq(etherQuantity), true)
        })
    })

    describe('Withdraw', function() {
        beforeEach(async function() {
            [owner, addr1, addr2] = await ethers.getSigners() //Récupère les comptes hardhat de test
            let contract = await hre.ethers.getContractFactory("Bank")
            bank = await contract.deploy()

            let etherQuantity = ethers.utils.parseEther('0.1');
            let transaction = await bank.deposit({ value: etherQuantity })
            await transaction.wait()        
        })

        it('should NOT withdraw if NOT the owner', async function() {
            let etherQuantity = ethers.utils.parseEther('0.1');
            await expect(bank.connect(addr1).withdraw(etherQuantity)).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it('should NOT withdraw if the owner tries to withdraw too much ethers', async function() {
            let etherQuantity = ethers.utils.parseEther('0.2');
            await expect(bank.withdraw(etherQuantity)).to.be.revertedWith('you cannot withdraw this much')
        })

        it('should withdraw if the owner try to withdraw and the amount is correct', async function() {
            let etherQuantity = ethers.utils.parseEther('0.1');
            await expect(bank.withdraw(etherQuantity))
            .to.emit(
                bank, 
                'Withdraw'
            )
            .withArgs(
                owner.address, 
                etherQuantity
            )
        })
    })



})