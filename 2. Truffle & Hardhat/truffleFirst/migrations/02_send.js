const Send = artifacts.require("Send");

module.exports =  (deployer, networks, accounts) => {
   deployer.deploy(Send, {from: accounts[0], value: 1000000000000000000});
};
