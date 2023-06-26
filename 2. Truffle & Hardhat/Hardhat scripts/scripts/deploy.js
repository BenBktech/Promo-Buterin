
const hre = require("hardhat");

async function main() {
  const test = await hre.ethers.deployContract("Test");

  await test.waitForDeployment();

  console.log(
    `Test deployed to ${test.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
