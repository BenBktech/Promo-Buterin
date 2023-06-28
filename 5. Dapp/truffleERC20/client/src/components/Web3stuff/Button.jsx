import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Button({refreshBalance}) {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleAddressChange = e => {
    setInputAddress(e.target.value);
  };

  const transfer = async () => {
    if (!web3.utils.isAddress(inputAddress)) {
      alert("invalid address")
    }
    // const value = web3.utils.toBN(parseInt(inputValue) * 10 ** 18);
    const value = web3.utils.toWei(web3.utils.toBN(parseInt(inputValue)), 'ether');
    if(await contract.methods.transfer(inputAddress, value).call({ from: accounts[0] })){
      await contract.methods.transfer(inputAddress, value).send({ from: accounts[0] });
    }
    refreshBalance();
  };

  const mint = async () => {
    await contract.methods.mint().send({ from: accounts[0] });
    refreshBalance()
  };

  return (
    <div className="btns">

      <input
        type="text"
        placeholder="address"
        value={inputAddress}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        placeholder="amount"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={transfer} className="input-btn">
        transfer
      </button>
      <div className="minting">
      <button onClick={mint} className="input-btn">
        minter
      </button>
      </div>
    </div>
  );
}

export default Button;