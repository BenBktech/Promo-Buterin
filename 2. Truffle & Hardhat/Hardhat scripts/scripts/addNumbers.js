const { ethers } = require("hardhat")

async function main() {
    let owner, addr1, addr2

    [owner, addr1, addr2] = await ethers.getSigners()

    const myContract = await hre.ethers.getContractAt("Test", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    let transaction = await myContract.connect(owner).setNumber(5)
    transaction.wait()
    transaction = await myContract.connect(addr1).setNumber(6)
    transaction.wait()
    transaction = await myContract.connect(addr2).setNumber(7)
    transaction.wait()

    console.log(myContract)
    let number = await myContract.connect(addr1).getNumber()
    console.log(number.toString())

    // const Test = await ethers.getContract("Test", owner);
    // console.log(Test);
}

main()
    .then(() => process.exit(0)) 
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })