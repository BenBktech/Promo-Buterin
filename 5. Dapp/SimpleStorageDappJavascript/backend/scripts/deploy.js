
const hre = require("hardhat");

async function main() {

  const simpleStorage = await ethers.deployContract("SimpleStorage");
  await simpleStorage.waitForDeployment();

  console.log(
    `SimpleStorage deployed to ${simpleStorage.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
