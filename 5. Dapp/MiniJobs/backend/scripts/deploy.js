const hre = require("hardhat");

async function main() {
  const jobs = await hre.ethers.deployContract("Jobs");

  await jobs.waitForDeployment();

  console.log(
    `Jobs deployed to ${jobs.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
