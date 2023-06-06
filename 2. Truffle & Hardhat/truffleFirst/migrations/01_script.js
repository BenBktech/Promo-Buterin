const Storage = artifacts.require("Storage");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Storage, 5, {from: accounts[0], value: 1000000000000000});

  const instance = await Storage.deployed();
  let value = await instance.get();
  console.log("initial value : ", value.toString());

  await instance.set(10, {from: accounts[0]});
  value = await instance.get();
  console.log("new value : ", value.toString());

  
  web3.eth.getAccounts().then(console.log);

  let balance = await web3.eth.getBalance(accounts[0]);

  console.log(
    "instance.address balance: " +
      web3.utils.fromWei(balance, "ether") +
      " ETH"
  );

};
